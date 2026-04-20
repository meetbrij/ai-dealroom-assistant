import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const DEAL_TYPES = ['M&A (Buy-side)', 'M&A (Sell-side)', 'IPO', 'Debt Raise', 'Equity Raise', 'Private Equity Advisory', 'Structured Finance'];

const SECTORS = [
  'Automotive & Components',
  'Consumer & Retail',
  'Energy & Renewables',
  'Financial Services',
  'Healthcare & Pharma',
  'Industrials & Manufacturing',
  'Infrastructure',
  'Real Estate',
  'Technology & SaaS',
  'Telecom & Media',
  'Other',
];

const ROLES = ['MD', 'VP', 'Director', 'Associate', 'Analyst'];

const TEAM_SUGGESTIONS = [
  { name: 'Rajiv Mehta', role: 'MD', initials: 'RM' },
  { name: 'Priya Sharma', role: 'VP', initials: 'PS' },
  { name: 'Arjun Nair', role: 'Associate', initials: 'AN' },
  { name: 'Sneha Patel', role: 'Analyst', initials: 'SP' },
  { name: 'Karan Bose', role: 'VP', initials: 'KB' },
  { name: 'Meera Iyer', role: 'Associate', initials: 'MI' },
  { name: 'Ananya Rao', role: 'MD', initials: 'AR' },
];

