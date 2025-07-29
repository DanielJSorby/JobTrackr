import { getDb } from "$lib/server/db";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
    try {
        const { UserId } = await request.json();

        if (!UserId) {
            return json({ status: 400, error: "UserId is required" });
        }

        const db = await getDb();
        const [ rows ] = await db.query(`
            SELECT * FROM jobs
            WHERE user_id = ?
        `, [ UserId ]);

        return json({ status: 200, jobs: rows });
    } catch (err) {
        return json({ status: 500, error: err.message });
    }
}
