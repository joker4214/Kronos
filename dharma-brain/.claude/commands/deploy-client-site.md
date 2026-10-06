# deploy-client-site

Deploy a rebranded client website from the Icon Auto Repair template.

## Usage

Provide a filled client brief JSON file, and I will:

1. **Validate** the brief against the schema — refuse if any required field is missing or ambiguous
2. **Validate city/state** especially hard — echo back the exact city and state and require confirmation to prevent shipping to the wrong town
3. **Clone** the template to a new project folder
4. **Rebrand** all HTML files (business name, city/state, phone, email, address)
5. **Update colors** in styles.css
6. **Update logo** URL in all pages
7. **Run local build** and check for broken links
8. **Deploy to Vercel** using the domain specified in the brief
9. **Verify the live site** — curl the deployed URL and grep for business name + phone to confirm the right site shipped
10. **Record deployment** to vault under Clients/[ClientName]/deployment-log.md
11. **Report** the live URL and any issues

## Input Format

Pass the path to a client brief file (JSON):

```
/deploy-client-site clients/nicks-auto-service.json
```

Or provide the brief inline. The schema is at `templates/client-brief.schema.json`.

## Validation Rules

- **All required fields must be present** (businessName, city, state, phone, email, domain, logoUrl, colors)
- **City and state must be exact and non-ambiguous** — I will echo them back for confirmation before proceeding
- **Phone must match (XXX) XXX-XXXX format**
- **Domain must be valid and unique** (no existing Vercel deployment with that name)
- **Colors must be valid hex codes** (#RRGGBB)
- **Logo URL must be publicly accessible**

## Deployment Steps

1. Parse and validate the brief JSON
2. Echo back business name, city, state, phone, email, domain — **STOP and wait for explicit "yes" before proceeding**
3. Clone the Icon Auto Repair template to `clients/[domain]/`
4. Perform string replacements:
   - "ICON AUTO REPAIR" → business name
   - "Madison Heights" → city
   - "MI" → state
   - "(248) 429-4897" → phone
   - "iconautorepair@gmail.com" → email
   - "32301 Dequindre Road" → address (from brief)
   - Logo URL replacement in all img src attributes
5. Update CSS color variables:
   - --red: (primaryColor from brief)
   - --red-dark: (secondaryColor from brief)
6. Update hours (if provided) in contact.html
7. Run `npm run build` (or equivalent) to verify no errors
8. Deploy to Vercel: `vercel --prod --name [domain]`
9. Wait for deployment to complete (poll /api/v1/deployments)
10. Curl the live URL: `curl https://[domain]`
11. Grep response for:
    - Business name (case-insensitive)
    - Phone number (exact match)
    - If both found: deployment verified ✓
    - If either missing: **STOP and report the mismatch**
12. Write deployment record to vault:
    - File: `Clients/[ClientName]/deployment-log.md`
    - Include: deployment date, brief snapshot, live URL, verification result
13. Report live URL, any warnings, and deployment record path

## Abort Conditions

Stop immediately if:
- Brief validation fails (missing fields, invalid format)
- City/state confirmation rejected
- Build fails (npm run build error)
- Deployment fails (Vercel error)
- Live URL verification fails (business name or phone not found on live site) — **this is critical** to prevent sending wrong site to client
- Domain already exists on Vercel

## Important

**Colors, services, and hours are per-client only.** Each site has its own:
- **Colors** stay fixed for that business until you explicitly change them (same for Dharma Esthetic Design and AI Business Empire — their colors don't change unless you change them)
- **Services** are stored per-site, not templated or reused
- **Hours** are per-business, not shared

**Vault is the source of truth.** All client data (colors, services, hours, contact info, deployment records) lives in the vault, never in Claude's memory. Future sessions read from vault, not memory.

## Notes

- No manual intervention needed — entire pipeline runs uninterrupted
- All file writes are idempotent (safe to retry)
- Deployment record is the single source of truth for client deliverables
- If something breaks, state the exact error and suggest a fix (e.g., "URL unreachable — is Vercel API key set?")
