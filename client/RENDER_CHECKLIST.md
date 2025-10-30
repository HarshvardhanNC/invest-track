# ✅ Render Static Site Deployment Checklist

Use this checklist to ensure a smooth deployment to Render.

---

## 📦 Pre-Deployment Checks

### Code Repository
- [ ] Code is committed to Git
- [ ] Code is pushed to GitHub or GitLab
- [ ] Repository is public or Render has access

### Files Verification
- [ ] `client/public/_redirects` exists (for SPA routing)
- [ ] `client/package.json` has `build` script
- [ ] `client/vite.config.js` outputs to `dist/`
- [ ] `client/src/config/api.js` uses `VITE_API_URL`

### Backend Ready
- [ ] Backend is deployed and accessible
- [ ] Backend URL is noted (e.g., `https://backend.onrender.com`)
- [ ] Backend `/api` endpoints respond correctly
- [ ] MongoDB/Database is connected to backend

---

## 🚀 Render Configuration

### Create Static Site
- [ ] Logged into Render Dashboard
- [ ] Clicked "New +" → "Static Site"
- [ ] Connected Git repository
- [ ] Selected correct repository

### Build Settings
- [ ] **Name:** Set to something meaningful (e.g., `web-investments-frontend`)
- [ ] **Root Directory:** `client`
- [ ] **Build Command:** `npm install && npm run build`
- [ ] **Publish Directory:** `dist`
- [ ] **Auto-Deploy:** Enabled (Yes)

### Environment Variables
- [ ] Added `VITE_API_URL`
- [ ] Value is: `https://your-backend.onrender.com/api`
- [ ] Double-check: URL has `/api` at the end
- [ ] Double-check: No trailing slash after `/api`

### Deploy
- [ ] Clicked "Create Static Site"
- [ ] Waited for build to complete (2-5 mins)
- [ ] Build succeeded (check logs if failed)
- [ ] Noted the frontend URL

---

## 🔧 Post-Deployment Configuration

### Update Backend CORS
- [ ] Go to backend service on Render
- [ ] Navigate to Environment variables
- [ ] Update/Add `FRONTEND_URL`
- [ ] Set to: `https://your-frontend.onrender.com` (exact URL)
- [ ] No trailing slash
- [ ] Save changes (backend will redeploy)

---

## 🧪 Testing

### Basic Functionality
- [ ] Visit your frontend URL
- [ ] Site loads without errors
- [ ] No blank page
- [ ] UI renders correctly

### Authentication
- [ ] Can access register page
- [ ] Can register a new account
- [ ] Can login with credentials
- [ ] Token is stored in localStorage
- [ ] Can access protected routes (dashboard)
- [ ] Can logout successfully

### API Integration
- [ ] Open browser Developer Tools (F12)
- [ ] Check Console tab - no CORS errors
- [ ] Check Network tab
- [ ] API calls go to correct backend URL
- [ ] API calls return 200 OK (or appropriate status)
- [ ] Data loads in dashboard/pages

### Routing
- [ ] Can navigate between pages
- [ ] URL changes correctly
- [ ] Refresh page - no 404 error
- [ ] Direct URL access works (e.g., `/dashboard`)
- [ ] Back/forward buttons work

---

## 🐛 Troubleshooting

### If Build Fails

1. Check Build Logs in Render Dashboard
2. Common issues:
   - [ ] Wrong Root Directory (should be `client`)
   - [ ] Missing package.json
   - [ ] Dependency issues (check package-lock.json is committed)
   - [ ] Build command incorrect

**Fix:** Update settings in Render Dashboard → Redeploy

### If Page is Blank

1. Check Browser Console (F12)
2. Common issues:
   - [ ] `VITE_API_URL` not set
   - [ ] JavaScript errors in console
   - [ ] Wrong Publish Directory (should be `dist`)

**Fix:** Add/update environment variable → Trigger redeploy

### If CORS Errors Appear

1. Check exact error in console
2. Common issues:
   - [ ] Backend `FRONTEND_URL` not set
   - [ ] Backend `FRONTEND_URL` has typo
   - [ ] URLs don't match exactly (case-sensitive!)
   - [ ] Trailing slashes mismatch

**Fix:** Update backend `FRONTEND_URL` → Backend redeployes

### If 404 on Page Refresh

