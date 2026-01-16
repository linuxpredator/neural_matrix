
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get("url");
    const filename = req.nextUrl.searchParams.get("filename") || "avatar.jpg";

    if (!url) {
        return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Referer": "https://www.tiktok.com/",
            },
        });

        if (!response.ok) {
            console.warn(`Proxy fetch failed (${response.status}), falling back to redirect.`);
            return NextResponse.redirect(url);
        }

        const contentType = response.headers.get("Content-Type") || "image/jpeg";
        const buffer = await response.arrayBuffer();

        return new NextResponse(buffer, {
            headers: {
                "Content-Type": contentType,
                "Content-Disposition": `attachment; filename="${filename}"`,
            },
        });
    } catch (error) {
        console.error("Proxy Error:", error);
        // Fallback to client-side redirect if server proxy fails completely
        return NextResponse.redirect(url);
    }
}
