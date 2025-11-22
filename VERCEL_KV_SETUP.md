# Vercel KV Setup Guide

## Why Vercel KV?

Vercel serverless functions are **stateless** - they don't persist file system changes. The app was using a JSON file (`data/auth_data.json`) for storage, which won't work on Vercel.

**Solution:** Use Vercel KV (Redis) for database storage.

## Setup Steps

### 1. Create Vercel KV Database

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (`devwell-test`)
3. Go to **Storage** tab
4. Click **Create Database**
5. Select **KV** (Redis)
6. Choose a name (e.g., `devwell-kv`)
7. Select a region close to you
8. Click **Create**

### 2. Link KV to Your Project

After creating the KV database:

1. You'll see connection details
2. Vercel automatically adds these environment variables:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`

3. **Important:** These are automatically set - you don't need to add them manually!

### 3. Redeploy Your Project

After creating the KV database:

1. Go to **Deployments** tab
2. Click **⋯** on the latest deployment
3. Click **Redeploy**

The app will now use Vercel KV for storage instead of the file system.

## How It Works

- **On Vercel:** Uses Vercel KV (Redis) for storage
- **Local Development:** Falls back to file system (`data/auth_data.json`)

The code automatically detects if KV is available and uses it, otherwise falls back to file system.

## Verify It's Working

After redeploying:

1. Try logging in with GitHub
2. Check Vercel function logs - you should see `[DB] Using Vercel KV` messages
3. Your auth data will be stored in KV and persist across deployments

## Free Tier Limits

Vercel KV free tier includes:
- 256 MB storage
- 30,000 commands/day
- More than enough for this app!

## Troubleshooting

### "KV not available" in logs

- Make sure you created the KV database in Vercel
- Check that environment variables are set (they should be automatic)
- Redeploy after creating KV

### Still seeing file system errors

- The code falls back to file system if KV isn't available
- Make sure KV database is created and linked to your project
- Redeploy after setup

## Alternative: Use a Different Database

If you prefer, you can use:
- **Supabase** (PostgreSQL) - Free tier available
- **MongoDB Atlas** - Free tier available
- **PlanetScale** (MySQL) - Free tier available

But Vercel KV is the simplest and fastest to set up!

