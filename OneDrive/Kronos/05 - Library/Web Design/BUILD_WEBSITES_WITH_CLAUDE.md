# Build Professional Websites with Claude Code

**Everything your friend needs to design and build production-ready websites with Claude.**

---

## What You'll Learn

- How to prompt Claude for website builds
- Which design skills to use and how to install them
- Complete prompt template (tested, working)
- Real examples of sites built this way
- Step-by-step setup guide

---

## Prerequisites

- Claude Code installed (https://claude.ai/code or IDE extension)
- Node.js 18+ installed
- A GitHub account (optional, for deploying to Vercel)

---

## Step 1: Load the Design Skills (Per-Session)

Claude has built-in design skills that guide your website builds. **Important:** Skills are loaded per-session, not globally installed. You reload them each time you start a new conversation.

### Skill 1: UI/UX Pro Max
**What it does:** Advanced UI/UX design guidance, component patterns, accessibility, responsive design

**How to load:**
1. Start a new message in Claude Code
2. Type this on its own line:
   ```
   /ui-ux-pro-max
   ```
3. Hit send—Claude loads the skill for this session

### Skill 2: Design System
**What it does:** Design tokens, component libraries, system consistency, theming

**How to load:**
1. In the same conversation, type:
   ```
   /design-system
   ```
2. Hit send—both skills are now active

**Important:** Every new Claude Code session, start with:
```
/ui-ux-pro-max
/design-system
```

Then send your website prompt. The skills guide Claude as it builds.

---

## Step 2: Use the Website Prompt Template

Here's a battle-tested prompt that works every time.

### The Prompt (Copy & Paste This)

```
Build a professional [TYPE] website with the following specifications:

TECH STACK
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (animations)

DESIGN & BRAND
- Color scheme: [PRIMARY COLOR HEX] and [SECONDARY COLOR HEX]
- Typography: [SANS-SERIF FOR BODY], [SERIF FOR HEADINGS if desired]
- Aesthetic: [DESCRIBE VIBE: luxury, playful, minimal, professional, etc.]
- Mobile-first responsive design

PAGES REQUIRED
1. Home - Hero with animations, [X] feature cards, CTA section
2. [PAGE NAME] - [Description and content]
3. [PAGE NAME] - [Description and content]
4. [PAGE NAME] - [Description and content]
5. [PAGE NAME] - [Description and content]

FEATURES TO INCLUDE
- Sticky navigation bar with logo and links
- Footer with copyright and links
- Hover effects on interactive elements
- Scroll-triggered animations (Framer Motion)
- Form validation (if applicable)
- SEO metadata on all pages
- No placeholder text—real, complete content

ANIMATIONS
- Hero: fade in + slide up
- Cards: stagger on scroll, lift on hover
- Buttons: scale on hover
- Images: fade in on scroll

DELIVERABLE
- Production-ready code
- TypeScript with no errors
- Builds without warnings
- All pages linked and working
- Ready for Vercel deployment
```

### How to Use It

1. Copy the prompt above
2. Paste it into Claude Code
3. Fill in the bracketed sections: [TYPE], [COLOR], [PAGE NAME], etc.
4. Hit send

**Example (filled in):**
```
Build a professional wedding planning website with the following specifications:

TECH STACK
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (animations)

DESIGN & BRAND
- Color scheme: #ec4899 (rose) and white
- Typography: Georgia for headings, sans-serif for body
- Aesthetic: Romantic, elegant, luxury
- Mobile-first responsive design

PAGES REQUIRED
1. Home - Hero with animations, 3 feature cards, CTA section
2. About - Team bios and company story
3. Services - 4 pricing tiers with comparison
4. Real Weddings - Gallery of 6 past events with testimonials
5. Contact - Contact form and business info

[etc...]
```

---

## Step 3: Optimize with Design Skills

### Before Sending Your Prompt

Load both skills in order:
```
/ui-ux-pro-max
/design-system
```

Then paste your website prompt. Claude will apply best practices as it builds.

### If Claude's Output Needs Tweaks

Instead of rewriting, use these skill-guided requests:
- "Make this more accessible per UI/UX guidelines"
- "Add design tokens for colors and spacing"
- "Improve the component consistency using design-system patterns"

Claude will apply the skill rules automatically.

---

## Real Working Examples

### Site 1: Corporate Events
**Colors:** Gold (#d4a574) + Cream  
**Pages:** Home, Services, Portfolio, Testimonials, Contact  
**Animations:** Staggered reveals, card lifts, scroll effects  
**Live:** https://event-planner-ej3ufa6rq-dharma8.vercel.app

### Site 2: Wedding Planning
**Colors:** Rose (#ec4899) + White  
**Pages:** Home, About, Services, Real Weddings, Testimonials, Contact  
**Animations:** Same framework, romance-focused  
**Live:** https://house-of-pearls-dw92nkp8x-dharma8.vercel.app

Both built with the prompt template above. No code changes needed. Deployed in 1-2 hours.

---

## Complete Workflow

### 1. Setup (5 min)
```
- Install Claude Code
- Install /ui-ux-pro-max skill
- Install /design-system skill
```

### 2. Prepare (10 min)
```
- Decide on your website type (portfolio, business, shop, etc.)
- Pick your colors (use coolors.co to generate)
- List your pages
- Gather any text/copy you want to use
```

### 3. Prompt (2 min)
```
- Copy the template above
- Fill in your specifics
- Paste into Claude Code
- Send
```

### 4. Build (30-60 min)
```
- Claude builds your site (you watch, suggest tweaks)
- Test locally: npm run dev
- Click through all pages
- Test on mobile
```

### 5. Deploy (5 min)
```
- vercel --prod
- Get live URL
- Share with the world
```

**Total time:** 1-2 hours for a complete, deployed website.

---

## Common Prompts for Tweaks

After Claude builds your site, use these to refine:

**"Make the buttons bigger and add more rounded corners"**  
→ Claude updates button styling everywhere

**"Change the hero color from gold to navy"**  
→ Claude updates all color references

**"Add testimonials to the home page"**  
→ Claude adds a testimonials section

**"Make the navigation sticky and add a mobile menu"**  
→ Claude implements both

**"Improve the form validation and add error messages"**  
→ Claude enhances the contact form

You can keep iterating until it's perfect. Claude handles all the implementation.

---

## Deployment Options

### Option 1: Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```
**Result:** Live URL like `my-site.vercel.app`

### Option 2: Netlify
```bash
npm run build
# Drag the 'out' folder to netlify.com
```

### Option 3: Keep Locally
```bash
npm run dev
# Site runs at localhost:3000
```

---

## Troubleshooting

**"Claude's not using the skills"**  
→ Load them manually: `/ui-ux-pro-max` and `/design-system` before prompting

**"The site won't build"**  
→ Tell Claude "Fix build errors" and share the error message

**"Animations aren't working"**  
→ Make sure Framer Motion is in the prompt and Claude imported it

**"Colors look wrong on mobile"**  
→ Ask Claude to "Test and fix mobile color contrast"

**"I don't like the layout"**  
→ Be specific: "Move the testimonials to the top" or "Make the hero taller"

---

## What NOT to Do

❌ Ask Claude to fetch real images (use emojis or placeholders instead)  
❌ Request 20 pages if you need 5 (scope creep)  
❌ Skip the color/brand decisions upfront  
❌ Ignore mobile testing  
❌ Deploy without clicking through the site first  

---

## Next Level: Customize Further

Once your site is built:

**Add a blog:**
- Ask Claude to add a `/blog` page with posts

**Add e-commerce:**
- Ask Claude to add a shop with cart/checkout

**Add user accounts:**
- Ask Claude to add login/signup

**Add a dashboard:**
- Ask Claude to add user dashboards

Everything's just a prompt away.

---

## Resources for Your Friend

- **Coolors.co** - Generate color palettes
- **Google Fonts** - Find typefaces
- **Vercel Docs** - Deployment guide: https://vercel.com/docs
- **Next.js Docs** - Framework reference: https://nextjs.org/docs
- **Tailwind CSS** - Styling reference: https://tailwindcss.com/docs

---

## Your Secret Weapon

The difference between a mediocre prompt and a great one is **specificity**.

Instead of: "Build me a website"  
Say: "Build a wedding planning website. Gold and cream colors. 5 pages. Framer Motion animations. Real testimonials. Ready for Vercel."

Specific prompts = better results = less iteration.

---

## Send This to Your Friend

Share this entire file. Everything they need is here:
- ✅ How to install design skills
- ✅ Working prompt template
- ✅ Real examples (with live links)
- ✅ Complete workflow
- ✅ Troubleshooting guide
- ✅ Deployment options

They can copy this, customize it, and build their own sites within an hour.

---

## Questions?

If something doesn't work:
1. Check you have Claude Code installed
2. Verify both skills are loaded (`/ui-ux-pro-max` + `/design-system`)
3. Share the error message with Claude
4. Ask Claude to fix it

Claude handles the rest.

Good luck building! 🚀
