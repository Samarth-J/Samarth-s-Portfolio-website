# Deployment Guide

This guide covers various deployment options for the Samarth Portfolio project.

## 🚀 Quick Deployment Options

### 1. Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Build settings are automatically detected from `netlify.toml`
3. Deploy with one click!

### 2. Vercel
1. Connect your GitHub repository to Vercel
2. Configuration is handled by `vercel.json`
3. Automatic deployments on push

### 3. GitHub Pages
1. Enable GitHub Actions in your repository
2. Push to main branch triggers automatic deployment
3. Site will be available at `https://username.github.io/repository-name`

## 🔧 Manual Deployment

### Build for Production
```bash
# Install dependencies
npm install --legacy-peer-deps

# Build the project
cd client
npm run build

# The built files will be in client/dist/
```

### Deploy to Static Hosting
Upload the contents of `client/dist/` to any static hosting service:
- AWS S3 + CloudFront
- Firebase Hosting
- Surge.sh
- GitHub Pages

## 🐳 Docker Deployment

### Build Docker Image
```bash
docker build -t samarth-portfolio .
```

### Run Container
```bash
docker run -p 80:80 samarth-portfolio
```

### Docker Compose (with SSL)
```yaml
version: '3.8'
services:
  portfolio:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
```

## 🌐 Custom Domain Setup

### DNS Configuration
1. Add CNAME record pointing to your hosting provider
2. Update `sitemap.xml` with your domain
3. Update `robots.txt` with your domain

### SSL Certificate
Most hosting providers (Netlify, Vercel) provide automatic SSL.
For custom setups, use Let's Encrypt.

## 📊 Performance Optimization

### Pre-deployment Checklist
- [ ] Run `npm run check` for type checking
- [ ] Test build locally with `npm run preview`
- [ ] Optimize images (compress, convert to WebP)
- [ ] Update environment variables
- [ ] Test on multiple devices/browsers

### Post-deployment
- [ ] Test all animations and interactions
- [ ] Verify SEO meta tags
- [ ] Check Core Web Vitals
- [ ] Test contact form functionality

## 🔒 Security Headers

The deployment includes security headers:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

## 📈 Analytics Setup

To enable analytics:
1. Update `.env.production` with your analytics endpoint
2. Add your website ID
3. Redeploy the application

## 🐛 Troubleshooting

### Common Issues
1. **Build fails**: Check Node.js version (use 18+)
2. **Assets not loading**: Verify base URL in vite.config.ts
3. **Routing issues**: Ensure SPA redirects are configured
4. **Performance issues**: Check bundle analyzer output

### Debug Commands
```bash
# Analyze bundle size
npm run analyze

# Check for type errors
npm run check

# Preview production build locally
npm run preview
```

## 📞 Support

For deployment issues:
1. Check the build logs
2. Verify environment variables
3. Test locally first
4. Check hosting provider documentation

---

**Note**: Remember to update the domain in `sitemap.xml` and `robots.txt` after deployment!