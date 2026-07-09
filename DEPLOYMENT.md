# Project Running and Deployment Guide

This guide explains how to set up, run, build, and deploy the **3D Portfolio Website** locally and to Vercel.

---

## 🛠️ Technology Stack
* **Frontend Framework**: React 18 (with TypeScript)
* **Build Tool**: Vite
* **Styling**: Tailwind CSS & Vanilla CSS
* **Animations**: Framer Motion & GSAP
* **Icons**: Lucide React

---

## 🚀 Running Locally

Follow these steps to run the application on your local machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version **18.x** or higher is recommended).

### 1. Install Dependencies
Navigate to the root directory of the project in your terminal and install the npm packages:
```bash
npm install
```

### 2. Run the Development Server
Start the Vite development server:
```bash
npm run dev
```
By default, the application will run at [http://localhost:5173](http://localhost:5173). 

> [!NOTE]
> During local development, Vite handles the API proxy defined in [vite.config.ts](file:///c:/Users/motinath_/Downloads/Motinath%20Portfolio/vite.config.ts) to forward `/api/letterboxd-rss` to the Letterboxd RSS feed securely to bypass CORS restrictions.

### 3. Build for Production (Local Test)
To verify that the build compiles cleanly without any errors:
```bash
npm run build
```
This generates an optimized production bundle inside the `dist/` directory.

---

## ☁️ Deploying to Vercel

The project is fully pre-configured to be deployed directly on **Vercel** with zero manual adjustments. The custom RSS proxy configuration is already handled automatically in [vercel.json](file:///c:/Users/motinath_/Downloads/Motinath%20Portfolio/vercel.json).

There are two ways to deploy this project to Vercel:

### Option A: Deployment via Vercel Dashboard (Recommended)

This is the easiest method and enables automatic deployments whenever you push changes to your Git repository (GitHub/GitLab/Bitbucket).

1. Push your repository to **GitHub**, **GitLab**, or **Bitbucket**.
2. Sign in to your [Vercel Dashboard](https://vercel.com).
3. Click **Add New** > **Project**.
4. Import your repository.
5. Vercel will automatically detect that the project is built with **Vite**.
6. Keep the default settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
7. Click **Deploy**. Vercel will build and host your project automatically.

---

### Option B: Deployment via Vercel CLI

If you prefer to deploy directly from your local terminal:

1. Install the Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```
2. Log in to your Vercel account:
   ```bash
   vercel login
   ```
3. Run the deployment command from the project root directory:
   ```bash
   vercel
   ```
   Follow the prompts to link the project and deploy a preview version.
4. For production deployment, run:
   ```bash
   vercel --prod
   ```

---

## ⚙️ Configuration Notes
* **SPA Routing & CORS Bypass**: The [vercel.json](file:///c:/Users/motinath_/Downloads/Motinath%20Portfolio/vercel.json) file contains the rewrite rules that make SPA (Single Page Application) routing work smoothly on reload (rewriting all wildcard routes to `/index.html`) and enables the `/api/letterboxd-rss` proxy feed for your movies page. No extra serverless functions are required!
