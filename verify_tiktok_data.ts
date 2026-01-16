
import { load } from "cheerio";

async function verify() {
    try {
        const response = await fetch("https://www.tiktok.com/@khairulaming", {
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            },
        });
        const html = await response.text();
        const $ = load(html);
        const scriptContent = $("#__UNIVERSAL_DATA_FOR_REHYDRATION__").html();

        if (scriptContent) {
            console.log("Locating video data...");
            const jsonStr = scriptContent;
            const index = jsonStr.indexOf("tiktokcdn"); // Look for CDN url
            if (index !== -1) {
                console.log("Found 'tiktokcdn' at index:", index);
                // Print specific snippet around the match to see the key
                console.log("Snippet:", jsonStr.substring(Math.max(0, index - 200), index + 200));
            } else {
                console.log("No 'tiktokcdn' found in hydration data.");
            }
            const data = JSON.parse(scriptContent);
            const defaultScope = data.__DEFAULT_SCOPE__;
            console.log("Default Scope Keys:", Object.keys(defaultScope));

            const userDetail = defaultScope['webapp.user-detail'];
            if (userDetail) {
                console.log("UserDetail Keys:", Object.keys(userDetail));
                if (userDetail.itemModule) console.log("Found itemModule in UserDetail!");
            }
        } else {
            console.log("Script tag not found.");
        }
    } catch (e) {
        console.error(e);
    }
}

verify();
