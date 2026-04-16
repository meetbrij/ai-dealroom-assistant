// Dummy deal data for the prototype

export const deals = [
  {
    id: 'deal-001',
    name: 'Project Falcon',
    company: 'Acme Industrials Ltd',
    sector: 'Manufacturing',
    dealType: 'M&A (Sell-side)',
    stage: 'Pitch Preparation',
    stageIndex: 1,
    dealSize: '₹950 Cr',
    daysActive: 12,
    lastActivity: '2 hours ago',
    team: [
      { name: 'Rajiv Mehta', role: 'MD', initials: 'RM' },
      { name: 'Priya Sharma', role: 'VP', initials: 'PS' },
      { name: 'Arjun Nair', role: 'Associate', initials: 'AN' },
      { name: 'Sneha Patel', role: 'Analyst', initials: 'SP' },
    ],
    pendingActions: 4,
    nextMeeting: 'Apr 11, 2026',

    snapshot: {
      confidence: 'High',
      source: 'Acme_Teaser_FY25.pdf',
      overview:
        'Acme Industrials Ltd is a Mumbai-headquartered precision components manufacturer serving India\'s automotive and aerospace sectors. Founded in 1998, the company operates three plants across Maharashtra and Gujarat with combined capacity of 85,000 MT p.a. The promoter family is exploring a full exit via strategic sale, targeting a European or Japanese Tier-1 buyer. A new EV components vertical launched Q3 FY25 adds strategic optionality.',
      metrics: [
        { label: 'Revenue (FY25)', value: '₹412 Cr' },
        { label: 'EBITDA Margin', value: '18%' },
        { label: 'Revenue CAGR', value: '14.2%' },
        { label: 'Net Debt', value: '₹88 Cr' },
        { label: 'Est. Deal Size', value: '₹950 Cr' },
      ],
      whyHere: [
        'Promoter family exploring full exit — succession considerations',
        'Targeting 11–13x EBITDA via strategic buyer',
        'Preferred timeline: close by March 2027',
      ],
      watchOuts: [
        'Pune plant — open environmental compliance notice',
        'Revenue concentration: top 3 clients = 61%',
        'Westbridge ROFR not yet reviewed',
      ],
    },

    documents: [
      { id: 'doc-001', name: 'Acme_Teaser_FY25.pdf', type: 'PDF', size: '2.4 MB', uploadedBy: 'Arjun Nair', uploadedAt: 'Apr 9, 2026', tag: 'Teaser' },
      { id: 'doc-002', name: 'Acme_Financials_FY25.xlsx', type: 'XLSX', size: '890 KB', uploadedBy: 'Sneha Patel', uploadedAt: 'Apr 9, 2026', tag: 'Financials' },
      { id: 'doc-003', name: 'IMC_Engagement_Letter_Draft.docx', type: 'DOCX', size: '145 KB', uploadedBy: 'Priya Sharma', uploadedAt: 'Apr 9, 2026', tag: 'Legal' },
    ],

    activity: [
      { id: 1, type: 'ai', message: 'Company Brief generated from Acme_Teaser_FY25.pdf', time: '2 hours ago', actor: 'AI' },
      { id: 2, type: 'upload', message: 'Acme_Teaser_FY25.pdf uploaded', time: '2 hours ago', actor: 'Arjun Nair' },
      { id: 3, type: 'upload', message: 'Acme_Financials_FY25.xlsx uploaded', time: '2 hours ago', actor: 'Sneha Patel' },
      { id: 4, type: 'team', message: 'Rajiv Mehta added as MD', time: '3 hours ago', actor: 'Arjun Nair' },
      { id: 5, type: 'deal', message: 'Deal room created — Project Falcon', time: '3 hours ago', actor: 'Arjun Nair' },
    ],

    stageChecklist: [
      { id: 'g-1', label: 'Engagement letter signed', done: true },
      { id: 'g-2', label: 'Audited financials received', done: false },
      { id: 'g-3', label: 'Board resolution received', done: false },
      { id: 'g-4', label: 'ROFR clause reviewed by legal', done: false },
      { id: 'g-5', label: 'CIM structure outline drafted', done: false },
    ],

    tileMeta: {
      prepSheet:   { status: 'Done' },
      meetingRoom: { status: 'Done', meetingCount: 1 },
      actionItems: { open: 6, inProgress: 1, done: 1 },
      icMemo:      { status: 'Not Started', version: null },
    },

    advanceCondition: 'Complete remaining checklist items before moving to Due Diligence',
  },

  {
    id: 'deal-002',
    name: 'Project Everest',
    company: 'Pinnacle Pharma Pvt Ltd',
    sector: 'Healthcare / Pharma',
    dealType: 'Private Equity Advisory',
    stage: 'Due Diligence',
    stageIndex: 2,
    dealSize: '₹1,400 Cr',
    daysActive: 34,
    lastActivity: '1 day ago',
    team: [
      { name: 'Rajiv Mehta', role: 'MD', initials: 'RM' },
      { name: 'Karan Bose', role: 'VP', initials: 'KB' },
      { name: 'Meera Iyer', role: 'Associate', initials: 'MI' },
    ],
    pendingActions: 7,
    nextMeeting: 'Apr 14, 2026',

    snapshot: {
      confidence: 'High',
      source: 'Pinnacle_CIM_Draft.pdf',
      overview:
        'Pinnacle Pharma Pvt Ltd is a Hyderabad-based specialty pharmaceutical company focused on oncology and cardiology generics for regulated export markets (US, EU, Canada). Founded in 2004, Pinnacle operates two WHO-GMP certified facilities and holds 38 ANDA approvals with 12 more pending. A PE firm is seeking IMC\'s advisory to run a structured secondary transaction, targeting a global pharma strategic or a healthcare-focused PE fund.',
      metrics: [
        { label: 'Revenue (FY25)', value: '₹680 Cr' },
        { label: 'EBITDA Margin', value: '22%' },
        { label: 'Revenue CAGR', value: '19.4%' },
        { label: 'Net Debt', value: '₹42 Cr' },
        { label: 'Est. Deal Size', value: '₹1,400 Cr' },
      ],
      whyHere: [
        'Lead PE investor (Lighthouse) seeking liquidity after 7-year hold',
        'Founders open to partial rollover — not a full exit',
        'Strong US generics pipeline justifies premium valuation of 14–16x EBITDA',
      ],
      watchOuts: [
        'One FDA facility inspection pending — outcome could affect valuation',
        'Key-man risk: founder Dr. Ashok Pillai drives all US regulatory relationships',
        'Two competitor generics entering lead oncology molecule in Q3 FY26',
      ],
    },

    documents: [
      { id: 'doc-001', name: 'Pinnacle_CIM_Draft.pdf', type: 'PDF', size: '4.1 MB', uploadedBy: 'Meera Iyer', uploadedAt: 'Mar 6, 2026', tag: 'CIM' },
      { id: 'doc-002', name: 'Pinnacle_Financials_FY24-25.pdf', type: 'PDF', size: '1.8 MB', uploadedBy: 'Meera Iyer', uploadedAt: 'Mar 6, 2026', tag: 'Financials' },
      { id: 'doc-003', name: 'ANDA_Pipeline_Summary.xlsx', type: 'XLSX', size: '320 KB', uploadedBy: 'Karan Bose', uploadedAt: 'Mar 10, 2026', tag: 'Pipeline' },
      { id: 'doc-004', name: 'Lighthouse_SHA_Redacted.pdf', type: 'PDF', size: '670 KB', uploadedBy: 'Karan Bose', uploadedAt: 'Mar 14, 2026', tag: 'Legal' },
    ],

    activity: [
      { id: 1, type: 'action', message: '7 action items overdue — management presentation follow-ups', time: '1 day ago', actor: 'AI' },
      { id: 2, type: 'ai', message: 'IC Memo draft updated with DD findings', time: '2 days ago', actor: 'AI' },
      { id: 3, type: 'upload', message: 'Lighthouse_SHA_Redacted.pdf uploaded', time: '5 days ago', actor: 'Karan Bose' },
      { id: 4, type: 'meeting', message: 'Meeting notes added — Management Presentation Round 2', time: '6 days ago', actor: 'Meera Iyer' },
      { id: 5, type: 'deal', message: 'Deal moved to Due Diligence stage', time: '8 days ago', actor: 'Rajiv Mehta' },
    ],

    stageChecklist: [
      { id: 'g-1', label: 'Management presentation completed', done: true },
      { id: 'g-2', label: 'CIM circulated to shortlisted buyers', done: true },
      { id: 'g-3', label: 'FDA facility inspection resolved', done: false },
      { id: 'g-4', label: 'Financial model audit complete', done: false },
      { id: 'g-5', label: 'NDA executed with all shortlisted buyers', done: false },
      { id: 'g-6', label: 'Legal due diligence checklist closed', done: false },
      { id: 'g-7', label: 'Key-man retention plan confirmed', done: false },
    ],

    tileMeta: {
      prepSheet:   { status: 'Done' },
      meetingRoom: { status: 'Done', meetingCount: 2 },
      actionItems: { open: 5, inProgress: 2, done: 3 },
      icMemo:      { status: 'In Progress', version: 'v2 Draft' },
    },

    advanceCondition: 'Complete remaining checklist items before moving to IC Approval',
  },

  {
    id: 'deal-003',
    name: 'Project Indigo',
    company: 'BlueSky Renewables Ltd',
    sector: 'Energy / Renewables',
    dealType: 'Structured Finance',
    stage: 'IC Approval',
    stageIndex: 3,
    dealSize: '₹2,100 Cr',
    daysActive: 61,
    lastActivity: '3 days ago',
    team: [
      { name: 'Ananya Rao', role: 'MD', initials: 'AR' },
      { name: 'Priya Sharma', role: 'VP', initials: 'PS' },
      { name: 'Arjun Nair', role: 'Associate', initials: 'AN' },
    ],
    pendingActions: 2,
    nextMeeting: 'Apr 16, 2026',

    snapshot: {
      confidence: 'High',
      source: 'BlueSky_Project_Brief.pdf',
      overview:
        'BlueSky Renewables Ltd is a Pune-based renewable energy developer with an operational portfolio of 380 MW across solar and wind assets in Rajasthan, Gujarat, and Karnataka. The company is pursuing a ₹2,100 Cr structured financing round to fund Phase 2 expansion — adding 520 MW of solar capacity with offtake agreements already secured from two state DISCOMs and one C&I customer. IMC is structuring a green bond issuance combined with a senior secured project finance tranche.',
      metrics: [
        { label: 'Operational Capacity', value: '380 MW' },
        { label: 'Expansion Target', value: '520 MW' },
        { label: 'Revenue (FY25)', value: '₹310 Cr' },
        { label: 'DSCR (proj.)', value: '1.42x' },
        { label: 'Deal Size', value: '₹2,100 Cr' },
      ],
      whyHere: [
        'Phase 2 capex requires ₹2,100 Cr — equity alone insufficient',
        'DISCOM offtake agreements provide revenue visibility for debt structuring',
        'Green bond market conditions currently favourable — 7.2% coupon achievable',
      ],
      watchOuts: [
        'One DISCOM (Rajasthan) has a history of delayed payments — PPA terms need tightening',
        'Land acquisition for 3 of 8 Phase 2 sites still in progress',
        'Regulatory clearance for Karnataka wind sites pending with MNRE',
      ],
    },

    documents: [
      { id: 'doc-001', name: 'BlueSky_Project_Brief.pdf', type: 'PDF', size: '3.2 MB', uploadedBy: 'Arjun Nair', uploadedAt: 'Feb 7, 2026', tag: 'Teaser' },
      { id: 'doc-002', name: 'BlueSky_Financial_Model_v3.xlsx', type: 'XLSX', size: '2.1 MB', uploadedBy: 'Arjun Nair', uploadedAt: 'Feb 14, 2026', tag: 'Financials' },
      { id: 'doc-003', name: 'DISCOM_Offtake_Agreements.pdf', type: 'PDF', size: '5.6 MB', uploadedBy: 'Priya Sharma', uploadedAt: 'Feb 20, 2026', tag: 'Legal' },
      { id: 'doc-004', name: 'GreenBond_TermSheet_v2.docx', type: 'DOCX', size: '280 KB', uploadedBy: 'Priya Sharma', uploadedAt: 'Mar 18, 2026', tag: 'Legal' },
      { id: 'doc-005', name: 'IC_Memo_BlueSky_Draft3.docx', type: 'DOCX', size: '490 KB', uploadedBy: 'Ananya Rao', uploadedAt: 'Apr 6, 2026', tag: 'IC Memo' },
    ],

    activity: [
      { id: 1, type: 'ai', message: 'IC Memo v3 finalised — ready for committee submission', time: '3 days ago', actor: 'AI' },
      { id: 2, type: 'upload', message: 'IC_Memo_BlueSky_Draft3.docx uploaded', time: '3 days ago', actor: 'Ananya Rao' },
      { id: 3, type: 'deal', message: 'Deal moved to IC Approval stage', time: '5 days ago', actor: 'Ananya Rao' },
      { id: 4, type: 'meeting', message: 'Final management presentation completed', time: '8 days ago', actor: 'Priya Sharma' },
      { id: 5, type: 'upload', message: 'GreenBond_TermSheet_v2.docx uploaded', time: '22 days ago', actor: 'Priya Sharma' },
    ],

    stageChecklist: [
      { id: 'g-1', label: 'IC Memo v3 finalised', done: true },
      { id: 'g-2', label: 'All DD findings incorporated', done: true },
      { id: 'g-3', label: 'IC date confirmed with committee', done: false },
      { id: 'g-4', label: 'Rajasthan DISCOM PPA terms updated', done: false },
    ],

    tileMeta: {
      prepSheet:   { status: 'Done' },
      meetingRoom: { status: 'Done', meetingCount: 3 },
      actionItems: { open: 1, inProgress: 1, done: 8 },
      icMemo:      { status: 'Done', version: 'v3 — Final' },
    },

    advanceCondition: 'Complete remaining checklist items before moving to Closing',
  },
];

export const activeDeal = deals[0];

// Short display labels for pipeline strip (positional — matches deal.stageIndex)
export const stages = ['Origination', 'Pitch', 'Diligence', 'IC', 'Closing'];

// Full stage names as stored on deal.stage — used for filtering/counting
export const stageFullNames = ['Origination', 'Pitch Preparation', 'Due Diligence', 'IC Approval', 'Closing'];

export function getDealById(id) {
  return deals.find((d) => d.id === id) ?? null;
}
