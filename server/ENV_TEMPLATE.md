# Environment Variables Template

Create a `.env` file in the server directory with the following variables:

```env
# MongoDB Connection String
MONGODB_URI=your_mongodb_connection_string_here

# JWT Secret Key (Use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Server Port (Render will provide this automatically)
PORT=3000

# Frontend URL for CORS (comma-separated for multiple origins)
# For production: https://your-app.vercel.app
# For development: http://localhost:5173
FRONTEND_URL=http://localhost:5173

# Node Environment
NODE_ENV=production
```

## Important Notes:
- Never commit the actual `.env` file to version control
- Use strong, unique values for JWT_SECRET
- Update FRONTEND_URL with your Vercel deployment URL once deployed

