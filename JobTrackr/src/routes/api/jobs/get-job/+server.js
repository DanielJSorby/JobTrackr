import { getDb } from "$lib/server/db";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
    try {
        const { JobId } = await request.json();

        if (!JobId) {
            return json({ status: 400, error: "JobId is required" });
        }

        const db = await getDb();
        const [ rows ] = await db.query(`
            SELECT * FROM jobs
            WHERE id = ?
        `, [ JobId ]);

        return json({ status: 200, jobs: rows });
    } catch (err) {
        return json({ status: 500, error: err.message });
    }
}
