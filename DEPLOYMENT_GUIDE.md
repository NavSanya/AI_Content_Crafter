# AI Content Crafter - Render Deployment Guide

## Prerequisites
- Google Gemini API key
- Render account (https://render.com)
- GitHub repository with your code

## Step 1: Deploy Backend on Render

1. **Go to Render Dashboard**: https://render.com
2. **Create Web Service**: Click "New" > "Web Service"
3. **Connect GitHub**: Connect your repository
4. **Configure Backend Service**:
   - **Name**: `ai-content-crafter-backend`
   - **Environment**: Python
   - **Root Directory**: `backend/`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Plan**: Free

5. **Environment Variables**:
   - Add `GEMINI_API_KEY` with your Google Gemini API key

6. **Deploy**: Click "Create Web Service"
7. **Note Backend URL**: After deployment, note the URL (e.g., `https://ai-content-crafter-backend.onrender.com`)

## Step 2: Update Frontend API URL

1. **Edit `frontend/js/main.js`**:
   - Replace `https://your-backend-service-name.onrender.com` with your actual backend URL
   - Example: `https://ai-content-crafter-backend.onrender.com/generate`

2. **Commit and push** the changes to GitHub

## Step 3: Deploy Frontend on Render

1. **Go to Render Dashboard**
2. **Create Static Site**: Click "New" > "Static Site"
3. **Connect GitHub**: Connect your repository
4. **Configure Frontend Service**:
   - **Name**: `ai-content-crafter-frontend`
   - **Root Directory**: `frontend/`
   - **Build Command**: (leave empty)
   - **Publish Directory**: `/`
   - **Plan**: Free

5. **Deploy**: Click "Create Static Site"
6. **Note Frontend URL**: After deployment, note the URL (e.g., `https://ai-content-crafter-frontend.onrender.com`)

## Step 4: Test Your Application

1. Open your frontend URL in a browser
2. Test the content generation functionality
3. Verify that API calls are going to your backend service

## Important Notes

- **Free Tier Limitations**: Render's free tier has cold starts and may take a few seconds to respond
- **API Key Security**: Never commit your API key to GitHub
- **CORS**: Your Flask backend already has CORS enabled for frontend communication
- **Custom Domain**: You can add a custom domain in Render settings

## Troubleshooting

1. **Backend not starting**: Check Render logs for Python errors
2. **API calls failing**: Verify the backend URL in frontend JavaScript
3. **Environment variables**: Ensure `GEMINI_API_KEY` is set correctly
4. **Build failures**: Check that all dependencies are in `requirements.txt`

## Files Modified for Deployment

- `backend/Procfile` - Added for Render deployment
- `frontend/js/main.js` - Updated API endpoint URL

Your application is now ready for production use on Render!
