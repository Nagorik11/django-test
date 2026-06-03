/**
 * Cloudflare Worker Entry Point
 * Routes API requests to Functions
 */

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Route /api/* requests to Functions
    if (url.pathname.startsWith("/api/")) {
      return handleAPI(request, url);
    }

    // For static pages, serve from Cloudflare Pages
    return new Response("Static pages served by Cloudflare Pages", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  },
};

async function handleAPI(request, url) {
  try {
    // Extract the API endpoint
    const pathname = url.pathname.replace("/api/", "");
    const parts = pathname.split("/");
    const endpoint = parts[0];

    // Route to appropriate handler
    if (endpoint === "hello" && request.method === "GET") {
      const name = url.searchParams.get("name") || "World";
      return new Response(
        JSON.stringify({
          message: `Hello, ${name}!`,
          timestamp: new Date().toISOString(),
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (endpoint === "contact" && request.method === "POST") {
      const data = await request.json();
      return new Response(
        JSON.stringify({
          success: true,
          message: "Form received!",
          data: data,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 404 for unknown endpoints
    return new Response(
      JSON.stringify({ error: "API endpoint not found" }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
