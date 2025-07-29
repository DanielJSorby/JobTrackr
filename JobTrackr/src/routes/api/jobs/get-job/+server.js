import { getDb } from "$lib/server/db";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
    try {
        console.log('get-job API called');
        const { JobId } = await request.json();
        console.log('JobId received:', JobId);

        if (!JobId) {
            console.error('JobId is missing');
            return json({ status: 400, error: "JobId is required" });
        }

        console.log('Getting database connection...');
        const db = await getDb();
        console.log('Database connection established');
        
        console.log('Executing query for JobId:', JobId);
        const [ rows ] = await db.query(`
            SELECT * FROM jobs
            WHERE id = ?
        `, [ JobId ]);
        
        console.log('Query executed, rows found:', rows.length);
        console.log('Rows:', rows);

        return json({ status: 200, jobs: rows });
    } catch (err) {
        console.error('Error in get-job API:', err);
        return json({ status: 500, error: err.message });
    }
}
