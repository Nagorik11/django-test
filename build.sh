#!/bin/bash
set -e

echo "Installing Python dependencies..."
pip install pipenv
cd distill_site
pipenv install

echo "Building static site..."
pipenv run python manage.py distill-local ../public --collectstatic --force

echo "Build complete!"
ls -la ../public | head -20
