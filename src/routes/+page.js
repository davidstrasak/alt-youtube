/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const response = await fetch("/api/files");
	const fileData = await response.json();

	return { files: fileData };
}
