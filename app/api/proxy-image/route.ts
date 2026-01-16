
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const url = searchParams.get("url");

    if (!url) {
        return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Referer": "https://www.tiktok.com/",
            }
        });

        if (!response.ok) {
            console.error(`Proxy failed to fetch image: ${response.status} ${response.statusText}`);
            return NextResponse.json({ error: "Failed to fetch image" }, { status: response.status });
        }

        const blob = await response.blob();
        const headers = new Headers();
        headers.set("Content-Type", blob.type);
        headers.set("Cache-Control", "public, max-age=3600");

        return new NextResponse(blob, {
            status: 200,
            headers: headers,
        });

    } catch (error) {
        console.error("Proxy Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
