import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { 
  Building2, 
  Tags, 
  Users2, 
  Plus, 
  Trash2, 
  UserCheck, 
  ChevronRight,
  Shield,
  Layers,
  Sparkles,
  Inbox
} from 'lucide-react';

export default function OrgView({ user }) {
  const [subTab, setSubTab] = useState('departments'); // 'departments' | 'categories' | 'employees'
  
  // Data States
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [deptForm, setDeptForm] = useState({ name: '', parentDepartmentId: '', managerId: '' });
  const [catForm, setCatForm] = useState({ name: '', description: '', defaultWarrantyMths: 12, customFields: [] });
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldType, setNewFieldType] = useState('text');
  const [newFieldReq, setNewFieldReq] = useState(false);

  const [toast, setToast] = useState(null);

  const triggerToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      if (subTab === 'departments') {
        const data = await api.getDepartments();
        setDepartments(data);
      } else if (subTab === 'categories') {
        const data = await api.getCategories();
        setCategories(data);
      } else if (subTab === 'employees') {
        const data = await api.getEmployees();
        // Also fetch departments for assignment dropdowns
        const depts = await api.getDepartments();
        setDepartments(depts);
        setEmployees(data);
      }
    } catch (e: any) {
      triggerToast(e.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [subTab]);

  // Dept creation handler
  const handleCreateDept = async (e) => {
    e.preventDefault();
    if (!deptForm.name) return;
    try {
      await api.createDepartment(deptForm);
      triggerToast('Department created successfully!');
      setDeptForm({ name: '', parentDepartmentId: '', managerId: '' });
      loadData();
    } catch (err: any) {
      triggerToast(err.message, 'error');
    }
  };

  // Category creation handler
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!catForm.name) return;
    try {
      await api.createCategory(catForm);
      triggerToast('Asset Category created successfully!');
      setCatForm({ name: '', description: '', defaultWarrantyMths: 12, customFields: [] });
      loadData();
    } catch (err: any) {
      triggerToast(err.message, 'error');
    }
  };

  const addCustomField = () => {
    if (!newFieldName) return;
    setCatForm(prev => ({
      ...prev,
      customFields: [...prev.customFields, { name: newFieldName, type: newFieldType, required: newFieldReq }]
    }));
    setNewFieldName('');
    setNewFieldReq(false);
  };

  const removeCustomField = (index) => {
    setCatForm(prev => ({
      ...prev,
      customFields: prev.customFields.filter((_, idx) => idx !== index)
    }));
  };

  // Employee promotion handler
  const handlePromote = async (empId, role, status) => {
    try {
      await api.promoteEmployee(empId, { role, status });
      triggerToast('Employee role/status updated successfully!');
      loadData();
    } catch (err: any) {
      triggerToast(err.message, 'error');
    }
  };

  // Employee department update
  const handleAssignDept = async (empId, departmentId) => {
    try {
      await api.updateEmployeeProfile(empId, { departmentId });
      triggerToast('Employee department updated!');
      loadData();
    } catch (err: any) {
      triggerToast(err.message, 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-xs font-semibold shadow-lg transition-all animate-in fade-in slide-in-from-top-4 ${
          toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-600 text-white'
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Sub Tabs Toggle */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6">
        <button
          onClick={() => setSubTab('departments')}
          className={`flex items-center gap-2 pb-3 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
            subTab === 'departments' 
              ? 'border-enterprise-500 text-enterprise-600 dark:text-enterprise-400' 
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Departments</span>
        </button>
        <button
          onClick={() => setSubTab('categories')}
          className={`flex items-center gap-2 pb-3 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
            subTab === 'categories' 
              ? 'border-enterprise-500 text-enterprise-600 dark:text-enterprise-400' 
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Tags className="w-4 h-4" />
          <span>Asset Categories</span>
        </button>
        <button
          onClick={() => setSubTab('employees')}
          className={`flex items-center gap-2 pb-3 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
            subTab === 'employees' 
              ? 'border-enterprise-500 text-enterprise-600 dark:text-enterprise-400' 
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Users2 className="w-4 h-4" />
          <span>Employee Directory</span>
        </button>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center text-slate-400 animate-pulse">
          Loading organization details...
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main List Column */}
          <div className="xl:col-span-2 space-y-6">
            {subTab === 'departments' && (
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/40 text-slate-400 text-[10px] uppercase font-bold tracking-wider border-b dark:border-slate-800">
                      <th className="py-4 px-6">Department Name</th>
                      <th className="py-4 px-6">Parent Unit</th>
                      <th className="py-4 px-6">Manager / Head</th>
                      <th className="py-4 px-6 text-center">Allocated Assets</th>
                      <th className="py-4 px-6 text-center">Employee Count</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs text-slate-600 dark:text-slate-300">
                    {departments.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-slate-400">
                          <Inbox className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                          No departments defined.
                        </td>
                      </tr>
                    ) : (
                      departments.map(d => (
                        <tr key={d.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                          <td className="py-4 px-6 font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-slate-400" />
                            {d.name}
                          </td>
                          <td className="py-4 px-6">
                            {d.parentDepartment ? (
                              <span className="text-slate-400 font-medium flex items-center gap-1">
                                <ChevronRight className="w-3.5 h-3.5" />
                                {d.parentDepartment.name}
                              </span>
                            ) : (
                              <span className="text-slate-400 text-[10px] uppercase font-semibold">HQ Direct</span>
                            )}
                          </td>
                          <td className="py-4 px-6 font-medium">
                            {d.manager ? (
                              <span className="text-enterprise-500 font-semibold">{d.manager.name}</span>
                            ) : (
                              <span className="text-slate-400 italic">Unassigned</span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-center font-bold text-slate-700 dark:text-slate-200">
                            {d._count?.assets || 0}
                          </td>
                          <td className="py-4 px-6 text-center font-semibold text-slate-500 dark:text-slate-400">
                            {d._count?.employees || 0}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {subTab === 'categories' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.length === 0 ? (
                  <div className="col-span-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl py-12 text-center text-slate-400">
                    <Inbox className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    No asset categories defined.
                  </div>
                ) : (
                  categories.map(c => (
                    <div key={c.id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 space-y-4 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-1.5">
                            <Layers className="w-4.5 h-4.5 text-enterprise-500" />
                            {c.name}
                          </h4>
                          <p className="text-[11px] text-slate-400 mt-1">{c.description || 'No description provided.'}</p>
                        </div>
                        <span className="text-[10px] font-bold bg-slate-100 px-2.5 py-1 rounded-full text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                          {c._count?.assets || 0} Assets
                        </span>
                      </div>

                      <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex justify-between items-center text-[10px] font-bold text-slate-400">
                        <span>Default Warranty: {c.defaultWarrantyMths} Months</span>
                      </div>

                      {/* Custom Fields listing */}
                      {c.customFields && c.customFields.length > 0 && (
                        <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl space-y-2">
                          <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-enterprise-400" /> Custom fields template:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {c.customFields.map(f => (
                              <span key={f.name} className="text-[10px] font-medium bg-white px-2 py-0.5 rounded-lg border border-slate-200/50 dark:bg-slate-900 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                                {f.name} ({f.type}) {f.required && <span className="text-red-500 font-bold">*</span>}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {subTab === 'employees' && (
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/40 text-slate-400 text-[10px] uppercase font-bold tracking-wider border-b dark:border-slate-800">
                      <th className="py-4 px-6">Employee</th>
                      <th className="py-4 px-6">Assigned Department</th>
                      <th className="py-4 px-6">System Role</th>
                      <th className="py-4 px-6">Account Status</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs text-slate-600 dark:text-slate-300">
                    {employees.map(emp => (
                      <tr key={emp.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-500 uppercase text-[11px] border">
                              {emp.name.substring(0, 2)}
                            </div>
                            <div>
                              <h4 className="font-semibold text-slate-800 dark:text-white">{emp.name}</h4>
                              <p className="text-[10px] text-slate-400 mt-0.5">{emp.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <select
                            value={emp.departmentId || ''}
                            onChange={(e) => handleAssignDept(emp.id, e.target.value)}
                            className="bg-transparent border border-slate-200 rounded-lg px-2 py-1 text-xs outline-none focus:border-enterprise-500 dark:border-slate-700 dark:bg-slate-900"
                          >
                            <option value="">No Department</option>
                            {departments.map(d => (
                              <option key={d.id} value={d.id}>{d.name}</option>
                            ))}
                          </select>
                        </td>
                        <td className="py-4 px-6 font-medium">
                          <select
                            value={emp.role}
                            onChange={(e) => handlePromote(emp.id, e.target.value, emp.status)}
                            className="bg-transparent border border-slate-200 rounded-lg px-2 py-1 text-xs outline-none font-semibold focus:border-enterprise-500 dark:border-slate-700 dark:bg-slate-900 text-enterprise-600 dark:text-enterprise-400"
                          >
                            <option value="ADMIN">Admin</option>
                            <option value="ASSET_MANAGER">Asset Manager</option>
                            <option value="DEPARTMENT_HEAD">Department Head</option>
                            <option value="EMPLOYEE">Employee</option>
                          </select>
                        </td>
                        <td className="py-4 px-6">
                          <select
                            value={emp.status}
                            onChange={(e) => handlePromote(emp.id, emp.role, e.target.value)}
                            className={`bg-transparent border border-slate-200 rounded-lg px-2 py-1 text-xs outline-none font-semibold focus:border-enterprise-500 dark:border-slate-700 dark:bg-slate-900 ${
                              emp.status === 'ACTIVE' ? 'text-green-600' : emp.status === 'PENDING' ? 'text-yellow-600' : 'text-red-500'
                            }`}
                          >
                            <option value="ACTIVE">Active</option>
                            <option value="PENDING">Pending Approval</option>
                            <option value="SUSPENDED">Suspended</option>
                          </select>
                        </td>
                        <td className="py-4 px-6 text-right font-medium">
                          <span className="text-[10px] text-slate-400">
                            {emp._count?.allocatedAssets || 0} Assets Allocated
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Sidebar Creation Forms */}
          <div className="space-y-6">
            {subTab === 'departments' && (
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-1.5">
                  <Building2 className="w-5 h-5 text-enterprise-500" /> Add Department
                </h3>
                <form onSubmit={handleCreateDept} className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-semibold block">Department Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Sales & Marketing" 
                      value={deptForm.name}
                      onChange={(e) => setDeptForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 outline-none focus:border-enterprise-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-semibold block">Parent Department (Hierarchy)</label>
                    <select
                      value={deptForm.parentDepartmentId}
                      onChange={(e) => setDeptForm(prev => ({ ...prev, parentDepartmentId: e.target.value }))}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 outline-none focus:border-enterprise-500"
                    >
                      <option value="">No Parent (HQ Direct)</option>
                      {departments.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-2.5 bg-enterprise-600 hover:bg-enterprise-700 text-white rounded-xl font-bold transition-all shadow-md shadow-enterprise-600/10 flex items-center justify-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Save Department
                  </button>
                </form>
              </div>
            )}

            {subTab === 'categories' && (
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-1.5">
                  <Tags className="w-5 h-5 text-enterprise-500" /> Create Category
                </h3>
                <form onSubmit={handleCreateCategory} className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-semibold block">Category Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Tablets & Handhelds" 
                      value={catForm.name}
                      onChange={(e) => setCatForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 outline-none focus:border-enterprise-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-semibold block">Description</label>
                    <textarea 
                      placeholder="Category assets metadata scope..." 
                      value={catForm.description}
                      onChange={(e) => setCatForm(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 outline-none focus:border-enterprise-500 h-20 resize-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-semibold block">Warranty Period (Months)</label>
                    <input 
                      type="number" 
                      value={catForm.defaultWarrantyMths}
                      onChange={(e) => setCatForm(prev => ({ ...prev, defaultWarrantyMths: Number(e.target.value) }))}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 outline-none focus:border-enterprise-500"
                    />
                  </div>

                  {/* Add Custom Fields Section */}
                  <div className="border-t dark:border-slate-800 pt-3 space-y-3">
                    <label className="text-slate-400 font-semibold block">Custom Fields Template</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Field Name" 
                        value={newFieldName}
                        onChange={(e) => setNewFieldName(e.target.value)}
                        className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 outline-none"
                      />
                      <select
                        value={newFieldType}
                        onChange={(e) => setNewFieldType(e.target.value)}
                        className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-1 py-1.5 outline-none"
                      >
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                        <option value="date">Date</option>
                      </select>
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="flex items-center gap-1.5 font-semibold text-slate-500">
                        <input 
                          type="checkbox" 
                          checked={newFieldReq} 
                          onChange={(e) => setNewFieldReq(e.target.checked)} 
                        /> Required field
                      </label>
                      <button 
                        type="button" 
                        onClick={addCustomField}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg font-bold"
                      >
                        Add Field
                      </button>
                    </div>

                    {/* Pending Custom Fields List */}
                    {catForm.customFields.length > 0 && (
                      <div className="space-y-1 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 max-h-36 overflow-y-auto">
                        {catForm.customFields.map((field, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-white dark:bg-slate-900 border px-2 py-1 rounded-lg text-[10px]">
                            <span className="font-semibold text-slate-700 dark:text-slate-300">
                              {field.name} ({field.type}) {field.required && '*'}
                            </span>
                            <button type="button" onClick={() => removeCustomField(idx)} className="text-red-500 hover:text-red-600">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-2.5 bg-enterprise-600 hover:bg-enterprise-700 text-white rounded-xl font-bold transition-all shadow-md shadow-enterprise-600/10 flex items-center justify-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Save Category
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
