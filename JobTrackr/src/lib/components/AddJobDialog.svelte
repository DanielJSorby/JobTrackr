<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { getCookie } from '$lib/functions/getCookie';
  export let open = false;
  const dispatch = createEventDispatcher();
  let dialogEl: HTMLDialogElement;

  // Form state
  let company = '';
  let position = '';
  let location = '';
  let status = 'Saved';
  let date = '';
  let jobLink = '';
  let notes = '';
  let userId = '';
  let isSubmitting = false;
  let errorMessage = '';

  onMount(() => {
    userId = getCookie('UserId') || '';
    console.log('AddJobDialog mounted, userId:', userId);
    console.log('All cookies:', document.cookie);
    console.log('getCookie result:', getCookie('UserId'));
  });

  // Lukk dialogen og send event
  function closeDialog() {
    dispatch('close');
    dialogEl.close();
    // Reset form
    resetForm();
  }

  function resetForm() {
    company = '';
    position = '';
    location = '';
    status = 'Saved';
    date = '';
    jobLink = '';
    notes = '';
    errorMessage = '';
  }

  // Åpne/lukk dialogen når prop endres
  $: if (open && dialogEl && !dialogEl.open) dialogEl.showModal();
  $: if (!open && dialogEl && dialogEl.open) dialogEl.close();

  // For å hindre at dialogen lukkes ved klikk på overlay
  function handleDialogClick(e: MouseEvent) {
    if (e.target === dialogEl) {
      closeDialog();
    }
  }

  async function handleSubmit() {
    console.log('handleSubmit called');
    console.log('userId:', userId);
    console.log('company:', company);
    console.log('position:', position);
    
    if (!userId) {
      errorMessage = 'User not authenticated. Please log in again.';
      console.error('No userId found');
      return;
    }

    if (!company.trim() || !position.trim()) {
      errorMessage = 'Company and position are required.';
      console.error('Missing required fields');
      return;
    }

    isSubmitting = true;
    errorMessage = '';

    const jobData = {
      userId,
      company: company.trim(),
      position: position.trim(),
      location: location.trim(),
      status,
      date: date || null,
      jobLink: jobLink.trim(),
      notes: notes.trim()
    };

    console.log('Sending job data:', jobData);

    try {
      const response = await fetch('/api/jobs/add-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jobData)
      });

      console.log('Response received:', response);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        // Success - close dialog and dispatch event
        dispatch('jobAdded', { jobId: data.jobId });
        closeDialog();
      } else {
        errorMessage = data.message || 'Failed to add job. Please try again.';
      }
    } catch (error) {
      console.error('Error adding job:', error);
      errorMessage = 'An error occurred while adding the job. Please try again.';
    } finally {
      isSubmitting = false;
    }
  }
</script>

<dialog bind:this={dialogEl} class="add-job-dialog" on:click={handleDialogClick}>
  <div class="modal-content">
    <div class="modal-header">
      <div>
        <h2>Add New Job</h2>
        <p>Enter the details of the job you want to track.</p>
      </div>
      <button class="close-btn" on:click={closeDialog} aria-label="Close">x</button>
    </div>
    <form class="modal-form" autocomplete="off" on:submit|preventDefault={handleSubmit}>
      {#if errorMessage}
        <div class="error-message">
          {errorMessage}
        </div>
      {/if}
      <div class="row">
        <div class="field">
          <label for="company">Company *</label>
          <input id="company" type="text" placeholder="Enter company name" bind:value={company} required />
        </div>
        <div class="field">
          <label for="position">Position *</label>
          <input id="position" type="text" placeholder="Enter job title" bind:value={position} required />
        </div>
      </div>
      <div class="row">
        <div class="field">
          <label for="location">Location</label>
          <input id="location" type="text" placeholder="Enter location" bind:value={location} />
        </div>
        <div class="field">
          <label for="status">Status</label>
          <select id="status" bind:value={status}>
            <option>Saved</option>
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="field">
          <label for="date">Date</label>
          <input id="date" type="date" bind:value={date} />
        </div>
        <div class="field">
          <label for="jobLink">Job Link</label>
          <input id="jobLink" type="url" placeholder="https://..." bind:value={jobLink} />
        </div>
      </div>
      <div class="row notes-row">
        <div class="field full-width">
          <label for="notes">Notes</label>
          <textarea id="notes" placeholder="Add any additional information about this job..." bind:value={notes}></textarea>
        </div>
      </div>
      <div class="modal-actions">
        <button type="button" class="cancel-btn" on:click={closeDialog} disabled={isSubmitting}>Cancel</button>
        <button type="submit" class="add-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Job'}
        </button>
      </div>
    </form>
  </div>
</dialog>

<style>
.add-job-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.25);
  max-width: 500px;
  width: 100%;
  background: transparent;
}
.add-job-dialog::backdrop {
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(2px);
}
.modal-content {
  background: #fff;
  border-radius: 12px;
  padding: 0;
  min-width: 400px;
  max-width: 500px;
  width: 100%;
}
.modal-header {
  background: #1d40b0;
  color: #fff;
  padding: 24px 24px 12px 24px;
  border-radius: 12px 12px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.modal-header h2 {
  margin: 0;
  font-size: 2rem;
}
.modal-header p {
  margin: 0;
  font-size: 1rem;
  font-weight: 300;
}
.close-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
  margin-left: 16px;
}
.modal-form {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.row {
  display: flex;
  gap: 16px;
}
.field {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.field.full-width {
  flex: 2;
}
.field label {
  font-size: 1rem;
  margin-bottom: 4px;
  color: #222;
}
input, select, textarea {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  background: #f9fafb;
  margin-bottom: 0;
}
textarea {
  min-height: 60px;
  resize: vertical;
}
.notes-row {
  flex-direction: column;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
}
.cancel-btn {
  background: #f3f4f6;
  color: #222;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.2rem;
  font-weight: 500;
  cursor: pointer;
}
.add-btn {
  background: #1d40b0;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.2rem;
  font-weight: 500;
  cursor: pointer;
}
.add-btn:hover {
  background: #1e3a8a;
}
.error-message {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 8px;
  font-size: 0.9rem;
  font-weight: 500;
}
@media (max-width: 600px) {
  .add-job-dialog,
  .modal-content {
    min-width: unset;
    max-width: 95vw;
    width: 95vw;
    padding: 0;
  }
  .modal-header {
    padding: 16px 12px 8px 12px;
  }
  .modal-form {
    padding: 12px;
    gap: 10px;
  }
  .row {
    flex-direction: column;
    gap: 8px;
  }
}
</style> 