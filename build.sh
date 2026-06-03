#!/bin/bash
set -e

echo "Installing Python dependencies..."
pip install pipenv

echo "Setting up Django environment..."
cd distill_site

# Create local_settings.py if it doesn't exist
if [ ! -f distill_site/local_settings.py ]; then
  echo "Creating local_settings.py..."
  cat > distill_site/local_settings.py << 'EOF'
# Local settings for django-distill
# This file is auto-generated during build

GITHUB_USERNAME = ''
GITHUB_ACCESS_TOKEN = ''
EOF
fi

echo "Installing project dependencies..."
pipenv install

echo "Building static site..."
pipenv run python manage.py collectstatic --noinput
pipenv run python manage.py distill-local --force ../public

echo "Build complete!"
