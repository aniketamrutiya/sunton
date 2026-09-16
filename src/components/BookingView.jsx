import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  Trash2,
  Inbox,
  User,
  Info
} from 'lucide-react';

export default function BookingView({ user, bookTriggerOpen, setBookTriggerOpen }) {
  const [bookings, setBookings] = useState([]);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [showFormModal, setShowFormModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    assetId: '',
    startTime: '',
    endTime: '',
    purpose: ''
  });

  const [toast, setToast] = useState(null);

  const triggerToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const list = await api.getBookings();
      setBookings(list);
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
    async function loadAssets() {
      try {
        // Load all assets to choose from for booking
        const list = await api.getAssets();
        // Allow booking of any asset except those that are Retired/Disposed/Lost
        const bookable = list.filter(a => !['RETIRED', 'DISPOSED', 'LOST'].includes(a.lifecycleStatus));
        setAssets(bookable);
      } catch (e) {}
    }
    loadAssets();
  }, []);

  // Listen to outer book triggers
  useEffect(() => {
    if (bookTriggerOpen) {
      setShowFormModal(true);
      setBookTriggerOpen(false);
    }
  }, [bookTriggerOpen]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createBooking(bookingForm);
      triggerToast('Booking confirmed successfully!');
      setShowFormModal(false);
      setBookingForm({ assetId: '', startTime: '', endTime: '', purpose: '' });
      loadData();
    } catch (err: any) {
      triggerToast(err.message, 'error');
    }
  };

  const handleCancelBooking = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this resource booking?')) return;
    try {
      await api.cancelBooking(id);
      triggerToast('Booking cancelled successfully!');
      loadData();
    } catch (err: any) {
      triggerToast(err.message, 'error');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'UPCOMING':
        return <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full dark:bg-blue-950/40 dark:text-blue-400 font-bold uppercase text-[9px] tracking-wider">Upcoming</span>;
      case 'ONGOING':
        return <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full dark:bg-yellow-950/40 dark:text-yellow-400 font-bold uppercase text-[9px] tracking-wider">Ongoing</span>;
      case 'COMPLETED':
        return <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full dark:bg-green-950/40 dark:text-green-400 font-bold uppercase text-[9px] tracking-wider">Completed</span>;
      case 'CANCELLED':
        return <span className="bg-slate-100 text-slate-400 px-2 py-0.5 rounded-full dark:bg-slate-800 dark:text-slate-500 font-bold uppercase text-[9px] tracking-wider">Cancelled</span>;
      default:
        return <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full dark:bg-slate-800 dark:text-slate-400 font-bold uppercase text-[9px] tracking-wider">{status}</span>;
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

      {/* Toolbar header */}
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
        <div>
          <h3 className="font-bold text-sm text-slate-800 dark:text-white uppercase tracking-wider">Shared Resource Scheduler</h3>
          <p className="text-[10px] text-slate-400 mt-1">Book company vehicles, workstations, equipment, and meeting rooms.</p>
        </div>

        <button 
          onClick={() => setShowFormModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-enterprise-600 hover:bg-enterprise-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-enterprise-500/10"
        >
          <Plus className="w-4 h-4" /> Book Resource
        </button>
      </div>

      {/* Scheduler Listings */}
      {loading ? (
        <div className="h-64 flex items-center justify-center text-slate-400 animate-pulse">
          Loading scheduling logs...
        </div>
      ) : bookings.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl py-16 text-center text-slate-400">
          <Inbox className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <h4 className="font-semibold text-sm">No bookings scheduled</h4>
          <p className="text-xs text-slate-400 mt-1">Click the button above to book a shared resource.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {bookings.map(b => (
            <div 
              key={b.id} 
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-enterprise-500 bg-enterprise-50 px-2 py-0.5 rounded font-semibold dark:bg-enterprise-950/40 dark:text-enterprise-400">
                      {b.asset.tag}
                    </span>
                    <h4 className="font-bold text-sm text-slate-800 dark:text-white mt-1.5">{b.asset.name}</h4>
                  </div>
                  {getStatusBadge(b.status)}
                </div>

                <div className="space-y-2 border-t border-slate-50 dark:border-slate-800 pt-3 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>
                      {new Date(b.startTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                      <span className="text-slate-400 font-normal px-1">to</span>
                      {new Date(b.endTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-400" />
                    <span>Booked by: <span className="text-slate-700 dark:text-slate-200">{b.employee.name}</span></span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-850 p-2.5 rounded-xl border dark:border-slate-800 mt-2">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider mb-1">Booking Purpose:</span>
                    <span className="text-slate-600 dark:text-slate-300 font-normal leading-relaxed">{b.purpose}</span>
                  </div>
                </div>
              </div>

              {b.status === 'UPCOMING' && (b.employeeId === user.id || ['ADMIN', 'ASSET_MANAGER'].includes(user.role)) && (
                <div className="border-t border-slate-50 dark:border-slate-800 pt-4 mt-4 text-right">
                  <button 
                    onClick={() => handleCancelBooking(b.id)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Cancel Booking
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Booking Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <h3 className="font-bold text-base text-slate-800 dark:text-white">Book Shared Resource</h3>
            <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-400 font-semibold block">Select Resource</label>
                <select 
                  required
                  value={bookingForm.assetId}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, assetId: e.target.value }))}
                  className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 outline-none focus:border-enterprise-500"
                >
                  <option value="">Select Equipment / Vehicle</option>
                  {assets.map(a => (
                    <option key={a.id} value={a.id}>{a.name} ({a.tag}) - {a.location}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold block">Booking Start Time</label>
                <input 
                  type="datetime-local" 
                  required
                  value={bookingForm.startTime}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, startTime: e.target.value }))}
                  className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 outline-none focus:border-enterprise-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold block">Booking End Time</label>
                <input 
                  type="datetime-local" 
                  required
                  value={bookingForm.endTime}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, endTime: e.target.value }))}
                  className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 outline-none focus:border-enterprise-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold block">Purpose / Details</label>
                <textarea 
                  required
                  placeholder="e.g. Transport team members for field audit..."
                  value={bookingForm.purpose}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, purpose: e.target.value }))}
                  className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 outline-none focus:border-enterprise-500 h-16 resize-none"
                />
              </div>

              {/* Conflict overlap Warning Banner */}
              <div className="bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border text-[10px] text-slate-400 flex items-start gap-1.5 leading-relaxed">
                <Info className="w-4 h-4 text-enterprise-400 flex-shrink-0" />
                <span>The system checks for time conflicts dynamically. Overlapping bookings for the same asset will be blocked.</span>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowFormModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 bg-enterprise-600 hover:bg-enterprise-700 text-white rounded-xl font-bold transition-all"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
