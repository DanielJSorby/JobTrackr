<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let statuses: { label: string, value: string, count: number }[] = [
    { label: 'All', value: 'All', count: 0 },
    { label: 'Saved', value: 'Saved', count: 0 },
    { label: 'Applied', value: 'Applied', count: 0 },
    { label: 'Interview', value: 'Interview', count: 0 },
    { label: 'Offers', value: 'Offer', count: 0 },
    { label: 'Rejected', value: 'Rejected', count: 0 }
  ];
  export let selected: string = 'All';

  function selectTab(value: string) {
    selected = value;
    dispatch('change', { status: value });
  }
</script>

<div class="status-tabs">
  {#each statuses as { label, value, count }}
    <div
      class="tab {selected === value ? 'active' : ''}"
      on:click={() => selectTab(value)}
      tabindex="0"
    >
      <span>{label}</span>
      <span class="count">{count}</span>
    </div>
  {/each}
</div>

<style>
.status-tabs {
  display: flex;
  gap: 1.5rem;
  background: #f7f7f7;
  border-radius: 16px;
  padding: 12px 16px;
  margin: 20px 20px 30px 20px;
  align-items: center;
  width: fit-content;
  flex-wrap: wrap;
}

.tab {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 22px;
  color: #222;
  font-weight: 400;
  cursor: pointer;
  padding: 8px 18px;
  border-radius: 12px;
  transition: background 0.15s, color 0.15s;
  white-space: nowrap;
}

.tab.active {
  background: #fff;
  color: #1d40b0;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(29,64,176,0.07);
}

.count {
  background: #e5eaff;
  color: #1d40b0;
  border-radius: 8px;
  padding: 2px 10px;
  font-size: 18px;
  font-weight: 600;
  margin-left: 4px;
}

@media (max-width: 768px) {
  .status-tabs {
    gap: 0.75rem;
    padding: 8px 12px;
    width: 100%;
    justify-content: center;
  }

  .tab {
    font-size: 18px;
    padding: 6px 12px;
  }

  .count {
    font-size: 16px;
    padding: 2px 8px;
  }
}

@media (max-width: 480px) {
  .status-tabs {
    gap: 0.5rem;
    padding: 6px 8px;
  }

  .tab {
    font-size: 16px;
    padding: 4px 8px;
  }

  .count {
    font-size: 14px;
    padding: 1px 6px;
  }
}
</style> 