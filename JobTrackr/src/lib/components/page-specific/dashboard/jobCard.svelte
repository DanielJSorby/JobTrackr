<script lang="ts">
    import { formatDate } from '$lib/functions/formatDate';
    import { getStatusBg, getStatusText } from '$lib/functions/statusColors';

    let { job } = $props();
</script>

<div class="job-card">
    <div class="job-header">
        <h3>{job.role_title}</h3>
        <div class="menu-icon" title="More options">
            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="5" cy="12" r="2" fill="#71717A"/><circle cx="12" cy="12" r="2" fill="#71717A"/><circle cx="19" cy="12" r="2" fill="#71717A"/></svg>
        </div>
    </div>
    <div class="info-col">
        <div class="info-item">
            <img src="/icons/company.svg" alt="Company Icon" />
            <span>{job.company_name}</span>
        </div>
        <div class="info-item">
            <img src="/icons/company-pin.svg" alt="Location Icon" />
            <span>{job.location}</span>
        </div>
    </div>
    <div class="status-date-row">
        <span class="status-badge" style="background:{getStatusBg(job.status)};color:{getStatusText(job.status)}">{job.status}</span>
        {#if job.application_date}
            <div class="date-item">
            <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="14" height="12" rx="2" stroke="#A1A1AA" stroke-width="1.5"/><path d="M7 3v2M13 3v2" stroke="#A1A1AA" stroke-width="1.5" stroke-linecap="round"/><rect x="7" y="9" width="6" height="2" rx="1" fill="#A1A1AA"/></svg>
            <span>{formatDate(job.application_date)}</span>
        </div>
        {/if}
    </div>
    {#if job.notes}
        <div class="notes">{job.notes}</div>
    {/if}
    <div class="button-row">
        <a class="job-btn" href={job.job_link} target="_blank" rel="noopener noreferrer">
            <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 10.5l5-5m0 0H9m3.5 0v3.5" stroke="#1d2939" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="3" y="3" width="12" height="12" rx="2" stroke="#1d2939" stroke-width="1.5"/></svg>
            View Job
        </a>
        <a href={`/job/${job.id}`}><button class="job-btn secondary">View Details</button></a>
    </div>
</div>

<style>
.job-card {
    background: #fff;
    border-radius: 16px;
    padding: 20px 20px 16px 20px;
    border: 2px dotted #d1d5db;
    box-shadow: 0 2px 4px rgba(0,0,0,0.04);
    min-width: 300px;
    max-width: 350px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}
.job-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 8px;
}
.job-header h3 {
    font-size: 1.35rem;
    font-weight: 700;
    margin: 0;
    color: #111827;
}
.menu-icon {
    cursor: pointer;
    margin-left: 8px;
    margin-top: 2px;
}
.info-col {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 2px;
}
.info-item {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #A1A1AA;
    font-size: 1rem;
    font-weight: 500;
}
.status-date-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 2px;
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
.date-item {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #A1A1AA;
    font-size: 1rem;
    font-weight: 500;
}
.notes {
    color: #222;
    font-size: 1rem;
    margin-bottom: 8px;
    margin-top: 2px;
}
.button-row {
    display: flex;
    gap: 16px;
    margin-top: 8px;
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
}
.job-btn:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.08);
}
.job-btn.secondary {
    background: #fff;
    border: 2px dotted #d1d5db;
    color: #1d2939;
}
</style>