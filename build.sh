#!/bin/bash
set -e

apt-get update
apt-get install -y --no-install-recommends libsqlite3-dev
echo "Installing Python dependencies..."
pip install pipenv

echo "Setting up Django environment..."
cd distill_site

# Create local_settings.py with content
cat > distill_site/local_settings.py << 'EOF'
GITHUB_USERNAME = ''
GITHUB_ACCESS_TOKEN = ''
EOF

echo "Installing project dependencies..."
pipenv install

echo "Building static site..."
pipenv run python manage.py collectstatic --noinput
pipenv run python manage.py distill-local --force ../public

echo "Build complete!"
