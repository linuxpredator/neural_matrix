import asyncio
import os
import logging
import json
from TikTokApi import TikTokApi
from dotenv import load_dotenv

# Setup Logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Load Environment Variables
load_dotenv()

MS_TOKEN = os.getenv("MS_TOKEN")
if not MS_TOKEN:
    logger.warning("MS_TOKEN not found in environment variables. Scraper may fail CAPTCHA checks.")

async def get_tiktok_user_data(username: str):
    """
    Extracts metadata for a given TikTok username using davidteather/TikTok-Api.
    Focuses on extracting 'region' to fix location accuracy.
    """
    ms_token = MS_TOKEN
    
    try:
        async with TikTokApi() as api:
            # Create Session with MS_TOKEN to bypass basic anti-bot behavior
            # Note: num_sessions=1 because we usually only have one valid token at a time
            await api.create_sessions(ms_tokens=[ms_token] if ms_token else None, num_sessions=1, sleep_after=3)
            
            logger.info(f"Fetching data for user: {username}")
            
            user = api.user(username=username)
            user_data = await user.info()
            
            # --- DATA MAPPING STRATEGY ---
            # We traverse the JSON safely to avoid key errors if structure changes
            
            user_info = user_data.get('userInfo', {})
            user_obj = user_info.get('user', {})
            stats_obj = user_info.get('stats', {})
            
            # Extract Critical Fields
            region = user_obj.get('region', 'Unknown')
            language = user_obj.get('language', 'Unknown')
            nickname = user_obj.get('nickname', 'Unknown')
            uid = user_obj.get('id', 'Unknown')
            
            # Construct Clean Response
            result = {
                "status": "success",
                "username": username,
                "nickname": nickname,
                "id": uid,
                "region": region,
                "language": language,
                "stats": {
                    "followers": stats_obj.get('followerCount', 0),
                    "following": stats_obj.get('followingCount', 0),
                    "likes": stats_obj.get('heartCount', 0),
                    "videos": stats_obj.get('videoCount', 0)
                },
                "raw_region_source": "userInfo.user.region" # Debug info
            }
            
            logger.info(f"Successfully extracted data for {username}. Region: {region}")
            return result

    except Exception as e:
        error_msg = str(e)
        logger.error(f"Error scraping {username}: {error_msg}")
        
        # Detection for Common Errors
        if "empty response" in error_msg.lower():
            reason = "RATE_LIMIT_OR_CAPTCHA"
        elif "not found" in error_msg.lower():
            reason = "USER_NOT_FOUND"
        else:
            reason = "INTERNAL_ERROR"

        return {
            "status": "error",
            "username": username,
            "error_type": reason,
            "message": error_msg
        }

# --- EXAMPLE USAGE ---
if __name__ == "__main__":
    target_user = "khairulaming"
    
    # Run the async loop
    data = asyncio.run(get_tiktok_user_data(target_user))
    
    # Output result as JSON for easy piping to other tools
    print(json.dumps(data, indent=2))
