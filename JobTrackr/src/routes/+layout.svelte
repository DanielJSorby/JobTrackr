<script lang="ts">
    import type { Snippet } from 'svelte';
    import { page } from '$app/stores';
    import type { LayoutData } from './$types';
    import '$lib/styles/global.css';
    import Navbar from '$lib/components/navbar.svelte';
    import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
    import { dev } from '$app/environment';
    import { injectAnalytics } from '@vercel/analytics/sveltekit';
 
    injectAnalytics({ mode: dev ? 'development' : 'production' });
    injectSpeedInsights();


    let { data, children }: { data: LayoutData, children: Snippet } = $props();
</script>

<svelte:head>
    <title>JobTrackr</title>
    <meta name="description" content="JobTrackr is a tool for tracking your job applications.">
    
    <!-- Common SEO Meta Tags -->
    <meta name="robots" content="index, follow" />
    <meta name="author" content="Daniel Johan Sorby" />
    <link rel="canonical" href="https://jobtracker.danielsorby.no" />
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://jobtracker.danielsorby.no" />
    <meta property="og:site_name" content="JobTrackr" />
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1582322793713299"
     crossorigin="anonymous"></script>
</svelte:head>

{#if $page.route.id == '/login' || $page.route.id == '/signup' || $page.route.id == '/'}
    <Navbar />
    {:else}
    <Navbar links={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Profile', href: '/profile' }, { label: 'Logout', href: '/logout' }]}/>
{/if}

{@render children()}