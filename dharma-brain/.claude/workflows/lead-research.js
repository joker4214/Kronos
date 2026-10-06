export const meta = {
  name: 'lead-research',
  description: 'Research businesses in parallel and draft outreach emails',
  phases: [
    { title: 'Research', detail: 'parallel subagents per lead' },
    { title: 'Synthesize', detail: 'merge results and draft outreach' },
  ],
}

const BUSINESSES = args || []

if (!BUSINESSES || BUSINESSES.length === 0) {
  log('No businesses provided. Pass an array of business names as args.')
  return { results: [], outreach: [], dead: [] }
}

log(`Researching ${BUSINESSES.length} businesses in parallel...`)

phase('Research')
const results = await parallel(
  BUSINESSES.map(biz => () =>
    agent(`Research "${biz}" and return ONLY the JSON object.`, {
      label: `lead:${biz}`,
      phase: 'Research',
      schema: {
        type: 'object',
        properties: {
          business: { type: 'string' },
          website: { type: ['string', 'null'] },
          email: { type: ['string', 'null'] },
          email_source: { type: ['string', 'null'] },
          phone: { type: ['string', 'null'] },
          contact_form_url: { type: ['string', 'null'] },
          tech_stack: { type: ['string', 'null'] },
          domain_age: { type: ['string', 'null'] },
          reachable: { type: 'boolean' },
          dead: { type: 'boolean' },
          notes: { type: 'string' },
        },
        required: ['business', 'reachable', 'dead', 'notes'],
      },
    })
  )
)

const validated = results.filter(Boolean)
const reachable = validated.filter(r => r.reachable && !r.dead)
const dead = validated.filter(r => r.dead)
const unreachable = validated.filter(r => !r.reachable && !r.dead)

log(`Results: ${reachable.length} reachable, ${unreachable.length} unreachable, ${dead.length} dead`)

phase('Synthesize')

// Build results table
const table = `
# Lead Research Results

Generated: ${new Date().toISOString().split('T')[0]}

## Summary
- **Reachable:** ${reachable.length}
- **Unreachable (no contact):** ${unreachable.length}
- **Dead (domain down):** ${dead.length}

## All Leads

| Business | Website | Email | Phone | Form | Tech | Reachable | Dead | Notes |
|----------|---------|-------|-------|------|------|-----------|------|-------|
${validated
  .sort((a, b) => {
    if (a.dead && !b.dead) return 1
    if (!a.dead && b.dead) return -1
    if (a.reachable && !b.reachable) return -1
    if (!a.reachable && b.reachable) return 1
    return a.business.localeCompare(b.business)
  })
  .map(
    r => `| ${r.business} | ${r.website || '—'} | ${r.email || '—'} | ${r.phone || '—'} | ${r.contact_form_url ? '✓' : '—'} | ${r.tech_stack || '?'} | ${r.reachable ? '✓' : '✗'} | ${r.dead ? '✓' : '✗'} | ${r.notes || '—'} |`
  )
  .join('\n')}
`.trim()

// Draft outreach emails
const outreach = await parallel(
  reachable.map(lead => () =>
    agent(
      `Draft a brief, personalized outreach email to ${lead.business}. Found on their site: ${lead.website}. Their tech stack appears to be ${lead.tech_stack || 'unknown'}. Include a specific detail about their business (from what you know about ${lead.business}). Keep it under 150 words. Sign it "Jason" (the founder of Dharma Esthetic Design Center).`,
      {
        label: `outreach:${lead.business}`,
        phase: 'Synthesize',
      }
    )
  )
)

const outreachDocs = reachable
  .map((lead, i) => `## ${lead.business}\n\n**To:** ${lead.email || lead.contact_form_url || '(contact form)'}\n\n${outreach[i] || '(draft failed)'}`)
  .join('\n\n---\n\n')

const deadSummary = dead.length
  ? `\n## Dead Leads (${dead.length})\n\n${dead.map(d => `- **${d.business}:** ${d.notes}`).join('\n')}`
  : ''

return {
  table,
  outreach: outreachDocs,
  dead: deadSummary,
  stats: { reachable: reachable.length, unreachable: unreachable.length, dead: dead.length },
}
