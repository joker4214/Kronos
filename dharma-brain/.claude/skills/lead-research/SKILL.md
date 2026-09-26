# lead-research

Research a batch of businesses in parallel and draft outreach emails.

## Usage

Provide a list of business names (one per line or comma-separated), and I will:

1. Launch one subagent per business (all in parallel) using the lead-researcher agent
2. Collect all results into a markdown table sorted by reachability
3. Save the table to your vault at `Projects/Lead Research/results-YYYY-MM-DD.md`
4. Draft personalized outreach emails for every reachable lead
5. Report which leads are dead and why

## Example

```
/lead-research

Nick's Auto Service
Icon Auto Repair
By Jolene Salon
Dharma Esthetic Design Center
```

## Output

- **Results table:** All businesses with contact info, tech stack, and reachability status
- **Outreach drafts:** One email per reachable lead, saved to `Projects/Lead Research/outreach-YYYY-MM-DD.md`
- **Dead lead summary:** List of businesses that are unreachable (dead domains, no contact info)

## Notes

- No permission prompts for routine work — all reads, writes, and web fetches are pre-allowed
- Voice transcription risk: if you're speaking business names, type the list instead (names garble easily in speech)
- Each business gets 3–5 fetches max for efficiency
