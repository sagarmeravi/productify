# Productify - Railway Deployment Guide

## Prerequisites
- Railway account (free at https://railway.app)
- Git repository initialized and pushed
- GitHub account linked to Railway

## Deployment Steps

### 1. Update Backend Environment Variables on Railway
In your Railway dashboard, add these environment variables:
```
PORT=3000
DATABASE_URL=your_postgresql_url
NODE_ENV=production
CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_key
FRONTEND_URL=https://your-railway-domain.up.railway.app
```

### 2. Deploy to Railway

**Option A: Using Railway CLI**
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

**Option B: Using Railway Dashboard**
1. Go to https://railway.app/dashboard
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your GitHub repository
4. Railway will automatically detect and build your project
5. Add environment variables in the Variables section
6. Deploy

### 3. Database Migration
Once deployed, run migrations on Railway:
```bash
railway run npm run db:push --prefix backend
```

Or in Railway dashboard, open the terminal for your backend service and run:
```bash
npm run db:push
```

## Project Structure
- `/backend` - Express.js server with TypeScript
- `/frontend` - React.js application with Vite
- `Dockerfile` - Container configuration
- `package.json` - Root scripts for building and starting

## Build & Start Commands
- **Build**: `npm run build` - Builds both frontend and backend
- **Start**: `npm start` - Starts the backend which serves the frontend

## How It Works
1. The Dockerfile builds the frontend (Vite) to `/frontend/dist`
2. The backend compiles TypeScript to `/backend/dist`
3. The backend Express server serves the frontend static files
4. API routes are prefixed with `/api`
5. All other routes are caught and served `index.html` for SPA routing

## Local Development
```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

## Troubleshooting

### Build Failures
- Check that all dependencies are listed in package.json files
- Ensure environment variables are set in Railway dashboard
- Review build logs in Railway dashboard

### API 404 Errors
- Verify `FRONTEND_URL` environment variable matches your Railway domain
- Check CORS settings in backend if frontend can't reach API

### Database Connection
- Ensure `DATABASE_URL` is correctly set
- Run migrations after deployment

## Environment Variables Summary

### Backend (.env)
```
PORT=3000
DATABASE_URL=postgresql://...
NODE_ENV=production
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
FRONTEND_URL=https://your-domain.up.railway.app
```

### Frontend (.env.production)
```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_API_URL=/api
```

## Notes
- Frontend API calls use relative paths (`/api`) in production
- Backend serves both API routes and static frontend files
- CORS is configured to accept requests from the frontend domain
