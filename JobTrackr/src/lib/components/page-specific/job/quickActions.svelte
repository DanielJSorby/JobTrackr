<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
</script>

<div class="box">
    <h2>Quick Actions</h2>
    <div class="actions">
        <button class="button filled" onclick={() => dispatch('edit')}>Edit</button>
        <button class="button error" onclick={() => dispatch('delete')}>Delete</button>
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
    .actions {
        display: flex;
        gap: 10px;
    }
    .button {
        width: 100%;
    }
</style>