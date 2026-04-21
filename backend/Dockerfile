FROM python:3.11-slim

WORKDIR /app

# Install system dependencies for Playwright and psycopg2
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install Playwright browsers and dependencies
RUN playwright install --with-deps chromium

# Copy the rest of the application
COPY . .

ENV PYTHONPATH=/app

EXPOSE 8000
