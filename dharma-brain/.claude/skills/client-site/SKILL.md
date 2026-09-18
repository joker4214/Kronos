---
name: client-site
description: Clone, rebrand, and deploy a client site from an existing template
---

1. Ask for and echo back: business name, city + state, phone, source template site.
2. STOP and wait for explicit confirmation of all four before any file writes.
3. Copy the template folder, replace brand strings, swap logo/favicon.
4. Run local build, verify no broken links.
5. Deploy to Vercel, print the live URL.
6. Append a line to the vault: Clients/<name>/build-log.md

Then just type: /client-site
