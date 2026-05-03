# Salman Food Deployment Guide

This project is optimized for deployment on **Vercel**.

## Vercel Deployment

1. **Connect to GitHub**: Push your code to a GitHub repository.
2. **Import to Vercel**: Go to [Vercel](https://vercel.com) and import your repository.
3. **Configure Project**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Environment Variables**:
   - If you are using AI features, add your `GEMINI_API_KEY` to the Vercel project settings.

## SPA Routing
A `vercel.json` file has been included to ensure that React Router transitions and page refreshes work correctly on Vercel.
