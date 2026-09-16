import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { 
  Package, 
  UserCheck, 
  Wrench, 
  Calendar, 
  ArrowLeftRight, 
  Clock, 
  ArrowUpRight,
  TrendingUp,
  Inbox
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  LineChart,
  Line
} from 'recharts';

export default function DashboardView({ user, setActiveTab, onOpenRegister, onOpenBook, onOpenMaintenance }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const stats = await api.getReportSummary();
        setData(stats);
      } catch (e) {
        console.error('Failed to load stats:', e);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-6 animate-pulse">
        {/* Skeleton KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          ))}
        </div>
        {/* Skeleton Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          <div className="h-80 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        </div>
      </div>
    );
  }

  const kpis = data?.kpis || {
    totalAssets: 0,
    allocatedAssets: 0,
    availableAssets: 0,
    maintenanceAssets: 0,
    activeBookings: 0,
    pendingTransfers: 0,
    pendingMaintenance: 0,
    overdueReturns: 0
  };

  const chartData = data?.charts || {
    statusDistribution: [],
    maintenanceTrends: [],
    deptUtilization: []
  };

  const COLORS = ['#4292c6', '#807dba', '#fdae6b', '#f58518', '#ef3b2c', '#74c476'];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-enterprise-700 via-enterprise-600 to-indigo-900 rounded-2xl p-6 text-white shadow-xl flex justify-between items-center relative overflow-hidden">
        <div className="relative z-10 space-y-1">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">Welcome Back, {user?.name}!</h2>
          <p className="text-enterprise-100 text-xs md:text-sm max-w-xl font-medium leading-relaxed">
            Here is your live enterprise asset overview. Monitor resource allocations, review urgent maintenance queries, and action pending items.
          </p>
        </div>
        <div className="absolute right-0 top-0 bottom-0 opacity-10 flex items-center justify-center translate-x-12 select-none pointer-events-none">
          <TrendingUp className="w-64 h-64" />
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 hover:scale-[1.01] hover:shadow-lg transition-all duration-200">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Total Registered Assets</span>
              <span className="text-3xl font-extrabold text-slate-800 dark:text-white mt-2 block">{kpis.totalAssets}</span>
            </div>
            <div className="bg-enterprise-50 p-3 rounded-xl text-enterprise-600 dark:bg-enterprise-950 dark:text-enterprise-300">
              <Package className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <span className="text-green-500 font-bold">{kpis.availableAssets} Available</span>
            <span>for allocation</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 hover:scale-[1.01] hover:shadow-lg transition-all duration-200">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Currently Allocated</span>
              <span className="text-3xl font-extrabold text-slate-800 dark:text-white mt-2 block">{kpis.allocatedAssets}</span>
            </div>
            <div className="bg-green-50 p-3 rounded-xl text-green-600 dark:bg-green-950 dark:text-green-300">
              <UserCheck className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-slate-400">
            {kpis.overdueReturns > 0 ? (
              <>
                <span className="text-red-500 font-bold flex items-center gap-0.5"><Clock className="w-3.5 h-3.5" /> {kpis.overdueReturns} Overdue</span>
                <span>items require return</span>
              </>
            ) : (
              <span className="text-slate-400">All returns on schedule</span>
            )}
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 hover:scale-[1.01] hover:shadow-lg transition-all duration-200">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Maintenance Tickets</span>
              <span className="text-3xl font-extrabold text-slate-800 dark:text-white mt-2 block">{kpis.pendingMaintenance + kpis.maintenanceAssets}</span>
            </div>
            <div className="bg-yellow-50 p-3 rounded-xl text-yellow-600 dark:bg-yellow-950 dark:text-yellow-300">
              <Wrench className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <span className="text-yellow-600 dark:text-yellow-400 font-bold">{kpis.pendingMaintenance} Pending</span>
            <span>approvals / assignments</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 hover:scale-[1.01] hover:shadow-lg transition-all duration-200">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Active bookings</span>
              <span className="text-3xl font-extrabold text-slate-800 dark:text-white mt-2 block">{kpis.activeBookings}</span>
            </div>
            <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">{kpis.pendingTransfers} Pending</span>
            <span>transfers approval</span>
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="bg-slate-100 dark:bg-slate-900/60 p-4 rounded-2xl flex flex-wrap gap-4 items-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Quick Actions:</span>
        {['ADMIN', 'ASSET_MANAGER'].includes(user?.role) && (
          <button 
            onClick={onOpenRegister}
            className="flex items-center gap-1.5 px-4 py-2 bg-enterprise-600 hover:bg-enterprise-700 text-white rounded-xl text-xs font-semibold shadow-md transition-all"
          >
            <span>Register Asset</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}
        <button 
          onClick={onOpenBook}
          className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-all"
        >
          <span>Book Resource</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
        <button 
          onClick={onOpenMaintenance}
          className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white dark:border-slate-700 rounded-xl text-xs font-semibold transition-all"
        >
          <span>Raise Maintenance</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Utilization Bar Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold text-sm text-slate-700 dark:text-white uppercase tracking-wider mb-6">Department Resource Allocations</h3>
          <div className="h-72 w-full">
            {chartData.deptUtilization.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-xs text-slate-400">
                <Inbox className="w-8 h-8 mb-2" />
                No department utilization data available.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.deptUtilization}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                  <Legend wrapperStyle={{ fontSize: '10px' }} />
                  <Bar dataKey="assets" name="Assets Allocated" fill="#4292c6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="employees" name="Employees Count" fill="#807dba" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Asset Status Distribution Pie Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold text-sm text-slate-700 dark:text-white uppercase tracking-wider mb-6">Asset Lifecycle Distribution</h3>
          <div className="h-72 w-full flex flex-col md:flex-row items-center justify-between">
            <div className="flex-1 h-full w-full">
              {chartData.statusDistribution.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-xs text-slate-400">
                  <Inbox className="w-8 h-8 mb-2" />
                  No assets status data.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData.statusDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {chartData.statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
            {/* Color Labels */}
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2.5 px-4 md:w-48 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              {chartData.statusDistribution.map((entry, idx) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                  <span className="truncate">{entry.name}: {entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
