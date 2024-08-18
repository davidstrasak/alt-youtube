<script lang="ts">
	// The `videoId` variable is populated with the ID from the URL
	export let data;
</script>

<div class="w-full">
	<br />
	<a href="/" class="btn btn-primary btn-outline btn-lg"> Go back </a>
	<!-- Embed the YouTube video using the captured videoId -->
	<iframe
		class="mx-auto"
		title="video"
		width="1080"
		height="608"
		src={`https://www.youtube.com/embed/${data.videoId}?rel=0&autoplay=0`}
		frameborder="0"
		allowfullscreen
	></iframe>
</div>
