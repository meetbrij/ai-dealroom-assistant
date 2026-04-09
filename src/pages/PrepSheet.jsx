import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { prepSheetData } from '../data/prepSheet';

const confidenceConfig = {
  High: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
  Medium: { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
  Low: { bg: 'bg-red-100', text: 'text-red-600', dot: 'bg-red-500' },
};

function ConfidenceBadge({ level }) {
  const c = confidenceConfig[level] ?? confidenceConfig.Medium;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {level} confidence
    </span>
  );
}

function SectionCard({ title, confidence, source, children, onRegenerate }) {
  const [editing, setEditing] = useState(false);
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <h2 className="text-sm font-bold text-slate-900">{title}</h2>
          <ConfidenceBadge level={confidence} />
        </div>
        <div className="flex items-center gap-2">
          {source && <span className="text-xs text-slate-400 hidden sm:block">Source: {source}</span>}
          <button
            onClick={() => setEditing((v) => !v)}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 border border-slate-200 rounded-md px-2.5 py-1.5 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            {editing ? 'Done' : 'Edit'}
          </button>
          <button
            onClick={onRegenerate}
            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 border border-blue-200 rounded-md px-2.5 py-1.5 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Regenerate
          </button>
        </div>
      </div>
      <div className={editing ? 'ring-2 ring-blue-300 rounded-xl p-1 -m-1' : ''}>
        {children}
      </div>
    </div>
  );
}

function RegeneratingOverlay() {
  return (
    <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-2xl z-10">
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <svg className="w-4 h-4 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        Regenerating…
      </div>
    </div>
  );
}

function useRegenerate() {
  const [regenerating, setRegenerating] = useState(null);
  function trigger(key) {
    setRegenerating(key);
    setTimeout(() => setRegenerating(null), 1400);
  }
  return { regenerating, trigger };
}

