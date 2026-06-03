// Example: Form submission handler
export async function onRequest(context) {
  const { request } = context;

  if (request.method === "POST") {
    const formData = await request.json();

    // Here you could:
    // - Store in Cloudflare KV (key-value database)
    // - Send emails via SendGrid/Mailgun
    // - Call external APIs
    // - Validate data

    console.log("Form submission:", formData);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Form received!",
        data: formData,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return new Response("Method Not Allowed", { status: 405 });
}
