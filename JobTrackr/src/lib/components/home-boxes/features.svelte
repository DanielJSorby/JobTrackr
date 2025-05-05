<script>
    import Feature from '$lib/components/page-specific/features/feature.svelte';
</script>

<div class="features">
    <h2>Features</h2>
    <div class="feature-container">
        <Feature title="Track Applications" description="Keep a record of every job you apply to with important details." image="/icons/track.svg" />
        <Feature title="Set Reminders" description="Never miss a follow-up or interview with built-in reminders." image="/icons/clock.svg" />
        <Feature title="Track Status" description="Monitor the progress of each application from applied to offer." image="/icons/circle-alert.svg" />
    </div>
</div>

<style>
    .features {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        width: 100vw;
        background-color: #F3F4F6;
        color: #1d40b0;
    }

    h2 {
        font-size: 100px;
        font-weight: 600;
        margin-bottom: 80px;
    }

    .feature-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 80vw;
        justify-content: space-between;
    }
</style>