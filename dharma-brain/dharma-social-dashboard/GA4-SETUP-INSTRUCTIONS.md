# Connect GA4 for the Social Dashboard — Setup Steps (Jason)

**Why:** The social dashboard needs real click data. Buffer's API doesn't have it for Instagram/TikTok (confirmed by checking real post responses). GA4 can supply it for any post whose link is tagged with UTM parameters, since GTM is already live on dharmasestheticdesign.com (`GTM-5LB46RDG`). This is the first-party path — a Google service account key, no third-party reseller (ruled out `@composio/mcp-google_analytics`, which doesn't exist on npm, and the real Composio integration requires its own account signup).

This has to be done by you — it needs your Google account. Once you hand me the JSON key file and the GA4 property ID, I take it from there.

## Steps

1. **Google Cloud Console** → [console.cloud.google.com](https://console.cloud.google.com)
   - Create a new project (or pick an existing one) — e.g. name it `dharma-ga4-dashboard`.

2. **Enable the Data API**
   - In that project, go to **APIs & Services → Library**, search "Google Analytics Data API", click **Enable**.

3. **Create a service account**
   - **IAM & Admin → Service Accounts → + Create Service Account**
   - Name: `ga4-dashboard-reader` (anything works)
   - Skip granting it any project-level role — click through to **Done**.

4. **Generate a JSON key**
   - Click into the new service account → **Keys** tab → **Add Key → Create new key → JSON**
   - A `.json` file downloads automatically. **Don't send me this file's contents directly in chat** — save it somewhere I can read it from disk (e.g. `OneDrive/Kronos/` in a spot you tell me), or just tell me the path once it's saved. I'll reference the file, never paste the key value into notes.

5. **Grant that service account access to GA4**
   - Go to [analytics.google.com](https://analytics.google.com) → **Admin → Property Access Management**
   - Click the blue **+ → Add users**
   - Paste the service account's email — it looks like `ga4-dashboard-reader@dharma-ga4-dashboard.iam.gserviceaccount.com` (find the exact address on the service account's details page in Cloud Console)
   - Role: **Viewer**
   - **Known issue:** Google sometimes shows "This email doesn't match a Google Account" for a couple hours after creating a new service account — it's a propagation delay, not a real error. Just retry later if you hit it.

6. **Get the GA4 Property ID**
   - Still in GA4 Admin → **Property Settings** — it's the numeric ID at the top (e.g. `123456789`), not the "G-XXXXXXX" measurement ID.

## What to give me when done
- The path to the downloaded JSON key file
- The numeric GA4 Property ID

## What happens after that
I'll wire UTM parameters into future post links (the poster QR codes already have unique per-post URLs, ready to carry them) and query the GA4 Data API directly — no MCP connector, no third-party account, just your key and the real API.
