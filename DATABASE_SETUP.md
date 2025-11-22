# Database Setup for Vercel

## Current Status

The app **works without a database** for basic authentication! Here's how:

### How It Works

1. **Session Management**: Uses JWT tokens stored in cookies (no database needed)
2. **GitHub Data Storage**: 
   - **On Vercel without KV**: Uses in-memory storage (data resets on each function invocation)
   - **With Vercel KV**: Persists data across function invocations
   - **Local Development**: Uses JSON file (`data/auth_data.json`)

### Do You Need a Database?

**Short answer: No, for basic login it works without one!**

However:
- ✅ **Login/Authentication**: Works perfectly without database (uses JWT cookies)
- ⚠️ **GitHub Data Persistence**: Without KV, GitHub data (repos, events, commits) is fetched fresh each time
- ✅ **With Vercel KV**: Data persists and loads faster

## Option 1: Use Without Database (Current Setup)

The app will work, but:
- GitHub data (repos, events, commits) will be fetched fresh on each request
- Slightly slower, but fully functional

**No setup required!** Just ensure environment variables are set.

## Option 2: Set Up Vercel KV (Recommended for Production)

Vercel KV is a key-value database that persists data across function invocations.

### Setup Steps

1. **Go to Vercel Dashboard**
   - Select your project
   - Go to **Storage** tab
   - Click **Create Database**
   - Select **KV** (Key-Value)

2. **Connect to Your Project**
   - Vercel will automatically add environment variables:
     - `KV_REST_API_URL`
     - `KV_REST_API_TOKEN`

3. **Redeploy**
   - After creating KV, Vercel will automatically redeploy
   - Or manually redeploy from the Deployments tab

4. **Verify**
   - Check Vercel function logs for: `[DB] Using Vercel KV for storage`
   - Visit `/api/debug/env` to see if KV is configured

### Benefits of Vercel KV

- ✅ GitHub data persists across requests
- ✅ Faster loading (data cached)
- ✅ Better user experience
- ✅ Free tier: 256 MB storage, 30K reads/day, 30K writes/day

## Verify Your Setup

Visit: `https://your-app.vercel.app/api/debug/env`

This will show:
- Which environment variables are set
- Whether KV is configured
- Current configuration status

## Troubleshooting

### "Login failed: Unknown error"

1. **Check Environment Variables**:
   - Visit `/api/debug/env` to see what's missing
   - Ensure all required variables are set in Vercel

2. **Required Variables**:
   ```
   GITHUB_CLIENT_ID=your_client_id
   GITHUB_CLIENT_SECRET=your_client_secret
   GITHUB_REDIRECT_URL=https://your-app.vercel.app/api/auth/github/callback
   JWT_SECRET=your_random_string
   FRONTEND_URL=https://your-app.vercel.app
   ```

3. **Check Vercel Function Logs**:
   - Go to Vercel Dashboard → Your Project → Functions
   - Click on a function execution
   - Look for error messages

### "Not authenticated" After Login

1. **Check Cookie Settings**:
   - Cookies must have `secure: true` for HTTPS (Vercel)
   - Cookies must have `sameSite: 'lax'` for OAuth redirects

2. **Verify JWT_SECRET**:
   - Must be set in Vercel environment variables
   - Should be a long random string (32+ characters)

3. **Check Browser Console**:
   - Look for cookie-related errors
   - Check if cookies are being set

## Summary

- ✅ **No database needed** for basic authentication
- ✅ **Works out of the box** with in-memory storage
- 🚀 **Vercel KV recommended** for production (better performance)
- 📝 **Check `/api/debug/env`** to verify your setup

