#!/bin/bash
set -e

echo "Installing Python dependencies..."
pip install pipenv

echo "Building static site..."
pipenv install
pipenv run python distill_site/manage.py collectstatic --noinput
pipenv run python distill_site/manage.py distill-local --force public

echo "Build complete!"
ls -la public | head -20
