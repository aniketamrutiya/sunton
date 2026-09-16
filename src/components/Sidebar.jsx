import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  CalendarRange, 
  Wrench, 
  ClipboardCheck, 
  BarChart3, 
  History, 
  LogOut,
  Building2,
  Boxes
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, user, logout }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'ASSET_MANAGER', 'DEPARTMENT_HEAD', 'EMPLOYEE'] },
    { id: 'assets', label: 'Asset Register', icon: Package, roles: ['ADMIN', 'ASSET_MANAGER', 'DEPARTMENT_HEAD', 'EMPLOYEE'] },
    { id: 'bookings', label: 'Resource Bookings', icon: CalendarRange, roles: ['ADMIN', 'ASSET_MANAGER', 'DEPARTMENT_HEAD', 'EMPLOYEE'] },
    { id: 'maintenance', label: 'Maintenance Hub', icon: Wrench, roles: ['ADMIN', 'ASSET_MANAGER', 'DEPARTMENT_HEAD', 'EMPLOYEE'] },
    { id: 'audits', label: 'Asset Audits', icon: ClipboardCheck, roles: ['ADMIN', 'ASSET_MANAGER'] },
    { id: 'organization', label: 'Organization Setup', icon: Building2, roles: ['ADMIN', 'ASSET_MANAGER'] },
    { id: 'reports', label: 'Analytics & Predictions', icon: BarChart3, roles: ['ADMIN', 'ASSET_MANAGER', 'DEPARTMENT_HEAD'] },
    { id: 'logs', label: 'Audit Trail Logs', icon: History, roles: ['ADMIN'] },
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(user?.role || ''));

  return (
    <div className="w-64 bg-slate-900 text-slate-100 flex flex-col h-full border-r border-slate-800 dark:bg-slate-950">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="bg-enterprise-500 p-2 rounded-lg text-white shadow-md shadow-enterprise-500/20">
          <Boxes className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-wide bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">AssetFlow</h1>
          <span className="text-xs text-enterprise-400 font-semibold tracking-wider uppercase">Enterprise ERP</span>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {filteredItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive 
                  ? 'bg-enterprise-600 text-white shadow-lg shadow-enterprise-600/10' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Footer Profile */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50 dark:bg-slate-950/50">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-10 h-10 rounded-full bg-enterprise-700 flex items-center justify-center font-bold text-white uppercase text-sm border border-enterprise-500">
            {user?.name?.substring(0, 2) || 'US'}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-sm font-semibold truncate text-white">{user?.name}</h4>
            <span className="text-xs text-enterprise-400 font-medium block uppercase tracking-wider">{user?.role?.replace('_', ' ')}</span>
          </div>
        </div>

        <button 
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-red-950/50 hover:text-red-400 rounded-xl text-sm font-medium text-slate-300 transition-all border border-slate-700/50 hover:border-red-900/30"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
