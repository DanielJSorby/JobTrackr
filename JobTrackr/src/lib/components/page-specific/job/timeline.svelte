<script>
    import { formatDate } from '$lib/functions/formatDate';
    let { timeline } = $props()
</script>

<div class="box">
    <h2>Timeline</h2>
<div class="timeline">
    {#each timeline.steps as step}
        <div class="step">
            <img src="/icons/timeline.svg" alt="Timeline">
            <div class="step-content">
                <p class="date">{formatDate(step.date)}</p>
                <p class="event">{step.event}</p>
            </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .box {
        border: 1px solid #1d40b0;
        border-style: dashed;
        padding: 20px;
        margin: 20px;
        border-radius: 26px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        width: 100%;
    }
    .timeline {
        display: flex;
        flex-direction: column;
        gap: 10px;
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
        color: #6B7280;
        font-weight: 100;
    }
    .event {
        color: #000;
        font-weight: 500;
        font-size: 1.8rem;
    }
</style>