export async function load({ params }: { params: any }) {
	const { videoId } = params;
	return { videoId };
}
