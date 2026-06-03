# Cloudflare Pages Setup Instructions

## The Error
```
Failed: root directory not found
```

This happens when Cloudflare Pages build settings are incorrect.

## Fix: Update Your Cloudflare Pages Settings

### 1. Go to Cloudflare Dashboard
- Navigate to **Pages** → Your project → **Settings** → **Builds & Deployments**

### 2. Configure Build Settings

**Leave these as defaults:**
- **Root directory:** `/` (leave empty or as default)
- **Framework preset:** `None`

**Set these exactly:**

#### Build Command
```bash
cd distill_site && pip install pipenv && pipenv install && pipenv run python manage.py distill-local ../public --collectstatic --force
```

#### Build Output Directory
```
public
```

**Or if the above doesn't work, try this simpler version:**

#### Alternative Build Command
```bash
pipenv install && pipenv run python distill_site/manage.py distill-local public --collectstatic --force
```

#### Alternative Build Output Directory
```
public
```

### 3. Environment Variables (if needed)
If your Django settings require environment variables, add them:
- **Key:** `DJANGO_SETTINGS_MODULE`
- **Value:** `distill_site.settings`

### 4. Python Version
Cloudflare Pages defaults to Python 3.7. If you need Python 3.12:

Add a `runtime.txt` file in your repo root:
```
python-3.12
```

## Repository Structure Check

Make sure your GitHub repo has this structure:
```
django-test/
├── distill_site/
│   ├── manage.py
│   ├── settings.py
│   └── ...
├── Pipfile
├── Pipfile.lock
├── package.json
├── wrangler.toml
├── src/
│   └── index.js
└── functions/
    └── api/
        ├── hello.js
        └── contact.js
```

## Common Issues & Fixes

| Error | Fix |
|-------|-----|
| `root directory not found` | Build command has wrong path (try `cd distill_site &&`) |
| `ModuleNotFoundError: No module named 'pipenv'` | Use `pip install pipenv` before `pipenv install` |
| `Python 3.7 not compatible` | Add `runtime.txt` with `python-3.12` |
| Build timeout | Reduce dependencies or increase timeout in settings |

## After Setting These:

1. Click **Save and Deploy**
2. Trigger a new build by pushing a commit to your repo
3. Check the **Deployments** tab for build logs

## Manual Testing

To test locally that the build command works:
```bash
cd /workspaces/django-test
cd distill_site && pip install pipenv && pipenv install && pipenv run python manage.py distill-local ../public --collectstatic --force
```

If this works locally, it will work on Cloudflare Pages!
