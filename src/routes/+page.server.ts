/** @type {import('./$types').PageLoad} */
import { db } from "$lib/server/database";

// This script is loading data from the /api/files directory so it can be displayed on the main page
export async function load({ fetch }) {
	const response = await fetch("/api/files");
	const vidData = await response.json();

	const ChannelIDs = await db.youTubeChannel.findMany({
		select: {
			channelName: true,
			channelId: true,
			tags: true
		}
	});
	// console.log(ChannelIDs);

	return { files: vidData, ChannelIDs: ChannelIDs };
}
