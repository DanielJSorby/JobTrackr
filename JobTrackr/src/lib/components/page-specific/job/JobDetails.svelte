<script lang="ts">
    import { formatDate } from '$lib/functions/formatDate';
    import { getStatusBg, getStatusText } from '$lib/functions/statusColors';
    let { company_name, location, application_date, status, job_link } = $props();
</script>

<div class="box job-details">
    <h2>Job Details</h2>
    <div class="all-details">
        <div class="detail"><img src="/icons/company.svg" alt="">{company_name}</div>
        <div class="detail"><img src="/icons/pin.svg" alt="">{location}</div>
        <div class="detail"><img src="/icons/calendar.svg" alt="">{formatDate(application_date)}</div>
    </div>
    <div class="status {status}"><span class="status-badge" style="background:{getStatusBg(status)};color:{getStatusText(status)}">{status}</span></div>
    <a class="job-btn" href={job_link} target="_blank" rel="noopener noreferrer">
        <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 10.5l5-5m0 0H9m3.5 0v3.5" stroke="#1d2939" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="3" y="3" width="12" height="12" rx="2" stroke="#1d2939" stroke-width="1.5"/></svg>
        View Job Posting
    </a>
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
</style> 