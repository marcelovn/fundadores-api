# Fundadores API

API server built with Express and MongoDB for managing founder data.

## Features

- RESTful API for founder information
- MongoDB integration with Mongoose
- CORS enabled
- Health check endpoint

## API Endpoints

- `GET /` - Health check
- `GET /fundadores` - Get all founders
- `GET /fundadores/:id` - Get founder by ID

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables (copy `.env.example` to `.env`):
   ```bash
   cp .env.example .env
   ```

3. Update the `.env` file with your MongoDB connection details

4. Start the server:
   ```bash
   npm start
   ```

## Deploy to Railway

1. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Login to Railway:
   ```bash
   railway login
   ```

3. Initialize and deploy:
   ```bash
   railway project create
   railway up
   ```

4. Set environment variables in Railway dashboard:
   - `MONGODB_URI` - Your MongoDB connection string
   - `MONGODB_DB_NAME` - Your database name
   - `MONGODB_COLLECTION` - Collection name (optional, defaults to 'fundadores')

## Environment Variables

- `PORT` - Server port (automatically set by Railway)
- `MONGODB_URI` - MongoDB connection string
- `MONGODB_DB_NAME` - Database name
- `MONGODB_COLLECTION` - Collection name (optional)
