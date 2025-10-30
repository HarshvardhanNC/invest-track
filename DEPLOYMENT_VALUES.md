# 📋 Exact Deployment Values - Copy & Paste Ready

This document contains the exact values to enter when deploying to Render and Vercel.

---

## 🗄️ STEP 1: MongoDB Atlas Setup

### Account & Cluster
1. Go to: https://www.mongodb.com/cloud/atlas
2. Click: **"Start Free"** or **"Sign In"**
3. Create Project: `Investment App` (or any name)
4. Click: **"Build a Database"**
5. Select: **"M0 FREE"** tier
6. Click: **"Create Cluster"**

### Database User
1. Username: `admin` (or your choice)
2. Password: **Generate & SAVE IT** (you'll need this!)
3. Privileges: **"Atlas admin"** or **"Read and write to any database"**
4. Click: **"Add User"**

### Network Access
1. Click: **"Add IP Address"**
2. Click: **"Allow Access from Anywhere"**
3. IP: `0.0.0.0/0` (auto-filled)
4. Click: **"Confirm"**

### Get Connection String
1. Click: **"Connect"**
2. Choose: **"Connect your application"**
3. Copy the connection string
4. Replace `<password>` with your actual password
5. Add database name before `?retryWrites`

**Final format:**
```
mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/investments?retryWrites=true&w=majority
```

---

## 🖥️ STEP 2: Render (Backend Deployment)

### Initial Setup
1. Go to: https://dashboard.render.com/
2. Click: **"New +"** → **"Web Service"**
3. Connect your GitHub account
4. Select repository: `your-repo-name`

### Service Configuration

| Field | Value |
|-------|-------|
| **Name** | `investment-backend` |
| **Region** | `Oregon (US West)` or closest to you |
| **Branch** | `main` or `master` |
| **Root Directory** | `web-investments/server` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | **Free** |

### Environment Variables

Click **"Add Environment Variable"** for each:

#### Variable 1:
```
Key:   MONGODB_URI
Value: mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/investments?retryWrites=true&w=majority
```
*(Replace with your actual MongoDB connection string)*

#### Variable 2:
```
Key:   JWT_SECRET
Value: your_super_secret_random_string_12345abcdefgh
```
*(Generate a random string - use https://www.random.org/strings/ or keyboard mash)*

#### Variable 3:
```
Key:   NODE_ENV
Value: production
```

#### Variable 4:
```
Key:   FRONTEND_URL
Value: 
```
*(Leave EMPTY for now - we'll update this after deploying frontend)*

### Deploy
1. Click: **"Create Web Service"**
2. Wait 2-5 minutes for deployment
3. **COPY YOUR BACKEND URL** (looks like: `https://investment-backend.onrender.com`)

---

## 🎨 STEP 3: Vercel (Frontend Deployment)

### Initial Setup
1. Go to: https://vercel.com/dashboard
2. Click: **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Select: `your-repo-name`

### Project Configuration

| Field | Value |
|-------|-------|
| **Framework Preset** | `Vite` |
| **Root Directory** | `web-investments/client` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

### Environment Variables

Click **"Add New"** under Environment Variables:

#### Variable 1:
```
Name:  VITE_API_URL
Value: https://YOUR-BACKEND-NAME.onrender.com/api
```

**⚠️ IMPORTANT:** 
- Replace `YOUR-BACKEND-NAME` with your actual Render backend URL
- Must include `/api` at the end
- Example: `https://investment-backend.onrender.com/api`

**Environment Selection:**
- ✅ Production
- ✅ Preview
- ✅ Development

### Deploy
1. Click: **"Deploy"**
2. Wait 1-3 minutes for deployment
3. **COPY YOUR FRONTEND URL** (looks like: `https://your-app.vercel.app`)

---

## 🔄 STEP 4: Update Backend CORS

Now that frontend is deployed, update the backend:

1. Go back to: https://dashboard.render.com/
2. Select your backend service: `investment-backend`
3. Click: **"Environment"** in left sidebar
4. Find: `FRONTEND_URL`
5. Click: **"Edit"**
6. Update value to:
   ```
   https://your-app.vercel.app
   ```
   *(Replace with your actual Vercel URL - NO trailing slash)*

7. Click: **"Save Changes"**
8. Service will auto-redeploy (wait 1-2 minutes)

---

## ✅ STEP 5: Test Your App

### Test Checklist:

1. **Visit Frontend URL:** `https://your-app.vercel.app`
   - ✅ Should see login/register page

2. **Register New User:**
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
   - ✅ Should succeed

3. **Login:**
   - Use credentials above
   - ✅ Should redirect to dashboard

4. **Add Investment:**
   - Asset Name: `Test Stock`
   - Amount: `10000`
   - Type: `Stocks`
   - ✅ Should appear in portfolio

5. **Edit Investment:**
   - Click edit button
   - Change amount
   - ✅ Should update

6. **Delete Investment:**
   - Click delete button
   - Confirm
   - ✅ Should be removed

---

## 📋 Quick Reference - All Values

### MongoDB Atlas
```
Cluster Tier: M0 FREE
Database Name: investments
Username: admin (your choice)
Password: [SAVE THIS!]
Network Access: 0.0.0.0/0
```

### Render Backend
```
Name: investment-backend
Root Directory: web-investments/server
Build Command: npm install
Start Command: npm start
Instance: Free

Environment Variables:
MONGODB_URI = [Your MongoDB connection string]
JWT_SECRET = [Random string]
NODE_ENV = production
FRONTEND_URL = [Your Vercel URL - add after Step 3]
```

### Vercel Frontend
```
Framework: Vite
Root Directory: web-investments/client
Build Command: npm run build
Output Directory: dist

Environment Variable:
VITE_API_URL = [Your Render URL]/api
```

---

## 🔗 URLs After Deployment

You'll have these URLs:

```
Frontend (Users visit):
https://your-app.vercel.app

Backend API:
https://investment-backend.onrender.com

Backend API Endpoint:
https://investment-backend.onrender.com/api
```

---

## ⚠️ Common Mistakes to Avoid

### ❌ Don't Do This:
```
VITE_API_URL = https://investment-backend.onrender.com
```
**Missing `/api` at the end!**

### ✅ Do This Instead:
```
VITE_API_URL = https://investment-backend.onrender.com/api
```

---

### ❌ Don't Do This:
```
FRONTEND_URL = https://your-app.vercel.app/
```
**Trailing slash will cause CORS errors!**

### ✅ Do This Instead:
```
FRONTEND_URL = https://your-app.vercel.app
```

---

### ❌ Don't Do This:
```
Root Directory: web-investments
```
**Wrong directory!**

### ✅ Do This Instead:
```
Backend Root Directory: web-investments/server
Frontend Root Directory: web-investments/client
```

---

## 🐛 Troubleshooting

### Backend Won't Deploy
- **Check:** Build logs in Render dashboard
- **Fix:** Ensure `Root Directory` is `web-investments/server`
- **Fix:** Verify `MONGODB_URI` is correct

### Frontend Won't Deploy
- **Check:** Deployment logs in Vercel
- **Fix:** Ensure `Root Directory` is `web-investments/client`
- **Fix:** Verify `Framework Preset` is `Vite`

### CORS Error in Browser
- **Check:** Browser console shows CORS error
- **Fix:** Update `FRONTEND_URL` in Render to exact Vercel URL
- **Fix:** No trailing slash in URL
- **Fix:** Wait for Render to redeploy after changing env var

### "Network Error" in App
- **Check:** Browser Network tab
- **Fix:** Verify `VITE_API_URL` includes `/api` at the end
- **Fix:** Ensure backend is running (visit backend URL in browser)

### Backend Slow/Not Responding
- **Note:** Render free tier spins down after 15 min inactivity
- **Fix:** First request takes 30-60 seconds (this is normal)
- **Fix:** Subsequent requests are fast

---

## 🎯 Success Checklist

After deployment, verify:

- [ ] Frontend URL loads without errors
- [ ] Can register new user
- [ ] Can login
- [ ] Can add investment
- [ ] Can edit investment
- [ ] Can delete investment
- [ ] No CORS errors in browser console
- [ ] No network errors

---

## 📞 Platform URLs

### MongoDB Atlas:
https://cloud.mongodb.com/

### Render Dashboard:
https://dashboard.render.com/

### Vercel Dashboard:
https://vercel.com/dashboard

---

## 🎉 You're Done!

If all tests pass, your app is successfully deployed! 🚀

**Share your app:** Give friends your Vercel URL!

**Monitor:** Check dashboards for usage and logs

**Update:** Push to GitHub to trigger auto-deployments

---

**Last Updated:** October 30, 2025

