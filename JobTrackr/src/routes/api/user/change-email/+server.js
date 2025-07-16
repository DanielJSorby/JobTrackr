import { db } from "$lib/server/db";
import { json } from "@sveltejs/kit";
import bcrypt from 'bcrypt';

export async function POST({ request }) {
    try {
        const { userId, currentPassword, newEmail } = await request.json();

        if (!userId || !currentPassword || !newEmail) {
            return json({ status: 400, error: "UserId, current password, and new email are required" });
        }

        // Check if new email is already in use
        const [ existingUsers ] = await db.query(`
            SELECT id FROM users WHERE email = ? AND id != ?
        `, [ newEmail.trim(), userId ]);

        if (existingUsers.length > 0) {
            return json({ status: 409, error: "Email already in use" });
        }

        // Get current user data
        const [ users ] = await db.query(`
            SELECT password_hash FROM users WHERE id = ?
        `, [ userId ]);

        if (users.length === 0) {
            return json({ status: 404, error: "User not found" });
        }

        const user = users[0];

        // Verify current password
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);

        if (!isCurrentPasswordValid) {
            return json({ status: 401, error: "Current password is incorrect" });
        }

        // Update email
        await db.query(`
            UPDATE users SET email = ? WHERE id = ?
        `, [ newEmail.trim(), userId ]);

        return json({ 
            status: 200, 
            message: "Email changed successfully" 
        });
    } catch (err) {
        return json({ status: 500, error: err.message });
    }
} 