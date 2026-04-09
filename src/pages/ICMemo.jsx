import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { icMemoData } from '../data/icMemo';

const CONFIDENCE_CONFIG = {
  High: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
  Medium: { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
  Low: { bg: 'bg-red-100', text: 'text-red-600', dot: 'bg-red-500' },
};

function ConfidenceBadge({ level }) {
  const c = CONFIDENCE_CONFIG[level] ?? CONFIDENCE_CONFIG.Medium;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {level}
    </span>
  );
}

function MarkdownContent({ content }) {
  // Minimal markdown: bold, tables, bullet lists
  const lines = content.split('\n');
  const elements = [];
  let tableBuffer = [];
  let inTable = false;

  function flushTable() {
    if (!tableBuffer.length) return;
    const rows = tableBuffer.filter((l) => l.trim().startsWith('|'));
    if (rows.length < 2) { tableBuffer = []; inTable = false; return; }
    const headers = rows[0].split('|').slice(1, -1).map((h) => h.trim());
    const dataRows = rows.slice(2);
    elements.push(
      <div key={`table-${elements.length}`} className="overflow-x-auto my-3">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              {headers.map((h, i) => (
                <th key={i} className="text-left text-xs font-semibold text-slate-500 pb-2 pr-4 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataRows.map((row, ri) => {
              const cells = row.split('|').slice(1, -1).map((c) => c.trim());
              return (
                <tr key={ri} className="border-b border-slate-100 hover:bg-slate-50">
                  {cells.map((cell, ci) => (
                    <td key={ci} className="py-2 pr-4 text-slate-700">{cell}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
    tableBuffer = [];
    inTable = false;
  }

  lines.forEach((line, i) => {
    if (line.trim().startsWith('|')) {
      inTable = true;
      tableBuffer.push(line);
      return;
    }
    if (inTable) flushTable();

    if (!line.trim()) {
      elements.push(<div key={i} className="h-2" />);
      return;
    }
    if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(<p key={i} className="text-sm font-bold text-slate-900 mt-3 mb-1">{line.slice(2, -2)}</p>);
      return;
    }
    if (line.startsWith('- ') || line.startsWith('* ')) {
      elements.push(
        <li key={i} className="flex items-start gap-2 text-sm text-slate-700 ml-2">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
          <span dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
        </li>
      );
      return;
    }

    // Inline bold
    const html = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    elements.push(
      <p key={i} className="text-sm text-slate-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }} />
    );
  });
  if (inTable) flushTable();
  return <div className="space-y-0.5">{elements}</div>;
}

export default function ICMemo() {
  const navigate = useNavigate();
  const { dealId } = useParams();
  const data = icMemoData;

  // 'idle' | 'generating' | 'ready'
  const [genState, setGenState] = useState('idle');
  const [generatedCount, setGeneratedCount] = useState(0); // how many sections are visible

  const [expandedSections, setExpandedSections] = useState(
    Object.fromEntries(data.sections.map((s) => [s.id, true]))
  );
  const [editingSection, setEditingSection] = useState(null);
  const [regenerating, setRegenerating] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleGenerate() {
    setGenState('generating');
    setGeneratedCount(0);
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setGeneratedCount(count);
      if (count >= data.sections.length) {
        clearInterval(interval);
        setTimeout(() => setGenState('ready'), 400);
      }
    }, 600);
  }

  function toggleSection(id) {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function triggerRegenerate(id) {
    setRegenerating(id);
    setTimeout(() => setRegenerating(null), 1500);
  }

  function addComment(sectionId) {
    const text = newComment[sectionId]?.trim();
    if (!text) return;
    setComments((prev) => ({
      ...prev,
      [sectionId]: [...(prev[sectionId] ?? []), { text, author: 'Arjun Nair', time: 'Just now' }],
    }));
    setNewComment((prev) => ({ ...prev, [sectionId]: '' }));
  }

  function handleExport() {
    const toast = document.getElementById('ic-toast');
    toast.classList.remove('opacity-0', 'translate-y-2');
    toast.classList.add('opacity-100', 'translate-y-0');
    setTimeout(() => {
      toast.classList.remove('opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', 'translate-y-2');
    }, 2500);
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-full bg-slate-50 flex items-center justify-center">
        <div className="bg-white border border-slate-200 rounded-2xl p-10 max-w-md text-center shadow-sm">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Submitted for IC Review</h2>
          <p className="text-sm text-slate-500 mb-1">Project Falcon — IC Memo v1.0</p>
          <p className="text-sm text-slate-500 mb-6">Rajiv Mehta (MD) has been notified. IC meeting scheduled for Apr 16, 2026.</p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-left mb-6">
            <p className="text-xs font-semibold text-amber-700 mb-1">Human review required</p>
            <p className="text-xs text-amber-600">All AI-generated content must be reviewed and approved by the MD before final IC submission. This is a draft for senior review only.</p>
          </div>
          <button
            onClick={() => navigate(`/deals/${dealId}`)}
            className="text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors"
          >
            ← Back to Deal Room
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-slate-50">

      {/* Toast */}
      <div
        id="ic-toast"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg opacity-0 translate-y-2 transition-all duration-300 pointer-events-none"
      >
        <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        IC Memo exported as DOCX
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
              <h1 className="text-lg font-bold text-slate-900">IC Memo Drafter</h1>
              <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-2.5 py-0.5 rounded-full">{data.status}</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Project Falcon · Generated {data.generatedAt}</p>
          </div>
        </div>
        {genState === 'ready' && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-700 border border-slate-200 hover:border-slate-300 rounded-lg px-4 py-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export DOCX
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-1.5 text-sm font-semibold bg-blue-700 hover:bg-blue-800 text-white rounded-lg px-4 py-2 transition-colors"
            >
              Submit for IC Review
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="px-8 py-6 max-w-4xl space-y-4">

        {/* AI disclaimer */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-5 py-3.5">
          <svg className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-xs text-amber-800">
            <span className="font-semibold">AI-generated draft — human review required.</span> All sections sourced from uploaded documents and meeting summaries. Low-confidence sections are flagged. Mandatory senior review before IC submission.
          </p>
        </div>

        {/* ── IDLE STATE: prompt user to generate ── */}
        {genState === 'idle' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
            <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-base font-bold text-slate-900 mb-2">Ready to draft the IC Memo</h2>
            <p className="text-sm text-slate-500 mb-1">AI will assemble a full Investment Committee memo from:</p>
            <ul className="text-xs text-slate-400 space-y-0.5 mb-6">
              <li>• Uploaded documents (Acme_Teaser_FY25.pdf, Financials)</li>
              <li>• Meeting summary — Apr 11, 2026</li>
              <li>• Deal metadata &amp; action items</li>
            </ul>
            <button
              onClick={handleGenerate}
              className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors mx-auto"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Generate IC Memo
            </button>
          </div>
        )}

        {/* ── GENERATING STATE: section-by-section progress ── */}
        {genState === 'generating' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-5 h-5 text-blue-600 animate-spin shrink-0" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              <div>
                <p className="text-sm font-bold text-slate-900">Generating IC Memo…</p>
                <p className="text-xs text-slate-500">{generatedCount} of {data.sections.length} sections complete</p>
              </div>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-slate-100 rounded-full h-1.5 mb-6">
              <div
                className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${(generatedCount / data.sections.length) * 100}%` }}
              />
            </div>
            <div className="space-y-2.5">
              {data.sections.map((section, i) => {
                const done = i < generatedCount;
                const active = i === generatedCount;
                return (
                  <div key={section.id} className={`flex items-center gap-3 text-sm transition-all ${done ? 'text-slate-800' : active ? 'text-slate-700' : 'text-slate-300'}`}>
                    {done ? (
                      <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : active ? (
                      <svg className="w-4 h-4 text-blue-500 animate-spin shrink-0" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-slate-200 shrink-0" />
                    )}
                    <span>{section.title}</span>
                    {done && <span className="text-xs text-slate-400 ml-auto">Source: {section.source}</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Sections */}
        {(genState === 'ready') && data.sections.map((section) => {
          const isExpanded = expandedSections[section.id];
          const isEditing = editingSection === section.id;
          const isRegenerating = regenerating === section.id;
          const sectionComments = comments[section.id] ?? [];
          const needsReview = section.confidence === 'Low';

          return (
            <div
              key={section.id}
              className={`bg-white border rounded-2xl overflow-hidden transition-all ${needsReview ? 'border-amber-300' : 'border-slate-200'}`}
            >
              {/* Section header */}
              <div
                className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center gap-3">
                  <svg
                    className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  <h2 className="text-sm font-bold text-slate-900">{section.title}</h2>
                  <ConfidenceBadge level={section.confidence} />
                  {needsReview && (
                    <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                      Review required
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <span className="text-xs text-slate-400 hidden sm:block">Source: {section.source}</span>
                  <button
                    onClick={() => setEditingSection(isEditing ? null : section.id)}
                    className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 border border-slate-200 rounded-md px-2.5 py-1 transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    {isEditing ? 'Done' : 'Edit'}
                  </button>
                  <button
                    onClick={() => triggerRegenerate(section.id)}
                    className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 border border-blue-200 rounded-md px-2.5 py-1 transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Regenerate
                  </button>
                </div>
              </div>

              {/* Section body */}
              {isExpanded && (
                <div className="px-6 pb-5 border-t border-slate-100">
                  {isRegenerating ? (
                    <div className="py-6 flex items-center gap-2 text-sm text-slate-500">
                      <svg className="w-4 h-4 animate-spin text-blue-500" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Regenerating section…
                    </div>
                  ) : (
                    <div className={`mt-4 ${isEditing ? 'ring-2 ring-blue-300 rounded-xl p-3 -m-1' : ''}`}>
                      <MarkdownContent content={section.content} />
                    </div>
                  )}

                  {/* Comments */}
                  {sectionComments.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {sectionComments.map((c, i) => (
                        <div key={i} className="flex items-start gap-2.5 bg-slate-50 rounded-lg px-3.5 py-2.5">
                          <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center shrink-0">
                            <span className="text-[9px] font-bold text-white">AN</span>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-slate-700">{c.author} <span className="text-slate-400 font-normal">· {c.time}</span></p>
                            <p className="text-xs text-slate-600 mt-0.5">{c.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add comment */}
                  <div className="mt-3 flex items-center gap-2">
                    <input
                      value={newComment[section.id] ?? ''}
                      onChange={(e) => setNewComment((prev) => ({ ...prev, [section.id]: e.target.value }))}
                      onKeyDown={(e) => e.key === 'Enter' && addComment(section.id)}
                      placeholder="Add a comment or annotation…"
                      className="flex-1 text-xs border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-slate-300"
                    />
                    <button
                      onClick={() => addComment(section.id)}
                      className="text-xs font-medium text-blue-600 hover:text-blue-800 border border-blue-200 rounded-lg px-3 py-2 transition-colors"
                    >
                      Comment
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Submit CTA — only shown once memo is generated */}
        {genState === 'ready' && (
          <div className="pb-8 flex items-center justify-between pt-2">
            <p className="text-xs text-slate-400">
              All AI content watermarked as AI-generated · Model: claude-sonnet-4 · {data.generatedAt}
            </p>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Submit for IC Review
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
