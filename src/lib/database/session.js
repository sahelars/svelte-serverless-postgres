import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import { sql } from '$lib/database/db.server.js';

export function generateSessionToken() {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	return encodeBase32LowerCaseNoPadding(bytes);
}

export async function createSession(token, userId) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

	await sql`
		INSERT INTO user_session (id, user_id, expires_at)
		VALUES (${sessionId}, ${userId}, ${expiresAt})
	`;

	return { id: sessionId, userId, expiresAt };
}

export async function validateSessionToken(token) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

	const rows = await sql`
		SELECT id, user_id, expires_at
		FROM user_session
		WHERE id = ${sessionId}
	`;

	const row = rows[0];
	if (!row) return { session: null, user: null };

	const session = {
		id: row.id,
		userId: row.user_id,
		expiresAt: new Date(row.expires_at)
	};

	if (Date.now() >= session.expiresAt.getTime()) {
		return { session: null, user: null };
	}

	const user = { id: session.userId };

	return { session, user };
}

export async function invalidateSession(sessionId) {
	await sql`
		DELETE FROM user_session
		WHERE id = ${sessionId}
	`;
}
