import { useNavigate } from 'react-router-dom';
import { deals, stages, stageFullNames } from '../data/deals';

const stageColors = {
  'Origination': 'bg-slate-100 text-slate-600',
  'Pitch Preparation': 'bg-blue-100 text-blue-700',
  'Due Diligence': 'bg-amber-100 text-amber-700',
  'IC Approval': 'bg-purple-100 text-purple-700',
  'Closing': 'bg-green-100 text-green-700',
};

const sectorIcons = {
  'Manufacturing': '⚙️',
  'Healthcare / Pharma': '💊',
  'Energy / Renewables': '⚡',
};

function PipelineStrip() {
  const stageCounts = stages.map((shortLabel, i) => ({
    label: shortLabel,
    count: deals.filter((d) => d.stage === stageFullNames[i]).length,
  }));

  return (
    <div className="flex items-stretch bg-white border border-slate-200 rounded-xl overflow-hidden">
      {stageCounts.map((stage, i) => (
        <div
          key={stage.label}
          className={`flex-1 px-4 py-3 text-center ${i < stageCounts.length - 1 ? 'border-r border-slate-200' : ''}`}
        >
          <p className="text-xs font-medium text-slate-500 mb-1">{stage.label}</p>
          <p className="text-xl font-bold text-slate-800">{stage.count}</p>
        </div>
      ))}
    </div>
  );
}

function StatCard({ label, value, sub, icon }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl px-5 py-4 flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 text-blue-600">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <p className="text-xs text-slate-500 mt-0.5">{label}</p>
        {sub && <p className="text-xs text-slate-400">{sub}</p>}
      </div>
    </div>
  );
}

function TeamAvatars({ team }) {
  return (
    <div className="flex -space-x-2">
      {team.slice(0, 4).map((member) => (
        <div
          key={member.initials}
          title={`${member.name} — ${member.role}`}
          className="w-7 h-7 rounded-full bg-slate-600 border-2 border-white flex items-center justify-center"
        >
          <span className="text-[10px] font-bold text-white">{member.initials}</span>
        </div>
      ))}
    </div>
  );
}

function DealCard({ deal, onClick }) {
  const stageBadge = stageColors[deal.stage] ?? 'bg-slate-100 text-slate-600';
  const icon = sectorIcons[deal.sector] ?? '📁';

  return (
    <div
      onClick={onClick}
      className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-lg shrink-0">
            {icon}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{deal.name}</p>
            <p className="text-xs text-slate-500">{deal.company}</p>
          </div>
        </div>
        <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${stageBadge}`}>
          {deal.stage}
        </span>
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 mb-4">
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          {deal.dealType}
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {deal.dealSize}
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {deal.daysActive}d active
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <TeamAvatars team={deal.team} />
        <div className="flex items-center gap-3 text-xs text-slate-400">
          {deal.pendingActions > 0 && (
            <span className="flex items-center gap-1 text-amber-600 font-medium">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {deal.pendingActions} actions
            </span>
          )}
          <span>Last activity {deal.lastActivity}</span>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const totalActions = deals.reduce((sum, d) => sum + d.pendingActions, 0);

  return (
    <div className="min-h-full bg-slate-50">

      {/* Top bar */}
      <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="text-lg font-bold text-slate-900">Deal Overview</h1>
          <p className="text-xs text-slate-500 mt-0.5">Wednesday, 9 April 2026</p>
        </div>
        <button
          onClick={() => navigate('/deals/new')}
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          New Deal
        </button>
      </div>

      <div className="px-8 py-6 space-y-6 max-w-6xl">

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4">
          <StatCard
            label="Active Deals"
            value={deals.length}
            sub="Across all stages"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 10V7" />
              </svg>
            }
          />
          <StatCard
            label="Meetings This Week"
            value="2"
            sub="Next: Apr 11 — Project Falcon"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
          />
          <StatCard
            label="Pending Actions"
            value={totalActions}
            sub={`Across ${deals.length} deals`}
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            }
          />
        </div>

        {/* Pipeline strip */}
        <div>
          <h2 className="text-sm font-semibold text-slate-700 mb-2">Deal Pipeline</h2>
          <PipelineStrip />
        </div>

        {/* Deal cards */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-700">Active Deals</h2>
            <span className="text-xs text-slate-400">{deals.length} deals</span>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {deals.map((deal) => (
              <DealCard
                key={deal.id}
                deal={deal}
                onClick={() => navigate(`/deals/${deal.id}`)}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
