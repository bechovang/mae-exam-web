# Deployment Guide

## Overview

MathPractice is a **static web application** that can be deployed to various hosting platforms. It has no server-side dependencies beyond the Next.js build process.

## Deployment Options

### Recommended: Vercel (Free Tier)

Vercel is the creator of Next.js and provides the best integration.

#### Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Set production domain:**
   ```bash
   vercel --prod
   ```

#### Deploy via GitHub Integration

1. Push code to GitHub repository
2. Import project in Vercel dashboard
3. Vercel auto-deploys on every push to main branch

**Configuration:** No `vercel.json` needed - uses default Next.js settings

---

### Alternative: Netlify

1. **Build Settings:**
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Node version:** 18

2. **netlify.toml** (create in root):
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

3. **Deploy via CLI:**
   ```bash
   npm i -g netlify-cli
   netlify deploy --prod
   ```

---

### Alternative: Static Export (GitHub Pages, S3, etc.)

For fully static hosting, enable static export:

1. **Update `next.config.mjs`:**
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true
     }
   }
   export default nextConfig
   ```

2. **Build:**
   ```bash
   npm run build
   ```

3. **Deploy `out/` directory** to any static host.

**Note:** Some dynamic features may not work with static export.

---

### Alternative: Docker

1. **Create `Dockerfile`:**
   ```dockerfile
   FROM node:20-alpine AS base

   # Dependencies
   FROM base AS deps
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci

   # Builder
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN npm run build

   # Runner
   FROM base AS runner
   WORKDIR /app
   ENV NODE_ENV production
   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs
   COPY --from=builder /app/public ./public
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

   USER nextjs
   EXPOSE 3000
   ENV PORT 3000
   CMD ["node", "server.js"]
   ```

2. **Update `next.config.mjs`:**
   ```javascript
   const nextConfig = {
     output: 'standalone'
   }
   export default nextConfig
   ```

3. **Build and run:**
   ```bash
   docker build -t mathpractice .
   docker run -p 3000:3000 mathpractice
   ```

---

## Environment Variables

Currently, **no environment variables are required** for deployment.

For production, consider:

```env
# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-Y4F55BYWHD

# Optional: API URLs (if backend is added)
NEXT_PUBLIC_API_URL=https://api.example.com

# Optional: Feature flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

## Performance Optimization

### Before Deployment

1. **Run linter:**
   ```bash
   npm run lint
   ```

2. **Test production build locally:**
   ```bash
   npm run build
   npm start
   # Visit http://localhost:3000
   ```

3. **Analyze bundle size:**
   ```bash
   npx @next/bundle-analyzer
   ```

### Caching Strategy

For optimal performance, configure caching headers:

- **Static assets:** 1 year cache
- **JSON data:** 1 hour cache (with revalidation)
- **HTML:** No cache (or short cache)

### CDN Configuration

All deployed applications should be behind a CDN:
- **Vercel:** Automatic (Edge Network)
- **Netlify:** Automatic (Netlify Edge)
- **Cloudflare:** Configure DNS proxy

## Monitoring

### Recommended Monitoring

1. **Vercel Analytics** (if using Vercel)
2. **Google Analytics** (already integrated: G-Y4F55BYWHD)
3. **Sentry** for error tracking (not currently implemented)

### Add Error Tracking (Optional)

```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

## Domain Configuration

### Custom Domain

1. **Purchase domain** from registrar
2. **Add domain** in hosting platform (Vercel/Netlify)
3. **Update DNS records**:
   - Type: CNAME
   - Name: @ (or www)
   - Value: hosting-provider.com

### SSL/HTTPS

All recommended platforms provide **automatic SSL certificates** via Let's Encrypt.

## Backup Strategy

### Data Backup

The application serves static JSON files from `public/data/`. To backup:

1. **Git repository** (already includes all data)
2. **Repository backup:**
   ```bash
   git remote add backup git@github.com:user/repo-backup.git
   git push backup main
   ```

### Disaster Recovery

1. Clone repository
2. Run `npm install`
3. Run `npm run build`
4. Deploy to hosting

## Scaling Considerations

### Current Capacity

- **Requests:** Serves static JSON files (~1.7MB total data)
- **Users:** No authentication, unlimited anonymous users
- **Bottleneck:** Client-side rendering

### Scaling Options

1. **CDN:** Already handled by Vercel/Netlify
2. **Data size:** Keep JSON files under 500KB each for optimal load
3. **Consider:** Moving to API if exam count exceeds 100

## CI/CD Pipeline

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID}}
          vercel-project-id: ${{ secrets.PROJECT_ID}}
          vercel-args: '--prod'
```

### Required Secrets

- `VERCEL_TOKEN` - From Vercel dashboard
- `ORG_ID` - From Vercel project settings
- `PROJECT_ID` - From Vercel project settings

## Troubleshooting Deployment

### Build Fails

1. Check Node.js version (requires 18+)
2. Clear cache: `rm -rf .next node_modules && npm install`
3. Check TypeScript errors: `npm run lint`

### Runtime Errors

1. Check browser console for client errors
2. Check network tab for failed JSON loads
3. Verify MathJax CDN is accessible

### Data Not Loading

1. Verify `manifest.json` is deployed
2. Check file paths in `public/data/`
3. Test JSON files individually: `https://yourdomain.com/data/de1.json`

## Cost Estimation

### Vercel Free Tier

- **Bandwidth:** 100GB/month
- **Builds:** 6,000 minutes/month
- **Suitable for:** Up to 10,000 visitors/month

### Beyond Free Tier

- **Hobby:** $20/month (100GB bandwidth)
- **Pro:** $96/month (1TB bandwidth)

For this application, the **Free Tier** should be sufficient for most use cases.

## Production Checklist

Before deploying to production:

- [ ] Test all features locally
- [ ] Update manifest.json with all exam IDs
- [ ] Verify MathJax formulas render correctly
- [ ] Test on mobile devices
- [ ] Test dark/light theme toggle
- [ ] Run linter and fix errors
- [ ] Set up custom domain (optional)
- [ ] Configure analytics (optional)
- [ ] Set up error monitoring (optional)
- [ ] Create backup of repository
- [ ] Document deployment process
