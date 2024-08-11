// src/routes/api/youtube.js
import { json } from "@sveltejs/kit";
import axios from "axios";
import { YT_API_KEY } from "$env/static/private";

export async function GET({ url }) {
	const channelId = url.searchParams.get("channelId");
	let apiKey = YT_API_KEY;

	console.log(apiKey, channelId);

	const searchResponse = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
		params: {
			part: "snippet",
			channelId,
			maxResults: 5,
			order: "date",
			type: "video",
			key: apiKey
		}
	});

	const videoIds = searchResponse.data.items.map((item) => item.id.videoId);

	const videosResponse = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
		params: {
			part: "snippet,contentDetails",
			id: videoIds.join(","),
			key: apiKey
		}
	});

	const videos = videosResponse.data.items;

	return json(videos);
}
