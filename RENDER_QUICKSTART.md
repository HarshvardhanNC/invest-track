# 🚀 Quick Deploy to Render - 10 Minute Guide

Fast-track guide to deploy your web-investments app to Render.

---

## 📋 Prerequisites Checklist

- [ ] Code pushed to GitHub/GitLab
- [ ] MongoDB Atlas setup complete (or backend DB ready)
- [ ] Backend deployed (get the URL)

---

## 🎯 Step 1: Deploy Backend (if not done)

### On Render Dashboard:
1. New + → **Web Service**
2. Connect repository → Select `web-investments`
3. Configure:
   - **Name:** `web-investments-backend`
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
   - **Instance Type:** Free

4. Add Environment Variables:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_super_secret_jwt_key_here_min_32_chars
NODE_ENV=production
FRONTEND_URL=https://your-frontend-will-add-this-later.onrender.com
```

5. **Create Web Service** → Note the URL (e.g., `https://web-investments-backend.onrender.com`)

---

## 🎯 Step 2: Deploy Frontend (Static Site)

### On Render Dashboard:
1. New + → **Static Site**
2. Connect repository → Select `web-investments`
3. Configure:
   - **Name:** `web-investments-frontend`
   - **Root Directory:** `client`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`

4. Add Environment Variable:
```env
VITE_API_URL=https://web-investments-backend.onrender.com/api
```
   *(Use your actual backend URL from Step 1)*

5. **Create Static Site** → Note the URL (e.g., `https://web-investments-frontend.onrender.com`)

---

## 🎯 Step 3: Update Backend CORS

### In Backend Web Service:
1. Go to **Environment**
2. Update `FRONTEND_URL`:
```env
FRONTEND_URL=https://web-investments-frontend.onrender.com
```
   *(Use your actual frontend URL from Step 2)*

3. Save → Backend will auto-redeploy

---

## ✅ Verify Deployment

1. **Visit frontend URL** → Should load the app
2. **Try registering** → Create a test account
3. **Login** → Should work without CORS errors
4. **Check browser console** → No errors (some warnings OK)

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Build fails | Check build logs; verify Root Directory = `client` |
| Blank page | Check browser console; verify `VITE_API_URL` is set |
| CORS error | Update backend `FRONTEND_URL` with exact frontend URL |
| 404 on refresh | Verify `_redirects` file exists in `client/public/` |
| Can't login | Check network tab; verify API URL is correct |

---

## 📝 Environment Variables Summary

### Backend (Web Service)
```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_min_32_chars
NODE_ENV=production
FRONTEND_URL=https://[your-frontend].onrender.com
```

### Frontend (Static Site)
```env
VITE_API_URL=https://[your-backend].onrender.com/api
```

---

## 🔄 After Making Changes

**Push to GitHub:**
```bash
git add .
git commit -m "Your changes"
git push origin main
```

Render auto-deploys on push! ✨

---

## 📚 Need More Help?

- Detailed guide: `client/RENDER_DEPLOYMENT.md`
- Configuration details: `DEPLOYMENT_CHANGES.md`
- Render docs: https://render.com/docs

---

## ⚡ Done!

Your app is live at:
- **Frontend:** `https://your-frontend.onrender.com`
- **Backend:** `https://your-backend.onrender.com`

Share it with the world! 🎉

---

## 💰 Free Tier Notes

- Backend sleeps after 15 mins of inactivity (takes ~30s to wake up)
- Frontend (static site) is always fast - no sleep!
- 750 hours/month free for web services
- Unlimited bandwidth for static sites

---

**Time to deploy:** ~10 minutes  
**Cost:** $0 (Free tier)  
**Difficulty:** ⭐⭐☆☆☆

Happy deploying! 🚀

