import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { 
  Package, 
  Search, 
  SlidersHorizontal, 
  QrCode, 
  Calendar, 
  UserPlus, 
  ArrowLeftRight, 
  RotateCcw, 
  FileText,
  Plus,
  ChevronRight,
  TrendingUp,
  Inbox,
  CheckCircle2,
  Wrench,
  HelpCircle,
  Eye,
  AlertOctagon
} from 'lucide-react';

export default function AssetsView({ user, registerTriggerOpen, setRegisterTriggerOpen }) {
  // Lists
  const [assets, setAssets] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCondition, setFilterCondition] = useState('');

  // Modals
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showAllocateModal, setShowAllocateModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);

  // Forms
  const [registerForm, setRegisterForm] = useState({
    name: '',
    categoryId: '',
    departmentId: '',
    location: '',
    condition: 'NEW',
    serialNumber: '',
    photoUrl: '',
    customValues: {}
  });

  const [allocateForm, setAllocateForm] = useState({
    employeeId: '',
    expectedReturn: ''
  });

  const [transferForm, setTransferForm] = useState({
    toEmployeeId: ''
  });

  const [returnForm, setReturnForm] = useState({
    condition: 'GOOD'
  });

  const [toast, setToast] = useState(null);

  const triggerToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const filters = {
        search,
        categoryId: filterCategory,
        departmentId: filterDept,
        lifecycleStatus: filterStatus,
        condition: filterCondition
      };
      // Remove empty queries
      Object.keys(filters).forEach(key => !filters[key] && delete filters[key]);

      const assetList = await api.getAssets(filters);
      setAssets(assetList);
    } catch (e: any) {
      triggerToast(e.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [search, filterCategory, filterDept, filterStatus, filterCondition]);

  useEffect(() => {
    async function loadMeta() {
      try {
        const [cats, depts, emps] = await Promise.all([
          api.getCategories(),
          api.getDepartments(),
          api.getEmployees()
        ]);
        setCategories(cats);
        setDepartments(depts);
        setEmployees(emps);
      } catch (e) {}
    }
    loadMeta();
  }, []);

  // Listen to outer register triggers
  useEffect(() => {
    if (registerTriggerOpen) {
      setShowRegisterModal(true);
      setRegisterTriggerOpen(false);
    }
  }, [registerTriggerOpen]);

  // Handle register category change to load custom fields
  const handleCatChangeInForm = (catId) => {
    const selectedCat = categories.find(c => c.id === catId);
    const customValues = {};
    if (selectedCat && selectedCat.customFields) {
      selectedCat.customFields.forEach(f => {
        customValues[f.name] = '';
      });
    }
    setRegisterForm(prev => ({
      ...prev,
      categoryId: catId,
      customValues
    }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createAsset(registerForm);
      triggerToast('Asset registered successfully!');
      setShowRegisterModal(false);
      setRegisterForm({
        name: '',
        categoryId: '',
        departmentId: '',
        location: '',
        condition: 'NEW',
        serialNumber: '',
        photoUrl: '',
        customValues: {}
      });
      loadData();
    } catch (err: any) {
      triggerToast(err.message, 'error');
    }
  };

  const handleAllocateSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.updateAsset(selectedAsset.id, {
        allocatedToId: allocateForm.employeeId,
        expectedReturn: allocateForm.expectedReturn,
        lifecycleStatus: 'ALLOCATED'
      });
      triggerToast('Asset allocated successfully!');
      setShowAllocateModal(false);
      setAllocateForm({ employeeId: '', expectedReturn: '' });
      // Refresh details
      const freshAsset = await api.getAssetById(selectedAsset.id);
      setSelectedAsset(freshAsset);
      loadData();
    } catch (err: any) {
      triggerToast(err.message, 'error');
    }
  };

  const handleTransferSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.requestTransfer(selectedAsset.id, transferForm.toEmployeeId);
      triggerToast('Transfer request submitted!');
      setShowTransferModal(false);
      setTransferForm({ toEmployeeId: '' });
      const freshAsset = await api.getAssetById(selectedAsset.id);
      setSelectedAsset(freshAsset);
      loadData();
    } catch (err: any) {
      triggerToast(err.message, 'error');
    }
  };

  const handleReturnSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.returnAsset(selectedAsset.id, returnForm.condition);
      triggerToast('Asset returned & checked successfully!');
      setShowReturnModal(false);
      setReturnForm({ condition: 'GOOD' });
      const freshAsset = await api.getAssetById(selectedAsset.id);
      setSelectedAsset(freshAsset);
      loadData();
    } catch (err: any) {
      triggerToast(err.message, 'error');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'AVAILABLE':
        return <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full dark:bg-green-950/40 dark:text-green-400 font-bold uppercase text-[9px] tracking-wider">Available</span>;
      case 'ALLOCATED':
        return <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full dark:bg-blue-950/40 dark:text-blue-400 font-bold uppercase text-[9px] tracking-wider">Allocated</span>;
      case 'RESERVED':
        return <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full dark:bg-purple-950/40 dark:text-purple-400 font-bold uppercase text-[9px] tracking-wider">Reserved</span>;
      case 'MAINTENANCE':
        return <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full dark:bg-yellow-950/40 dark:text-yellow-400 font-bold uppercase text-[9px] tracking-wider">Maintenance</span>;
      case 'LOST':
        return <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full dark:bg-red-950/40 dark:text-red-400 font-bold uppercase text-[9px] tracking-wider">Lost</span>;
      default:
        return <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full dark:bg-slate-800 dark:text-slate-400 font-bold uppercase text-[9px] tracking-wider">{status}</span>;
    }
  };

  const getConditionBadge = (cond) => {
    switch (cond) {
      case 'NEW':
        return <span className="text-emerald-500 font-bold">★ New</span>;
      case 'GOOD':
        return <span className="text-enterprise-500 font-semibold">Good</span>;
      case 'FAIR':
        return <span className="text-amber-500">Fair</span>;
      case 'POOR':
        return <span className="text-orange-500 font-semibold">Poor</span>;
      case 'DAMAGED':
        return <span className="text-red-500 font-bold">! Damaged</span>;
      default:
        return <span>{cond}</span>;
    }
  };

  // Pre-selected category matching fields
  const activeCategory = categories.find(c => c.id === registerForm.categoryId);

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

      {/* Control Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
        {/* Search */}
        <div className="flex items-center w-full md:w-80 bg-slate-50 dark:bg-slate-800 px-3.5 py-2 rounded-xl gap-2 border border-slate-200/50 dark:border-slate-700">
          <Search className="w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search assets by tag, serial..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-xs w-full text-slate-700 dark:text-slate-300"
          />
        </div>

        {/* Filters Selects */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-500 outline-none focus:border-enterprise-500"
          >
            <option value="">All Categories</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>

          <select 
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-500 outline-none focus:border-enterprise-500"
          >
            <option value="">All Departments</option>
            {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>

          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-500 outline-none focus:border-enterprise-500"
          >
            <option value="">All Statuses</option>
            <option value="AVAILABLE">Available</option>
            <option value="ALLOCATED">Allocated</option>
            <option value="RESERVED">Reserved</option>
            <option value="MAINTENANCE">Maintenance</option>
            <option value="LOST">Lost</option>
          </select>

          {['ADMIN', 'ASSET_MANAGER'].includes(user?.role) && (
            <button 
              onClick={() => setShowRegisterModal(true)}
              className="flex items-center gap-1 px-4 py-2 bg-enterprise-600 hover:bg-enterprise-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-enterprise-500/10 ml-auto md:ml-0"
            >
              <Plus className="w-4 h-4" /> Register Asset
            </button>
          )}
        </div>
      </div>

      {/* Main Grid View */}
      {loading ? (
        <div className="h-64 flex items-center justify-center text-slate-400 animate-pulse">
          Querying assets catalog...
        </div>
      ) : assets.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl py-16 text-center text-slate-400">
          <Inbox className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <h4 className="font-semibold text-sm">No assets match this query</h4>
          <p className="text-xs text-slate-400 mt-1">Try clearing filters or search terms.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {assets.map(asset => (
            <div 
              key={asset.id} 
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-md transition-all group flex flex-col justify-between"
            >
              {/* Card Header image and details */}
              <div>
                <div className="h-40 bg-slate-100 dark:bg-slate-800 relative overflow-hidden flex items-center justify-center">
                  {asset.photoUrl ? (
                    <img src={asset.photoUrl} alt={asset.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <Package className="w-12 h-12 text-slate-300 dark:text-slate-600" />
                  )}
                  <div className="absolute top-3 left-3">{getStatusBadge(asset.lifecycleStatus)}</div>
                  <div className="absolute bottom-3 right-3 bg-slate-900/70 backdrop-blur text-[10px] text-white px-2 py-0.5 rounded font-mono font-semibold">
                    {asset.tag}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-enterprise-500 block tracking-wider">{asset.category.name}</span>
                    <h3 className="font-bold text-sm text-slate-800 dark:text-white mt-1 group-hover:text-enterprise-500 transition-colors">{asset.name}</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-y-2 text-[11px] font-semibold text-slate-400 border-t border-slate-50 dark:border-slate-800 pt-3">
                    <div>
                      <span className="text-slate-400 block font-normal text-[10px]">Location</span>
                      <span className="text-slate-700 dark:text-slate-200">{asset.location}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-normal text-[10px]">Condition</span>
                      <span className="block mt-0.5">{getConditionBadge(asset.condition)}</span>
                    </div>
                  </div>

                  {asset.allocatedTo && (
                    <div className="bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl text-[10px] flex items-center justify-between">
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase font-bold">Assigned to:</span>
                        <span className="font-bold text-slate-700 dark:text-slate-300">{asset.allocatedTo.name}</span>
                      </div>
                      {asset.expectedReturn && (
                        <div className="text-right">
                          <span className="text-slate-400 block text-[9px] uppercase font-bold">Due back:</span>
                          <span className="font-semibold text-enterprise-500">{new Date(asset.expectedReturn).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Action footer */}
              <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-slate-50 dark:border-slate-800">
                <button 
                  onClick={async () => {
                    try {
                      const data = await api.getAssetById(asset.id);
                      setSelectedAsset(data);
                      setShowDetailModal(true);
                    } catch (e) {}
                  }}
                  className="text-xs font-semibold text-enterprise-500 hover:text-enterprise-600 flex items-center gap-1"
                >
                  <Eye className="w-4 h-4" /> View Details
                </button>

                <div className="flex gap-2">
                  {/* Allocate / Return logic */}
                  {['ADMIN', 'ASSET_MANAGER'].includes(user?.role) && asset.lifecycleStatus === 'AVAILABLE' && (
                    <button 
                      onClick={() => {
                        setSelectedAsset(asset);
                        setShowAllocateModal(true);
                      }}
                      className="px-2.5 py-1.5 bg-enterprise-50 hover:bg-enterprise-100 text-enterprise-600 rounded-lg text-[10px] font-bold dark:bg-enterprise-950/30 dark:text-enterprise-400"
                    >
                      Allocate
                    </button>
                  )}

                  {['ADMIN', 'ASSET_MANAGER'].includes(user?.role) && asset.lifecycleStatus === 'ALLOCATED' && (
                    <button 
                      onClick={() => {
                        setSelectedAsset(asset);
                        setShowReturnModal(true);
                      }}
                      className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg text-[10px] font-bold dark:bg-emerald-950/30 dark:text-emerald-400"
                    >
                      Verify Return
                    </button>
                  )}

                  {/* Transfer request */}
                  {asset.lifecycleStatus === 'ALLOCATED' && asset.allocatedToId === user.id && (
                    <button 
                      onClick={() => {
                        setSelectedAsset(asset);
                        setShowTransferModal(true);
                      }}
                      className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg text-[10px] font-bold dark:bg-indigo-950/30 dark:text-indigo-400"
                    >
                      Request Transfer
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 1. REGISTER ASSET MODAL */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <h3 className="font-bold text-base text-slate-800 dark:text-white">Register New Asset</h3>
            <form onSubmit={handleRegisterSubmit} className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1 col-span-2">
                <label className="text-slate-400 font-semibold block">Asset Name / Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Dell UltraSharp 27 Monitor"
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 outline-none focus:border-enterprise-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold block">Category</label>
                <select 
                  required
                  value={registerForm.categoryId}
                  onChange={(e) => handleCatChangeInForm(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 outline-none focus:border-enterprise-500"
                >
                  <option value="">Select Category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold block">Assign Department</label>
                <select 
                  value={registerForm.departmentId}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, departmentId: e.target.value }))}
                  className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 outline-none focus:border-enterprise-500"
                >
                  <option value="">No Department (Stockroom)</option>
                  {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold block">Storage / Location</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Cabinet C, Desk 12"
                  value={registerForm.location}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 outline-none focus:border-enterprise-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold block">Initial Condition</label>
                <select 
                  value={registerForm.condition}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, condition: e.target.value }))}
                  className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 outline-none focus:border-enterprise-500"
                >
                  <option value="NEW">New</option>
                  <option value="GOOD">Good</option>
                  <option value="FAIR">Fair</option>
                  <option value="POOR">Poor</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold block">Serial Number / Part No.</label>
                <input 
                  type="text" 
                  placeholder="e.g. SN-9988-UU"
                  value={registerForm.serialNumber}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, serialNumber: e.target.value }))}
                  className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 outline-none focus:border-enterprise-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold block">Photo URL</label>
                <input 
                  type="text" 
                  placeholder="https://..."
                  value={registerForm.photoUrl}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, photoUrl: e.target.value }))}
                  className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 outline-none focus:border-enterprise-500"
                />
              </div>

              {/* Dynamic Category Custom Fields Inputs */}
              {activeCategory && activeCategory.customFields && activeCategory.customFields.length > 0 && (
                <div className="col-span-2 border-t dark:border-slate-800 pt-3 grid grid-cols-2 gap-4">
                  <span className="col-span-2 text-[10px] uppercase font-bold text-slate-400 tracking-wider">Category Template Fields</span>
                  {activeCategory.customFields.map((field) => (
                    <div key={field.name} className="space-y-1">
                      <label className="text-slate-400 font-semibold block">{field.name} {field.required && '*'}</label>
                      <input 
                        type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
                        required={field.required}
                        value={registerForm.customValues[field.name] || ''}
                        onChange={(e) => setRegisterForm(prev => ({
                          ...prev,
                          customValues: { ...prev.customValues, [field.name]: e.target.value }
                        }))}
                        className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 outline-none focus:border-enterprise-500"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="col-span-2 flex gap-3 pt-3">
                <button 
                  type="button" 
                  onClick={() => setShowRegisterModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 bg-enterprise-600 hover:bg-enterprise-700 text-white rounded-xl font-bold transition-all shadow-md shadow-enterprise-600/10"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. ALLOCATE ASSET MODAL */}
      {showAllocateModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <h3 className="font-bold text-base text-slate-800 dark:text-white">Allocate {selectedAsset?.name}</h3>
            <form onSubmit={handleAllocateSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-400 font-semibold block">Select Custodian / Employee</label>
                <select 
                  required
                  value={allocateForm.employeeId}
                  onChange={(e) => setAllocateForm(prev => ({ ...prev, employeeId: e.target.value }))}
                  className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 outline-none focus:border-enterprise-500"
                >
                  <option value="">Select Employee</option>
                  {employees.map(e => <option key={e.id} value={e.id}>{e.name} ({e.email})</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold block">Expected Return Date</label>
                <input 
                  type="date" 
                  required
                  value={allocateForm.expectedReturn}
                  onChange={(e) => setAllocateForm(prev => ({ ...prev, expectedReturn: e.target.value }))}
                  className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 outline-none focus:border-enterprise-500"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button 
                  type="button" 
                  onClick={() => setShowAllocateModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 bg-enterprise-600 hover:bg-enterprise-700 text-white rounded-xl font-bold transition-all"
                >
                  Allocate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. TRANSFER ASSET MODAL */}
      {showTransferModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <h3 className="font-bold text-base text-slate-800 dark:text-white">Request Transfer of {selectedAsset?.name}</h3>
            <form onSubmit={handleTransferSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-400 font-semibold block">Transfer Custody To</label>
                <select 
                  required
                  value={transferForm.toEmployeeId}
                  onChange={(e) => setTransferForm(prev => ({ ...prev, toEmployeeId: e.target.value }))}
                  className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 outline-none focus:border-enterprise-500"
                >
                  <option value="">Select Target Employee</option>
                  {employees.filter(e => e.id !== user.id).map(e => (
                    <option key={e.id} value={e.id}>{e.name} ({e.email})</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-3">
                <button 
                  type="button" 
                  onClick={() => setShowTransferModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. RETURN ASSET (VERIFY CONDITION) MODAL */}
      {showReturnModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <h3 className="font-bold text-base text-slate-800 dark:text-white">Verify Return of {selectedAsset?.name}</h3>
            <form onSubmit={handleReturnSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-400 font-semibold block">Post-Allocation Condition Check</label>
                <select 
                  value={returnForm.condition}
                  onChange={(e) => setReturnForm(prev => ({ ...prev, condition: e.target.value }))}
                  className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 outline-none focus:border-enterprise-500"
                >
                  <option value="NEW">New (No damage)</option>
                  <option value="GOOD">Good</option>
                  <option value="FAIR">Fair / Normal Wear</option>
                  <option value="POOR">Poor (Needs servicing)</option>
                  <option value="DAMAGED">Damaged (Needs repair)</option>
                </select>
              </div>

              <div className="flex gap-3 pt-3">
                <button 
                  type="button" 
                  onClick={() => setShowReturnModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all"
                >
                  Confirm Return
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. ASSET DETAIL DRAWER/MODAL */}
      {showDetailModal && selectedAsset && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-end">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl h-full shadow-2xl border-l dark:border-slate-800 p-6 overflow-y-auto space-y-6 animate-in slide-in-from-right duration-200 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Header Info */}
              <div className="flex justify-between items-start border-b dark:border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-enterprise-500 bg-enterprise-50 px-2 py-0.5 rounded font-semibold dark:bg-enterprise-950/40 dark:text-enterprise-400">
                      {selectedAsset.tag}
                    </span>
                    {getStatusBadge(selectedAsset.lifecycleStatus)}
                  </div>
                  <h3 className="font-bold text-lg text-slate-800 dark:text-white mt-2">{selectedAsset.name}</h3>
                  <span className="text-[10px] text-slate-400 font-semibold mt-1 block">Category: {selectedAsset.category.name}</span>
                </div>
                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="text-slate-400 hover:text-slate-500 font-bold text-lg"
                >
                  ✕
                </button>
              </div>

              {/* QR and Metadata Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* QR Code and Photo */}
                <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl flex flex-col items-center justify-center gap-3 border dark:border-slate-800">
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 dark:bg-slate-950 dark:border-slate-800 shadow-inner">
                    {/* Simulated SVG QR Code Vector */}
                    <svg className="w-32 h-32 text-slate-900 dark:text-slate-100" viewBox="0 0 100 100">
                      <rect width="25" height="25" fill="currentColor" />
                      <rect x="75" width="25" height="25" fill="currentColor" />
                      <rect y="75" width="25" height="25" fill="currentColor" />
                      <rect x="35" y="35" width="30" height="30" fill="currentColor" />
                      <rect x="10" y="40" width="10" height="15" fill="currentColor" />
                      <rect x="70" y="55" width="15" height="20" fill="currentColor" />
                      <rect x="50" y="10" width="10" height="10" fill="currentColor" />
                      <rect x="80" y="80" width="10" height="10" fill="currentColor" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">AF-Tag Scan URI</span>
                </div>

                {/* Info List */}
                <div className="space-y-3.5 text-xs">
                  <div className="grid grid-cols-2 border-b dark:border-slate-800 pb-2">
                    <span className="text-slate-400">Serial Number</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{selectedAsset.serialNumber || 'N/A'}</span>
                  </div>
                  <div className="grid grid-cols-2 border-b dark:border-slate-800 pb-2">
                    <span className="text-slate-400">Custodian Location</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{selectedAsset.location}</span>
                  </div>
                  <div className="grid grid-cols-2 border-b dark:border-slate-800 pb-2">
                    <span className="text-slate-400">Current Condition</span>
                    <span className="font-semibold">{getConditionBadge(selectedAsset.condition)}</span>
                  </div>
                  <div className="grid grid-cols-2 border-b dark:border-slate-800 pb-2">
                    <span className="text-slate-400">Department Unit</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{selectedAsset.department?.name || 'In Stock'}</span>
                  </div>

                  {/* Custom values template fields display */}
                  {selectedAsset.customValues && Object.keys(selectedAsset.customValues).length > 0 && (
                    <div className="bg-enterprise-50/50 dark:bg-enterprise-950/20 p-3 rounded-xl space-y-2 mt-4 border border-enterprise-100/50">
                      <span className="text-[9px] uppercase font-bold text-enterprise-500 tracking-wider">Dynamic Fields:</span>
                      {Object.entries(selectedAsset.customValues).map(([key, val]) => (
                        <div key={key} className="flex justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                          <span className="font-normal">{key}</span>
                          <span>{val || 'N/A'}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Tabs for History Logs (Maintenance, Transfers, Bookings, Audits) */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-slate-800 dark:text-white border-b dark:border-slate-800 pb-2 flex items-center gap-1.5">
                  <TrendingUp className="w-4.5 h-4.5 text-enterprise-500" /> Asset Workflow History
                </h4>

                {/* Maintenance Jobs Logs */}
                {selectedAsset.maintenanceJobs && selectedAsset.maintenanceJobs.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Maintenance History</span>
                    <div className="space-y-2">
                      {selectedAsset.maintenanceJobs.map(m => (
                        <div key={m.id} className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl text-[11px] border dark:border-slate-850 flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-slate-700 dark:text-slate-200">{m.description}</p>
                            <span className="text-[9px] text-slate-400 mt-1 block">
                              Requested by: {m.requester.name} on {new Date(m.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <span className={`text-[10px] font-bold uppercase ${m.status === 'RESOLVED' ? 'text-green-500' : 'text-yellow-600'}`}>
                            {m.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Transfer Logs */}
                {selectedAsset.transfers && selectedAsset.transfers.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Transfer History</span>
                    <div className="space-y-2">
                      {selectedAsset.transfers.map(t => (
                        <div key={t.id} className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl text-[11px] border dark:border-slate-850 flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-slate-700 dark:text-slate-200">
                              From {t.fromEmployee.name} to {t.toEmployee.name}
                            </p>
                            <span className="text-[9px] text-slate-400 mt-1 block">
                              Requested on: {new Date(t.requestedAt).toLocaleDateString()}
                            </span>
                          </div>
                          <span className={`text-[10px] font-bold uppercase ${t.status === 'APPROVED' ? 'text-green-500' : 'text-yellow-600'}`}>
                            {t.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button 
              onClick={() => setShowDetailModal(false)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-xs"
            >
              Close Drawer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
