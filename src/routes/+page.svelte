<script lang="ts">
	import { ChannelIDs } from "$lib/ChannelIDs.js";
	import he from "he";

	let jsonData: any = { items: [] }; // this is unused atm but if need to stringify the data on the site I can use this
	let error: any = null;
	let channel: any = ChannelIDs[0];
	let filter: string = "latest";
	export let data;

	async function fetchVids() {
		try {
			const response = await fetch("/api/fetchVids", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ channelID: channel.ID, channelName: channel.name })
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

	function decodeHtmlEntities(text: string): string {
		return he.decode(text);
	}
</script>

{#if error}
	<p>Error: {error}</p>
{/if}

<div class="pt-6">
	<select class="select select-lg w-full max-w-xs" bind:value={channel}>
		{#each ChannelIDs as channelID}
			<option value={channelID}>{channelID.name}</option>
		{/each}
	</select>
	<button on:click={fetchVids} class="btn btn-lg m-10 btn-primary">Fetch the video data</button>
</div>

<div class="flex flex-row gap-6 mb-6 navbar bg-neutral rounded-box w-full">
	<button
		class="btn {filter === 'latest' ? 'btn-primary' : ''}"
		on:click={() => {
			filter = "latest";
		}}>Latest</button
	>
	<button
		class="btn {filter === 'TTRPGs' ? 'btn-primary' : ''}"
		on:click={() => {
			filter = "TTRPGs";
		}}>TTRPGs</button
	>
	<button
		class="btn {filter === 'Engineering' ? 'btn-primary' : ''}"
		on:click={() => {
			filter = "Engineering";
		}}>Engineering</button
	>
</div>

<!-- <div class="grid grid-cols-4">
	{#if data.files}
		{#each data.files as item}
			<div class="">
				<p>
					Publikováno: {new Date(item.snippet.publishedAt).getDate()}.{new Date(
						item.snippet.publishedAt
					).getMonth() + 1}.{new Date(item.snippet.publishedAt).getFullYear()} v {new Date(
						item.snippet.publishedAt
					).getHours()}h
				</p>
				Generate a link to the dynamic route with the videoId
				<a href={`/videos/${item.id.videoId}`} target="_blank">
					<img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
				</a>
				<p>{decodeHtmlEntities(item.snippet.title)}</p>
				<p>{decodeHtmlEntities(item.snippet.description)}</p>
			</div>
		{/each}
	{/if}
</div> -->
