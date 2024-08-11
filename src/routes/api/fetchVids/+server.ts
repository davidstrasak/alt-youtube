import { json } from "@sveltejs/kit";
import { YT_API_KEY } from "$env/static/private";
import { writeFile } from "fs/promises";

export async function POST({ request }) {
	try {
		let { channelID } = await request.json();
		let apiKey = YT_API_KEY;

		const response = await fetch(
			`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelID}&maxResults=5&order=date&type=video&key=${apiKey}`
		);
		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}
		const data = await response.json();

		writeFile(`files/${channelID}${new Date().getTime()}.json`, JSON.stringify(data.items));

		return json(data);
	} catch (error) {
		return json({ error: "Failed to fetch data" }, { status: 500 });
	}
}