1. Check `_redirects` file exists
2. Common issues:
   - [ ] File missing from `client/public/`
   - [ ] File content incorrect
   - [ ] File not committed to Git

**Fix:** Ensure file exists with content `/* /index.html 200` → Commit → Push

### If API Calls Fail

1. Check Network tab in browser
2. Common issues:
   - [ ] Backend is sleeping (Render free tier)
   - [ ] Backend URL incorrect in `VITE_API_URL`
   - [ ] Backend not accepting requests
   - [ ] Auth token expired/invalid

**Fix:** Check backend logs → Verify environment variables

---

## 📊 Environment Variables Reference

### Frontend (Render Static Site)

| Variable | Value | Example |
|----------|-------|---------|
| `VITE_API_URL` | Your backend URL + `/api` | `https://backend.onrender.com/api` |

### Backend (Render Web Service)

| Variable | Value | Example |
|----------|-------|---------|
| `FRONTEND_URL` | Your frontend URL | `https://frontend.onrender.com` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key (min 32 chars) | `your_secret_key_here` |
| `NODE_ENV` | Environment | `production` |

---

## 🔄 Redeploy Process

### After Code Changes

1. Make changes locally
2. Test locally: `npm run dev`
3. Commit changes: `git add . && git commit -m "message"`
4. Push to repository: `git push origin main`
5. Render auto-deploys (if enabled)
6. Check deployment in Render Dashboard
7. Test live site

### Manual Redeploy

1. Go to Render Dashboard
2. Select your static site
3. Click "Manual Deploy"
4. Select "Deploy latest commit"
5. Wait for build to complete

### After Environment Variable Changes

1. Update variable in Render Dashboard
2. Click "Save"
3. Manually trigger redeploy (or wait for next auto-deploy)
4. Variables are applied during build time

---

## 🎯 Success Criteria

Your deployment is successful when:

- ✅ Site loads at Render URL
- ✅ Can register and login
- ✅ Dashboard shows data
- ✅ No CORS errors in console
- ✅ Page refresh works (no 404)
- ✅ Navigation works smoothly
- ✅ API calls succeed
- ✅ Logout works correctly

---

## 📱 Optional: Custom Domain

### Setup Custom Domain

- [ ] Own a domain name
- [ ] Go to Render Dashboard → Your static site
- [ ] Click "Settings" → "Custom Domain"
- [ ] Add your domain
- [ ] Update DNS records as instructed
- [ ] Wait for DNS propagation (can take 24-48 hrs)
- [ ] SSL certificate auto-provisions

### Update Backend

- [ ] Update backend `FRONTEND_URL` to your custom domain
- [ ] Example: `FRONTEND_URL=https://yourdomain.com`

---

## 💰 Free Tier Reminders

### Static Sites (Frontend)
- ✅ **Free** forever
- ✅ **No sleep** - always fast
- ✅ Unlimited bandwidth
- ✅ Global CDN
- ✅ Auto SSL

### Web Services (Backend)
- ⏰ **Sleeps** after 15 mins inactivity
- ⏰ Takes ~30 seconds to wake up
- ✅ 750 hours/month free
- ⚠️ Consider paid plan for production apps

---

## 📚 Additional Resources

- [Render Static Sites Docs](https://render.com/docs/static-sites)
- [Render Environment Variables](https://render.com/docs/environment-variables)
- [Render Custom Domains](https://render.com/docs/custom-domains)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

## ✨ Next Steps After Deployment

1. **Monitor:** Check Render Dashboard regularly
2. **Share:** Share your live URL
3. **Improve:** Add features, fix bugs
4. **Scale:** Consider paid plans if needed
5. **Backup:** Keep code in Git always

---

## 🎓 Tips for Success

1. **Always test locally first** before deploying
2. **Check logs** when something goes wrong
3. **Environment variables** need redeploy to take effect
4. **Keep secrets secret** - never commit `.env` files
5. **Monitor costs** if you upgrade from free tier
6. **Use Git branches** for experimental features
7. **Document changes** for future reference

---

## 📞 Need Help?

- **Build issues:** Check Render build logs
- **Runtime issues:** Check browser console
- **API issues:** Check backend logs
- **Deployment guides:** See `RENDER_DEPLOYMENT.md` or `RENDER_QUICKSTART.md`

---

**You've got this!** 🚀

Follow this checklist step-by-step and your app will be live in no time.

Good luck! 🌟

