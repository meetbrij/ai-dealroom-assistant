// Dummy Meeting Room data for Project Falcon — Meeting 1

export const meetingData = {
  dealId: 'deal-001',
  meetingId: 'mtg-001',
  title: 'Mandate Discussion — Initial Pitch',
  date: 'Apr 11, 2026',
  duration: '62 minutes',
  participants: [
    { name: 'Rajiv Mehta', role: 'Banker', company: 'IMC' },
    { name: 'Priya Sharma', role: 'Banker', company: 'IMC' },
    { name: 'Vikram Singhania', role: 'Client', company: 'Acme Industrials' },
    { name: 'Rahul Desai', role: 'Client', company: 'Acme Industrials' },
  ],

  transcript: `Rajiv Mehta: Good morning Vikram, Rahul. Thank you for making time. As discussed, we want to walk you through how we'd approach the process for Acme.

Vikram Singhania: Of course Rajiv. We've been impressed with your work on the Endurance deal. That's why we called you first.

Rajiv Mehta: We appreciate that. Let me start with our view on valuation. Based on your FY25 numbers and the EV traction, we believe a controlled auction targeting strategic buyers in Japan and Germany could achieve 11 to 13x EBITDA. That's ₹815 to ₹960 crores for the business.

Rahul Desai: Our internal view was closer to 10x. The Pune plant situation has us worried about how buyers will react.

Priya Sharma: Rahul, that's actually something we wanted to address directly. We've seen this in two previous mandates. The right way to handle it is full disclosure upfront with a clear remediation plan. Buyers who see it buried react badly. Buyers who see it disclosed with a plan — they factor it in and move on.

Vikram Singhania: What's the timeline you're proposing?

Rajiv Mehta: CIM ready in six weeks. Management presentations in August. First round bids by end of September. We're targeting close before March 2027.

Vikram Singhania: That timeline works for us. One thing I need to be certain about — my son Aryan needs to be offered a role in the acquiring company. That's a non-negotiable for me personally.

Rajiv Mehta: Understood. We'll structure management retention as a condition in the SPA. That's standard in strategic acquisitions of this profile.

Rahul Desai: One more concern — we have a ROFR with our existing minority investor, Westbridge. Have you dealt with this before?

Priya Sharma: Yes, we'll need to review the shareholders agreement. Westbridge will need to either exercise or waive. We'll work with your legal team to structure the timeline so it doesn't slow the process.

Vikram Singhania: I'm comfortable proceeding. What do you need from us to get started?

Rajiv Mehta: Three things. Audited FY25 financials, a full cap table, and a resolution from the board authorising IMC as exclusive advisor. Priya will send you a formal engagement letter by end of week.

Vikram Singhania: Agreed. Rahul, please coordinate with the IMC team on the documents.

Rahul Desai: Will do. One last thing — can you please clarify your fee structure? Is it a retainer plus success fee?

Rajiv Mehta: Correct. Monthly retainer of ₹8 lakhs for the duration of the process, plus a success fee of 1.5% of transaction value on close. We'll include full details in the engagement letter.

Vikram Singhania: That's acceptable. Let's move forward.`,

  summary: {
    overview:
      'IMC presented its mandate pitch to Acme Industrials promoter Vikram Singhania and CFO Rahul Desai. The meeting resulted in a verbal agreement to proceed with IMC as exclusive sell-side advisor. Key terms agreed: timeline to close by March 2027, management retention for Aryan Singhania as a non-negotiable condition, and IMC fee structure accepted in principle.',
    keyDecisions: [
      'Acme to proceed with IMC as exclusive sell-side advisor',
      'Formal engagement letter to be issued by end of week (Apr 11)',
      'Aryan Singhania management retention to be structured as SPA condition',
      'Full disclosure approach on Pune plant issue agreed by both sides',
    ],
    clientConcerns: [
      { text: 'Pune plant environmental compliance issue — worried it will scare buyers', severity: 'high' },
      { text: 'Internal valuation expectation lower than IMC\'s estimate (10x vs 11–13x)', severity: 'medium' },
      { text: 'Westbridge ROFR may complicate or delay process', severity: 'medium' },
    ],
    bankerCommitments: [
      { text: 'Priya Sharma to send formal engagement letter by Apr 11, 2026', owner: 'Priya Sharma', due: 'Apr 11, 2026' },
      { text: 'Structure Aryan Singhania management retention as SPA condition', owner: 'Rajiv Mehta', due: 'Apr 18, 2026' },
      { text: 'Coordinate with Acme legal team on Westbridge ROFR review', owner: 'Priya Sharma', due: 'Apr 18, 2026' },
      { text: 'CIM first draft to be ready within 6 weeks', owner: 'Arjun Nair', due: 'May 23, 2026' },
    ],
    clientCommitments: [
      { text: 'Rahul Desai to share audited FY25 financials with IMC team', due: 'Apr 14, 2026' },
      { text: 'Full cap table to be provided to IMC', due: 'Apr 14, 2026' },
      { text: 'Board resolution authorising IMC as exclusive advisor', due: 'Apr 18, 2026' },
    ],
    openQuestions: [
      'Westbridge ROFR — exact clause language and exercise period to be confirmed',
      'Current status of Pune plant remediation plan — timeline and cost estimate',
      'Has the promoter family formally aligned on valuation expectations?',
    ],
  },
};
