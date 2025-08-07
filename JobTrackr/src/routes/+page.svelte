<script>
    import Splash from '$lib/components/home-boxes/splash.svelte';
    import Features from '$lib/components/home-boxes/features.svelte';
</script>

<svelte:head>
    <title>JobTrackr - Track Your Job Applications</title>
    <meta name="description" content="JobTrackr - Track your job applications and manage your career journey efficiently. Organize applications, track status, and never miss a follow-up." />
    <meta name="keywords" content="job tracking, application tracker, career management, job search, employment tracker" />
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="JobTrackr - Job Application Tracker" />
    <meta property="og:description" content="Track your job applications and manage your career journey efficiently. Organize applications, track status, and never miss a follow-up." />
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:title" content="JobTrackr - Job Application Tracker" />
    <meta name="twitter:description" content="Track your job applications and manage your career journey efficiently. Organize applications, track status, and never miss a follow-up." />
</svelte:head>

<Splash />
<Features />