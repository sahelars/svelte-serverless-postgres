import { redirect, fail } from '@sveltejs/kit';
import {
	generateSessionToken,
	createSession,
	validateSessionToken
} from '$lib/database/session.js';
import { sql } from '$lib/database/db.server.js';
import bcrypt from 'bcryptjs';

export const load = async ({ cookies }) => {
	const token = cookies.get('session');
	if (!token) return;

	const { session, user } = await validateSessionToken(token);
	if (user) throw redirect(302, '/dashboard');
};

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const username = form.get('username');
		const password = form.get('password');

		const rows = await sql`
			SELECT id, password_hash FROM app_user WHERE username = ${username}
		`;

		const user = rows[0];
		if (!user) {
			return fail(400, { message: 'Invalid username or password' });
		}

		const validPassword = await bcrypt.compare(password, user.password_hash);
		if (!validPassword) {
			return fail(400, { message: 'Invalid username or password' });
		}

		const token = generateSessionToken();
		await createSession(token, user.id);

		cookies.set('session', token, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: true,
			maxAge: 60 * 60 * 24 * 30
		});

		throw redirect(302, '/dashboard');
	}
};
