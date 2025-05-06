<script lang="ts">
    export type Status = 'Applied' | 'Interview' | 'Offer' | 'Rejected' | 'Saved' | 'Total';
    type StatusInfo = {
        color: string;
        text: string;
        subText: string;
    };
    
    let {status, count} = $props<{status: Status, count: number}>();
    
    const statuses: Record<Status, StatusInfo> = {
        "Applied": {
            "color": "#1d40b0",
            "text": "Applied",
            "subText": "Applied to a job"
        },
        "Interview": {
            "color": "#6B21A8",
            "text": "Active Interviews",
            "subText": "Jobs in interview stage"
        },
        "Offer": {
            "color": "#176334",
            "text": "Offers Received",
            "subText": "Job offers on the table"
        },
        "Rejected": {
            "color": "#991B1B",
            "text": "Rejected",
            "subText": "Rejected from a job"
        },
        "Saved": {
            "color": "#1d40b0",
            "text": "Saved for Later",
            "subText": "Jobs to apply for"
        },
        "Total": {
            "color": "#1d40b0",
            "text": "Total",
            "subText": "Total jobs"
        }
    };

    function getStatusInfo(s: Status): StatusInfo {
        return statuses[s];
    }

    let statusInfo = $derived(getStatusInfo(status));
</script>

<div class="status-card">
    <h3>{statusInfo.text}</h3>
    <p class="number" style="color: {statusInfo.color};">{count}</p>
    <p class="subtext">{statusInfo.subText}</p>
</div>

<style>
    .number {
        font-size: 2rem;
        font-weight: bold;
    }
    .status-card {
        background: white;
        padding: 1rem;
        border-radius: 16px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        border: 1px dotted #1d40b0;
        min-width: 300px;
        height: 150px;
        transition: all 0.3s ease;
    }

    .status-card:hover {
        border: 1px solid #1d40b0;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }

    .status-card h3 {
        margin: 0;
        color: #000;
    }

    .status-card p {
        margin: 0;
    }

    .subtext {
        color: #6B7280;
    }
</style>