import { getDb } from "$lib/server/db";
import { json } from "@sveltejs/kit";
import bcrypt from 'bcrypt';

export async function POST({ request }) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return json({ status: 400, error: "Email and password are required" });
        }

        const db = await getDb();

        // Find user by email
        const [ users ] = await db.query(`
            SELECT id, name, email, password_hash FROM users WHERE email = ?
        `, [ email ]);

        if (users.length === 0) {
            return json({ status: 401, error: "Invalid email or password" });
        }

        const user = users[0];

        // Compare password with hash
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
            return json({ status: 401, error: "Invalid email or password" });
        }

        return json({ 
            status: 200, 
            userId: user.id, 
            name: user.name,
            email: user.email,
            message: "Login successful" 
        });
    } catch (err) {
        return json({ status: 500, error: err.message });
    }
}
