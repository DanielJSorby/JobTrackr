<script lang="ts">
    import { onMount } from "svelte";
    import StatusCount from "$lib/components/page-specific/dashboard/statusCount.svelte";
    import type { Status } from "$lib/components/page-specific/dashboard/statusCount.svelte";

    let statusCounts = $state<Record<string, number>>({});

    async function getJobs() {
        const response = await fetch("/api/user/jobs/dummyJobs.json");
        const data = await response.json();
        return data.jobs;
    }

    let jobCount = $state(0);

    function countJobsByStatus(jobs: any[]) {
        const counts: Record<string, number> = {};
        jobs.forEach(job => {
            jobCount++;
            if (job && job.status) {
                counts[job.status] = (counts[job.status] || 0) + 1;
            }
        });
        console.log('Status counts:', counts); // Debug log
        return counts;
    }

    onMount(async () => {
        const jobs = await getJobs();
        console.log('Jobs data:', jobs); // Debug log
        statusCounts = countJobsByStatus(jobs);
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
    <div class="status-overview">
        <StatusCount status={"Total" as Status} count={jobCount} />
        {#each Object.entries(statusCounts) as [status, count]}
            <StatusCount status={status as Status} count={count} />
        {/each}
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

    .status-overview {
        display: flex;
        gap: 1rem;
        margin: 20px;
        overflow-x: scroll;
    }
</style>