# 🛠️ Local Development Guide

Complete guide for setting up and running the application locally.

---

## 📋 Prerequisites

### Required Software
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/)

### Optional but Recommended
- **MongoDB Compass** - GUI for MongoDB
- **Postman** - API testing
- **VS Code** - Code editor

---

## 🗄️ Database Setup

### Option 1: MongoDB Atlas (Cloud - Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (M0 Free tier)
4. Create database user with password
5. Add your IP address to Network Access (or allow all: 0.0.0.0/0)
6. Get connection string:
   ```
   mongodb+srv://username:password@cluster.xxxxx.mongodb.net/investments?retryWrites=true&w=majority
   ```

### Option 2: Local MongoDB

1. **Install MongoDB:**
   - **Windows:** Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - **Mac:** `brew install mongodb-community`
   - **Linux:** Follow [official guide](https://docs.mongodb.com/manual/administration/install-on-linux/)

2. **Start MongoDB:**
   ```bash
   # Windows
   mongod

   # Mac/Linux
   brew services start mongodb-community
   # or
   sudo systemctl start mongod
   ```

3. **Connection String:**
   ```
   mongodb://localhost:27017/investments
   ```

---

## 🚀 Backend Setup

### Step 1: Navigate to Server Directory
```bash
cd web-investments/server
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Create Environment File

Create a `.env` file in the `server` directory:

```env
# Database Connection
MONGODB_URI=mongodb://localhost:27017/investments
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/investments?retryWrites=true&w=majority

# JWT Secret (use any random string)
JWT_SECRET=my_super_secret_jwt_key_for_development_12345

# Server Port
PORT=8000

# Frontend URL for CORS
FRONTEND_URL=http://localhost:5173

# Environment
NODE_ENV=development
```

### Step 4: Start Backend Server
```bash
npm start
```

You should see:
```
Server is running on http://localhost:8000
MONGODB CONNECTED
```

### Step 5: Test Backend

Open browser and visit:
- http://localhost:8000 - Should show "Hello, World!"
- http://localhost:8000/api/nifty - Should show market data

---

## 🎨 Frontend Setup

### Step 1: Open New Terminal

Keep the backend running and open a new terminal window.

### Step 2: Navigate to Client Directory
```bash
cd web-investments/client
```

### Step 3: Install Dependencies
```bash
npm install
```

This will install all required packages:
- React & React DOM
- React Router
- Axios
- Tailwind CSS
- Framer Motion
- Recharts
- And more...

### Step 4: Create Environment File

Create a `.env.development` file in the `client` directory:

```env
# API Base URL (proxy will forward /api to localhost:8000)
VITE_API_URL=/api
```

**Note:** The Vite proxy in `vite.config.js` will forward all `/api` requests to `http://localhost:8000`

### Step 5: Start Development Server
```bash
npm run dev
```

You should see:
```
  VITE v6.3.5  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 6: Open Application

Visit http://localhost:5173 in your browser.

---

## ✅ Verify Everything Works

### 1. Register a New User
- Click "Register" or navigate to registration page
- Fill in username, email, password
- Submit form
- Should redirect to login

### 2. Login
- Enter your credentials
- Should redirect to dashboard

### 3. Add Investment
- Click "Add Investment" button
- Fill in the form:
  - Asset Name: "Test Stock"
  - Amount: 10000
  - Type: Stocks
  - Date: Today
- Submit
- Should appear in your portfolio

### 4. Test Other Features
- Edit the investment
- View investment details
- Delete the investment
- Search and filter
- Try different sorting options

---

## 🔧 Development Workflow

### File Structure You'll Work With

```
client/src/
├── components/
│   ├── Auth/              # Login, Register components
│   ├── Dashboard/         # Main dashboard
│   ├── pages/             # Page components
│   └── Utils/             # Navbar, Sidebar
├── context/
│   ├── auth.context.jsx        # Authentication state
│   └── investments.context.jsx # Investment data state
├── config/
│   └── api.js             # Axios configuration
└── main.jsx               # App entry point

server/
├── controller/            # Business logic
├── model/                 # Database schemas
├── route/                 # API routes
├── middleware/            # Auth middleware
└── index.js              # Server entry point
```

### Making Changes

#### Frontend Changes:
1. Edit files in `client/src/`
2. Vite will hot-reload automatically
3. See changes immediately in browser

#### Backend Changes:
1. Edit files in `server/`
2. Stop server (Ctrl+C)
3. Restart server (`npm start`)
4. For auto-reload, install nodemon:
   ```bash
   npm install -g nodemon
   # Then run:
   nodemon index.js
   ```

---

## 🐛 Troubleshooting

### Backend Issues

**Problem:** `MONGODB CONNECTED` doesn't appear
```bash
# Check if MongoDB is running
# For local MongoDB:
mongod --version

# Test connection with MongoDB Compass
```

**Problem:** Port 8000 already in use
```bash
# Change PORT in .env to different number (e.g., 8080)
PORT=8080

# Update vite.config.js proxy target accordingly
```

**Problem:** CORS errors
```bash
# Make sure FRONTEND_URL in .env matches frontend URL
FRONTEND_URL=http://localhost:5173
```

### Frontend Issues

**Problem:** `npm install` fails
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and try again
rm -rf node_modules
npm install
```

**Problem:** Vite not starting
```bash
# Check if port 5173 is available
# Or change port:
npm run dev -- --port 3000
```

**Problem:** API calls fail
```bash
# Check backend is running
# Verify VITE_API_URL in .env.development
# Check browser console for errors
```

**Problem:** Environment variables not loading
```bash
# Make sure .env.development exists in client folder
# Restart dev server after creating/editing .env files
```

### Database Issues

**Problem:** Can't connect to MongoDB Atlas
```bash
# Check Network Access settings
# Verify connection string (no <> brackets)
# Make sure password doesn't have special characters
# Or URL encode special characters
```

---

## 📝 Common Tasks

### Add a New API Endpoint

1. **Create Controller** (`server/controller/`)
   ```javascript
   export const myController = async (req, res) => {
     // Your logic here
   };
   ```

2. **Add Route** (`server/route/`)
   ```javascript
   router.get('/my-route', authMiddleware, myController);
   ```

3. **Register Route** (`server/index.js`)
   ```javascript
   app.use('/api/my-feature', myRouter);
   ```

### Add a New React Component

1. **Create Component** (`client/src/components/`)
   ```javascript
   export default function MyComponent() {
     return <div>Hello</div>;
   }
   ```

2. **Import and Use**
   ```javascript
   import MyComponent from './components/MyComponent';
   ```

### Add New Environment Variable

1. **Backend:** Add to `.env`
2. **Frontend:** Add to `.env.development` (must start with `VITE_`)
3. **Restart servers** after adding

---

## 🧪 Testing Your Changes

### Manual Testing
1. Test in browser (Chrome DevTools)
2. Check Network tab for API calls
3. Check Console for errors

### API Testing with Postman
```
POST http://localhost:8000/api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

### Database Testing
- Use MongoDB Compass to view collections
- Check if data is being saved correctly

---

## 🔄 Useful Commands

### Backend
```bash
# Install dependencies
npm install

# Start server
npm start

# With nodemon (auto-reload)
nodemon index.js
```

### Frontend
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Both
```bash
# Update dependencies
npm update

# Check for outdated packages
npm outdated

# Install specific package
npm install package-name
```

---

## 💡 Pro Tips

1. **Use Browser DevTools**
   - Network tab: Monitor API calls
   - Console: Check for errors
   - React DevTools: Inspect components

2. **Keep Terminals Organized**
   - Terminal 1: Backend server
   - Terminal 2: Frontend dev server
   - Terminal 3: Git commands / general use

3. **Use Git Branches**
   ```bash
   git checkout -b feature/my-new-feature
   ```

4. **Install VS Code Extensions**
   - ES7+ React/Redux/React-Native snippets
   - Tailwind CSS IntelliSense
   - ESLint
   - Prettier

5. **Enable Auto-Save in VS Code**
   - File → Auto Save

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

---

## 🚀 Ready to Code!

You're all set up! Start building amazing features. 🎉

**Questions?** Check the main [README.md](./README.md) or [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

Happy Coding! 💻✨

