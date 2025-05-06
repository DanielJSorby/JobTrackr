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

{#if $page.route.id == '/login' || $page.route.id == '/signup' || $page.route.id == '/'}
    <Navbar />
    {:else}
    <Navbar links={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Logout', href: '/logout' }]}/>
{/if}

{@render children()}