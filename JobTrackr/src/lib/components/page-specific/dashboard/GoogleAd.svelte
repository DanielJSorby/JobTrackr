<script lang="ts" context="module">
    declare global {
        interface Window {
            adsbygoogle: any[];
        }
    }
</script>

<script lang="ts">
    import { onMount } from 'svelte';
    
    onMount(() => {
        // Load the Google Ad script
        const script = document.createElement('script');
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1582322793713299';
        script.async = true;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);

        // Initialize the ad
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    });
</script>

<div class="ad-container">
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-format="fluid"
         data-ad-layout-key="-6h+e1+4x-5o-4e"
         data-ad-client="ca-pub-1582322793713299"
         data-ad-slot="2768067861"></ins>
</div>

<style>
    .ad-container {
        width: 100%;
        min-height: 100px;
        margin: 1rem 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style> 