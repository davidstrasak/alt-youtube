import { writeFile } from 'fs/promises';
import { json } from '@sveltejs/kit'; // Assuming you are using SvelteKit
import { YT_API_KEY } from '$env/static/private';


export async function POST({ request }) {
    try {
        let { handle } = await request.json();
        await writeFile(`files/${handle}.json`, JSON.stringify(handle));

        let apiKey = YT_API_KEY;


        return json(JSON.stringify({handle, apiKey}));
    } catch (error) {
        return json({ error: 'Failed to write file' }, { status: 500 });
    }
}