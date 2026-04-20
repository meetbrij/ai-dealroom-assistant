import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDealById, stages } from '../data/deals';

const stageColors = [
  'bg-slate-100 text-slate-600',
  'bg-blue-100 text-blue-700',
  'bg-amber-100 text-amber-700',
  'bg-purple-100 text-purple-700',
  'bg-green-100 text-green-700',
];

const activityIcons = {
  ai: (
    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
      <svg className="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    </div>
  ),
  upload: (
    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
      <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    </div>
  ),
  team: (
    <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0">
      <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    </div>
  ),
  deal: (
    <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
      <svg className="w-3.5 h-3.5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 10V7" />
      </svg>
    </div>
  ),
  meeting: (
    <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
      <svg className="w-3.5 h-3.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    </div>
  ),
  action: (
    <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center shrink-0">
      <svg className="w-3.5 h-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    </div>
  ),
};

const docTypeColors = {
  PDF: 'bg-red-50 text-red-600',
  XLSX: 'bg-green-50 text-green-600',
  DOCX: 'bg-blue-50 text-blue-600',
};

const docTagColors = {
  Teaser: 'bg-amber-50 text-amber-700',
  Financials: 'bg-green-50 text-green-700',
  Legal: 'bg-purple-50 text-purple-700',
  CIM: 'bg-blue-50 text-blue-700',
  Pipeline: 'bg-cyan-50 text-cyan-700',
  'IC Memo': 'bg-slate-100 text-slate-600',
};

// Which stage each tile unlocks at (maps to stageIndex in stages array)
const TILE_UNLOCK_STAGE = {
  prepSheet:   1,  // Pitch
  meetingRoom: 2,  // Diligence
  actionItems: 2,  // Diligence
  icMemo:      3,  // IC
};

