import { sequence } from '@sveltejs/kit/hooks';
import { redirect } from '@sveltejs/kit';
import { all } from '$lib/routes';

async function blockSuspiciousRequests({ event, resolve }) {
	const suspiciousPatterns = ['.php', '.env', '.html', '.git', '.sql', '/wp-'];

	if (suspiciousPatterns.some((pattern) => event.url.pathname.includes(pattern))) {
		return new Response(null, { status: 404 });
	}
	return resolve(event);
}

async function handleRoutes({ event, resolve }) {
	if (!all.includes(event.url.pathname)) {
		throw redirect(307, '/');
	}
	return resolve(event);
}

export const handleTheme = async ({ event, resolve }) => {
	const theme = event.cookies.get('theme') || 'dark';
	const response = await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`)
	});
	return response;
};

export const handle = sequence(blockSuspiciousRequests, handleRoutes, handleTheme);
