# AI Deal Room Assistant

A high-fidelity frontend prototype of an AI-powered workflow copilot for junior investment bankers. Built for **Indus Meridian Capital (IMC)**, a Mumbai-based boutique investment bank, this prototype demonstrates how AI can compress hours of manual deal prep into minutes — from first pitch to IC submission.

---

## What Is This?

The AI Deal Room Assistant is a deal workflow copilot designed to sit alongside junior bankers at every stage of an M&A transaction. It auto-generates briefing documents, extracts meeting intelligence, tracks action items, and drafts IC memos — all from a single deal room interface.

The core design principle: **AI does the first draft, banker owns the final.** Every AI-generated output is editable, regeneratable, and confidence-tagged so bankers know exactly where to push back or dig deeper.

> This is a **frontend-only prototype** with hardcoded dummy data. No backend, no real AI calls, no authentication, no file processing. Built to validate the workflow concept and UX before engineering investment.

---

## Target Users

**Primary:** Junior investment bankers (Associates and Analysts) at boutique and mid-market investment banks who spend disproportionate time on deal prep, documentation, and coordination work rather than analysis.

**Secondary:** VPs and MDs who review deal materials, attend client meetings, and present to Investment Committees — and who benefit from cleaner, faster-prepared outputs from their teams.

**Prototype deal team:**
- Rajiv Mehta — Managing Director
- Priya Sharma — Vice President
- Arjun Nair — Associate
- Sneha Patel — Analyst

---

## The Problem It Solves

Junior bankers at boutique IBs spend 60–70% of their time on repetitive, document-heavy tasks:

- Manually building prep sheets before every client meeting (2–3 hrs each)
- Transcribing and summarising meeting notes into structured outputs
- Chasing team members for action item updates across email and WhatsApp
- Re-reading 80-page CIMs to draft IC memos from scratch

The AI Deal Room Assistant compresses each of these workflows into minutes. It preserves context across the entire deal lifecycle — information entered or generated early in the deal automatically flows into later screens without re-entry.

---

## The 7-Screen Demo Flow

The prototype demonstrates one end-to-end deal workflow: from pipeline overview to IC submission.

### 1. Dashboard
Bird's-eye view of all active deals. Pipeline strip shows each deal's stage across Origination → Pitch Preparation → Due Diligence → IC Approval → Closing. Quick stats surface pending actions and upcoming meetings. Entry point for creating a new deal.

### 2. New Deal Setup
Structured form to configure a new deal room: deal name, type (M&A, PE, ECM), sector, client company, and transaction size. Includes a document upload zone for pitch decks, teasers, CIMs, and financial models. Simulates AI ingestion of uploaded documents before routing to the Deal Room.

### 3. Deal Room Home
The central hub for a specific deal. Features an AI-generated Company Snapshot card with key financials, deal rationale, and watch-outs. Four action tiles provide direct access to Prep Sheet, Meeting Room, Action Items, and IC Memo. Includes a document library and real-time activity feed.

### 4. Prep Sheet
AI-generated pre-meeting briefing assembled from deal documents. Contains five structured sections:
- **Company Brief** — overview, key financials, business signals
- **Deal Context** — why now, client objectives, watch-outs
- **Comparable Deals** — 3–5 relevant transaction comps with multiples
- **Talking Points** — suggested angles and objection responses
- **Open Questions** — gaps to probe in the meeting

Every section is editable inline, carries a confidence indicator (High / Medium / Low), and has a one-click regenerate button. Exportable as PDF.

### 5. Meeting Room
Transcript paste or upload interface that simulates AI processing to produce structured meeting intelligence:
- **Meeting Summary** — concise narrative of what was discussed
- **Key Decisions** — agreed next steps and outcomes
- **Client Concerns** — flagged in yellow for follow-up
- **Banker Commitments** — flagged in red with accountability
- **Client Commitments** — flagged in blue
- **Open Questions** — unresolved items requiring answers

Includes a live recording mode (simulated) that auto-populates the transcript on stop.

### 6. Action Items
Task list auto-populated from meeting output. Each item carries an owner, due date, priority tag (High / Med / Low), and status. Status cycles through Open → In Progress → Done with a single click. Filterable by owner, priority, and status. Supports manual addition of new items.

### 7. IC Memo Drafter
Full Investment Committee memo assembled from all deal signals accumulated across the workflow. Seven standard sections:
1. Executive Summary
2. Company Overview
3. Market Opportunity
4. Deal Structure & Rationale
5. Key Risks
6. Comparable Transactions
7. Recommendation

Sections are generated progressively (simulated AI drafting), each with a confidence indicator and source attribution tag (e.g. "From: Pitch Deck", "From: Meeting 1"). Editable inline, collapsible, and regeneratable per section. Low-confidence sections are flagged for mandatory review. Terminal CTA: **Submit for IC Review**.

---

## Key UX Patterns

| Pattern | Description |
|---|---|
| **Confidence indicators** | Every AI-generated section is tagged High (green) / Medium (amber) / Low (red) |
| **Source attribution** | IC Memo sections cite which document or meeting they were drawn from |
| **Inline editing** | All AI content is editable directly — no modal, no copy-paste |
| **Regenerate** | One-click section-level regeneration with animated feedback |
| **Context carry-forward** | Data from earlier screens pre-populates later screens automatically |
| **Flagged items** | Meeting concerns, commitments, and decisions are colour-coded by type |
| **Status progression** | Action items cycle Open → In Progress → Done in one click |

---

## Tech Stack

- **React 19** + **Vite** — SPA with client-side routing
- **Tailwind CSS v4** — utility-first styling via `@tailwindcss/vite` plugin
- **React Router v7** — `BrowserRouter` with dynamic `/deals/:dealId` routes
- **No backend** — all state is local `useState`; no persistence between sessions
- **No external dependencies** for AI, auth, or data — everything is hardcoded dummy data

---

## Running Locally

```bash
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # production build
npm run preview   # preview production build
```

Login accepts any non-empty credentials and routes to the dashboard.

---

## Prototype Dummy Deal

All screens are populated with data from a fictional M&A deal:

- **Deal:** Project Falcon — Acme Industrials M&A
- **Company:** Acme Industrials Ltd (Indian mid-market manufacturing)
- **Deal type:** Cross-border M&A, sell-side
- **Transaction value:** ~₹800–1,200 Cr
- **Stage:** Pitch Preparation → Client Meeting

Two additional deals (Project Everest, Project Indigo) are pre-populated to demonstrate multi-deal pipeline management.
