/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request }) {
	const { email, password } = await request.json();

	return new Response(
		JSON.stringify({
			message: "User logged in successfully",
			userId: "user123",
		}),
		{
			status: 200, // HTTP-statuskode for suksess
			headers: {
				"Content-Type": "application/json", // Angir at vi sender JSON-data
			},
		}
	);
}
