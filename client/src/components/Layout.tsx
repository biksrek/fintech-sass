import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wallet, 
  LogOut, 
  Bell,
  Search,
  Menu
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#020617] flex overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0B1120] border-r border-white/5 transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center h-16 px-6 border-b border-white/5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center mr-3">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <span className="text-xl font-bold text-white">FinTech</span>
        </div>

        <nav className="p-4 space-y-1">
          <Link 
            to="/" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              isActive('/') 
                ? 'text-white bg-blue-600/10 border border-blue-600/20' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard size={20} className={isActive('/') ? 'text-blue-500' : ''} />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link 
            to="/transactions" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              isActive('/transactions') 
                ? 'text-white bg-blue-600/10 border border-blue-600/20' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Wallet size={20} className={isActive('/transactions') ? 'text-blue-500' : ''} />
            <span className="font-medium">Transactions</span>
          </Link>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-white/5">
          <button 
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all group"
          >
            <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-[#0B1120]/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-40">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden text-slate-400 p-2">
            <Menu size={24} />
          </button>
          
          <div className="flex-1 max-w-xl ml-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Search transactions..." 
                className="w-full bg-[#1e293b]/50 border border-white/10 rounded-full py-2 pl-10 pr-4 text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-white/5">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-slate-400">Pro Account</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 flex items-center justify-center text-white font-bold border-2 border-[#0B1120]">
                {user?.name?.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto bg-[#020617] p-4 sm:p-6 lg:p-8 relative">
          <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
