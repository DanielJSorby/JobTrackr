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
        <p class="note">{job.notes || 'No notes yet.'}</p>
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
    }

    h2 {
        margin-bottom: 20px;
    }

    h3 {
        font-weight: 100;
        color: #6b7280;
        font-size: 24px;
    }

    .note {
        margin: 24px 20px;
        font-size: 30px;
    }

    textarea {
        width: calc(100% - 24px);
        margin-top: 20px;
        border: 1px dotted #9ca3af;
        border-radius: 12px;
        padding: 10px 12px;
        font-size: 1rem;
        background-color: #fff;
        height: 150px;
        font-family: inherit;
    }
</style> 