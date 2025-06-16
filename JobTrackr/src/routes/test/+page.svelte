<script lang="ts">
	import { onMount } from "svelte";

	let jobs:any = [];

	async function getJobs() {
		try {
			const response = await fetch('/api/jobs', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ user_id: 'user-1' })
			});
			
			const data = await response.json();

			if (data.error) {
				console.error('Error loading jobs:', data.error);
				return [];
			}

			return data.jobs;
		} catch (error) {
			console.error('Error:', error);
			return [];
		}
	}

	onMount(async () => {
		jobs = await getJobs();
	});
</script>

<h1>Jobs:</h1>
<ul>
	{#each jobs as job}
		<li>{job.role_title} at {job.company}</li>
	{/each}
</ul>