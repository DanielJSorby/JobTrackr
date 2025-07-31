<script lang="ts">
    import JobDetails from '$lib/components/page-specific/job/JobDetails.svelte';
    import Notes from '$lib/components/page-specific/job/Notes.svelte';
    import Timeline from '$lib/components/page-specific/job/timeline.svelte';
    import QuickActions from '$lib/components/page-specific/job/quickActions.svelte';
    import Tutorial from '$lib/components/Tutorial.svelte';
    import TutorialPrompt from '$lib/components/TutorialPrompt.svelte';
    import { shouldShowTutorial, markTutorialCompleted } from '$lib/functions/tutorialManager';
    import { onMount } from 'svelte';
    let { data } = $props();
    console.log(data)
    let edit = $state(false);

    let job = data.job;
    let originalJob: any = null;
    let showTutorialPrompt = $state(false);
    let showTutorial = $state(false);
    let tutorialStep = $state(0);

    function startEdit() {
        console.log('startEdit called');
        originalJob = JSON.parse(JSON.stringify(job));
        edit = true;
        console.log('edit set to:', edit);
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
            // Ensure date is properly formatted
            const jobToSave = { ...job };
            if (jobToSave.application_date) {
                // Convert to ISO string format if it's not already
                const date = new Date(jobToSave.application_date);
                if (!isNaN(date.getTime())) {
                    jobToSave.application_date = date.toISOString().slice(0, 10);
                }
            }

            const response = await fetch('/api/jobs/save-job', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jobToSave)
            });

            if (response.ok) {
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
                    job = result.job;
                }
                edit = false;
                originalJob = null;
            } else {
                const errorData = await response.json();
                console.error('Failed to save job:', errorData);
                alert('Failed to save job. Please try again.');
            }
        } catch (e) {
            console.error('Error saving job', e);
            alert('Error saving job. Please try again.');
        }
    }

    async function deleteJob() {
        if (confirm('Are you sure you want to delete this job?')) {
            try {
                const response = await fetch('/api/jobs/delete-job', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ jobId: job.id })
                });

                if (response.ok) {
                    // Redirect to dashboard after successful deletion
                    window.location.href = '/dashboard';
                } else {
                    console.error('Failed to delete job');
                    alert('Failed to delete job. Please try again.');
                }
            } catch (e) {
                console.error('Error deleting job', e);
                alert('Error deleting job. Please try again.');
            }
        }
    }
    
    onMount(() => {
        // Check if tutorial should be shown
        if (shouldShowTutorial('job')) {
            showTutorialPrompt = true;
        }
    });
    
    function handleTutorialStart() {
        showTutorialPrompt = false;
        showTutorial = true;
        tutorialStep = 0;
    }
    
    function handleTutorialDismiss() {
        showTutorialPrompt = false;
        markTutorialCompleted('job');
    }
    
    function handleTutorialComplete() {
        showTutorial = false;
        markTutorialCompleted('job');
    }
</script>

<div class="top-part">
    <div class="role"><h1>{job.role_title}</h1></div>
    <div class="buttons">
        {#if edit}
            <button class="button filled" onclick={saveJob}>Save</button>
            <button class="button error" onclick={cancelEdit}>Cancel</button>
        {:else}
            <button class="button filled" onclick={startEdit}>Edit</button>
            <button class="button error" onclick={deleteJob}>
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

<TutorialPrompt 
    show={showTutorialPrompt}
    tutorialType="job"
    on:start={handleTutorialStart}
    on:dismiss={handleTutorialDismiss}
/>

<Tutorial 
    open={showTutorial}
    bind:currentStep={tutorialStep}
    tutorialType="job"
    on:complete={handleTutorialComplete}
/>

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

    @media (max-width: 1115px) {
        .rows {
            display: flex;
            flex-direction: column;
            width: 100%;
        }
        .first-row {
            width: 100%;
        }
        .second-row {
            width: 96%;
        }
    }
</style> 