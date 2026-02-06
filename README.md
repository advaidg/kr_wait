# Waiting Countdown

A simple, elegant countdown page for February 9, 2026 at 10:00 AM Central Time.

## Update the password

Open `script.js` and replace the `encodedPassword` value with your own base64 string.

To generate base64 on macOS:

```bash
echo -n "your-password" | base64
```

Paste the result into `encodedPassword`.

Note: base64 is only light obfuscation, not real security.

## Deploy to GitHub Pages

1. Create a new GitHub repo (e.g. `waiting-countdown`).
2. From this folder, run:

```bash
git init
git add .
git commit -m "Add countdown site"
git branch -M main
git remote add origin https://github.com/<your-username>/waiting-countdown.git
git push -u origin main
```

3. In GitHub: Settings → Pages → Build and deployment → Source: **Deploy from a branch**.
4. Select branch **main** and folder **/** (root). Save.

Your site will be live at:

```
https://<your-username>.github.io/waiting-countdown/
```
