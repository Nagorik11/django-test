export async function onRequest(context) {
  // Example: API endpoint that returns JSON
  // This runs on Cloudflare's edge, no Django backend needed

  const { request } = context;
  const url = new URL(request.url);

  // Example: /api/hello?name=World
  if (url.pathname === "/api/hello") {
    const name = url.searchParams.get("name") || "World";
    return new Response(
      JSON.stringify({
        message: `Hello, ${name}!`,
        timestamp: new Date().toISOString(),
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return new Response("Not Found", { status: 404 });
}
