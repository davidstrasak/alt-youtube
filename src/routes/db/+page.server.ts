import { db } from "$lib/server/database";
import { channel } from "diagnostics_channel";

let channels: any[] = [];

export async function load({}) {
	channels = await db.youTubeChannel.findMany({});

	console.log(channels);

	return { channels };
}
