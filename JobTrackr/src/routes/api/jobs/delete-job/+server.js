import { getDb } from '$lib/server/db';

export async function POST({ request }) {
    try {
        const { jobId } = await request.json();

        if (!jobId) {
            return new Response(JSON.stringify({ message: 'Job ID is required' }), { status: 400 });
        }

        const db = await getDb();
        
        // Delete the job
        await db.query('DELETE FROM jobs WHERE id = ?', [jobId]);
        
        return new Response(JSON.stringify({ 
            message: 'Job deleted successfully'
        }), { status: 200 });
    } catch (e) {
        console.error('Error deleting job:', e);
        return new Response(JSON.stringify({ message: 'Error deleting job' }), { status: 500 });
    }
} 