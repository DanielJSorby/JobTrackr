<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let searchQuery = $state('');
    let {placeholder = 'Search...', width = '100%', height = '40px'} = $props();

    export function getPrompt() {
        return {searchQuery};
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            dispatch('search', { query: searchQuery });
        }
    }
</script>

<input style="width: {width}; height: {height};" type="text" bind:value={searchQuery} placeholder={placeholder} class="search-input" on:keydown={handleKeydown} />

<style>
    .search-input {
        padding: 10px;
        border: 1px dotted #1d40b0;
        border-radius: 16px;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        font-size: 16px;
        font-weight: 500;
        color: #000;
    }

    .search-input:focus {
        outline: none;
        border: 1px solid #1d40b0;
    }
</style>