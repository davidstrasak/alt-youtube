<script lang="ts">
	import { onMount } from "svelte";

	let videos: any[] = [];

	onMount(async () => {
		const res = await fetch("/api/axiosTest?channelId=UCD6ERRdXrF2IZ0R888G8PQg");
		const data = await res.json();
		videos = data;
	});
</script>

{#each videos as video}
	<div>
		<h3>{video.snippet.title}</h3>
		<p>{video.contentDetails.duration}</p>
	</div>
{/each}
