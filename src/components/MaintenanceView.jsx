import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { 
  Wrench, 
  AlertOctagon, 
  Clock, 
  CheckCircle2, 
  Plus, 
  Inbox,
  User,
  Paperclip,
  Check,
  AlertTriangle
} from 'lucide-react';

export default function MaintenanceView({ user, maintenanceTriggerOpen, setMaintenanceTriggerOpen }) {
  const [jobs, setJobs] = useState([]);
  const [assets, setAssets] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [showRaiseModal, setShowRaiseModal] = useState(false);
  const [raiseForm, setRaiseForm] = useState({
    assetId: '',
    priority: 'MEDIUM',
    description: '',
    attachments: []
  });

  const [assignJobId, setAssignJobId] = useState(null);
  const [technicianId, setTechnicianId] = useState('');

  const [toast, setToast] = useState(null);

  const triggerToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const list = await api.getMaintenanceJobs();
      setJobs(list);
    } catch (e: any) {
      triggerToast(e.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    async function loadMeta() {
      try {
        const list = await api.getAssets();
        const emps = await api.getEmployees();
        setAssets(list);
        setEmployees(emps);
      } catch (e) {}
    }
    loadMeta();
  }, []);

  // Listen to outer maintenance triggers
  useEffect(() => {
    if (maintenanceTriggerOpen) {
      setShowRaiseModal(true);
      setMaintenanceTriggerOpen(false);
    }
  }, [maintenanceTriggerOpen]);

  const handleRaiseSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.raiseMaintenance(raiseForm);
      triggerToast('Maintenance ticket raised!');
      setShowRaiseModal(false);
      setRaiseForm({ assetId: '', priority: 'MEDIUM', description: '', attachments: [] });
      loadData();
    } catch (err: any) {
      triggerToast(err.message, 'error');
    }
  };

  const handleAction = async (id, action) => {
    try {
      await api.actionMaintenance(id, action);
      triggerToast(`Ticket successfully ${action.toLowerCase()}d!`);
      loadData();
    } catch (err: any) {
      triggerToast(err.message, 'error');
    }
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    try {
      await api.assignTechnician(assignJobId, technicianId);
      triggerToast('Technician assigned successfully!');
      setAssignJobId(null);
      setTechnicianId('');
      loadData();
    } catch (err: any) {
      triggerToast(err.message, 'error');
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.updateMaintenanceStatus(id, status, 'GOOD');
      triggerToast(`Ticket marked as ${status.toLowerCase().replace('_', ' ')}!`);
      loadData();
    } catch (err: any) {
      triggerToast(err.message, 'error');
    }
  };

  const getPriorityBadge = (prio) => {
    switch (prio) {
      case 'CRITICAL':
        return <span className="bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400 font-bold px-2 py-0.5 rounded text-[8px] tracking-wider uppercase">Critical</span>;
      case 'HIGH':
        return <span className="bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400 font-bold px-2 py-0.5 rounded text-[8px] tracking-wider uppercase">High</span>;
      case 'MEDIUM':
        return <span className="bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400 font-bold px-2 py-0.5 rounded text-[8px] tracking-wider uppercase">Medium</span>;
      default:
        return <span className="bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 font-bold px-2 py-0.5 rounded text-[8px] tracking-wider uppercase">Low</span>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING':
        return <span className="bg-slate-100 text-slate-500 font-bold px-2.5 py-0.5 rounded-full text-[9px] dark:bg-slate-800 dark:text-slate-400">PENDING</span>;
      case 'APPROVED':
        return <span className="bg-enterprise-50 text-enterprise-600 font-bold px-2.5 py-0.5 rounded-full text-[9px] dark:bg-enterprise-950/40 dark:text-enterprise-400">APPROVED</span>;
      case 'REJECTED':
        return <span className="bg-red-100 text-red-700 font-bold px-2.5 py-0.5 rounded-full text-[9px] dark:bg-red-950/40 dark:text-red-400 font-bold">REJECTED</span>;
      case 'TECHNICIAN_ASSIGNED':
        return <span className="bg-indigo-100 text-indigo-700 font-bold px-2.5 py-0.5 rounded-full text-[9px] dark:bg-indigo-950/40 dark:text-indigo-400 font-bold">ASSIGNED</span>;
      case 'IN_PROGRESS':
        return <span className="bg-yellow-100 text-yellow-700 font-bold px-2.5 py-0.5 rounded-full text-[9px] dark:bg-yellow-950/40 dark:text-yellow-400 font-bold">IN PROGRESS</span>;
      case 'RESOLVED':
        return <span className="bg-green-100 text-green-700 font-bold px-2.5 py-0.5 rounded-full text-[9px] dark:bg-green-950/40 dark:text-green-400 font-bold">RESOLVED</span>;
      default:
        return <span className="bg-slate-100 text-slate-500 px-2.5 py-0.5 rounded-full text-[9px]">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-xs font-semibold shadow-lg transition-all animate-in fade-in slide-in-from-top-4 ${
          toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-600 text-white'
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Control bar */}
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
        <div>
          <h3 className="font-bold text-sm text-slate-800 dark:text-white uppercase tracking-wider">Asset Maintenance Center</h3>
          <p className="text-[10px] text-slate-400 mt-1">Submit tickets, assign diagnostics, and process repair resolutions.</p>
        </div>

        <button 
          onClick={() => setShowRaiseModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-enterprise-600 hover:bg-enterprise-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-enterprise-500/10"
        >
          <Plus className="w-4 h-4" /> Raise Request
        </button>
      </div>

      {/* Main Jobs Listing */}
      {loading ? (
        <div className="h-64 flex items-center justify-center text-slate-400 animate-pulse">
          Loading active maintenance queue...
        </div>
      ) : jobs.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl py-16 text-center text-slate-400">
          <Inbox className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <h4 className="font-semibold text-sm">No active maintenance queries</h4>
          <p className="text-xs text-slate-400 mt-1">Raise a request above if an asset requires diagnostic service.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {jobs.map(job => (
            <div 
              key={job.id} 
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-slate-500 font-semibold">TICKET #{job.id.substring(0, 8).toUpperCase()}</span>
                      {getPriorityBadge(job.priority)}
                    </div>
                    <h4 className="font-bold text-sm text-slate-800 dark:text-white mt-1.5">{job.asset.name} ({job.asset.tag})</h4>
                  </div>
                  {getStatusBadge(job.status)}
                </div>

                <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border dark:border-slate-800 text-xs">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider mb-1">Issue Description</span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">{job.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-y-2 text-[10px] font-semibold text-slate-400 pt-1">
                  <div>
                    <span>Raised By: </span>
                    <span className="text-slate-700 dark:text-slate-200">{job.requester.name}</span>
                  </div>
                  <div>
                    <span>Technician: </span>
                    {job.technician ? (
                      <span className="text-enterprise-500 font-bold">{job.technician.name}</span>
                    ) : (
                      <span className="text-slate-400 italic">Unassigned</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons based on User Role and Ticket Status */}
              <div className="border-t border-slate-50 dark:border-slate-800 pt-4 mt-4 flex items-center justify-between">
                <span className="text-[9px] text-slate-300 dark:text-slate-500 font-mono">
                  {new Date(job.createdAt).toLocaleDateString()}
                </span>

                <div className="flex gap-2">
                  {/* Manager action: Approve/Reject */}
                  {['ADMIN', 'ASSET_MANAGER'].includes(user.role) && job.status === 'PENDING' && (
                    <>
                      <button 
                        onClick={() => handleAction(job.id, 'REJECT')}
                        className="px-2.5 py-1.5 border border-red-200 hover:bg-red-50 text-red-500 font-bold text-[10px] rounded-lg"
                      >
                        Reject
                      </button>
                      <button 
                        onClick={() => handleAction(job.id, 'APPROVE')}
                        className="px-2.5 py-1.5 bg-enterprise-600 hover:bg-enterprise-700 text-white font-bold text-[10px] rounded-lg shadow"
                      >
                        Approve
                      </button>
                    </>
                  )}

                  {/* Manager action: Assign Technician */}
                  {['ADMIN', 'ASSET_MANAGER'].includes(user.role) && job.status === 'APPROVED' && (
                    <button 
                      onClick={() => {
                        setAssignJobId(job.id);
                      }}
                      className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] rounded-lg"
                    >
                      Assign Technician
                    </button>
                  )}

                  {/* Technician action: Start Progress */}
                  {job.technicianId === user.id && job.status === 'TECHNICIAN_ASSIGNED' && (
                    <button 
                      onClick={() => handleUpdateStatus(job.id, 'IN_PROGRESS')}
                      className="px-2.5 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white font-bold text-[10px] rounded-lg"
                    >
                      Start diagnostics
                    </button>
                  )}

                  {/* Technician action: Resolve */}
                  {job.technicianId === user.id && job.status === 'IN_PROGRESS' && (
                    <button 
                      onClick={() => handleUpdateStatus(job.id, 'RESOLVED')}
                      className="px-2.5 py-1.5 bg-green-600 hover:bg-green-700 text-white font-bold text-[10px] rounded-lg"
                    >
                      Mark Resolved
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Raise Ticket Modal */}
      {showRaiseModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <h3 className="font-bold text-base text-slate-800 dark:text-white">Raise Maintenance Ticket</h3>
            <form onSubmit={handleRaiseSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-400 font-semibold block">Select Affected Asset</label>
                <select 
                  required
                  value={raiseForm.assetId}
                  onChange={(e) => setRaiseForm(prev => ({ ...prev, assetId: e.target.value }))}
                  className="w-full bg-slate-50 dark:bg-slate-855 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 outline-none focus:border-enterprise-500"
                >
                  <option value="">Select Asset</option>
                  {assets.map(a => <option key={a.id} value={a.id}>{a.name} ({a.tag})</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold block">Urgency / Priority</label>
                <select 
                  value={raiseForm.priority}
                  onChange={(e) => setRaiseForm(prev => ({ ...prev, priority: e.target.value }))}
                  className="w-full bg-slate-50 dark:bg-slate-855 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 outline-none focus:border-enterprise-500"
                >
                  <option value="LOW">Low / Routine</option>
                  <option value="MEDIUM">Medium / Normal</option>
                  <option value="HIGH">High / Disruptive</option>
                  <option value="CRITICAL">Critical / Stoppage</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold block">Diagnostic Description</label>
                <textarea 
                  required
                  placeholder="Detail the failure symptoms or damages..."
                  value={raiseForm.description}
                  onChange={(e) => setRaiseForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full bg-slate-50 dark:bg-slate-855 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 outline-none focus:border-enterprise-500 h-20 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowRaiseModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 bg-enterprise-600 hover:bg-enterprise-700 text-white rounded-xl font-bold transition-all"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Technician Modal */}
      {assignJobId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <h3 className="font-bold text-base text-slate-800 dark:text-white">Assign Technician</h3>
            <form onSubmit={handleAssign} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-400 font-semibold block">Select Diagnosing Officer / Staff</label>
                <select 
                  required
                  value={technicianId}
                  onChange={(e) => setTechnicianId(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-855 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 outline-none focus:border-enterprise-500"
                >
                  <option value="">Select Staff</option>
                  {employees.map(e => <option key={e.id} value={e.id}>{e.name} ({e.role.replace('_', ' ')})</option>)}
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setAssignJobId(null)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 bg-enterprise-600 hover:bg-enterprise-700 text-white rounded-xl font-bold transition-all"
                >
                  Assign Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
