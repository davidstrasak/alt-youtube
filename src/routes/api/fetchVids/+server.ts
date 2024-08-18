import { json } from "@sveltejs/kit";
import { YT_API_KEY } from "$env/static/private";
import { writeFile } from "fs/promises";
import { db } from "$lib/server/database";

export async function POST({ request }) {
	try {
		let { channelID, channelName } = await request.json();

		let apiKey = YT_API_KEY;
		const twoWeeksAgo = new Date();
		twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 15);
		const publishedAfter = twoWeeksAgo.toISOString();
		let index: number = 1;
		let indexGoal: number = 0;
		let data: any;
		let oneIteration: boolean = false;
		const ChannelIDs = await db.youTubeChannel.findMany({
			select: {
				channelName: true,
				channelId: true,
				tags: true
			}
		});

		if (channelID === "all") {
			indexGoal = ChannelIDs.length;
		} else {
			oneIteration = true;
		}

		while (oneIteration || index < indexGoal) {
			if (!oneIteration) {
				channelID = ChannelIDs[index].channelId;
				channelName = ChannelIDs[index].channelName;
				index++;
			}

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

			data = await response.json();

			let date = new Date();
			// Write to file (you might want to adjust the file path and naming)
			await writeFile(
				`files/${channelName}_${date.getDate()}${date.getMonth()}${date.getFullYear()}_${date.getHours()}.json`,
				JSON.stringify(data.items)
			);

			if (oneIteration) {
				oneIteration = false;
			}
		}

		return json(data); // I know this is returning just the last piece of data, but since data is stored it does not matter
	} catch (error: any) {
		return json({ error: error.message }, { status: 500 });
	}
}
