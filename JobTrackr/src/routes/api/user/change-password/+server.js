import { db } from "$lib/server/db";
import { json } from "@sveltejs/kit";
import bcrypt from 'bcrypt';

export async function POST({ request }) {
    try {
        const { userId, currentPassword, newPassword } = await request.json();

        if (!userId || !currentPassword || !newPassword) {
            return json({ status: 400, error: "UserId, current password, and new password are required" });
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

        // Hash new password
        const saltRounds = 10;
        const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

        // Update password
        await db.query(`
            UPDATE users SET password_hash = ? WHERE id = ?
        `, [ newPasswordHash, userId ]);

        return json({ 
            status: 200, 
            message: "Password changed successfully" 
        });
    } catch (err) {
        return json({ status: 500, error: err.message });
    }
} 