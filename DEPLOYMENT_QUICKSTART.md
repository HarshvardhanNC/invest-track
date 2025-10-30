# 🚀 Quick Deployment Guide

**TL;DR** - Deploy your app in 15 minutes!

---

## 1. MongoDB Atlas (2 minutes)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster (M0)
3. Create database user + password
4. Set Network Access → "Allow from Anywhere"
5. Get connection string:
   ```
   mongodb+srv://username:password@cluster.xxxxx.mongodb.net/investments?retryWrites=true&w=majority
   ```

---

## 2. Deploy Backend on Render (5 minutes)

1. Go to [Render](https://dashboard.render.com/)
2. **New+ → Web Service** → Connect GitHub repo
3. **Settings:**
   - Root Directory: `web-investments/server`
   - Build: `npm install`
   - Start: `npm start`
   
4. **Environment Variables:**
   ```
   MONGODB_URI = your_mongodb_connection_string
   JWT_SECRET = random_secret_string_123456
   NODE_ENV = production
   FRONTEND_URL = (leave empty for now)
   ```

5. **Create Web Service** → Wait for deployment
6. **Copy your backend URL:** `https://your-app.onrender.com`

---

## 3. Deploy Frontend on Vercel (5 minutes)

1. Go to [Vercel](https://vercel.com/dashboard)
2. **Add New → Project** → Import GitHub repo
3. **Settings:**
   - Root Directory: `web-investments/client`
   - Framework: Vite
   
4. **Environment Variable:**
   ```
   VITE_API_URL = https://your-backend.onrender.com/api
   ```
   ⚠️ Replace with YOUR Render URL + `/api`

5. **Deploy** → Wait for deployment
6. **Copy your frontend URL:** `https://your-app.vercel.app`

---

## 4. Update Backend CORS (2 minutes)

1. Go back to Render Dashboard
2. Select your backend service → **Environment**
3. Update `FRONTEND_URL`:
   ```
   FRONTEND_URL = https://your-app.vercel.app
   ```
4. Save → Auto-redeploys

---

## ✅ Test Your App

1. Visit your Vercel URL
2. Register → Login → Add Investment
3. If it works → **SUCCESS!** 🎉

---

## 🐛 Quick Fixes

**CORS Error?**
- Check `FRONTEND_URL` matches Vercel URL exactly

**Network Error?**
- Check `VITE_API_URL` has `/api` at the end
- Verify backend is running

**Blank Page?**
- Make sure `vercel.json` exists in client folder

---

## 📱 Your App is Live!

**Frontend:** `https://your-app.vercel.app`

Share and enjoy! 🌟

For detailed guide, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

