import { db } from "$lib/server/db";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
    try {
        const { userId } = await request.json();

        if (!userId) {
            return json({ status: 400, error: "UserId is required" });
        }

        // Get user data
        const [ users ] = await db.query(`
            SELECT id, name, email FROM users WHERE id = ?
        `, [ userId ]);

        if (users.length === 0) {
            return json({ status: 404, error: "User not found" });
        }

        const user = users[0];

        return json({ 
            status: 200, 
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        return json({ status: 500, error: err.message });
    }
} 