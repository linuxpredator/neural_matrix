import asyncio
import os
import logging
import nest_asyncio
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from TikTokApi import TikTokApi
from dotenv import load_dotenv

# Allow nested asyncio loops (required for TikTokApi inside FastAPI)
nest_asyncio.apply()

# Setup Logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Load Environment Variables
load_dotenv()

app = FastAPI(title="NeuralMatrix TikTok Backend", version="1.0.0")

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MS_TOKEN = os.getenv("MS_TOKEN")

async def get_tiktok_api_session():
    """Helper to initialize TikTokApi session with security tokens."""
    api = TikTokApi()
    # Dynamic Token Management:
    # 1. Use MS_TOKEN from env to simulate logged-in session
    # 2. Helps bypass anti-bot captcha
    if MS_TOKEN:
        await api.create_sessions(ms_tokens=[MS_TOKEN], num_sessions=1, sleep_after=3)
    else:
        logger.warning("No MS_TOKEN provided. Basic scraping may fail.")
        await api.create_sessions(num_sessions=1, sleep_after=3)
    return api

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "python-tiktok-backend"}

@app.get("/api/v1/user/{username}")
async def fetch_complete_user_profile(username: str):
    """
    Fetches full user profile including detailed stats and region.
    Maps data to TypeScript-friendly format.
    """
    try:
        async with TikTokApi() as api:
            await api.create_sessions(ms_tokens=[MS_TOKEN] if MS_TOKEN else None, num_sessions=1, sleep_after=3)
            user = api.user(username=username)
            user_info = await user.info()
            
            # Safe Extraction
            user_data = user_info.get('userInfo', {})
            user_detail = user_data.get('user', {})
            stats = user_data.get('stats', {})

            if not user_detail:
                raise HTTPException(status_code=404, detail="User not found or private")

            # Data Mapping (Python -> TypeScript Friendly)
            return {
                "status": "success",
                "data": {
                    "username": user_detail.get('uniqueId'),
                    "nickname": user_detail.get('nickname'),
                    "id": user_detail.get('id'),
                    "avatar": user_detail.get('avatarLarger') or user_detail.get('avatarMedium'),
                    "signature": user_detail.get('signature'),
                    "region": user_detail.get('region', "Unknown"), # CRITICAL: Fixes Location
                    "language": user_detail.get('language'),
                    "verified": user_detail.get('verified', False),
                    "secUid": user_detail.get('secUid'),
                    "stats": {
                        "followers": stats.get('followerCount', 0),
                        "following": stats.get('followingCount', 0),
                        "hearts": stats.get('heartCount', 0),
                        "videos": stats.get('videoCount', 0),
                        "diggCount": stats.get('diggCount', 0)
                    }
                }
            }
            
    except Exception as e:
        logger.error(f"Error fetching profile for {username}: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/v1/user/{username}/videos")
async def fetch_user_videos(username: str, count: int = Query(5, le=10)):
    """
    Fetches latest videos for the user.
    """
    try:
        async with TikTokApi() as api:
            await api.create_sessions(ms_tokens=[MS_TOKEN] if MS_TOKEN else None, num_sessions=1, sleep_after=3)
            user = api.user(username=username)
            
            videos = []
            async for video in user.videos(count=count):
                videos.append(video.as_dict)
            
            # Map valid video data
            mapped_videos = []
            for v in videos:
                mapped_videos.append({
                    "id": v.get('id'),
                    "desc": v.get('desc'),
                    "createTime": v.get('createTime'),
                    "stats": v.get('stats', {}),
                    "cover": v.get('video', {}).get('cover'),
                    "playAddr": v.get('video', {}).get('playAddr'), # Note: May expire
                    "duration": v.get('video', {}).get('duration')
                })

            return {
                "status": "success",
                "count": len(mapped_videos),
                "data": mapped_videos
            }

    except Exception as e:
        logger.error(f"Error fetching videos for {username}: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    # Use 8000 port to avoid conflict with Next.js (3000)
    uvicorn.run(app, host="0.0.0.0", port=8000)
