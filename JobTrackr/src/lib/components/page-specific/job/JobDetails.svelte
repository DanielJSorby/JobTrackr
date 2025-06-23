<script lang="ts">
    import { formatDate } from '$lib/functions/formatDate';
    import { getStatusBg, getStatusText } from '$lib/functions/statusColors';
    let { job, edit } = $props();

    const statuses = ['Applied', 'Interview', 'Offer', 'Rejected', 'Saved'];
</script>

<div class="box job-details">
    <h2>Job Details</h2>
    {#if edit}
        <div class="edit-grid">
            <div class="form-field">
                <label for="company">Company</label>
                <input id="company" type="text" bind:value={job.company_name} />
            </div>
            <div class="form-field">
                <label for="position">Position</label>
                <input id="position" type="text" bind:value={job.role_title} />
            </div>
            <div class="form-field">
                <label for="location">Location</label>
                <input id="location" type="text" bind:value={job.location} />
            </div>
            <div class="form-field">
                <label for="status">Status</label>
                <select id="status" bind:value={job.status}>
                    {#each statuses as s}
                        <option value={s}>{s}</option>
                    {/each}
                </select>
            </div>
            <div class="form-field">
                <label for="date">Date</label>
                <div class="date-input">
                    <input id="date" type="date" bind:value={job.application_date} />
                    <img src="/icons/calendar.svg" alt="calendar" />
                </div>
            </div>
            <div class="form-field">
                <label for="job-link">Job Link</label>
                <input id="job-link" type="text" bind:value={job.job_link} />
            </div>
        </div>
    {:else}
    <div class="all-details">
        <div class="detail"><img src="/icons/company.svg" alt="">{job.company_name}</div>
        <div class="detail"><img src="/icons/pin.svg" alt="">{job.location}</div>
        <div class="detail"><img src="/icons/calendar.svg" alt="">{formatDate(job.application_date)}</div>
    </div>
    <div class="status {job.status}"><span class="status-badge" style="background:{getStatusBg(job.status)};color:{getStatusText(job.status)}">{job.status}</span></div>
    <a class="job-btn" href={job.job_link} target="_blank" rel="noopener noreferrer">
        <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 10.5l5-5m0 0H9m3.5 0v3.5" stroke="#1d2939" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="3" y="3" width="12" height="12" rx="2" stroke="#1d2939" stroke-width="1.5"/></svg>
        View Job Posting
    </a>
    {/if}
</div>

<style>
    .box {
        border: 1px solid #1d40b0;
        border-style: dashed;
        padding: 20px;
        margin: 20px;
        border-radius: 26px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }

    h2 {
        margin-bottom: 20px;
    }

    .all-details .detail {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 24px;
        font-weight: 100;
        margin-bottom: 10px;
    }

    .status {
        margin: 12px;
        margin-left: 0;
    }

    .status-badge {
        display: inline-block;
        padding: 3px 12px;
        border-radius: 8px;
        font-size: 0.95rem;
        font-weight: 500;
        background: #E5E7EB;
        margin-right: 8px;
    }

    .job-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        background: #fff;
        border: 2px dotted #d1d5db;
        border-radius: 10px;
        padding: 8px 18px;
        font-size: 1.05rem;
        font-weight: 600;
        color: #1d2939;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0,0,0,0.04);
        transition: box-shadow 0.1s;
        text-decoration: none;
        width: fit-content;
    }

    .job-btn:hover {
        box-shadow: 0 4px 8px rgba(0,0,0,0.08);
    }

    .edit-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }

    .form-field {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .form-field label {
        font-size: 0.9rem;
        font-weight: 500;
        color: #374151;
        position: relative;
        z-index: 1;
        margin-bottom: 4px;
    }

    .form-field input, .form-field select {
        border: 1px dotted #9ca3af;
        border-radius: 12px;
        padding: 10px 12px;
        font-size: 1rem;
        background-color: #fff;
        position: relative;
    }

    .form-field select {
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E");
        background-position: right 0.5rem center;
        background-repeat: no-repeat;
        background-size: 1.5em 1.5em;
        padding-right: 2.5rem;
    }
    
    .date-input {
        position: relative;
        display: flex;
        align-items: center;
    }

    .date-input input {
        width: 100%;
        box-sizing: border-box;
    }

    .date-input img {
        position: absolute;
        right: 12px;
        pointer-events: none;
    }

    .date-input input::-webkit-calendar-picker-indicator {
        opacity: 0;
        cursor: pointer;
    }
</style> 