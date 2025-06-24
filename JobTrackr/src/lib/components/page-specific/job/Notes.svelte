<!-- Start of Selection -->
<script lang="ts">
	let { job, edit } = $props<{
		job: { notes: string };
		edit: boolean;
	}>();
</script>

<div class="box notes">
	<h2>Notes</h2>
	<h3>Keep track of important details about this job application</h3>
	{#if edit}
		<textarea bind:value={job.notes} placeholder="Enter your notes here..."></textarea>
	{:else}
		<div class="note-display">
			<p>{job.notes || 'No notes yet.'}</p>
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
		display: flex;
		flex-direction: column;
	}

	h2 {
		margin-bottom: 8px;
	}

	h3 {
		font-weight: 300;
		color: #6b7280;
		font-size: 1.125rem; /* 18px */
		margin-top: 0;
		margin-bottom: 16px;
	}

	.note-display {
		flex-grow: 1;
		background-color: #f9fafb;
		border-radius: 12px;
		padding: 16px;
		overflow-y: auto;
	}

	.note-display p {
		margin: 0;
		font-size: 1rem; /* 16px */
		line-height: 1.6;
		color: #374151;
		white-space: pre-wrap; /* Respects newlines from textarea */
	}

	textarea {
		width: 100%;
		border: 1px solid #d1d5db;
		border-radius: 12px;
		padding: 12px;
		font-size: 1rem;
		font-family: inherit;
		resize: vertical;
		transition:
			border-color 0.2s,
			box-shadow 0.2s;
		flex-grow: 1;
		box-sizing: border-box;
	}

	textarea:focus-visible {
		outline: none;
		border-color: #1d40b0;
		box-shadow: 0 0 0 2px rgba(29, 64, 176, 0.2);
	}
</style>