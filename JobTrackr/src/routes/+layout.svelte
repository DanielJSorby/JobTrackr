<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { LayoutData } from './$types';
    import '$lib/styles/global.css';
    import Navbar from '$lib/components/navbar.svelte';

    let { data, children }: { data: LayoutData, children: Snippet } = $props();
</script>

<Navbar />

{@render children()}