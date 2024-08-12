import { json } from "@sveltejs/kit";
import { YT_API_KEY } from "$env/static/private";
import { writeFile } from "fs/promises";

export async function POST({ request }) {
	try {
		let { channelID, channelName } = await request.json();
		let apiKey = YT_API_KEY;
		const twoWeeksAgo = new Date();
		twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 15);
		const publishedAfter = twoWeeksAgo.toISOString();

		const url = new URL("https://www.googleapis.com/youtube/v3/search");
		url.searchParams.set("part", "snippet");
		url.searchParams.set("channelId", channelID);
		url.searchParams.set("maxResults", "30");
		url.searchParams.set("order", "date");
		url.searchParams.set("type", "video");
		url.searchParams.set("publishedAfter", publishedAfter);
		url.searchParams.set("key", apiKey);

		const response = await fetch(url.toString());
		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}

		const data = await response.json();

		let date = new Date();
		// Write to file (you might want to adjust the file path and naming)
		writeFile(
			`files/${channelName}_${date.getDate()}${date.getMonth()}${date.getFullYear()}_${date.getHours()}.json`,
			JSON.stringify(data.items)
		);

		return json(data);
	} catch (error) {
		return json({ error: "Failed to fetch data" }, { status: 500 });
	}
}
