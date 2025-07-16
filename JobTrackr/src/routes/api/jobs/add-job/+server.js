import { db } from "$lib/server/db";
import { v4 as uuidv4 } from 'uuid';

export async function POST({ request }) {
    try {
        const {
            userId,
            company,
            position,
            location,
            status,
            date,
            jobLink,
            notes
        } = await request.json();

        // Validate required fields 
        if (!userId || !company || !position) {
            return new Response(JSON.stringify({ 
                message: 'UserId, company, and position are required' 
            }), { status: 400 });
        }

        const jobId = uuidv4();
        const formatted_date = date ? new Date(date).toISOString().slice(0, 10) : null;
        
        await db.query(`
            INSERT INTO jobs (
                id, 
                user_id, 
                company_name, 
                role_title, 
                application_date, 
                location, 
                status, 
                notes, 
                job_link
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            jobId,
            userId,
            company,
            position,
            formatted_date,
            location || null,
            status || 'Saved',
            notes || null,
            jobLink || null
        ]);

        return new Response(JSON.stringify({ 
            message: 'Job added successfully',
            jobId: jobId
        }), { status: 200 });
    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({ 
            message: 'Error adding job' 
        }), { status: 500 });
    }
}
