import { validateSessionToken, invalidateSession } from '$lib/database/session.js';
import { redirect } from '@sveltejs/kit';

export const GET = async () => {
	throw redirect(307, '/');
};

export const POST = async ({ cookies }) => {
	const token = cookies.get('session');

	if (token) {
		const { session } = await validateSessionToken(token);
		if (session) {
			await invalidateSession(session.id);
		}
		cookies.delete('session', { path: '/' });

		return new Response(null, { status: 200 });
	}

	return new Response(null, { status: 401 });
};
