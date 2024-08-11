/** @type {import('./$types').PageLoad} */

// This script is loading data from the /api/files directory so it can be displayed on the main page
export async function load({ fetch }) {
	const response = await fetch("/api/files");
	const fileData = await response.json();

	return { files: fileData };
}
