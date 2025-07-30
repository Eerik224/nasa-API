# Deployment Guide for NASA Data Explorer 🚀

This guide will help you deploy the NASA Data Explorer application to production environments.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- NASA API key (get one at https://api.nasa.gov/)
- Git repository
- Vercel account (for frontend)
- Render account (for backend)

## Step 1: Prepare Your Repository

1. **Initialize Git repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: NASA Data Explorer"
   ```

2. **Push to GitHub**:
   ```bash
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

## Step 2: Deploy Backend to Render

1. **Sign up/Login to Render**:
   - Go to [render.com](https://render.com)
   - Sign up or login to your account

2. **Create a new Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository containing your NASA Data Explorer

3. **Configure the Web Service**:
   - **Name**: `nasa-data-explorer-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Root Directory**: Leave empty (or specify if needed)

4. **Add Environment Variables**:
   - Click on "Environment" tab
   - Add the following variables:
     ```
     NASA_API_KEY=your_nasa_api_key_here
     NODE_ENV=production
     PORT=10000
     ```

5. **Deploy**:
   - Click "Create Web Service"
   - Wait for the build to complete
   - Note the deployment URL (e.g., `https://nasa-data-explorer-backend.onrender.com`)

## Step 3: Deploy Frontend to Vercel

1. **Sign up/Login to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up or login to your account

2. **Import Project**:
   - Click "New Project"
   - Import your GitHub repository
   - Select the repository

3. **Configure the Project**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add Environment Variables**:
   - Go to Project Settings → Environment Variables
   - Add the following variable:
     ```
     VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
     ```
   - Replace `your-backend-url` with your actual Render backend URL

5. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be available at the provided Vercel URL

## Step 4: Update CORS Configuration

1. **Update Backend CORS**:
   - In `backend/server.js`, update the CORS origin to include your Vercel domain:
   ```javascript
   app.use(cors({
     origin: process.env.NODE_ENV === 'production' 
       ? ['https://your-frontend-domain.vercel.app'] 
       : ['http://localhost:5173', 'http://localhost:3000'],
     credentials: true
   }));
   ```

2. **Redeploy Backend**:
   - Push changes to GitHub
   - Render will automatically redeploy

## Step 5: Test Your Deployment

1. **Test Backend API**:
   - Visit: `https://your-backend-url.onrender.com/health`
   - Should return a health check response

2. **Test Frontend**:
   - Visit your Vercel URL
   - Test all features: APOD, Mars Rover, NEO Tracker
   - Check that API calls are working

## Alternative Deployment Options

### Backend Alternatives

**Heroku**:
```bash
# Install Heroku CLI
npm install -g heroku

# Login and create app
heroku login
heroku create nasa-data-explorer-backend

# Set environment variables
heroku config:set NASA_API_KEY=your_api_key
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

**Railway**:
- Similar to Render, but with different pricing
- Good for hobby projects

### Frontend Alternatives

**Netlify**:
- Similar to Vercel
- Good for static sites and SPAs
- Automatic deployments from Git

**GitHub Pages**:
- Free hosting for static sites
- Requires build optimization

## Environment Variables Reference

### Backend (.env)
```env
NASA_API_KEY=your_nasa_api_key_here
PORT=5000
NODE_ENV=production
```

### Frontend (.env)
```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
```

## Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Ensure CORS origin includes your frontend domain
   - Check that environment variables are set correctly

2. **API Key Issues**:
   - Verify NASA API key is valid
   - Check rate limits (1000 requests per hour for free tier)

3. **Build Failures**:
   - Check Node.js version compatibility
   - Ensure all dependencies are in package.json
   - Review build logs for specific errors

4. **Environment Variables**:
   - Double-check variable names and values
   - Ensure no extra spaces or quotes
   - Redeploy after changing environment variables

### Performance Optimization

1. **Enable Caching**:
   - Add cache headers to API responses
   - Implement client-side caching for static data

2. **Image Optimization**:
   - Use WebP format where possible
   - Implement lazy loading for images

3. **Bundle Optimization**:
   - Enable code splitting
   - Minimize bundle size

## Monitoring and Maintenance

1. **Set up Monitoring**:
   - Use Render's built-in monitoring
   - Set up uptime monitoring (UptimeRobot, Pingdom)
   - Monitor API rate limits

2. **Regular Updates**:
   - Keep dependencies updated
   - Monitor for security vulnerabilities
   - Update NASA API usage as needed

3. **Backup Strategy**:
   - Keep local backups of configuration
   - Document deployment procedures
   - Maintain staging environment

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review deployment logs
3. Verify environment variables
4. Test locally first
5. Check NASA API documentation for changes

## Security Considerations

1. **API Key Security**:
   - Never commit API keys to version control
   - Use environment variables
   - Rotate keys regularly

2. **CORS Configuration**:
   - Only allow necessary origins
   - Avoid using wildcards in production

3. **Rate Limiting**:
   - Implement proper rate limiting
   - Monitor API usage

---

**Happy Deploying! 🚀**

Your NASA Data Explorer should now be live and accessible to users worldwide! 