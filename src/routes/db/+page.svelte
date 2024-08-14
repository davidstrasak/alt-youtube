<script lang="ts">
	export let data;
	let channelName: string;
	let channelId: string;
	let tags: string;

	async function handleSubmit() {
		const channel = {
			channelName,
			channelId,
			tags
		};
		await fetch("/api/submitChannel", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(channel)
		});
		location.reload();
	}

	async function removeChannel(channelName: string, channelId: string, tags: string) {
		const channel = {
			channelName,
			channelId,
			tags
		};
		await fetch("/api/removeChannel", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(channel)
		});
		location.reload();
	}
</script>

<h1>Add a database entry</h1>
<form on:submit={handleSubmit}>
	<label for="channelName">Channel Name:</label>
	<input type="text" id="channelName" class="input input-accent" bind:value={channelName} />

	<label for="channelId">Channel ID:</label>
	<input type="text" id="channelId" class="input input-accent" bind:value={channelId} />

	<label for="tags">tags:</label>
	<input type="text" id="tags" class="w-1/2 input input-accent" bind:value={tags} />

	<button type="submit">Submit</button>
</form>

<table>
	<thead>
		<tr>
			<th>Channel Name</th>
			<th>Channel ID</th>
			<th>Tags</th>
		</tr>
	</thead>
	<tbody>
		{#each data.channels as { channelName, channelId, tags }}
			<tr>
				<td>{channelName}</td>
				<td>{channelId}</td>
				<td>{tags}</td>
				<button
					class="btn btn-secondary"
					on:click={() => removeChannel(channelName, channelId, tags)}>Remove</button
				>
			</tr>
		{/each}
	</tbody>
</table>
