# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **frontend-only prototype** of the AI Deal Room Assistant — a workflow copilot for junior investment bankers at **Indus Meridian Capital (IMC)**, a Mumbai-based boutique investment bank. The prototype uses hardcoded dummy data throughout. No real AI calls, no backend, no authentication, no actual file processing.

**Stack:** React + Tailwind CSS. No backend. No API calls.

## Development Commands

```bash
npm run dev       # start dev server (http://localhost:5173)
npm run build     # production build
npm run preview   # preview production build
```

## Architecture

Single-page React app with client-side routing. All state is local (React useState/useContext) — no persistence between sessions. All deal data, meeting transcripts, action items, and AI-generated content are hardcoded dummy data.

### Sidebar Navigation Structure

```
Sidebar
├── Dashboard (Deal Overview)
├── My Deals
├── Deal Room [active deal context]
│   ├── Prep Sheet
│   ├── Meeting Room
│   ├── Action Items
│   └── IC Memo
└── Settings
```

### The 7-Screen Demo Arc

The prototype demonstrates one linear flow: Dashboard → New Deal Setup → Deal Room Home → Prep Sheet → Meeting Room → Action Items → IC Memo Drafter.

| # | Screen | Purpose |
|---|--------|---------|
| 1 | Dashboard | Bird's eye view of active deals; pipeline strip; CTA: + New Deal |
| 2 | New Deal Setup | Deal metadata form + simulated document upload zone |
| 3 | Deal Room Home | Central hub — Company Snapshot card + 4 action tiles + activity feed |
| 4 | Prep Sheet | AI-generated briefing: Company Brief, Deal Context, Comps table, Talking Points, Open Questions |
| 5 | Meeting Room | Transcript paste/upload → simulated AI processing → structured meeting intelligence |
| 6 | Action Items | Auto-populated task list from meeting output; owner/priority/status/due date |
| 7 | IC Memo Drafter | Full IC memo assembled from all deal signals; section-level confidence indicators |

## Key UI Patterns to Maintain Consistently

- **Confidence indicators** on all AI-generated sections: `High` (green) / `Medium` (amber) / `Low` (red)
- **Source attribution tags** on IC Memo sections (e.g. "From: Pitch Deck", "From: Meeting 1")
- **Flagged items** in Meeting Room: Client Concerns = yellow, Banker Commitments = red
- **Editable fields** — all AI-generated content must appear editable (inline edit UI)
- **"Regenerate section" button** on each Prep Sheet and IC Memo section
- **Status progression** on action items: `Open → In Progress → Done`
- **Priority tags**: `High` / `Med` / `Low`
- Context carries forward across screens — data entered in earlier screens pre-populates later screens

## Dummy Data Context

The prototype is set in the context of a fictional M&A deal. Use consistent dummy data across all screens:

- **Deal name:** "Project Falcon — Acme Industrials M&A"
- **Company:** Acme Industrials Ltd (Indian mid-market manufacturing)
- **Deal type:** Cross-border M&A (sell-side)
- **Deal team:** Rajiv Mehta (MD), Priya Sharma (VP), Arjun Nair (Associate), Sneha Patel (Analyst)
- **Stage:** Pitch Preparation → Client Meeting

All financial figures, meeting transcripts, action items, and IC memo content should be realistic-sounding IB dummy data consistent with a mid-market Indian industrial M&A deal (~₹800–1200 Cr transaction value).

## IB Domain Terms (Reference)

- **CIM** — Confidential Information Memorandum (sell-side document describing the company)
- **IC / Investment Committee** — internal approval body; must approve deal commitment
- **IC Memo** — structured document presented to IC (Exec Summary, Company Overview, Market Opportunity, Deal Structure, Key Risks, Comps, Recommendation)
- **Comps** — comparable transactions used to benchmark valuation
- **Mandate** — formal engagement agreement with the client

## Prototype Constraints

- Document upload UI exists but does not process files — show a simulated progress state then jump to pre-populated results
- "Analyse transcript" button triggers a loading state then reveals hardcoded meeting intelligence output
- "Export PDF / DOCX" buttons show a success toast — no actual file is generated
- "Submit for IC Review" is a terminal CTA — prototype ends here
- Login screen accepts any non-empty credentials — no real auth, navigates to `/dashboard` on submit
