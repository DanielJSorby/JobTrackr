<script>
    import Feature from '$lib/components/page-specific/features/feature.svelte';
</script>

<div class="features">
    <div class="container">
        <h2>Features</h2>
        <div class="feature-container">
            <Feature title="Track Applications" description="Keep a record of every job you apply to with important details." image="/icons/track.svg" />
            <Feature title="Set Reminders" description="Never miss a follow-up or interview with built-in reminders." image="/icons/clock.svg" />
            <Feature title="Track Status" description="Monitor the progress of each application from applied to offer." image="/icons/circle-alert.svg" />
        </div>
    </div>
</div>

<style>
    .features {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        width: 100%;
        background-color: #F3F4F6;
        color: #1d40b0;
        padding: 2rem 1rem;
    }

    .container {
        width: 100%;
        max-width: var(--max-width);
        margin: 0 auto;
    }

    h2 {
        font-size: clamp(2.5rem, 5vw, 100px);
        font-weight: 600;
        margin-bottom: clamp(2rem, 5vw, 80px);
        text-align: center;
    }

    .feature-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
        gap: 2rem;
        width: 100%;
    }

    @media (max-width: 768px) {
        .features {
            padding: 1rem;
        }

        .feature-container {
            gap: 3rem;
        }
    }
</style>