function SectionHeading({ step, title, subtitle }) {
  return (
    <div className="flex items-start gap-4 mb-5">
      <div className="w-7 h-7 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
        {step}
      </div>
      <div>
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

function InputField({ label, required, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function UploadZone({ files, onFilesChange }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  function handleFiles(incoming) {
    const valid = Array.from(incoming).filter(
      (f) => f.type === 'application/pdf' || f.name.endsWith('.docx')
    );
    onFilesChange((prev) => [...prev, ...valid]);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  }

  function removeFile(idx) {
    onFilesChange((prev) => prev.filter((_, i) => i !== idx));
  }

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl px-6 py-8 text-center cursor-pointer transition-colors ${
          dragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
        }`}
      >
        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <p className="text-sm font-medium text-slate-700">
          Drop files here or <span className="text-blue-600">browse</span>
        </p>
        <p className="text-xs text-slate-400 mt-1">
          Upload pitch deck, teaser, CIM, or financials — PDF or DOCX, up to 50 MB each
        </p>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((file, idx) => (
            <li key={idx} className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5">
              <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="flex-1 text-sm text-slate-700 truncate">{file.name}</span>
              <span className="text-xs text-slate-400 shrink-0">{(file.size / 1024).toFixed(0)} KB</span>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                className="text-slate-400 hover:text-red-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function TeamMemberRow({ member, onRoleChange, onRemove }) {
  return (
    <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5">
      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
        <span className="text-xs font-bold text-white">{member.initials}</span>
      </div>
      <span className="flex-1 text-sm font-medium text-slate-800">{member.name}</span>
      <select
        value={member.role}
        onChange={(e) => onRoleChange(e.target.value)}
        className="text-xs border border-slate-200 rounded-md px-2 py-1.5 text-slate-600 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
      </select>
      <button
        type="button"
        onClick={onRemove}
        className="text-slate-400 hover:text-red-500 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

// Processing overlay
function ProcessingOverlay() {
  const steps = [
    'Parsing uploaded documents…',
    'Extracting company financials…',
    'Identifying deal signals and risk flags…',
    'Generating Company Brief…',
    'Building Deal Room…',
  ];
  const [currentStep, setCurrentStep] = useState(0);

  useState(() => {
    const timer = setInterval(() => {
      setCurrentStep((s) => (s < steps.length - 1 ? s + 1 : s));
    }, 600);
    return () => clearInterval(timer);
  });

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm text-center">
        <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        </div>
        <h3 className="text-base font-bold text-slate-900 mb-1">AI is processing your documents</h3>
        <p className="text-sm text-slate-500 mb-6">This usually takes 15–30 seconds</p>
        <div className="space-y-2 text-left">
          {steps.map((step, i) => (
            <div key={i} className={`flex items-center gap-3 text-sm transition-all ${i <= currentStep ? 'text-slate-800' : 'text-slate-300'}`}>
              {i < currentStep ? (
                <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : i === currentStep ? (
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
    </div>
  );
}

export default function NewDealSetup() {
  const navigate = useNavigate();

  const [dealName, setDealName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [sector, setSector] = useState('');
  const [dealType, setDealType] = useState('');
  const [estimatedValue, setEstimatedValue] = useState('');
  const [files, setFiles] = useState([]);
  const [teamMembers, setTeamMembers] = useState([
    { name: 'Arjun Nair', role: 'Associate', initials: 'AN' },
  ]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const availableSuggestions = TEAM_SUGGESTIONS.filter(
    (s) => !teamMembers.find((m) => m.name === s.name)
  );

  function addTeamMember(person) {
    setTeamMembers((prev) => [...prev, { ...person }]);
    setShowSuggestions(false);
  }

  function updateRole(idx, role) {
    setTeamMembers((prev) => prev.map((m, i) => (i === idx ? { ...m, role } : m)));
  }

  function removeMember(idx) {
    setTeamMembers((prev) => prev.filter((_, i) => i !== idx));
  }

  function validate() {
    const e = {};
    if (!dealName.trim()) e.dealName = 'Deal name is required';
    if (!companyName.trim()) e.companyName = 'Company name is required';
    if (!sector) e.sector = 'Select a sector';
    if (!dealType) e.dealType = 'Select a deal type';
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setErrors({});
    setProcessing(true);
    // Simulate AI processing, then navigate to the dynamic deal room
    setTimeout(() => {
      navigate('/deals/deal-001');
    }, 3200);
  }

  const inputClass = (field) =>
    `w-full px-3.5 py-2.5 rounded-lg border text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-slate-300'
    }`;

  return (
    <>
      {processing && <ProcessingOverlay />}

      <div className="min-h-full bg-slate-50">

        {/* Top bar */}
        <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center gap-4 sticky top-0 z-10">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="text-slate-400 hover:text-slate-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-lg font-bold text-slate-900">New Deal Setup</h1>
            <p className="text-xs text-slate-500 mt-0.5">Initialise a deal room and let AI build the context</p>
          </div>
        </div>

        <div className="px-8 py-8 max-w-3xl">
          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-6">

              {/* ── Section 1: Deal Details ── */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <SectionHeading
                  step="1"
                  title="Deal Details"
                  subtitle="Give the deal a codename and define what type of transaction this is."
                />
                <div className="space-y-4">
                  <InputField label="Deal name / codename" required>
                    <input
                      type="text"
                      value={dealName}
                      onChange={(e) => setDealName(e.target.value)}
                      placeholder='e.g. "Project Falcon — Acme Corp M&A"'
                      className={inputClass('dealName')}
                    />
                    {errors.dealName && <p className="text-xs text-red-500 mt-1">{errors.dealName}</p>}
                  </InputField>

                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Deal type" required>
                      <select
                        value={dealType}
                        onChange={(e) => setDealType(e.target.value)}
                        className={inputClass('dealType')}
                      >
                        <option value="">Select deal type</option>
                        {DEAL_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                      {errors.dealType && <p className="text-xs text-red-500 mt-1">{errors.dealType}</p>}
                    </InputField>

                    <InputField label="Estimated deal value">
                      <input
                        type="text"
                        value={estimatedValue}
                        onChange={(e) => setEstimatedValue(e.target.value)}
                        placeholder="e.g. ₹800–1,200 Cr"
                        className={inputClass('estimatedValue')}
                      />
                    </InputField>
                  </div>
                </div>
              </div>

              {/* ── Section 2: Company Info ── */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <SectionHeading
                  step="2"
                  title="Company Information"
                  subtitle="The company at the centre of this deal."
                />
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Company name" required>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Acme Industrials Ltd"
                      className={inputClass('companyName')}
                    />
                    {errors.companyName && <p className="text-xs text-red-500 mt-1">{errors.companyName}</p>}
                  </InputField>

                  <InputField label="Sector" required>
                    <select
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                      className={inputClass('sector')}
                    >
                      <option value="">Select sector</option>
                      {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.sector && <p className="text-xs text-red-500 mt-1">{errors.sector}</p>}
                  </InputField>
                </div>
              </div>

              {/* ── Section 3: Documents ── */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <SectionHeading
                  step="3"
                  title="Upload Documents"
                  subtitle="AI will extract company context, financials, and deal signals from these files."
                />
                <UploadZone files={files} onFilesChange={setFiles} />
                {files.length === 0 && (
                  <p className="text-xs text-slate-400 mt-3 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Optional — you can proceed without documents and add them later from the Deal Room.
                  </p>
                )}
              </div>

              {/* ── Section 4: Deal Team ── */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <SectionHeading
                  step="4"
                  title="Deal Team"
                  subtitle="Add team members and assign their roles. Action items will be attributed based on role."
                />

                <div className="space-y-2 mb-3">
                  {teamMembers.map((member, idx) => (
                    <TeamMemberRow
                      key={member.name}
                      member={member}
                      onRoleChange={(role) => updateRole(idx, role)}
                      onRemove={() => removeMember(idx)}
                    />
                  ))}
                </div>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowSuggestions((v) => !v)}
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Add team member
                  </button>

                  {showSuggestions && availableSuggestions.length > 0 && (
                    <div className="absolute top-8 left-0 z-20 bg-white border border-slate-200 rounded-xl shadow-lg w-64 py-1 overflow-hidden">
                      {availableSuggestions.map((person) => (
                        <button
                          key={person.name}
                          type="button"
                          onClick={() => addTeamMember(person)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-left"
                        >
                          <div className="w-7 h-7 rounded-full bg-slate-600 flex items-center justify-center shrink-0">
                            <span className="text-[10px] font-bold text-white">{person.initials}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-800">{person.name}</p>
                            <p className="text-xs text-slate-400">{person.role}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* ── Submit ── */}
              <div className="flex items-center justify-between pt-2 pb-8">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Analyse &amp; Create Deal Room
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </>
  );
}
