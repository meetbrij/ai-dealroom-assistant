import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { meetingData } from '../data/meeting';
import { prepSheetData } from '../data/prepSheet';

// ── sub-components ────────────────────────────────────────────────────────────

function FlaggedItem({ text, type }) {
  const styles = {
    concern: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    commitment: 'bg-red-50 border-red-200 text-red-800',
    client_commitment: 'bg-blue-50 border-blue-200 text-blue-800',
    decision: 'bg-green-50 border-green-200 text-green-800',
  };
  const icons = {
    concern: (
      <svg className="w-3.5 h-3.5 text-yellow-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    commitment: (
      <svg className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    client_commitment: (
      <svg className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    decision: (
      <svg className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  };
  return (
    <li className={`flex items-start gap-2.5 border rounded-lg px-3.5 py-2.5 text-sm ${styles[type] ?? styles.decision}`}>
      {icons[type]}
      <span>{text}</span>
    </li>
  );
}

// ── main component ────────────────────────────────────────────────────────────

export default function MeetingRoom() {
  const navigate = useNavigate();
  const { dealId } = useParams();

  // 'pre' | 'processing' | 'results'
  const [uiState, setUiState] = useState('pre');
  const [pastedText, setPastedText] = useState('');
  const [processingStep, setProcessingStep] = useState(0);
  const [activeTab, setActiveTab] = useState('summary');
  const [prepExpanded, setPrepExpanded] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const prep = prepSheetData;

  const data = meetingData;

  const processingSteps = [
    'Reading transcript…',
    'Identifying speakers…',
    'Extracting key decisions…',
    'Flagging client concerns…',
    'Capturing banker commitments…',
    'Building meeting summary…',
  ];

  function handleAnalyse() {
    setUiState('processing');
    setProcessingStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setProcessingStep(step);
      if (step >= processingSteps.length - 1) {
        clearInterval(interval);
        setTimeout(() => setUiState('results'), 600);
      }
    }, 500);
  }

  function handleUseSample() {
    setPastedText(data.transcript.slice(0, 400) + '…');
  }

  function handleExport() {
    const toast = document.getElementById('meeting-toast');
    toast.classList.remove('opacity-0', 'translate-y-2');
    toast.classList.add('opacity-100', 'translate-y-0');
    setTimeout(() => {
      toast.classList.remove('opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', 'translate-y-2');
    }, 2500);
  }

  const tabs = [
    { id: 'summary', label: 'Summary' },
    { id: 'decisions', label: 'Key Decisions' },
    { id: 'concerns', label: 'Client Concerns' },
    { id: 'commitments', label: 'Commitments' },
    { id: 'open', label: 'Open Questions' },
    { id: 'transcript', label: 'Transcript' },
  ];

  return (
    <div className="min-h-full bg-slate-50">

      {/* Toast */}
      <div
        id="meeting-toast"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg opacity-0 translate-y-2 transition-all duration-300 pointer-events-none"
      >
        <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        Meeting notes exported
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
            <h1 className="text-lg font-bold text-slate-900">Meeting Room</h1>
            <p className="text-xs text-slate-500 mt-0.5">Project Falcon · {data.title}</p>
          </div>
        </div>
        {uiState === 'results' && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-700 border border-slate-200 hover:border-slate-300 rounded-lg px-3 py-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export notes
            </button>
            <button
              onClick={() => navigate(`/deals/${dealId}/action-items`)}
              className="flex items-center gap-1.5 text-sm font-semibold bg-blue-700 hover:bg-blue-800 text-white rounded-lg px-4 py-2 transition-colors"
            >
              Generate Action Items
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* ── PRE STATE ── */}
      {uiState === 'pre' && (
        <div className="px-8 py-8 max-w-3xl">

          {/* Collapsible Prep Sheet Summary */}
          <div className="bg-white border border-blue-200 rounded-2xl mb-6 overflow-hidden">
            <button
              onClick={() => setPrepExpanded((v) => !v)}
              className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-blue-50/50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-blue-900">Prep Sheet — {data.meetingDate}</p>
                  <p className="text-xs text-blue-600">{data.meetingWith}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => { e.stopPropagation(); navigate(`/deals/${dealId}/prep-sheet`); }}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Open full →
                </button>
                <svg
                  className={`w-4 h-4 text-blue-400 transition-transform ${prepExpanded ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {prepExpanded && (
              <div className="border-t border-blue-100 px-5 py-4 bg-blue-50/30 space-y-4">
                {/* Key financials */}
                <div>
                  <p className="text-[10px] font-semibold text-blue-500 uppercase tracking-wider mb-2">Key Financials</p>
                  <div className="flex flex-wrap gap-3">
                    {prep.companyBrief.financials.slice(0, 4).map(({ label, value }) => (
                      <div key={label} className="bg-white border border-blue-100 rounded-lg px-3 py-1.5">
                        <p className="text-[10px] text-slate-500">{label}</p>
                        <p className="text-sm font-bold text-slate-800">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Talking points */}
                <div>
                  <p className="text-[10px] font-semibold text-blue-500 uppercase tracking-wider mb-2">Key Talking Points</p>
                  <ul className="space-y-1">
                    {prep.talkingPoints.points.slice(0, 3).map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Watch-outs */}
                <div>
                  <p className="text-[10px] font-semibold text-blue-500 uppercase tracking-wider mb-2">Watch-outs</p>
                  <ul className="space-y-1">
                    {prep.dealContext.watchOuts.slice(0, 2).map((w, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 rounded-lg px-2.5 py-1.5">
                        <svg className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Open questions */}
                <div>
                  <p className="text-[10px] font-semibold text-blue-500 uppercase tracking-wider mb-2">Open Questions for this meeting</p>
                  <ul className="space-y-1">
                    {prep.openQuestions.questions.slice(0, 3).map((q, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <span className="text-slate-400 font-bold shrink-0">Q{i + 1}</span>
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Record button + meeting meta row */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-900">Meeting Details</h2>
              {/* Simulated Record button */}
              <button
                onClick={() => setIsRecording((v) => !v)}
                className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-all ${
                  isRecording
                    ? 'bg-red-600 text-white animate-pulse'
                    : 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${isRecording ? 'bg-white' : 'bg-red-500'}`} />
                {isRecording ? 'Recording…' : 'Record meeting'}
              </button>
            </div>
            {isRecording && (
              <div className="mb-4 flex items-center gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                <svg className="w-3.5 h-3.5 text-red-500 animate-pulse shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                </svg>
                <p className="text-xs text-red-700 font-medium">Live recording in progress — transcript will be auto-populated on stop</p>
                <button onClick={() => setIsRecording(false)} className="ml-auto text-xs font-semibold text-red-600 hover:text-red-800">Stop</button>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                { label: 'Title', value: data.title },
                { label: 'Date', value: data.date },
                { label: 'Duration', value: data.duration },
                { label: 'Participants', value: data.participants.map((p) => p.name).join(', ') },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs text-slate-500 mb-0.5">{label}</p>
                  <p className="text-sm text-slate-800 font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Transcript input */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-900">Upload or Paste Transcript</h2>
              <button
                onClick={handleUseSample}
                className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors"
              >
                Use sample transcript
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Paste the meeting transcript below, or upload a .txt / .docx file. Speaker labels (e.g. "Rajiv Mehta:") help the AI attribute commitments correctly.
            </p>

            {/* File upload strip */}
            <div className="border-2 border-dashed border-slate-200 rounded-xl px-5 py-4 text-center mb-4 hover:border-blue-400 transition-colors cursor-pointer">
              <svg className="w-5 h-5 text-slate-400 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-xs text-slate-500">Drop a .txt or .docx file here, or <span className="text-blue-600 font-medium">browse</span></p>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs text-slate-400">or paste below</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <textarea
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              rows={10}
              placeholder="Rajiv Mehta: Good morning Vikram…"
              className="w-full text-sm text-slate-700 border border-slate-300 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-300 font-mono leading-relaxed"
            />

            <div className="mt-4 flex justify-end">
              <button
                onClick={handleAnalyse}
                disabled={!pastedText.trim()}
                className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Analyse Transcript
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── PROCESSING STATE ── */}
      {uiState === 'processing' && (
        <div className="px-8 py-16 max-w-lg mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          </div>
          <h2 className="text-base font-bold text-slate-900 mb-1">Analysing transcript…</h2>
          <p className="text-sm text-slate-500 mb-8">AI is extracting structured intelligence from the meeting</p>
          <div className="text-left space-y-2.5 max-w-xs mx-auto">
            {processingSteps.map((step, i) => (
              <div key={i} className={`flex items-center gap-3 text-sm transition-all ${i <= processingStep ? 'text-slate-800' : 'text-slate-300'}`}>
                {i < processingStep ? (
                  <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : i === processingStep ? (
                  <svg className="w-4 h-4 text-blue-500 animate-spin shrink-0" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-slate-200 shrink-0" />
                )}
                {step}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── RESULTS STATE ── */}
      {uiState === 'results' && (
        <div className="px-8 py-6 max-w-4xl">

          {/* Meeting meta bar */}
          <div className="bg-white border border-slate-200 rounded-xl px-5 py-3 mb-5 flex items-center gap-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {data.date}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {data.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {data.participants.length} participants
            </span>
            <span className="flex items-center gap-1.5 ml-auto">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              Analysis complete
            </span>
          </div>

          {/* Tabs */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="flex border-b border-slate-200 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-700'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6">

              {activeTab === 'summary' && (
                <div>
                  <p className="text-sm text-slate-700 leading-relaxed">{data.summary.overview}</p>
                </div>
              )}

              {activeTab === 'decisions' && (
                <ul className="space-y-2">
                  {data.summary.keyDecisions.map((d, i) => (
                    <FlaggedItem key={i} text={d} type="decision" />
                  ))}
                </ul>
              )}

              {activeTab === 'concerns' && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-500 mb-3">Items flagged by the client — address before next interaction.</p>
                  <ul className="space-y-2">
                    {data.summary.clientConcerns.map((c, i) => (
                      <FlaggedItem key={i} text={c.text} type="concern" />
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'commitments' && (
                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Banker commitments</p>
                    <div className="space-y-2">
                      {data.summary.bankerCommitments.map((c, i) => (
                        <div key={i} className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                          <svg className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div className="flex-1">
                            <p className="text-sm text-red-800">{c.text}</p>
                            <p className="text-xs text-red-500 mt-1">{c.owner} · Due {c.due}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Client commitments</p>
                    <div className="space-y-2">
                      {data.summary.clientCommitments.map((c, i) => (
                        <div key={i} className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
                          <svg className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <div className="flex-1">
                            <p className="text-sm text-blue-800">{c.text}</p>
                            <p className="text-xs text-blue-500 mt-1">Due {c.due}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'open' && (
                <ul className="space-y-2">
                  {data.summary.openQuestions.map((q, i) => (
                    <li key={i} className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
                      <span className="text-xs font-bold text-slate-400 shrink-0 mt-0.5">Q{i + 1}</span>
                      <span className="text-sm text-slate-700">{q}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === 'transcript' && (
                <div className="bg-slate-50 rounded-xl p-5 max-h-96 overflow-y-auto">
                  <pre className="text-xs text-slate-600 leading-relaxed font-mono whitespace-pre-wrap">{data.transcript}</pre>
                </div>
              )}
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-5 flex items-center justify-between pb-8">
            <button
              onClick={() => setUiState('pre')}
              className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
            >
              ← Analyse another transcript
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/deals/${dealId}/action-items`)}
                className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
              >
                Generate Action Items
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
