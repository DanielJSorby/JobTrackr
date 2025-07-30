<script lang="ts">
    import { onMount } from 'svelte';
    import Tutorial from '$lib/components/Tutorial.svelte';
    import TutorialPrompt from '$lib/components/TutorialPrompt.svelte';
    import { shouldShowTutorial, markTutorialCompleted } from '$lib/functions/tutorialManager';
    
    let showTutorialPrompt = $state(false);
    let showTutorial = $state(false);
    let tutorialStep = $state(0);
    
    onMount(() => {
        // Always show tutorial prompt on test page
        showTutorialPrompt = true;
    });
    
    function handleTutorialStart() {
        showTutorialPrompt = false;
        showTutorial = true;
        tutorialStep = 0;
    }
    
    function handleTutorialDismiss() {
        showTutorialPrompt = false;
        markTutorialCompleted('dashboard');
    }
    
    function handleTutorialComplete() {
        showTutorial = false;
        markTutorialCompleted('dashboard');
    }
    
    function resetAll() {
        // Clear localStorage for testing
        localStorage.removeItem('tutorial_dashboard_completed');
        localStorage.removeItem('tutorial_job_completed');
        showTutorialPrompt = true;
        showTutorial = false;
        tutorialStep = 0;
    }
</script>

<div class="test-page">
    <div class="top-part">
        <div class="top-part-left">
            <h1>Test Tutorial System</h1>
            <p>This page is used to test the tutorial system</p>
        </div>
        <div class="top-part-right">
            <button class="button filled" on:click={() => console.log('Add Job clicked')}>
                <img src="/icons/add.svg" alt="+" />Add Job
            </button>
        </div>
    </div>
    
    <div class="status-overview">
        <div class="status-card">
            <div class="status-count">
                <h3>Total</h3>
                <span class="count">5</span>
            </div>
        </div>
        <div class="status-card">
            <div class="status-count">
                <h3>Saved</h3>
                <span class="count">2</span>
            </div>
        </div>
        <div class="status-card">
            <div class="status-count">
                <h3>Applied</h3>
                <span class="count">3</span>
            </div>
        </div>
    </div>
    
    <div class="search">
        <input type="text" placeholder="Search for company, location or job title..." />
        <select>
            <option>All Statuses</option>
            <option>Saved</option>
            <option>Applied</option>
        </select>
        <button class="search-button">Search</button>
    </div>
    
    <div class="status-tabs">
        <button class="tab active">All (5)</button>
        <button class="tab">Saved (2)</button>
        <button class="tab">Applied (3)</button>
    </div>
    
    <div class="jobs-list">
        <div class="job-card">
            <h3>Frontend Developer</h3>
            <p>Tech Company</p>
            <span class="status applied">Applied</span>
        </div>
        <div class="job-card">
            <h3>Backend Developer</h3>
            <p>Startup Inc</p>
            <span class="status saved">Saved</span>
        </div>
    </div>
    
    <div class="test-controls">
        <button class="button filled" on:click={resetAll}>Reset Tutorials</button>
        <button class="button transparent" on:click={() => showTutorialPrompt = true}>Show Tutorial Prompt</button>
    </div>
    
    <TutorialPrompt 
        show={showTutorialPrompt}
        tutorialType="dashboard"
        on:start={handleTutorialStart}
        on:dismiss={handleTutorialDismiss}
    />
    
    <Tutorial 
        open={showTutorial}
        bind:currentStep={tutorialStep}
        tutorialType="dashboard"
        on:complete={handleTutorialComplete}
    />
</div>

<style>
    .test-page {
        margin-top: 100px;
        padding: 20px;
    }
    
    .top-part {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    
    .top-part-left h1 {
        font-size: 40px;
        margin: 0;
    }
    
    .top-part-left p {
        font-size: 20px;
        color: #6B7280;
        margin: 10px 0 0 0;
    }
    
    .status-overview {
        display: flex;
        gap: 1rem;
        margin-bottom: 20px;
        overflow-x: scroll;
    }
    
    .status-card {
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        min-width: 120px;
    }
    
    .status-count h3 {
        margin: 0;
        font-size: 14px;
        color: #6B7280;
    }
    
    .count {
        font-size: 24px;
        font-weight: bold;
        color: #1d40b0;
    }
    
    .search {
        display: flex;
        gap: 1rem;
        margin-bottom: 20px;
        align-items: center;
    }
    
    .search input {
        flex: 1;
        padding: 8px 12px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
    }
    
    .search select {
        padding: 8px 12px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
    }
    
    .search-button {
        padding: 8px 16px;
        background: #1d40b0;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
    }
    
    .status-tabs {
        display: flex;
        gap: 8px;
        margin-bottom: 20px;
    }
    
    .tab {
        padding: 8px 16px;
        border: 1px solid #d1d5db;
        background: white;
        border-radius: 6px;
        cursor: pointer;
    }
    
    .tab.active {
        background: #1d40b0;
        color: white;
        border-color: #1d40b0;
    }
    
    .jobs-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1rem;
        margin-bottom: 20px;
    }
    
    .job-card {
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        border: 1px solid #e5e7eb;
    }
    
    .job-card h3 {
        margin: 0 0 8px 0;
        color: #1f2937;
    }
    
    .job-card p {
        margin: 0 0 12px 0;
        color: #6b7280;
    }
    
    .status {
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
    }
    
    .status.saved {
        background: #fef3c7;
        color: #92400e;
    }
    
    .status.applied {
        background: #dbeafe;
        color: #1e40af;
    }
    
    .test-controls {
        display: flex;
        gap: 12px;
        margin-top: 40px;
        padding: 20px;
        background: #f8fafc;
        border-radius: 8px;
    }
    
    .button {
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 500;
        cursor: pointer;
        border: none;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .button.filled {
        background: #1d40b0;
        color: white;
    }
    
    .button.transparent {
        background: transparent;
        color: #1d40b0;
        border: 1px solid #1d40b0;
    }
    
    .button img {
        width: 16px;
        height: 16px;
    }
</style>