const ALLOWED_ORIGINS = new Set([
	"https://ilekaede.github.io",
	"http://localhost:3000",
]);

const corsHeaders = (origin: string) => ({
	"Access-Control-Allow-Origin": ALLOWED_ORIGINS.has(origin) ? origin : "",
	"Access-Control-Allow-Methods": "GET, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type",
});

export interface Env {
	ARTICLES_BUCKET: R2Bucket;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const origin = request.headers.get("Origin") ?? "";

		if (request.method === "OPTIONS") {
			return new Response(null, { status: 204, headers: corsHeaders(origin) });
		}

		const url = new URL(request.url);
		const match = url.pathname.match(/^\/articles\/([a-zA-Z0-9_-]+)$/);
		if (!match) {
			return new Response("Not Found", { status: 404, headers: corsHeaders(origin) });
		}

		const key = `${match[1]}.md`;
		const object = await env.ARTICLES_BUCKET.get(key);
		if (!object) {
			return new Response("Not Found", { status: 404, headers: corsHeaders(origin) });
		}

		return new Response(object.body, {
			headers: {
				...corsHeaders(origin),
				"Content-Type": "text/markdown; charset=utf-8",
				"Cache-Control": "public, max-age=300",
			},
		});
	},
} satisfies ExportedHandler<Env>;
