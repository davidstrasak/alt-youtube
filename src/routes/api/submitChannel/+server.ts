import { json } from "@sveltejs/kit";
import { db } from "$lib/server/database";

export async function POST({ request }) {
	const body = await request.json();

	const { channelName, channelId, tags } = body;

	try {
		let existingEntry = await db.youTubeChannel.findFirst({
			where: {
				channelId
			}
		});

		if (!existingEntry) {
			await db.youTubeChannel.create({
				data: {
					channelName,
					channelId,
					tags
				}
			});
		} else {
			await db.youTubeChannel.update({
				where: {
					channelId
				},
				data: {
					channelName,
					tags
				}
			});
		}
	} catch (e: any) {
		return json(Error(e));
	}

	return json("ok");
}
