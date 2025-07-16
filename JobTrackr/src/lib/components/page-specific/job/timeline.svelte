<script lang="ts">
	import { formatDate } from '$lib/functions/formatDate';
	let { job, edit } = $props<{
		job: { timeline: any };
		edit: boolean;
	}>();

	// Effect to handle timeline parsing
	$effect(() => {
		console.log('Timeline effect triggered, job.timeline:', job.timeline);
		if (typeof job.timeline === 'string') {
			try {
				const parsed = JSON.parse(job.timeline);
				job.timeline = parsed;
			} catch (e) {
				console.error('Error parsing timeline:', e);
				job.timeline = { steps: [] };
			}
		}
		if (!job.timeline) {
			job.timeline = { steps: [] };
		}
		if (!job.timeline.steps) {
			job.timeline.steps = [];
		}
		console.log('Timeline after parsing:', job.timeline);
	});

	// Ensure timeline is always an object with steps array
	const timelineData = $derived(
		typeof job.timeline === 'string' 
			? (() => {
				try {
					return JSON.parse(job.timeline);
				} catch (e) {
					return { steps: [] };
				}
			})()
			: (job.timeline || { steps: [] })
	);

	function addStep() {
		const newStep = { date: new Date().toISOString().slice(0, 10), event: '' };
		if (!job.timeline) job.timeline = { steps: [] };
		if (!job.timeline.steps) job.timeline.steps = [];
		job.timeline.steps = [...job.timeline.steps, newStep];
	}

	function deleteStep(index: number) {
		if (!job.timeline?.steps) return;
		job.timeline.steps.splice(index, 1);
		job.timeline.steps = job.timeline.steps;
	}

	function handleDateChange(event: Event, step: any) {
		const target = event.target as HTMLInputElement;
		step.date = target.value;
	}
</script>

<div class="box">
	<h2>Timeline</h2>
	{#if edit}
		<div class="timeline-edit">
			{#if job.timeline?.steps?.length > 0}
				{#each job.timeline.steps as step, i (i)}
					<div class="step-edit">
						<input
							type="date"
							value={step.date ? new Date(step.date).toISOString().slice(0, 10) : ''}
							on:change={(e) => handleDateChange(e, step)}
						/>
						<input type="text" bind:value={step.event} placeholder="Event description" />
						<button on:click={() => deleteStep(i)}>
							<img src="/icons/trash.svg" alt="Delete" />
						</button>
					</div>
				{/each}
			{/if}
			<button class="button" on:click={addStep}>Add Step</button>
		</div>
	{:else}
		<div class="timeline">
			{#if timelineData.steps?.length > 0}
				<div class="timeline-container">
					{#each timelineData.steps as step, i (i)}
						<div class="step">
							<img src="/icons/timeline.svg" alt="Timeline" />
							<div class="step-content">
								<p class="date">{formatDate(step.date)}</p>
								<p class="event">{step.event}</p>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<p>No timeline data available</p>
			{/if}
		</div>
	{/if}
</div>

<style>
	.box {
		border: 1px solid #1d40b0;
		border-style: dashed;
		padding: 20px;
		margin: 20px;
		border-radius: 26px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		width: 100%;
	}
	.timeline {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.timeline-container {
		display: flex;
		flex-direction: column;
		gap: 10px;
		max-height: 180px;
		overflow-y: auto;
	}
	.timeline-scrollable {
		max-height: 200px;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding-right: 10px;
		border-top: 1px solid #e5e7eb;
		padding-top: 10px;
		margin-top: 10px;
	}
	.timeline-scrollable::-webkit-scrollbar {
		width: 6px;
	}
	.timeline-scrollable::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 3px;
	}
	.timeline-scrollable::-webkit-scrollbar-thumb {
		background: #c1c1c1;
		border-radius: 3px;
	}
	.timeline-scrollable::-webkit-scrollbar-thumb:hover {
		background: #a8a8a8;
	}
	.step {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.step-content {
		display: flex;
		flex-direction: column;
	}
	.date {
		color: #6b7280;
		font-weight: 100;
	}
	.event {
		color: #000;
		font-weight: 500;
		font-size: 1.6rem;
	}
	.timeline-edit {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
	.step-edit {
		display: flex;
		gap: 10px;
		align-items: center;
	}
	.step-edit input {
		border: 1px dotted #9ca3af;
		border-radius: 12px;
		padding: 10px 12px;
		font-size: 1rem;
		background-color: #fff;
	}
	.step-edit button {
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.step-edit button img {
		width: 20px;
		height: 20px;
	}
	.timeline-edit .button {
		margin-top: 10px;
		max-width: fit-content;
	}
</style>