<script lang="ts">
    import { onMount } from "svelte";

    async function getJobs() {
        const response = await fetch("/api/user/jobs/dummyJobs.json");
        const data = await response.json();
        return data;
    }

    onMount(async () => {
        const jobs = await getJobs();
        console.log(jobs);
    });
</script>

<div>
    <div class="top-part">
        <div class="top-part-left">
            <h1>Job Applications</h1>
            <p>Track and manage your job search process</p>
        </div>
        <div class="top-part-right">
            <button class="button filled"><img src="/icons/add.svg" alt="+" />Add Job</button>
        </div>
    </div>
</div>

<style>
    .top-part {
        margin: 20px;
        margin-top: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .top-part-left {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .top-part-left h1 { 
        font-size: 40px;
    }

    .top-part-left p {
        font-size: 20px;
        font-weight: 100;
        color: #6B7280;
    }
</style>