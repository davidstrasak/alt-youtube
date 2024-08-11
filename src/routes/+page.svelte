<script lang="ts">
	let jsonData: any = { items: [] };
	let error: any = null;
	export let data;

	async function fetchVids() {
		try {
			const response = await fetch("/api/fetchVids", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ channelID: "UClBdM5tlHgXTowzjJfHv8Dg" })
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}

			jsonData = await response.json();
		} catch (err: any) {
			error = err.message;
		} finally {
			location.reload();
		}
	}
</script>

<!-- <button on:click={fetchHandle}>Fetch the channel data</button> -->

<button on:click={fetchVids} class="btn btn-lg m-10">Fetch the video data</button>

{#each data.files && data.files as item}
	<p>{item.snippet.publishedAt}</p>
	<iframe
		title="video"
		width="560"
		height="315"
		src="https://www.youtube.com/embed/{item.id.videoId}?rel=0&autoplay=0"
		frameborder="0"
		allowfullscreen
	></iframe>
{/each}
