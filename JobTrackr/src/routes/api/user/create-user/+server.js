/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request }) {
	const { email, password, name } = await request.json();

	return new Response(
		JSON.stringify({ message: "User created successfully" }),
		{
			status: 200, // HTTP-statuskode for suksess
			headers: {
				"Content-Type": "application/json", // Angir at vi sender JSON-data
			},
		}
	);
}
