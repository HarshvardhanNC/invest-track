# 🚀 Deployment Guide - Web Investments App

This guide will help you deploy your Investment Portfolio application with:
- **Backend** on Render (Free tier)
- **Frontend** on Vercel (Free tier)

---

## 📋 Prerequisites

Before you begin, make sure you have:
- [ ] GitHub account
- [ ] MongoDB Atlas account (for cloud database)
- [ ] Render account (sign up at https://render.com)
- [ ] Vercel account (sign up at https://vercel.com)
- [ ] Your code pushed to a GitHub repository

---

## 🗄️ Part 1: Setting Up MongoDB Atlas (Database)

### Step 1.1: Create MongoDB Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Sign In"** or **"Start Free"**
3. Create a new project (e.g., "Investment App")
4. Click **"Build a Database"**
5. Choose **"M0 FREE"** tier
6. Select a cloud provider and region closest to you
7. Click **"Create Cluster"**

### Step 1.2: Configure Database Access

1. In the left sidebar, click **"Database Access"**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Set username: `admin` (or any username you prefer)
5. **IMPORTANT:** Copy and save the password securely!
6. Set privileges to **"Read and write to any database"**
7. Click **"Add User"**

### Step 1.3: Configure Network Access

1. In the left sidebar, click **"Network Access"**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
4. Click **"Confirm"**

### Step 1.4: Get Connection String

1. Click **"Database"** in the left sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual database password
6. Replace the database name before the `?` with your app name (e.g., `investments`)
   ```
   mongodb+srv://admin:yourpassword@cluster0.xxxxx.mongodb.net/investments?retryWrites=true&w=majority
   ```
7. **Save this connection string!** You'll need it for Render.

---

## 🖥️ Part 2: Deploy Backend on Render

### Step 2.1: Push Code to GitHub

1. Make sure your code is pushed to GitHub:
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

### Step 2.2: Create Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account if not already connected
4. Select your repository
5. Configure the service:

   **Basic Settings:**
   - **Name:** `investment-backend` (or any name you prefer)
   - **Region:** Select closest to you
   - **Branch:** `main`
   - **Root Directory:** `web-investments/server`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

   **Instance Type:**
   - Select **"Free"**

### Step 2.3: Add Environment Variables

Scroll down to **"Environment Variables"** section and add:

1. Click **"Add Environment Variable"**
2. Add the following variables one by one:

   | Key | Value |
   |-----|-------|
   | `MONGODB_URI` | Your MongoDB connection string from Step 1.4 |
   | `JWT_SECRET` | Generate a random string (e.g., use random.org or type random characters) |
   | `NODE_ENV` | `production` |
   | `FRONTEND_URL` | Leave blank for now, we'll update this after deploying frontend |

   **Example:**
   ```
   MONGODB_URI = mongodb+srv://admin:yourpassword@cluster0.xxxxx.mongodb.net/investments?retryWrites=true&w=majority
   JWT_SECRET = your_super_secret_random_string_here_12345
   NODE_ENV = production
   FRONTEND_URL = (leave empty for now)
   ```

### Step 2.4: Deploy

1. Click **"Create Web Service"**
2. Wait for the deployment to complete (takes 2-5 minutes)
3. Once deployed, you'll see a URL like: `https://investment-backend.onrender.com`
4. **Copy and save this URL!** You'll need it for the frontend.

### Step 2.5: Test Backend

1. Open your browser and visit: `https://your-backend-url.onrender.com`
2. You should see: `Hello, World!`
3. Test the API: `https://your-backend-url.onrender.com/api/nifty`
4. If you see data, your backend is working! 🎉

---

## 🎨 Part 3: Deploy Frontend on Vercel

### Step 3.1: Prepare for Vercel

1. Make sure your code is pushed to GitHub with the latest changes
2. Your `vercel.json` file should already be in the `client` directory

### Step 3.2: Create Project on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. Configure the project:

   **Project Settings:**
   - **Framework Preset:** Vite
   - **Root Directory:** `web-investments/client` ← **IMPORTANT!**
   - **Build Command:** `npm run build` (should auto-fill)
   - **Output Directory:** `dist` (should auto-fill)
   - **Install Command:** `npm install` (should auto-fill)

### Step 3.3: Add Environment Variables

1. Click on **"Environment Variables"**
2. Add the following:

   | Name | Value |
   |------|-------|
   | `VITE_API_URL` | `https://your-backend-url.onrender.com/api` |

   **Example:**
   ```
   VITE_API_URL = https://investment-backend.onrender.com/api
   ```

   **IMPORTANT:** Replace with YOUR actual Render backend URL from Part 2!

3. Make sure to select **Production**, **Preview**, and **Development** for the environment

### Step 3.4: Deploy

1. Click **"Deploy"**
2. Wait for deployment to complete (takes 1-3 minutes)
3. Once deployed, you'll get a URL like: `https://your-app.vercel.app`
4. **Copy this URL!**

### Step 3.5: Test Frontend

1. Visit your Vercel URL
2. Try to register a new account
3. Login and add an investment
4. If everything works, congratulations! 🎊

---

## 🔄 Part 4: Update Backend CORS Settings

Now that your frontend is deployed, update the backend to accept requests from it:

### Step 4.1: Update Render Environment Variable

1. Go back to [Render Dashboard](https://dashboard.render.com/)
2. Select your backend service
3. Click on **"Environment"** in the left sidebar
4. Find the `FRONTEND_URL` variable
5. Update its value to your Vercel URL:
   ```
   FRONTEND_URL = https://your-app.vercel.app
   ```
6. Click **"Save Changes"**
7. Your service will automatically redeploy

---

## 🎯 Part 5: Custom Domain (Optional)

### For Vercel (Frontend):

1. Go to your project on Vercel
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain
4. Follow Vercel's instructions to update DNS records

### For Render (Backend):

1. Go to your service on Render
2. Click **"Settings"** → **"Custom Domain"**
3. Add your custom domain
4. Follow Render's instructions to update DNS records

---

## 🔍 Troubleshooting

### Backend Issues:

**Problem:** Backend shows "Application failed to respond"
- **Solution:** Check Render logs for errors
- Ensure `MONGODB_URI` is correct
- Verify all environment variables are set

**Problem:** CORS errors in browser console
- **Solution:** 
  - Make sure `FRONTEND_URL` in Render matches your Vercel URL exactly
  - Include `https://` in the URL
  - Redeploy after changing environment variables

### Frontend Issues:

**Problem:** "Network Error" or "Failed to fetch"
- **Solution:**
  - Check that `VITE_API_URL` is set correctly in Vercel
  - Make sure the backend URL includes `/api` at the end
  - Verify backend is running by visiting it directly

**Problem:** Blank page or 404 errors on refresh
- **Solution:** Make sure `vercel.json` is in the `client` directory

**Problem:** Environment variables not working
- **Solution:** 
  - Rebuild the project in Vercel after adding environment variables
  - Make sure variable name starts with `VITE_`

### Database Issues:

**Problem:** Can't connect to MongoDB
- **Solution:**
  - Check Network Access settings in MongoDB Atlas
  - Verify connection string is correct
  - Make sure password doesn't contain special characters that need encoding

---

## 📝 Important Notes

### Free Tier Limitations:

**Render (Free Tier):**
- Services spin down after 15 minutes of inactivity
- First request after inactivity takes 30-60 seconds (cold start)
- 750 hours/month of service time

**Vercel (Free Tier):**
- 100GB bandwidth/month
- Unlimited deployments
- Instant deployments (no cold starts)

**MongoDB Atlas (Free Tier):**
- 512MB storage
- Shared RAM
- Perfect for small applications

### Security Recommendations:

1. **Never commit `.env` files** to GitHub
2. Use strong passwords for MongoDB
3. Generate a strong random string for `JWT_SECRET`
4. Keep environment variables secure
5. Regularly update dependencies

### Performance Tips:

1. Backend will be slow on first request (Render free tier)
2. Consider upgrading to paid tier for production apps
3. Implement loading states in frontend for better UX
4. Use MongoDB indexes for better query performance

---

## 🚀 Future Improvements

- Set up automatic deployments from GitHub
- Add health check endpoints
- Implement logging and monitoring
- Add database backups
- Set up staging environment
- Add CI/CD pipeline

---

## 📞 Getting Help

If you encounter issues:

1. **Check Logs:**
   - Render: Dashboard → Your Service → Logs
   - Vercel: Dashboard → Your Project → Deployments → Click deployment → View Function Logs

2. **Common Resources:**
   - [Render Documentation](https://render.com/docs)
   - [Vercel Documentation](https://vercel.com/docs)
   - [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)

3. **Test Locally First:**
   - Make sure everything works locally before deploying
   - Use the same environment variables locally for testing

---

## ✅ Deployment Checklist

### Before Deployment:
- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password saved
- [ ] Network access configured
- [ ] Connection string obtained
- [ ] Code pushed to GitHub

### Backend Deployment (Render):
- [ ] Web Service created
- [ ] Root directory set to `web-investments/server`
- [ ] All environment variables added
- [ ] Service deployed successfully
- [ ] Backend URL obtained and tested

### Frontend Deployment (Vercel):
- [ ] Project created and connected to GitHub
- [ ] Root directory set to `web-investments/client`
- [ ] `VITE_API_URL` environment variable added
- [ ] Project deployed successfully
- [ ] Frontend URL obtained

### Post-Deployment:
- [ ] Backend CORS updated with frontend URL
- [ ] Registration tested
- [ ] Login tested
- [ ] Add/Edit/Delete investment tested
- [ ] All features working correctly

---

## 🎉 Success!

If you've completed all steps, your Investment Portfolio app is now live and accessible to anyone with the link!

**Your URLs:**
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.onrender.com`

Share your frontend URL with friends and family to show off your work! 🌟

---

**Last Updated:** October 2025

