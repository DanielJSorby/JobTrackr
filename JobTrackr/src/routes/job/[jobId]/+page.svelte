<script lang="ts">
    import JobDetails from '$lib/components/page-specific/job/JobDetails.svelte';
    import Notes from '$lib/components/page-specific/job/Notes.svelte';
    import Timeline from '$lib/components/page-specific/job/timeline.svelte';
    import QuickActions from '$lib/components/page-specific/job/quickActions.svelte';
    export let data;
    console.log(data)
    let edit = false;

    let job = data.job;
    let originalJob: any = null;

    function startEdit() {
        originalJob = JSON.parse(JSON.stringify(job));
        edit = true;
    }

    function cancelEdit() {
        if (originalJob) {
            job = originalJob;
            originalJob = null;
        }
        edit = false;
    }

    async function saveJob() {
        try {
            const response = await fetch('/api/jobs/save-job', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(job)
            });

            if (response.ok) {
                // Refresh the page data to get updated timeline
                const result = await response.json();
                if (result.job) {
                    // Ensure timeline is properly parsed
                    if (typeof result.job.timeline === 'string') {
                        try {
                            result.job.timeline = JSON.parse(result.job.timeline);
                        } catch (e) {
                            console.error('Error parsing timeline:', e);
                            result.job.timeline = { steps: [] };
                        }
                    }
                    console.log('Updated job with timeline:', result.job.timeline);
                    job = result.job;
                }
                edit = false;
                originalJob = null;
            } else {
                console.error('Failed to save job');
            }
        } catch (e) {
            console.error('Error saving job', e);
        }
    }

    function deleteJob() {
        console.log("delete")
    }
</script>

<div class="top-part">
    <div class="role"><h1>{job.role_title}</h1></div>
    <div class="buttons">
        {#if edit}
            <button class="button filled" on:click={saveJob}>Save</button>
            <button class="button error" on:click={cancelEdit}>Cancel</button>
        {:else}
            <button class="button filled" on:click={startEdit}>Edit</button>
            <button class="button error" on:click={deleteJob}>
                <img src="/icons/trash.svg" alt="Delete"> Delete
            </button>
        {/if}
    </div>
</div>

<div class="rows">
    <div class="first-row">
        <JobDetails {edit} {job} />
        <Notes {edit} {job} />
    </div>

    <div class="second-row">
        <Timeline {edit} {job} />
        <QuickActions on:edit={startEdit} on:delete={deleteJob} />
    </div>
</div>

<style>
    button {
        margin-top: 10px;
        max-width: fit-content !important;
    }
    .rows {
        display: flex;
        width: 100%;
    }
    .top-part {
        margin-top: 100px;
        display: flex;
        justify-content: space-between;
        padding: 20px;
    }
    .buttons {
        display: flex;
        gap: 10px;
    }
    .buttons img {
        width: 20px;
        height: 20px;
    }
    
    .first-row {
        width: 70%;
    }
    .second-row {
        width: 26%;
    }
</style> 