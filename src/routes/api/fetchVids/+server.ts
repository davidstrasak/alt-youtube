import { json } from "@sveltejs/kit";
import { YT_API_KEY } from "$env/static/private";
import { writeFile } from "fs/promises";

export async function POST({ request }) {
	try {
		let { channelID, pageToken } = await request.json();
		let apiKey = YT_API_KEY;

		const url = new URL("https://www.googleapis.com/youtube/v3/search");
		url.searchParams.set("part", "snippet");
		url.searchParams.set("channelId", channelID);
		url.searchParams.set("maxResults", "5");
		url.searchParams.set("order", "date");
		url.searchParams.set("type", "video");
		url.searchParams.set("key", apiKey);
		if (pageToken) {
			url.searchParams.set("pageToken", pageToken);
		}

		const response = await fetch(url.toString());
		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}

		const data = await response.json();

		// Write to file (you might want to adjust the file path and naming)
		writeFile(`files/${channelID}_${pageToken || 0}.json`, JSON.stringify(data.items));

		return json(data);
	} catch (error) {
		return json({ error: "Failed to fetch data" }, { status: 500 });
	}
}
