<script lang="ts">
    import JobDetails from '$lib/components/page-specific/job/JobDetails.svelte';
    import Notes from '$lib/components/page-specific/job/Notes.svelte';
    import Timeline from '$lib/components/page-specific/job/timeline.svelte';
    import { onMount } from 'svelte';
    export let data;
    console.log(data)

    let id = "JobId"
    let company_name = "Google"
    let role_title = "Frontend Developer"
    let application_date = "2025-06-12"
    let description = "Fine Description"
    let location = "Oslo, Norway"
    let status = "Applied"
    let notes = "Kjempe fin"
    let timeline = {"steps":[{"date":"2025-05-22","event":"Applied"},{"date":"2025-05-24","event":"Interview"},{"date":"2025-05-28","event":"Offer"}]}
    let job_link = "https://google.com"
</script>

<div class="top-part">
    <div class="role"><h1>{role_title}</h1></div>
    <div class="buttons">
        <button class="button filled">Edit</button>
        <button class="button error">
            <img src="/icons/trash.svg" alt="Delete">
            Delete
        </button>
    </div>
</div>

<div class="rows">
    <div class="first-row">
        <JobDetails 
            {company_name}
            {location}
            {application_date}
            {status}
            {job_link}
        />
        <Notes {notes} />
    </div>

    <div class="second-row">
        <Timeline {timeline} />
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