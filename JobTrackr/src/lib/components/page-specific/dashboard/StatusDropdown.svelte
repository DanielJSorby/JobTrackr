<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let statuses: string[] = [
    'All Statuses',
    'Saved',
    'Applied',
    'Interview',
    'Offer',
    'Rejected'
  ];
  export let selected: string = 'All Statuses';
  let open = false;

  function selectStatus(status: string) {
    selected = status;
    open = false;
    dispatch('change', { status });
  }

  function handleBlur(event: FocusEvent) {
    // Only close if focus moves outside the dropdown
    if (!(event.relatedTarget as HTMLElement)?.closest('.dropdown')) {
      open = false;
    }
  }
</script>

<div class="dropdown" tabindex="0" on:blur={handleBlur}>
  <div class="dropdown-selected" on:click={() => (open = !open)}>
    <span>{selected}</span>
    <svg class="chevron" width="20" height="20" viewBox="0 0 20 20"><path d="M6 8l4 4 4-4" stroke="#222" stroke-width="2" fill="none"/></svg>
  </div>
  {#if open}
    <div class="dropdown-list">
      {#each statuses as status}
        <div
          class="dropdown-item {selected === status ? 'selected' : ''}"
          on:click={() => selectStatus(status)}
        >
          {#if selected === status}
            <svg width="20" height="20" viewBox="0 0 20 20" style="margin-right: 8px;"><polyline points="4 11 8 15 16 6" stroke="#1d40b0" stroke-width="2" fill="none"/></svg>
          {/if}
          {status}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
.dropdown {
  position: relative;
  min-width: 220px;
  outline: none;
}
.dropdown-selected {
  background: #f7f7f7;
  border-radius: 16px;
  padding: 18px 24px;
  font-size: 22px;
  font-weight: 400;
  color: #222;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.07);
  border: none;
}
.chevron {
  margin-left: 12px;
}
.dropdown-list {
  position: absolute;
  top: 110%;
  left: 0;
  right: 0;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.12);
  z-index: 10;
  padding: 8px 0;
  margin-top: 4px;
  border: 1px dotted #bfc6d1;
}
.dropdown-item {
  padding: 16px 24px;
  font-size: 20px;
  color: #222;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.15s;
}
.dropdown-item.selected {
  background: #f7f7f7;
  font-weight: 500;
  color: #1d40b0;
}
.dropdown-item:hover {
  background: #e5eaff;
}
</style> 