import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { getDealById, stages, deals } from '../data/deals';

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

function StagePipeline({ stageIndex }) {
  return (
    <div className="flex items-center gap-0">
      {stages.map((stage, i) => {
        const isActive = i === stageIndex;
        const isPast = i < stageIndex;
        return (
          <div key={stage} className="flex items-center">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
              isActive
                ? `${stageColors[i]} ring-2 ring-offset-1 ring-blue-300`
                : isPast
                ? 'bg-slate-100 text-slate-400'
                : 'bg-slate-50 text-slate-300'
            }`}>
              {isPast && (
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
              {stage}
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

function ActionTile({ emoji, label, description, accentColor, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition-all group"
    >
      <div className={`w-10 h-10 rounded-lg ${accentColor} flex items-center justify-center text-xl mb-3`}>
        {emoji}
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

// Build a dynamic deal object from New Deal Setup form data,
// falling back to Project Falcon dummy data for everything not supplied.
function buildDynamicDeal(formState) {
  const base = deals[0]; // Project Falcon as fallback template
  const initials = (name) =>
    name.trim().split(' ').map((w) => w[0].toUpperCase()).join('').slice(0, 2);

  return {
    ...base,
    id: 'new-deal',
    name: formState.dealName || 'New Deal',
    company: formState.companyName || base.company,
    sector: formState.sector || base.sector,
    dealType: formState.dealType || base.dealType,
    dealSize: formState.estimatedValue || base.dealSize,
    daysActive: 0,
    lastActivity: 'Just now',
    nextMeeting: 'TBD',
    pendingActions: 0,
    team: formState.team?.length
      ? formState.team.map((m) => ({ ...m, initials: m.initials || initials(m.name) }))
      : base.team,
    snapshot: {
      ...base.snapshot,
      source: formState.uploadedFiles?.length
        ? formState.uploadedFiles[0]
        : 'New Deal Setup',
      overview:
        `${formState.companyName || base.company} is a ${formState.sector || base.sector} company engaged in a ${formState.dealType || base.dealType} transaction${formState.estimatedValue ? ` valued at ${formState.estimatedValue}` : ''}. ` +
        'AI-generated company context will appear here once documents are processed. The snapshot below is pre-populated with illustrative data from comparable deals.',
      metrics: formState.estimatedValue
        ? base.snapshot.metrics.map((m) =>
            m.label === 'Est. Deal Size' ? { ...m, value: formState.estimatedValue } : m
          )
        : base.snapshot.metrics,
    },
    documents: formState.uploadedFiles?.length
      ? formState.uploadedFiles.map((name, i) => ({
          id: `doc-new-${i}`,
          name,
          type: name.endsWith('.docx') ? 'DOCX' : 'PDF',
          tag: i === 0 ? 'Teaser' : i === 1 ? 'Financials' : 'CIM',
          size: '—',
          uploadedBy: formState.team?.[0]?.name || 'You',
        }))
      : base.documents,
    activity: [
      {
        id: 'act-new-1',
        type: 'ai',
        message: `Deal room created for "${formState.dealName || 'New Deal'}". AI has pre-populated the company snapshot.`,
        actor: 'AI Assistant',
        time: 'Just now',
      },
      ...(formState.uploadedFiles?.length
        ? [{
            id: 'act-new-2',
            type: 'upload',
            message: `${formState.uploadedFiles.length} document(s) uploaded and processed.`,
            actor: formState.team?.[0]?.name || 'You',
            time: 'Just now',
          }]
        : []),
    ],
  };
}

export default function DealRoomHome() {
  const navigate = useNavigate();
  const { dealId } = useParams();
  const location = useLocation();

  const deal = dealId === 'new-deal' && location.state
    ? buildDynamicDeal(location.state)
    : getDealById(dealId);

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

  const actionTiles = [
    {
      emoji: '📋',
      label: 'Prep Sheet',
      description: 'AI-generated briefing doc — company context, comps, talking points, and open questions.',
      accentColor: 'bg-blue-50',
      to: `/deals/${deal.id}/prep-sheet`,
    },
    {
      emoji: '🎙️',
      label: 'Meeting Room',
      description: 'Upload or paste a transcript — AI extracts decisions, concerns, and commitments.',
      accentColor: 'bg-amber-50',
      to: `/deals/${deal.id}/meeting-room`,
    },
    {
      emoji: '✅',
      label: 'Action Items',
      description: 'Track all open tasks, owners, and deadlines from meetings and deal activity.',
      accentColor: 'bg-green-50',
      to: `/deals/${deal.id}/action-items`,
    },
    {
      emoji: '📄',
      label: 'IC Memo',
      description: 'AI-assembled Investment Committee memo from all deal signals gathered so far.',
      accentColor: 'bg-purple-50',
      to: `/deals/${deal.id}/ic-memo`,
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
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${stageColors[deal.stageIndex]}`}>
                  {deal.stage}
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
          <StagePipeline stageIndex={deal.stageIndex} />
        </div>
      </div>

      {/* Body */}
      <div className="px-8 py-6 flex gap-6">

        {/* Main column */}
        <div className="flex-1 min-w-0 space-y-6">

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

          {/* Four action tiles */}
          <div>
            <h2 className="text-sm font-semibold text-slate-700 mb-3">Deal Workflow</h2>
            <div className="grid grid-cols-2 gap-4">
              {actionTiles.map((tile) => (
                <ActionTile
                  key={tile.label}
                  {...tile}
                  onClick={() => navigate(tile.to)}
                />
              ))}
            </div>
          </div>

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

          {/* Deal Status */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Deal Status</h3>
            <div className="space-y-3">
              {[
                { label: 'Deal size', value: deal.dealSize },
                { label: 'Deal type', value: deal.dealType },
                { label: 'Days active', value: `${deal.daysActive} days` },
                { label: 'Next meeting', value: deal.nextMeeting },
                { label: 'Pending actions', value: `${deal.pendingActions} open`, highlight: deal.pendingActions > 0 },
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
