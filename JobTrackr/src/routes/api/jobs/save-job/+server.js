import { db } from '$lib/server/db';

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
                JSON.stringify(timeline),
                job_link,
                id
            ]
        );
        return new Response(JSON.stringify({ message: 'Job saved successfully' }), { status: 200 });
    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({ message: 'Error saving job' }), { status: 500 });
    }
}
