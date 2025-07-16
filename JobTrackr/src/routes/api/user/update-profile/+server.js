import { db } from "$lib/server/db";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
    try {
        const { userId, name } = await request.json();

        if (!userId || !name) {
            return json({ status: 400, error: "UserId and name are required" });
        }

        // Update user name
        await db.query(`
            UPDATE users SET name = ? WHERE id = ?
        `, [ name.trim(), userId ]);

        return json({ 
            status: 200, 
            message: "Profile updated successfully" 
        });
    } catch (err) {
        return json({ status: 500, error: err.message });
    }
} 