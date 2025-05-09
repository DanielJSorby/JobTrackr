<script lang="ts">
    import { onMount } from "svelte";
    import StatusCount from "$lib/components/page-specific/dashboard/statusCount.svelte";
    import type { Status } from "$lib/components/page-specific/dashboard/statusCount.svelte";
    import SearchInput from "$lib/components/search-input.svelte";
    import JobCard from "$lib/components/page-specific/dashboard/jobCard.svelte";
    import StatusDropdown from "$lib/components/page-specific/dashboard/StatusDropdown.svelte";
    import StatusTabs from "$lib/components/page-specific/dashboard/StatusTabs.svelte";
    import AddJobDialog from './AddJobDialog.svelte';
    let statusCounts = $state<Record<string, number>>({});
    let allJobs = $state<any[]>([]);
    let filteredJobs = $state<any[]>([]);
    let searchInput: SearchInput;
    let statusFilter = $state('All Statuses');
    const statusOptions = ['All Statuses', 'Saved', 'Applied', 'Interview', 'Offer', 'Rejected'];
    let showAddJobDialog = $state(false);

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
        console.log('Status counts:', counts);
        return counts;
    }

    onMount(async () => {
        allJobs = await getJobs();
        filteredJobs = allJobs;
        console.log('Jobs data:', allJobs);
        statusCounts = countJobsByStatus(allJobs);
    });

    function handleStatusChange(event: CustomEvent<{ status: string }>) {
        statusFilter = event.detail.status;
        filterJobs();
    }

    function filterJobs() {
        const { searchQuery } = searchInput?.getPrompt?.() || { searchQuery: '' };
        filteredJobs = allJobs.filter(job => {
            const matchesStatus = statusFilter === 'All Statuses' || job.status === statusFilter;
            const matchesSearch = !searchQuery ||
                job.company_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.role_title?.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesStatus && matchesSearch;
        });
    }

    function handleSearch() {
        filterJobs();
    }

    // Helper to build tab counts
    function getTabCounts() {
        return [
            { label: 'All', value: 'All', count: allJobs.length },
            { label: 'Saved', value: 'Saved', count: statusCounts['Saved'] || 0 },
            { label: 'Applied', value: 'Applied', count: statusCounts['Applied'] || 0 },
            { label: 'Interview', value: 'Interview', count: statusCounts['Interview'] || 0 },
            { label: 'Offers', value: 'Offer', count: statusCounts['Offer'] || 0 },
            { label: 'Rejected', value: 'Rejected', count: statusCounts['Rejected'] || 0 },
        ];
    }
    let tabFilter = $state('All');
    function handleTabChange(event: CustomEvent<{ status: string }>) {
        tabFilter = event.detail.status;
        // Sync dropdown and tab filter for demo; you can decouple if needed
        statusFilter = tabFilter === 'All' ? 'All Statuses' : tabFilter;
        filterJobs();
    }
</script>

<div>
    <div class="top-part">
        <div class="top-part-left">
            <h1>Job Applications</h1>
            <p>Track and manage your job search process</p>
        </div>
        <div class="top-part-right">
            <button class="button filled" onclick={() => showAddJobDialog = true}><img src="/icons/add.svg" alt="+" />Add Job</button>
        </div>
    </div>
    <div class="status-overview">
        <div class="status-card">
            <StatusCount status={"Total" as Status} count={jobCount} />
        </div>
        {#each Object.entries(statusCounts) as [status, count]}
            <div class="status-card">
                <StatusCount status={status as Status} count={count} />
            </div>
        {/each}
    </div>
    <div class="search">
        <SearchInput 
            bind:this={searchInput} 
            placeholder="Search for company, location or job title..." 
            on:search={handleSearch}
        />
        <StatusDropdown
            statuses={statusOptions}
            bind:selected={statusFilter}
            on:change={handleStatusChange}
        />
        <button class="search-button" onclick={handleSearch}>Search</button>
    </div>
    <StatusTabs
        statuses={getTabCounts()}
        bind:selected={tabFilter}
        on:change={handleTabChange}
    />
    <div class="jobs-list">
        {#each filteredJobs as job, index (job.id)}
            <JobCard {job} />
        {/each}
    </div>
    <AddJobDialog open={showAddJobDialog} on:close={() => showAddJobDialog = false} />
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
        scroll-snap-type: x mandatory;
    }

    .status-card {
        scroll-snap-align: start;
    }

    .search {
        display: flex;
        gap: 1rem;
        margin: 20px;
        align-items: center;
    }

    .search-button {
        padding: 0.5rem 1rem;
        background: #1d40b0;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 500;
    }

    .search-button:hover {
        background: #1e3a8a;
    }

    .jobs-list {
        margin: 20px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1rem;
    }
</style>