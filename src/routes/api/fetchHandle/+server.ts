import { json } from "@sveltejs/kit";
import { YT_API_KEY } from "$env/static/private";

export async function POST({ request }) {
	try {
		let { handle, channelID } = await request.json();
		let apiKey = YT_API_KEY;

		console.log(channelID);

		const response = await fetch(
			`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&id=${channelID}&q=${handle}&key=${apiKey}`
		);
		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}
		const data = await response.json();

		return json(data);
	} catch (error) {
		return json({ error: "Failed to fetch data" }, { status: 500 });
	}
}
