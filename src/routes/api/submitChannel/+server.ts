import { json } from "@sveltejs/kit";
import { db } from "$lib/server/database";

export async function POST({ request }) {
	const body = await request.json();

	const { channelName, channelId, tags } = body;

	await db.youTubeChannel.create({
		data: {
			channelName,
			channelId,
			tags
		}
	});

	return json("ok");
}
