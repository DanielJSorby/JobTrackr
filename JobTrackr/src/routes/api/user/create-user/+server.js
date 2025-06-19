import { db } from "$lib/server/db";
import { json } from "@sveltejs/kit";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export async function POST({ request }) {
    try {
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return json({ status: 400, error: "Name, email, and password are required" });
        }

        // Check if user with email already exists
        const [ existingUsers ] = await db.query(`
            SELECT id FROM users WHERE email = ?
        `, [ email ]);

        if (existingUsers.length > 0) {
            return json({ status: 409, error: "Email already in use" });
        }

        // Generate UUID v4 for user ID
        const userId = uuidv4();
        
        // Hash password with bcrypt
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const [ result ] = await db.query(`
            INSERT INTO users (id, name, email, password_hash)
            VALUES (?, ?, ?, ?)
        `, [ userId, name, email, passwordHash ]);

        return json({ status: 200, userId: userId, message: "User created successfully" });
    } catch (err) {
        return json({ status: 500, error: err.message });
    }
}
