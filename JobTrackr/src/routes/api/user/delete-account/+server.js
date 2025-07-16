import { db } from "$lib/server/db";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
    try {
        const { userId } = await request.json();

        if (!userId) {
            return json({ status: 400, error: "UserId is required" });
        }

        // Start transaction
        await db.query('START TRANSACTION');

        try {
            // Delete all jobs for this user
            await db.query(`
                DELETE FROM jobs WHERE user_id = ?
            `, [ userId ]);

            // Delete the user
            await db.query(`
                DELETE FROM users WHERE id = ?
            `, [ userId ]);

            // Commit transaction
            await db.query('COMMIT');

            return json({ 
                status: 200, 
                message: "Account deleted successfully" 
            });
        } catch (error) {
            // Rollback transaction on error
            await db.query('ROLLBACK');
            throw error;
        }
    } catch (err) {
        return json({ status: 500, error: err.message });
    }
} 