# Deploying the Dharma site to the VPS

On the VPS (`72.167.33.208`):

```bash
cd ~/Kronos
git fetch origin
git checkout claude/premium-website-template-vbrl7u
git pull

npm install
npm run build

pm2 delete dharma 2>/dev/null
pm2 start "npm start" --name "dharma"
pm2 save
```

Then set up nginx once (see `deploy/nginx-dharmasestheticdesign.conf`):

```bash
sudo cp deploy/nginx-dharmasestheticdesign.conf /etc/nginx/sites-available/dharmasestheticdesign
sudo ln -s /etc/nginx/sites-available/dharmasestheticdesign /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx
```

Point `dharmasestheticdesign.com` DNS (A record) at `72.167.33.208`, then add HTTPS:

```bash
sudo certbot --nginx -d dharmasestheticdesign.com -d www.dharmasestheticdesign.com
```

The site should then be live at `https://dharmasestheticdesign.com` (nginx on :80/:443
proxies to the Next.js app running under PM2 on :3000 — this avoids the earlier issue
where PM2 served the app directly on :80 and static assets loaded unreliably).

## Assets still needed

- `public/founder.jpg` — Jason's headshot for the Team section. Until this is added,
  the site shows a "J" monogram avatar (same style as the rest of the team).
- `public/favicon.png` — optional PNG fallback favicon; `public/favicon.svg` (generated
  from the logo mark) is already in place and works in most browsers.
