import { db } from "$lib/server/database";
import { channel } from "diagnostics_channel";

let channels: any[] = [];

export async function load({}) {
	channels = await db.youTubeChannel.findMany({});

	const index = channels.findIndex((channel) => {
		return channel.channelId === "all";
	});

	channels.splice(index, 1);

	channels.sort((a, b) => {
		// Compare channel names alphabetically
		return a.channelName.localeCompare(b.channelName);
	});

	channels.sort((a, b) => {
		// Compare channel names alphabetically
		return a.tags.localeCompare(b.tags);
	});

	return { channels };
}
