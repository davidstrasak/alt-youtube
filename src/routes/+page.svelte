<script lang="ts">
	import he from "he";

	export let data;
	let { ChannelIDs } = data;
	let jsonData: any = { items: [] }; // this is unused atm but if need to stringify the data on the site I can use this
	let error: any = null;

	let channel: any = ChannelIDs[0];
	let filter: string = "latest";

	async function fetchVids() {
		try {
			const response = await fetch("/api/fetchVids", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ channelID: channel.channelId, channelName: channel.channelName })
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}

			jsonData = await response.json();

			await location.reload();
		} catch (err: any) {
			error = err.message;
		}
	}

	function decodeHtmlEntities(text: string): string {
		return he.decode(text);
	}

	function findChannelName(channelId: string) {
		const channel = ChannelIDs.find((channel) => channel.channelId === channelId);

		return channel?.channelName;
	}
</script>

{#if error}
	<p class="text-xl">Error: {error}</p>
{/if}

<div class="w-full">
	<select class="select select-lg w-full max-w-80" bind:value={channel}>
		{#each ChannelIDs as channelID}
			<option value={channelID}>{channelID.channelName}</option>
		{/each}
	</select>
	<button on:click={fetchVids} class="btn btn-lg my-10 mx-auto btn-primary"
		>Fetch the video data</button
	>
</div>

<div
	class="flex flex-row gap-6 mb-6 navbar bg-neutral rounded-box w-full justify-center md:justify-normal"
>
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

<div class="grid gap-10 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:grid-cols-4">
	{#if data.files}
		{#each data.files as item}
			<div class="mx-auto" style="width: 320px">
				<p>
					Publikováno: {new Date(item.snippet.publishedAt).getDate()}.{new Date(
						item.snippet.publishedAt
					).getMonth() + 1}.{new Date(item.snippet.publishedAt).getFullYear()} v {new Date(
						item.snippet.publishedAt
					).getHours()}h
				</p>
				<p>{findChannelName(item.snippet.channelId)}</p>
				<!-- Generate a link to the dynamic route with the videoId -->
				<a href={`/videos/${item.id.videoId}`} target="_blank">
					<img
						src={item.snippet.thumbnails.medium.url}
						alt={item.snippet.title}
						class="rounded-box"
					/>
				</a>
				<p>{decodeHtmlEntities(item.snippet.title)}</p>
				<p class="text-justify">{decodeHtmlEntities(item.snippet.description)}</p>
			</div>
		{/each}
	{/if}
</div>