export default function PrepSheet() {
  const navigate = useNavigate();
  const { dealId } = useParams();
  const { regenerating, trigger } = useRegenerate();
  const data = prepSheetData;

  function handleExport() {
    const toast = document.getElementById('export-toast');
    toast.classList.remove('opacity-0', 'translate-y-2');
    toast.classList.add('opacity-100', 'translate-y-0');
    setTimeout(() => {
      toast.classList.remove('opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', 'translate-y-2');
    }, 2500);
  }

  return (
    <div className="min-h-full bg-slate-50">

      {/* Toast */}
      <div
        id="export-toast"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg opacity-0 translate-y-2 transition-all duration-300 pointer-events-none"
      >
        <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        Prep Sheet exported as PDF
      </div>

      {/* Top bar */}
      <div className="bg-white border-b border-slate-200 px-8 py-4 sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(`/deals/${dealId}`)} className="text-slate-400 hover:text-slate-700 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900">Pre-Meeting Prep Sheet</h1>
              <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2.5 py-0.5 rounded-full">AI Generated</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {data.meetingWith} · {data.meetingDate} · Generated {data.generatedAt}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 border border-slate-200 hover:border-slate-300 rounded-lg px-4 py-2 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export PDF
          </button>
          <button
            onClick={() => navigate(`/deals/${dealId}/meeting-room`)}
            className="flex items-center gap-1.5 text-sm font-semibold bg-blue-700 hover:bg-blue-800 text-white rounded-lg px-4 py-2 transition-colors"
          >
            Go to Meeting Room
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="px-8 py-6 max-w-4xl space-y-5">

        {/* 4a — Company Brief */}
        <div className="relative">
          {regenerating === 'brief' && <RegeneratingOverlay />}
          <SectionCard
            title="Company Brief"
            confidence={data.companyBrief.confidence}
            source="Acme_Teaser_FY25.pdf"
            onRegenerate={() => trigger('brief')}
          >
            <p className="text-sm text-slate-700 leading-relaxed mb-4">{data.companyBrief.overview}</p>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {data.companyBrief.financials.map(({ label, value }) => (
                <div key={label} className="bg-slate-50 rounded-lg px-3 py-2.5">
                  <p className="text-xs text-slate-500 mb-0.5">{label}</p>
                  <p className="text-sm font-bold text-slate-900">{value}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Recent signals</p>
              <ul className="space-y-1.5">
                {data.companyBrief.signals.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </SectionCard>
        </div>

        {/* 4b — Deal Context */}
        <div className="relative">
          {regenerating === 'context' && <RegeneratingOverlay />}
          <SectionCard
            title="Deal Context"
            confidence={data.dealContext.confidence}
            source="Deal metadata"
            onRegenerate={() => trigger('context')}
          >
            <div className="mb-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Why now</p>
              <p className="text-sm text-slate-700 leading-relaxed">{data.dealContext.whyNow}</p>
            </div>
            <div className="mb-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Stated objectives</p>
              <ul className="space-y-1.5">
                {data.dealContext.objectives.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-sm text-slate-700">
                    <svg className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    {o}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Sensitivities / watch-outs</p>
              <ul className="space-y-2">
                {data.dealContext.watchOuts.map((w) => (
                  <li key={w} className="flex items-start gap-2 text-sm text-slate-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                    <svg className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </SectionCard>
        </div>

        {/* 4c — Comparable Deals */}
        <div className="relative">
          {regenerating === 'comps' && <RegeneratingOverlay />}
          <SectionCard
            title="Comparable Transactions"
            confidence={data.comparableDeals.confidence}
            source="IMC deal database"
            onRegenerate={() => trigger('comps')}
          >
            <p className="text-sm text-slate-500 italic mb-4">{data.comparableDeals.note}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    {['Company', 'Deal Type', 'Size', 'Year', 'Multiple', 'Outcome'].map((h) => (
                      <th key={h} className="text-left text-xs font-semibold text-slate-500 pb-2 pr-4 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.comparableDeals.transactions.map((tx) => (
                    <tr key={tx.company} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 pr-4 font-medium text-slate-800 whitespace-nowrap">{tx.company}</td>
                      <td className="py-2.5 pr-4 text-slate-600 whitespace-nowrap">{tx.type}</td>
                      <td className="py-2.5 pr-4 text-slate-800 font-medium whitespace-nowrap">{tx.size}</td>
                      <td className="py-2.5 pr-4 text-slate-600">{tx.year}</td>
                      <td className="py-2.5 pr-4 text-slate-800 font-semibold">{tx.multiple}</td>
                      <td className="py-2.5">
                        <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{tx.outcome}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>

        {/* 4d — Talking Points & Objections */}
        <div className="relative">
          {regenerating === 'talking' && <RegeneratingOverlay />}
          <SectionCard
            title="Suggested Talking Points & Objections"
            confidence={data.talkingPoints.confidence}
            onRegenerate={() => trigger('talking')}
          >
            <div className="mb-5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Talking points</p>
              <ul className="space-y-2">
                {data.talkingPoints.points.map((p, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Likely objections + responses</p>
              <div className="space-y-3">
                {data.talkingPoints.objections.map((obj, i) => (
                  <div key={i} className="rounded-xl border border-slate-200 overflow-hidden">
                    <div className="bg-red-50 border-b border-slate-200 px-4 py-2.5 flex items-start gap-2">
                      <svg className="w-3.5 h-3.5 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      <span className="text-sm text-slate-700 italic">{obj.objection}</span>
                    </div>
                    <div className="bg-green-50 px-4 py-2.5 flex items-start gap-2">
                      <svg className="w-3.5 h-3.5 text-green-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-slate-700">{obj.response}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>
        </div>

        {/* 4e — Open Questions */}
        <div className="relative">
          {regenerating === 'questions' && <RegeneratingOverlay />}
          <SectionCard
            title="Open Questions"
            confidence={data.openQuestions.confidence}
            onRegenerate={() => trigger('questions')}
          >
            <p className="text-xs text-slate-500 mb-3">What we still need to find out from this meeting:</p>
            <ul className="space-y-2">
              {data.openQuestions.questions.map((q, i) => (
                <li key={i} className="flex items-start gap-3 bg-slate-50 rounded-lg px-4 py-2.5">
                  <span className="text-slate-400 text-sm font-bold shrink-0">Q{i + 1}</span>
                  <span className="text-sm text-slate-700">{q}</span>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>

        {/* CTA */}
        <div className="pb-8 flex justify-end">
          <button
            onClick={() => navigate(`/deals/${dealId}/meeting-room`)}
            className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            Go to Meeting Room
          </button>
        </div>

      </div>
    </div>
  );
}
