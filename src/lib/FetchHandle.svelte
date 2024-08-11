<script lang="ts">
	let data: any = null;
	let loading = false;
	let error: any = null;

	const handle = "@DUNGEONCRAFT1";
	const channelID = "UCq4GAtX5vbrGVKegcI8ZKKQ";

	// Function to fetch data from the API
	async function fetchData() {
		loading = true;
		error = null;

		try {
			const response = await fetch(
				`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${handle}&key=${apiKey}`
			);
			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}
			data = await response.json();
		} catch (err: any) {
			error = err.message;
		} finally {
			loading = false;
		}
	}
</script>

<!-- Button to trigger the fetch request -->
<button on:click={fetchData} disabled={loading}>
	{loading ? "Loading..." : "Fetch handle"}
</button>

<!-- Display the fetched data -->
{#if error}
	<p class="error">Error: {error}</p>
{:else if data}
	<pre>{JSON.stringify(data, null, 2)}</pre>
{:else}
	<p>No data fetched yet.</p>
{/if}

<style>
	/* Optional styles */
	button {
		padding: 10px;
		margin: 5px;
		background-color: #6200ee;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	button:disabled {
		background-color: #bdbdbd;
		cursor: not-allowed;
	}

	.error {
		color: red;
	}
</style>
