import { sitemap } from '$lib/routes';

export async function GET() {
	const pages = sitemap.map((route) => {
		if (route === '/') {
			route = '';
		}
		return `<url>
			<loc>http://localhost:5173${route}</loc>
			<lastmod>2025-01-01T12:00:00+00:00</lastmod>
			<changefreq>weekly</changefreq>
			<priority>1</priority>
		</url>`;
	});

	return new Response(
		`
		<?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xhtml="https://www.w3.org/1999/xhtml"
			xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
			xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
			xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
			xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
		>
			${pages}
		</urlset>`.trim(),
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	);
}
