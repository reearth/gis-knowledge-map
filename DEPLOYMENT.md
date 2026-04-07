# Deployment Guide

This guide explains how to deploy the GIS Knowledge Map to GitHub Pages.

## Prerequisites

- GitHub repository created
- Code pushed to GitHub

## Option 1: Automatic Deployment (Recommended)

The project includes a GitHub Actions workflow that automatically deploys to GitHub Pages on every push to the main branch.

### Setup Steps:

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages in repository settings**:
   - Go to your repository on GitHub
   - Click **Settings** > **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save

3. **Trigger deployment**:
   - The workflow will automatically run on the next push to `main`
   - Or manually trigger it from **Actions** tab > **Deploy to GitHub Pages** > **Run workflow**

4. **Access your site**:
   - After deployment completes (2-3 minutes), visit:
   - `https://<your-username>.github.io/gis-knowledge-map/`

### Workflow Features:

✅ Runs validation before building
✅ Only deploys if validation passes
✅ Automatic deployment on every push
✅ Manual trigger option available

## Option 2: Manual Deployment

If you prefer manual deployment or for testing:

```bash
# Build and deploy manually
npm run deploy
```

This will:
1. Run TypeScript compilation
2. Build the production bundle
3. Deploy to `gh-pages` branch

**First time setup**: You still need to enable GitHub Pages in repository settings and select the `gh-pages` branch as the source.

## Configuration

### Change Repository Name

If your repository name is different from `gis-knowledge-map`, update the `base` path in `vite.config.ts`:

```typescript
export default defineConfig({
  // ...
  base: '/your-repo-name/',
})
```

### Deploy to Custom Domain

1. Add a `CNAME` file to `/public/CNAME` with your domain:
   ```
   yourdomain.com
   ```

2. Update `vite.config.ts`:
   ```typescript
   base: '/', // Change to root for custom domain
   ```

3. Configure DNS settings with your domain provider

### Deploy to User/Organization Site

If deploying to `https://<username>.github.io/` (not a project site):

1. Repository must be named `<username>.github.io`
2. Update `vite.config.ts`:
   ```typescript
   base: '/', // Change to root
   ```

## Verification

After deployment:

1. Visit your GitHub Pages URL
2. Check browser console (F12) for errors
3. Verify all 91 nodes load correctly
4. Test navigation and search

## Troubleshooting

### Site shows 404 or blank page

- Check `base` path in `vite.config.ts` matches your repo name
- Verify GitHub Pages is enabled in repository settings
- Check GitHub Actions logs for build errors

### Nodes not loading

- Check browser console for errors
- Verify YAML validation passed: `npm run validate`
- Check GitHub Actions logs for validation errors

### Workflow not running

- Verify workflow file is at `.github/workflows/deploy.yml`
- Check GitHub Pages source is set to "GitHub Actions"
- Ensure workflow has proper permissions in repository settings

## Continuous Integration

The workflow includes validation to prevent broken deployments:

```yaml
- name: Validate nodes
  run: npm run validate
```

If validation fails, the deployment is cancelled. This ensures:
- All nodes have required fields
- No invalid resource types
- No broken relationship references
- Proper YAML structure

## Local Testing

Before deploying, test the production build locally:

```bash
# Build production bundle
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:4173` to test the built version.

## Links

- **Live Site**: `https://<username>.github.io/gis-knowledge-map/`
- **GitHub Actions**: Check the "Actions" tab in your repository
- **Build Logs**: Click on any workflow run to see detailed logs

---

**Quick Deploy Checklist**:

- [ ] Code pushed to GitHub
- [ ] GitHub Pages enabled (Settings > Pages > Source: GitHub Actions)
- [ ] Workflow runs successfully (Actions tab)
- [ ] Site accessible at GitHub Pages URL
- [ ] All nodes load correctly in browser
