import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { actionItems as initialItems } from '../data/actionItems';

const PRIORITY_CONFIG = {
  High: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
  Med: { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
  Low: { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
};

const STATUS_CONFIG = {
  Open: { bg: 'bg-slate-100', text: 'text-slate-600' },
  'In Progress': { bg: 'bg-blue-100', text: 'text-blue-700' },
  Done: { bg: 'bg-green-100', text: 'text-green-700' },
};

const STATUS_CYCLE = { Open: 'In Progress', 'In Progress': 'Done', Done: 'Open' };

const TEAM_MEMBERS = ['All', 'Rajiv Mehta', 'Priya Sharma', 'Arjun Nair', 'Sneha Patel'];
const PRIORITIES = ['All', 'High', 'Med', 'Low'];
const STATUSES = ['All', 'Open', 'In Progress', 'Done'];

function PriorityBadge({ priority }) {
  const c = PRIORITY_CONFIG[priority] ?? PRIORITY_CONFIG.Low;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {priority}
    </span>
  );
}

function StatusButton({ status, onClick }) {
  const c = STATUS_CONFIG[status] ?? STATUS_CONFIG.Open;
  return (
    <button
      onClick={onClick}
      title="Click to advance status"
      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.bg} ${c.text} hover:opacity-80 transition-opacity cursor-pointer`}
    >
      {status}
    </button>
  );
}

export default function ActionItems() {
  const navigate = useNavigate();
  const { dealId } = useParams();

  const [items, setItems] = useState(initialItems);
  const [filterOwner, setFilterOwner] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({ description: '', owner: 'Arjun Nair', dueDate: '', priority: 'Med' });

  function advanceStatus(id) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: STATUS_CYCLE[item.status] } : item
      )
    );
  }

  function addItem() {
    if (!newItem.description.trim()) return;
    const item = {
      id: `ai-${Date.now()}`,
      description: newItem.description,
      owner: newItem.owner,
      ownerInitials: newItem.owner.split(' ').map((n) => n[0]).join(''),
      dueDate: newItem.dueDate || 'TBD',
      priority: newItem.priority,
      status: 'Open',
      source: 'Manual',
      overdue: false,
    };
    setItems((prev) => [item, ...prev]);
    setNewItem({ description: '', owner: 'Arjun Nair', dueDate: '', priority: 'Med' });
    setShowAddForm(false);
  }

  const filtered = items.filter((item) => {
    if (filterOwner !== 'All' && item.owner !== filterOwner) return false;
    if (filterPriority !== 'All' && item.priority !== filterPriority) return false;
    if (filterStatus !== 'All' && item.status !== filterStatus) return false;
    return true;
  });

  const counts = {
    open: items.filter((i) => i.status === 'Open').length,
    inProgress: items.filter((i) => i.status === 'In Progress').length,
    done: items.filter((i) => i.status === 'Done').length,
    overdue: items.filter((i) => i.overdue).length,
  };

  const filterSelect =
    'text-xs border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer';

  return (
    <div className="min-h-full bg-slate-50">

      {/* Top bar */}
      <div className="bg-white border-b border-slate-200 px-8 py-4 sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(`/deals/${dealId}`)} className="text-slate-400 hover:text-slate-700 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Action Items</h1>
            <p className="text-xs text-slate-500 mt-0.5">Project Falcon · Auto-populated from meeting · Apr 11, 2026</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddForm((v) => !v)}
            className="flex items-center gap-1.5 text-sm font-semibold bg-blue-700 hover:bg-blue-800 text-white rounded-lg px-4 py-2 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add item
          </button>
        </div>
      </div>

      <div className="px-8 py-6 max-w-5xl space-y-5">

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'Open', value: counts.open, color: 'text-slate-900' },
            { label: 'In Progress', value: counts.inProgress, color: 'text-blue-700' },
            { label: 'Done', value: counts.done, color: 'text-green-600' },
            { label: 'Overdue', value: counts.overdue, color: 'text-red-600' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white border border-slate-200 rounded-xl px-5 py-3 text-center">
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Add item form */}
        {showAddForm && (
          <div className="bg-white border border-blue-200 rounded-2xl p-5">
            <h2 className="text-sm font-bold text-slate-900 mb-4">New Action Item</h2>
            <div className="space-y-3">
              <textarea
                value={newItem.description}
                onChange={(e) => setNewItem((n) => ({ ...n, description: e.target.value }))}
                rows={2}
                placeholder="Describe the action item…"
                className="w-full text-sm border border-slate-300 rounded-lg px-3.5 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-300"
              />
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Owner</label>
                  <select
                    value={newItem.owner}
                    onChange={(e) => setNewItem((n) => ({ ...n, owner: e.target.value }))}
                    className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {TEAM_MEMBERS.filter((m) => m !== 'All').map((m) => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Due date</label>
                  <input
                    type="date"
                    value={newItem.dueDate}
                    onChange={(e) => setNewItem((n) => ({ ...n, dueDate: e.target.value }))}
                    className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Priority</label>
                  <select
                    value={newItem.priority}
                    onChange={(e) => setNewItem((n) => ({ ...n, priority: e.target.value }))}
                    className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {['High', 'Med', 'Low'].map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={() => setShowAddForm(false)} className="text-sm text-slate-500 hover:text-slate-700 px-4 py-2 transition-colors">Cancel</button>
                <button onClick={addItem} className="text-sm font-semibold bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg transition-colors">Add item</button>
              </div>
            </div>
          </div>
        )}

        {/* Filters + table */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          {/* Filter bar */}
          <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold text-slate-500 mr-1">Filter:</span>
            <select value={filterOwner} onChange={(e) => setFilterOwner(e.target.value)} className={filterSelect}>
              {TEAM_MEMBERS.map((m) => <option key={m}>{m}</option>)}
            </select>
            <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className={filterSelect}>
              {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
            </select>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className={filterSelect}>
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
            <span className="ml-auto text-xs text-slate-400">{filtered.length} item{filtered.length !== 1 ? 's' : ''}</span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  {['Action', 'Owner', 'Due Date', 'Priority', 'Status', 'Source'].map((h) => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 px-5 py-3 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center text-sm text-slate-400 px-5 py-8">No items match the current filters.</td>
                  </tr>
                )}
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${item.overdue ? 'bg-red-50/40' : ''}`}
                  >
                    <td className="px-5 py-3.5 max-w-sm">
                      <div className="flex items-start gap-2">
                        {item.overdue && (
                          <svg className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        )}
                        <span className={`text-sm ${item.status === 'Done' ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                          {item.description}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center shrink-0">
                          <span className="text-[9px] font-bold text-white">{item.ownerInitials}</span>
                        </div>
                        <span className="text-xs text-slate-700">{item.owner}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span className={`text-xs font-medium ${item.overdue ? 'text-red-600' : 'text-slate-600'}`}>
                        {item.dueDate}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <PriorityBadge priority={item.priority} />
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusButton status={item.status} onClick={() => advanceStatus(item.id)} />
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs text-slate-400">{item.source}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
