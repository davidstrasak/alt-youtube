import { writeFile } from 'fs/promises';
import { json } from '@sveltejs/kit'; // Assuming you are using SvelteKit

export async function POST({ request }) {
    try {
        let { handle } = await request.json();
        await writeFile(`files/${handle}.json`, JSON.stringify(handle));
        return json(handle);
    } catch (error) {
        return json({ error: 'Failed to write file' }, { status: 500 });
    }
}