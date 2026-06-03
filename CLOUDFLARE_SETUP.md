# Cloudflare Hybrid Deployment Guide

## Architecture

```
Your Django Site
├── Static Pages (Cloudflare Pages)
│   └── django-distill generates HTML/CSS/JS
├── API/Functions (Cloudflare Functions)
│   └── JavaScript functions for dynamic features
└── External Services
    └── Email, analytics, etc.
```


## Deployment Process

### Step 1: Build Static Site

```bash
cd distill_site
python manage.py distill-local ../public
```

This generates static HTML in the `public/` folder.

### Step 2: Test Functions Locally

```bash
# From project root
npm run dev
```

Visit `http://localhost:8787/api/hello?name=YourName`

### Step 3: Deploy to Cloudflare

First, authenticate:
```bash
wrangler login
```

Then deploy:
```bash
npm run deploy
```

## What's Included

### Functions

1. **`functions/api/hello.js`** - Example GET endpoint
2. **`functions/api/contact.js`** - Example POST endpoint

### How to Add More Functions

Create a new file in `functions/api/`:

```javascript
// functions/api/your-endpoint.js
export async function onRequest(context) {
  const { request } = context;
  
  // Your logic here
  return new Response("Hello!");
}
```

It will automatically be available at `/api/your-endpoint`

## Next Steps

1. **Update wrangler.toml** with your Cloudflare account ID
2. **Add your custom Functions** in the `functions/` directory
3. **Connect Cloudflare Pages** to your GitHub repo
4. **Configure GitHub Actions** to build static site on push
5. **Deploy Functions** with `npm run deploy`

## Useful Resources

- [Cloudflare Functions Docs](https://developers.cloudflare.com/functions/)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)
- [KV Store (Database)](https://developers.cloudflare.com/workers/runtime-apis/kv/)
