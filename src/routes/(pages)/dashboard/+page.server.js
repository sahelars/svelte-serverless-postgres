import { validateSessionToken } from '$lib/database/session.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const token = cookies.get('session');
	if (!token) throw redirect(302, '/login');

	const { session, user } = await validateSessionToken(token);
	if (!user) throw redirect(302, '/login');

	return { user };
};
