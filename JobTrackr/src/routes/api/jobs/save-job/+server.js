import { db } from '$lib/server/db';

function getStatusEvent(status) {
    switch (status) {
        case 'Applied':
            return 'Applied to the position';
        case 'Interview':
            return 'Interview scheduled';
        case 'Offer':
            return 'Received offer';
        case 'Rejected':
            return 'Application rejected';
        case 'Saved':
            return 'Saved for later';
        default:
            return `Status changed to ${status}`;
    }
}

export async function POST({ request }) {
    const job = await request.json();

    const {
        id,
        company_name,
        role_title,
        application_date,
        description,
        location,
        status,
        notes,
        timeline,
        job_link
    } = job;

    const formatted_date = application_date ? new Date(application_date).toISOString().slice(0, 10) : null;

    // Get current job data to detect status changes
    let currentJob = null;
    try {
        const [rows] = await db.query('SELECT status, timeline FROM jobs WHERE id = ?', [id]);
        if (rows.length > 0) {
            currentJob = rows[0];
        }
    } catch (e) {
        console.error('Error fetching current job:', e);
    }

    // Detect status change and add timeline entry
    let updatedTimeline = timeline;
    if (currentJob && currentJob.status !== status) {
        const today = new Date().toISOString().slice(0, 10);
        let timelineSteps = [];
        
        // Parse existing timeline
        if (currentJob.timeline) {
            try {
                const parsedTimeline = JSON.parse(currentJob.timeline);
                timelineSteps = parsedTimeline.steps || [];
            } catch (e) {
                console.error('Error parsing existing timeline:', e);
                timelineSteps = [];
            }
        }
        
        // Add status change entry
        const statusEvent = getStatusEvent(status);
        timelineSteps.push({
            date: today,
            event: statusEvent
        });
        
        updatedTimeline = { steps: timelineSteps };
    }

    try {
        await db.query(
            `UPDATE jobs 
             SET company_name = ?, 
                 role_title = ?, 
                 application_date = ?, 
                 description = ?, 
                 location = ?, 
                 status = ?, 
                 notes = ?, 
                 timeline = ?, 
                 job_link = ? 
             WHERE id = ?`,
            [
                company_name,
                role_title,
                formatted_date,
                description,
                location,
                status,
                notes,
                JSON.stringify(updatedTimeline),
                job_link,
                id
            ]
        );
        
        // Return updated job data
        const [updatedRows] = await db.query('SELECT * FROM jobs WHERE id = ?', [id]);
        const updatedJob = updatedRows[0];
        
        return new Response(JSON.stringify({ 
            message: 'Job saved successfully',
            job: updatedJob
        }), { status: 200 });
    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({ message: 'Error saving job' }), { status: 500 });
    }
}