function StagePipeline({ stageIndex, completionPct }) {
  return (
    <div className="flex items-center gap-0">
      {stages.map((stage, i) => {
        const isActive = i === stageIndex;
        const isPast = i < stageIndex;
        return (
          <div key={stage} className="flex items-center">
            <div className={`flex flex-col px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
              isActive
                ? `${stageColors[i]} ring-2 ring-offset-1 ring-blue-300`
                : isPast
                ? 'bg-slate-100 text-slate-400'
                : 'bg-slate-50 text-slate-300'
            }`}>
              <div className="flex items-center gap-1.5">
                {isPast && (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {stage}
              </div>
              {isActive && completionPct !== undefined && (
                <div className="w-full mt-1 h-1 rounded-full bg-blue-200">
                  <div
                    className="h-1 rounded-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${completionPct}%` }}
                  />
                </div>
              )}
            </div>
            {i < stages.length - 1 && (
              <div className={`w-5 h-px mx-1 ${i < stageIndex ? 'bg-slate-300' : 'bg-slate-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function ActionTile({ emoji, label, description, accentColor, onClick, tileStatus, locked, unlocksAt }) {
  if (locked) {
    return (
      <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-5 cursor-not-allowed opacity-60">
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xl grayscale">
            {emoji}
          </div>
          <svg className="w-4 h-4 text-slate-400 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <p className="text-sm font-bold text-slate-400 mb-1">{label}</p>
        <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
        <p className="text-xs text-slate-400 mt-3 font-medium">Unlocks at {unlocksAt} stage</p>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg ${accentColor} flex items-center justify-center text-xl`}>
          {emoji}
        </div>
        {tileStatus && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tileStatus.colorClass}`}>
            {tileStatus.label}
          </span>
        )}
      </div>
      <p className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-1">{label}</p>
      <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
      <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
        Open
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}

export default function DealRoomHome() {
  const navigate = useNavigate();
  const { dealId } = useParams();

  const deal = getDealById(dealId);

  if (!deal) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-slate-500 mb-3">Deal not found.</p>
          <button onClick={() => navigate('/dashboard')} className="text-sm text-blue-600 hover:underline">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const { snapshot, documents, activity } = deal;

  // ── Stage progression state ──
  const [currentStageIndex, setCurrentStageIndex] = useState(deal.stageIndex);
  const [gates, setGates] = useState(deal.stageChecklist ?? []);
  const [advanced, setAdvanced] = useState(false);

  const doneGates = gates.filter(g => g.done).length;
  const totalGates = gates.length;
  const completionPct = totalGates > 0 ? Math.round((doneGates / totalGates) * 100) : 100;
  const isReady = totalGates > 0 && doneGates === totalGates;
  const nextStageName = stages[currentStageIndex + 1] ?? null;

  // Generate Slides state
  const [slidesState, setSlidesState] = useState('idle'); // 'idle' | 'generating' | 'sent'
  const [slidesBannerDismissed, setSlidesBannerDismissed] = useState(false);

  // Deal Analysis collapsible sections
  const [analysisOpen, setAnalysisOpen] = useState({ thesis: true, financial: true, risks: true });

  function toggleGate(id) {
    setGates(prev => prev.map(g => g.id === id ? { ...g, done: !g.done } : g));
  }

  function handleGenerateSlides() {
    if (slidesState !== 'idle') return;
    setSlidesState('generating');
    setSlidesBannerDismissed(false);
    setTimeout(() => setSlidesState('sent'), 2500);
  }

  function handleAdvance() {
    if (!isReady) return;
    setCurrentStageIndex(prev => prev + 1);
    setGates([]);
    setAdvanced(true);
  }

  // ── Tile status badges ──
  function getTileStatus(key) {
    if (!deal.tileMeta) return null;
    const m = deal.tileMeta;
    if (key === 'prepSheet') {
      return m.prepSheet.status === 'Done'
        ? { label: 'Done', colorClass: 'bg-green-100 text-green-700' }
        : m.prepSheet.status === 'In Progress'
        ? { label: 'In Progress', colorClass: 'bg-blue-100 text-blue-700' }
        : { label: 'Not Started', colorClass: 'bg-slate-100 text-slate-400' };
    }
    if (key === 'meetingRoom') {
      return m.meetingRoom.status === 'Done'
        ? { label: `${m.meetingRoom.meetingCount} meeting${m.meetingRoom.meetingCount !== 1 ? 's' : ''} logged`, colorClass: 'bg-green-100 text-green-700' }
        : { label: 'Not Started', colorClass: 'bg-slate-100 text-slate-400' };
    }
    if (key === 'actionItems') {
      return m.actionItems.open > 0
        ? { label: `${m.actionItems.open} open`, colorClass: 'bg-amber-100 text-amber-700' }
        : { label: 'All done', colorClass: 'bg-green-100 text-green-700' };
    }
    if (key === 'icMemo') {
      return m.icMemo.status === 'Done'
        ? { label: m.icMemo.version ?? 'Done', colorClass: 'bg-green-100 text-green-700' }
        : m.icMemo.status === 'In Progress'
        ? { label: m.icMemo.version ?? 'In Progress', colorClass: 'bg-blue-100 text-blue-700' }
        : { label: 'Not Started', colorClass: 'bg-slate-100 text-slate-400' };
    }
    return null;
  }

  const actionTiles = [
    {
      tileKey: 'prepSheet',
      emoji: '📋',
      label: 'Pre-Meeting Briefing',
      description: 'AI-generated briefing doc — company context, comps, talking points, and open questions.',
      accentColor: 'bg-blue-50',
      to: `/deals/${deal.id}/prep-sheet`,
      tileStatus: getTileStatus('prepSheet'),
    },
    {
      tileKey: 'meetingRoom',
      emoji: '🎙️',
      label: 'Meeting Room',
      description: 'Upload or paste a transcript — AI extracts decisions, concerns, and commitments.',
      accentColor: 'bg-amber-50',
      to: `/deals/${deal.id}/meeting-room`,
      tileStatus: getTileStatus('meetingRoom'),
    },
    {
      tileKey: 'actionItems',
      emoji: '✅',
      label: 'Action Items',
      description: 'Track all open tasks, owners, and deadlines from meetings and deal activity.',
      accentColor: 'bg-green-50',
      to: `/deals/${deal.id}/action-items`,
      tileStatus: getTileStatus('actionItems'),
    },
    {
      tileKey: 'icMemo',
      emoji: '📄',
      label: 'IC Memo',
      description: 'AI-assembled Investment Committee memo from all deal signals gathered so far.',
      accentColor: 'bg-purple-50',
      to: `/deals/${deal.id}/ic-memo`,
      tileStatus: getTileStatus('icMemo'),
    },
  ];

  return (
    <div className="min-h-full bg-slate-50">

      {/* Top bar */}
      <div className="bg-white border-b border-slate-200 px-8 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-slate-400 hover:text-slate-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-lg font-bold text-slate-900">{deal.name}</h1>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${stageColors[currentStageIndex]}`}>
                  {advanced ? (stages[currentStageIndex] ?? deal.stage) : deal.stage}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{deal.company} · {deal.sector} · Active {deal.daysActive} days</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {deal.team.map((m) => (
                <div
                  key={m.initials}
                  title={`${m.name} — ${m.role}`}
                  className="w-8 h-8 rounded-full bg-slate-600 border-2 border-white flex items-center justify-center"
                >
                  <span className="text-[10px] font-bold text-white">{m.initials}</span>
                </div>
              ))}
            </div>
            <button className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg px-3 py-1.5 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add docs
            </button>
          </div>
        </div>

        {/* Stage pipeline */}
        <div className="mt-3">
          <StagePipeline stageIndex={currentStageIndex} completionPct={completionPct} />
        </div>
      </div>

      {/* Body */}
      <div className="px-8 py-6 flex gap-6">

        {/* Main column */}
        <div className="flex-1 min-w-0 space-y-6">

          {/* Stage Advance CTA */}
          {nextStageName && !advanced && (
            <div className={`rounded-2xl border p-5 ${
              isReady
                ? 'bg-green-50 border-green-200'
                : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    isReady ? 'bg-green-100' : 'bg-amber-100'
                  }`}>
                    {isReady ? (
                      <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${isReady ? 'text-green-800' : 'text-slate-700'}`}>
                      {isReady ? 'Stage complete — all gates cleared' : 'Stage in progress'}
                    </p>
                    <p className={`text-xs mt-0.5 ${isReady ? 'text-green-700' : 'text-slate-500'}`}>
                      {isReady
                        ? `Ready to advance to ${nextStageName}`
                        : deal.advanceCondition ?? `Complete checklist items before moving to ${nextStageName}`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleAdvance}
                  disabled={!isReady}
                  className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isReady
                      ? 'bg-blue-700 hover:bg-blue-800 text-white'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Move to {nextStageName}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Post-advance success banner */}
          {advanced && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-800">
                    Deal advanced to {stages[currentStageIndex]}
                  </p>
                  <p className="text-xs text-green-700 mt-0.5">Stage updated · Checklist reset for next phase</p>
                </div>
              </div>
              <button
                onClick={() => setAdvanced(false)}
                className="text-green-600 hover:text-green-800 transition-colors text-xs font-medium"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Company Snapshot card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h2 className="text-sm font-bold text-slate-900">Company Snapshot</h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                  AI · {snapshot.confidence} confidence
                </span>
              </div>
              <span className="text-xs text-slate-400">Generated from {snapshot.source}</span>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed mb-5">
              <span className="font-semibold text-slate-900">{deal.company}</span>{' '}
              {snapshot.overview.replace(deal.company, '').trimStart()}
            </p>

            {/* Key metrics grid */}
            <div className="grid grid-cols-5 gap-3 mb-5">
              {snapshot.metrics.map(({ label, value }) => (
                <div key={label} className="bg-slate-50 rounded-lg px-3 py-2.5 text-center">
                  <p className="text-base font-bold text-slate-900">{value}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">{label}</p>
                </div>
              ))}
            </div>

            {/* Why here + watch-outs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Why they're here</p>
                <ul className="space-y-1.5">
                  {snapshot.whyHere.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                      <svg className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Watch-outs</p>
                <ul className="space-y-1.5">
                  {snapshot.watchOuts.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                      <svg className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Deal Workflow */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-slate-700">Deal Workflow</h2>
              {currentStageIndex === 1 && (
                <button
                  onClick={handleGenerateSlides}
                  disabled={slidesState !== 'idle'}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                    slidesState === 'idle'
                      ? 'bg-blue-700 hover:bg-blue-800 text-white'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {slidesState === 'idle' && (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Generate Slides (Pitch Deck)
                    </>
                  )}
                  {slidesState === 'generating' && '⏳ Generating…'}
                  {slidesState === 'sent' && '✓ Slides Queued'}
                </button>
              )}
            </div>

            {/* Generate Slides banner */}
            {currentStageIndex === 1 && slidesState !== 'idle' && !slidesBannerDismissed && (
              <div className={`mb-4 rounded-xl border px-4 py-3 flex items-start justify-between gap-3 ${
                slidesState === 'generating'
                  ? 'bg-blue-50 border-blue-200 text-blue-800'
                  : 'bg-green-50 border-green-200 text-green-800'
              }`}>
                <div className="flex items-start gap-2.5">
                  {slidesState === 'generating' ? (
                    <svg className="w-4 h-4 mt-0.5 shrink-0 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 mt-0.5 shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  <p className="text-sm leading-snug">
                    {slidesState === 'generating'
                      ? 'Pitch Deck generation in progress. Once ready, the pitch deck will be emailed to your account.'
                      : 'Pitch Deck is being compiled by AI. You\'ll receive an email at arjun.nair@imc.com when it\'s ready.'}
                  </p>
                </div>
                <button
                  onClick={() => setSlidesBannerDismissed(true)}
                  className="shrink-0 opacity-50 hover:opacity-100 transition-opacity mt-0.5"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {actionTiles.map((tile) => {
                const unlockIndex = TILE_UNLOCK_STAGE[tile.tileKey];
                const isLocked = currentStageIndex < unlockIndex;
                return (
                  <ActionTile
                    key={tile.label}
                    {...tile}
                    locked={isLocked}
                    unlocksAt={stages[unlockIndex]}
                    onClick={isLocked ? undefined : () => navigate(tile.to)}
                    tileStatus={isLocked ? null : tile.tileStatus}
                  />
                );
              })}
            </div>
          </div>

          {/* Deal Analysis — visible from Diligence stage onwards */}
          {currentStageIndex >= 2 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h2 className="text-sm font-bold text-slate-900">Deal Analysis</h2>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                    AI · {snapshot.confidence} confidence
                  </span>
                </div>
                <span className="text-xs text-slate-400">Source: {snapshot.source}</span>
              </div>

              {/* Deal Thesis */}
              <div className="border border-slate-100 rounded-xl mb-3">
                <button
                  onClick={() => setAnalysisOpen(prev => ({ ...prev, thesis: !prev.thesis }))}
                  className="w-full flex items-center justify-between px-4 py-3 text-left"
                >
                  <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Deal Thesis</span>
                  <svg className={`w-4 h-4 text-slate-400 transition-transform ${analysisOpen.thesis ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {analysisOpen.thesis && (
                  <div className="px-4 pb-4">
                    <ul className="space-y-2">
                      {snapshot.whyHere.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                          <svg className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Financial Summary */}
              <div className="border border-slate-100 rounded-xl mb-3">
                <button
                  onClick={() => setAnalysisOpen(prev => ({ ...prev, financial: !prev.financial }))}
                  className="w-full flex items-center justify-between px-4 py-3 text-left"
                >
                  <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Financial Summary</span>
                  <svg className={`w-4 h-4 text-slate-400 transition-transform ${analysisOpen.financial ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {analysisOpen.financial && (
                  <div className="px-4 pb-4">
                    <div className="grid grid-cols-3 gap-2">
                      {snapshot.metrics.map(({ label, value }) => (
                        <div key={label} className="bg-slate-50 rounded-lg px-3 py-2.5 text-center">
                          <p className="text-base font-bold text-slate-900">{value}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">{label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Risk Flags */}
              <div className="border border-slate-100 rounded-xl">
                <button
                  onClick={() => setAnalysisOpen(prev => ({ ...prev, risks: !prev.risks }))}
                  className="w-full flex items-center justify-between px-4 py-3 text-left"
                >
                  <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Risk Flags</span>
                  <svg className={`w-4 h-4 text-slate-400 transition-transform ${analysisOpen.risks ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {analysisOpen.risks && (
                  <div className="px-4 pb-4 space-y-2">
                    {snapshot.watchOuts.map((item, i) => (
                      <div key={item} className={`flex items-start gap-2.5 text-sm rounded-lg px-3 py-2 ${
                        i === 0 ? 'bg-red-50 text-red-800' : 'bg-amber-50 text-amber-800'
                      }`}>
                        <svg className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${i === 0 ? 'text-red-500' : 'text-amber-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Document library */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-900">Document Library</h2>
              <button className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors">
                + Upload
              </button>
            </div>
            <div className="space-y-2">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center gap-3 px-4 py-3 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all group">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${docTypeColors[doc.type] ?? 'bg-slate-100 text-slate-600'}`}>
                    {doc.type}
                  </span>
                  <span className="flex-1 text-sm text-slate-800 font-medium truncate">{doc.name}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${docTagColors[doc.tag] ?? 'bg-slate-100 text-slate-500'}`}>
                    {doc.tag}
                  </span>
                  <span className="text-xs text-slate-400 shrink-0">{doc.size}</span>
                  <span className="text-xs text-slate-400 shrink-0 hidden group-hover:block">{doc.uploadedBy}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right sidebar */}
        <div className="w-72 shrink-0 space-y-4">

          {/* Stage Readiness — moved to top of sidebar */}
          {gates.length > 0 && (
            <div className={`rounded-2xl border-2 p-5 ${isReady ? 'bg-green-50 border-green-400' : 'bg-white border-amber-300'}`}>
              <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${isReady ? 'text-green-600' : 'text-amber-600'}`}>Stage Readiness</h3>
              <div className="space-y-2.5 mb-4">
                {gates.map((gate) => (
                  <button
                    key={gate.id}
                    onClick={() => toggleGate(gate.id)}
                    className="w-full flex items-center gap-2.5 text-left group"
                  >
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      gate.done ? 'bg-green-500' : 'border-2 border-slate-300 group-hover:border-blue-400'
                    }`}>
                      {gate.done && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-xs transition-colors ${
                      gate.done ? 'text-slate-400 line-through' : 'text-slate-700 group-hover:text-slate-900'
                    }`}>
                      {gate.label}
                    </span>
                  </button>
                ))}
              </div>
              {isReady ? (
                <div className="text-xs text-green-700 bg-green-100 rounded-lg px-3 py-2 flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Ready to advance to next stage
                </div>
              ) : (
                <div className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
                  {totalGates - doneGates} item{totalGates - doneGates !== 1 ? 's' : ''} remaining to advance
                </div>
              )}
            </div>
          )}

          {/* Deal Status */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Deal Status</h3>
            <div className="space-y-3">
              {[
                { label: 'Deal size', value: deal.dealSize },
                { label: 'Deal type', value: deal.dealType },
                { label: 'Days active', value: `${deal.daysActive} days` },
                { label: 'Next meeting', value: deal.nextMeeting },
                { label: 'Stage progress', value: `${doneGates} / ${totalGates} gates cleared`, highlight: doneGates < totalGates },
              ].map(({ label, value, highlight }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">{label}</span>
                  <span className={`text-xs font-semibold ${highlight ? 'text-amber-600' : 'text-slate-800'}`}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity feed */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {activity.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  {activityIcons[item.type] ?? activityIcons.deal}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-700 leading-snug">{item.message}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{item.actor} · {item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Deal Team</h3>
            <div className="space-y-2.5">
              {deal.team.map((member) => (
                <div key={member.initials} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-white">{member.initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-800 truncate">{member.name}</p>
                    <p className="text-[11px] text-slate-400">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
