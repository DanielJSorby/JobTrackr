import { db } from "$lib/server/db";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
    try {
        const { userId } = await request.json();

        if (!userId) {
            return json({ status: 400, error: "UserId is required" });
        }

        // Get total jobs count
        const [ totalJobsResult ] = await db.query(`
            SELECT COUNT(*) as total FROM jobs WHERE user_id = ?
        `, [ userId ]);

        // Get active jobs (not rejected or completed)
        const [ activeJobsResult ] = await db.query(`
            SELECT COUNT(*) as active FROM jobs 
            WHERE user_id = ? AND status NOT IN ('Rejected', 'Offer')
        `, [ userId ]);

        // Get completed jobs (rejected or offer)
        const [ completedJobsResult ] = await db.query(`
            SELECT COUNT(*) as completed FROM jobs 
            WHERE user_id = ? AND status IN ('Rejected', 'Offer')
        `, [ userId ]);

        // Get user creation date (we'll use a placeholder for now since we don't have created_at field)
        const [ userResult ] = await db.query(`
            SELECT id FROM users WHERE id = ?
        `, [ userId ]);

        const totalJobs = totalJobsResult[0]?.total || 0;
        const activeJobs = activeJobsResult[0]?.active || 0;
        const completedJobs = completedJobsResult[0]?.completed || 0;
        
        // For now, we'll show a placeholder since we don't have created_at in the users table
        const memberSince = "2024";

        return json({ 
            status: 200, 
            stats: {
                totalJobs,
                activeJobs,
                completedJobs,
                memberSince
            }
        });
    } catch (err) {
        return json({ status: 500, error: err.message });
    }
} 