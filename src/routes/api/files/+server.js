import fs from "fs";
import path from "path";
import { json } from "@sveltejs/kit";

export async function GET() {
	const files = fs.readdirSync(`./files`);
	let fileData = files.map((file) => {
		const filePath = `./files/${file}`;
		const fileContent = fs.readFileSync(filePath, "utf8");
		const jsonData = JSON.parse(fileContent);
		return jsonData;
	});

	fileData = fileData.flat();

	// Keep only unique data based on a unique identifier (e.g., id)
	const uniqueData = Array.from(new Set(fileData.map((item) => item.id.videoId))).map((videoId) =>
		fileData.find((item) => item.id.videoId === videoId)
	);
	uniqueData.sort((a, b) => {
		return new Date(b.snippet.publishedAt).getTime() - new Date(a.snippet.publishedAt).getTime();
	});

	return json(uniqueData);
}
