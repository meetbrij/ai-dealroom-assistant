// Dummy Prep Sheet data for Project Falcon

export const prepSheetData = {
  dealId: 'deal-001',
  generatedAt: 'Apr 9, 2026 — 09:42 AM',
  meetingDate: 'Apr 11, 2026',
  meetingWith: 'Vikram Singhania, CEO & Rahul Desai, CFO — Acme Industrials Ltd',

  companyBrief: {
    confidence: 'High',
    overview:
      'Acme Industrials Ltd is a Mumbai-headquartered mid-market manufacturer of precision-engineered components for the automotive and aerospace sectors. Founded in 1998, the company operates three plants across Maharashtra and Gujarat with a combined installed capacity of 85,000 MT per annum.',
    financials: [
      { label: 'Revenue (FY25)', value: '₹412 Cr' },
      { label: 'EBITDA (FY25)', value: '₹74 Cr (18% margin)' },
      { label: 'Revenue CAGR (3yr)', value: '14.2%' },
      { label: 'Net Debt', value: '₹88 Cr' },
      { label: 'Employees', value: '~1,800' },
    ],
    signals: [
      'Promoter family exploring partial exit following second-generation succession dispute',
      'Two PE funds (Advent, Kedaara) reportedly in early-stage conversations',
      'New EV components vertical launched Q3 FY25 — early traction with Tata Motors',
    ],
  },

  dealContext: {
    confidence: 'High',
    whyNow:
      'Promoter Vikram Singhania (68) is transitioning operational control to son Aryan but the family is divided on retaining vs. monetising the business. A strategic acquirer with global distribution could resolve the impasse while unlocking a premium valuation.',
    objectives: [
      'Achieve 100% exit for promoter family at 10–12x EBITDA',
      'Identify a strategic buyer (preferably European / Japanese Tier-1 auto supplier)',
      'Close transaction within 9–12 months',
    ],
    watchOuts: [
      'Net debt higher than disclosed in teaser — CFO to clarify working capital cycle',
      'One plant (Pune) under statutory notice for environmental non-compliance — status unknown',
      'Revenue concentration: top 3 customers = 61% of FY25 revenue',
    ],
  },

  comparableDeals: {
    confidence: 'Medium',
    note:
      'Comps drawn from Indian auto-ancillary M&A transactions (2022–2025). EV-linked assets commanding 15–20% premium over traditional comps.',
    transactions: [
      { company: 'Endurance Technologies', type: 'Stake Sale', size: '₹1,100 Cr', year: 2024, multiple: '11.2x EBITDA', outcome: 'Closed' },
      { company: 'Minda Industries', type: 'Strategic Acquisition', size: '₹780 Cr', year: 2023, multiple: '9.8x EBITDA', outcome: 'Closed' },
      { company: 'Craftsman Automation', type: 'PE Buyout', size: '₹650 Cr', year: 2023, multiple: '8.5x EBITDA', outcome: 'Closed' },
      { company: 'Suprajit Engineering', type: 'Cross-border M&A', size: '₹920 Cr', year: 2022, multiple: '10.1x EBITDA', outcome: 'Closed' },
    ],
  },

  talkingPoints: {
    confidence: 'Medium',
    points: [
      "IMC's track record in cross-border auto-ancillary mandates — 4 closed in 36 months, avg. 11.4x EBITDA",
      'EV components vertical significantly expands the buyer universe beyond traditional Tier-1s',
      'Structured process (controlled auction) will maximise competitive tension and price',
      'Timeline: CIM ready in 6 weeks; first-round bids by August 2026',
      "IMC's buyer network in Japan and Germany — direct access to the most likely strategic acquirers",
    ],
    objections: [
      {
        objection: '"We want to explore PE before committing to a full sale"',
        response: 'PE route caps valuation at 8–9x; a strategic buyer with synergies can pay 11–13x. We recommend running both tracks in parallel — we control the narrative.',
      },
      {
        objection: '"The Pune compliance issue will scare buyers off"',
        response: 'This is manageable with the right buyer profile and deal structure. We\'ve seen similar situations resolved via escrow and warranty provisions. Early disclosure builds trust.',
      },
      {
        objection: '"Why IMC over a bulge bracket?"',
        response: 'Bulge brackets will staff this with a second-year associate. At IMC, Rajiv personally leads every mandate. Our boutique network in Asia, ME, and Europe is purpose-built for this buyer profile.',
      },
    ],
  },

  openQuestions: {
    confidence: 'High',
    questions: [
      'What is the current status of the Pune plant environmental notice?',
      'Has the promoter family aligned on the minimum acceptable valuation?',
      'Are there any existing right-of-first-refusal (ROFR) clauses with current investors?',
      'What is Aryan Singhania\'s role post-transaction — is a management retention package expected?',
      'Has the CFO prepared audited FY25 financials — or only provisional accounts?',
    ],
  },
};
