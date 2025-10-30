# 🚀 Deploying Frontend to Render Static Site

This guide will help you deploy your React frontend to Render as a static site.

---

## 📋 Prerequisites

- GitHub/GitLab account with your code pushed
- Backend already deployed (e.g., on Render)
- Backend URL ready to use

---

## 🎯 Quick Deploy Steps

### 1. **Prepare Your Repository**

Make sure your code is pushed to GitHub or GitLab:

```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 2. **Create New Static Site on Render**

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Static Site"**
3. Connect your GitHub/GitLab repository
4. Select the `web-investments` repository

### 3. **Configure Build Settings**

Fill in the following settings:

**Name:** `web-investments-frontend` (or your preferred name)

**Root Directory:** `client`

**Build Command:**
```bash
npm install && npm run build
```

**Publish Directory:**
```
dist
```

**Auto-Deploy:** Yes (recommended)

### 4. **Add Environment Variable**

In the **Environment** section, add:

**Key:** `VITE_API_URL`  
**Value:** `https://your-backend-app.onrender.com/api`

> 💡 Replace `your-backend-app.onrender.com` with your actual backend URL from Render

### 5. **Deploy!**

Click **"Create Static Site"**

Render will:
- ✅ Install dependencies
- ✅ Build your Vite app
- ✅ Deploy the static files
- ✅ Provide you with a URL like `https://web-investments-frontend.onrender.com`

---

## ⚙️ Configuration Files Explained

### `_redirects` File
Located in `client/public/_redirects`, this file tells Render to route all paths to `index.html` for client-side routing:

```
/* /index.html 200
```

This is crucial for React Router to work properly!

### `render.yaml` (Optional)
Located in `client/render.yaml`, this file contains the configuration for automated deployments. You can use it with Render's Infrastructure as Code feature.

---

## 🔧 Update Backend CORS

Once deployed, you need to update your backend to allow requests from your new Render static site URL.

**On your backend (Render Web Service):**

Update the `FRONTEND_URL` environment variable:

```
FRONTEND_URL=https://web-investments-frontend.onrender.com
```

> 💡 Replace with your actual Render static site URL

After updating, your backend will redeploy automatically.

---

## 🧪 Testing Your Deployment

1. **Visit your site:** `https://your-site.onrender.com`
2. **Test authentication:** Try logging in
3. **Check API calls:** Monitor browser console for errors
4. **Test routing:** Navigate between pages to ensure routing works

---

## 🐛 Troubleshooting

### Build Fails

**Issue:** Build command fails  
**Solution:**
- Check that `Root Directory` is set to `client`
- Verify `package.json` exists in the client folder
- Check build logs for specific errors

### Blank Page After Deploy

**Issue:** Site loads but shows blank page  
**Solution:**
- Check browser console for errors
- Verify `VITE_API_URL` environment variable is set correctly
- Make sure `Publish Directory` is set to `dist`

### CORS Errors

**Issue:** API calls blocked by CORS  
**Solution:**
- Update backend `FRONTEND_URL` with your exact Render static site URL
- Don't include trailing slash in URLs
- Redeploy backend after updating environment variables

### 404 on Page Refresh

**Issue:** Page refreshes lead to 404 errors  
**Solution:**
- Verify `_redirects` file exists in `client/public/`
- Content should be: `/* /index.html 200`
- Redeploy if you just added this file

### API Calls Not Working

**Issue:** Frontend can't reach backend  
**Solution:**
1. Check `VITE_API_URL` in Render dashboard
2. Make sure it includes `/api` at the end
3. Verify backend is running (check Render backend service)
4. Check browser network tab for actual API call URLs

---

## 🔄 Redeploying

### Automatic Deploys
If you enabled Auto-Deploy, pushing to your GitHub/GitLab repository will automatically trigger a new deployment.

```bash
git add .
git commit -m "Update frontend"
git push origin main
```

### Manual Deploys
In the Render Dashboard:
1. Go to your static site
2. Click **"Manual Deploy"** → **"Deploy latest commit"**

---

## 📊 Monitor Your Site

**Access Logs:**
- Go to Render Dashboard
- Select your static site
- Click **"Logs"** to see build and deployment logs

**View Build Details:**
- Each deployment shows build time
- Shows build output and any errors
- Access previous deployments

---

## 💰 Render Free Tier

Render offers **free static site hosting** with:
- ✅ Automatic deployments from Git
- ✅ Custom domains
- ✅ Free SSL certificates
- ✅ Global CDN
- ✅ Unlimited bandwidth

---

## 🎨 Custom Domain (Optional)

To use your own domain:

1. Go to your static site in Render Dashboard
2. Click **"Settings"** → **"Custom Domain"**
3. Add your domain
4. Update your domain's DNS settings as instructed
5. Wait for SSL certificate to provision (automatic)

**Don't forget to update backend CORS:**
```env
FRONTEND_URL=https://yourdomain.com
```

---

## 📝 Environment Variables Reference

| Variable | Value | Required |
|----------|-------|----------|
| `VITE_API_URL` | `https://your-backend.onrender.com/api` | ✅ Yes |

---

## ✅ Deployment Checklist

Before deploying, make sure:

- [ ] Code is pushed to GitHub/GitLab
- [ ] Backend is deployed and accessible
- [ ] `_redirects` file exists in `client/public/`
- [ ] Build command: `npm install && npm run build`
- [ ] Publish directory: `dist`
- [ ] Root directory: `client`
- [ ] Environment variable `VITE_API_URL` is set
- [ ] Backend `FRONTEND_URL` will be updated after deploy

After deploying:

- [ ] Site loads successfully
- [ ] Login/Register works
- [ ] API calls succeed (check browser console)
- [ ] Page routing works (try refreshing on different routes)
- [ ] Backend CORS updated with new URL

---

## 🚀 You're Live!

Once deployed, share your site URL:
```
https://your-site.onrender.com
```

---

## 📚 Additional Resources

- [Render Static Sites Documentation](https://render.com/docs/static-sites)
- [Render Environment Variables](https://render.com/docs/environment-variables)
- [Custom Domains on Render](https://render.com/docs/custom-domains)

---

**Need help?** Check the troubleshooting section above or consult Render's documentation.

Happy deploying! 🎉

