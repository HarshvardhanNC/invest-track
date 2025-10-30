# Frontend Environment Variables

## Development Environment

Create a `.env.development` file in the `client` directory with:

```env
# Development Environment Variables
# Vite proxy will handle /api requests to localhost:8000
VITE_API_URL=/api
```

## Production Environment

You'll set this as an environment variable in Render (Static Site):

```env
# API Base URL (Your backend URL - can be from Render, Railway, etc.)
VITE_API_URL=https://your-backend-app.onrender.com/api
```

**Important:** Replace `your-backend-app.onrender.com` with your actual backend deployment URL.

## Notes:
- Environment variables in Vite must be prefixed with `VITE_`
- These variables are exposed to the client, so don't include secrets
- Render will automatically use production environment variables during build
- The build happens on Render's servers, so set the variable in Render Dashboard

