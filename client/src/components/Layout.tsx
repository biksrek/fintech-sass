import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  LogOut,
  Bell,
  User,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col">
      {/* Top Header */}
      <header className="h-16 bg-[#0B1120]/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-40 sticky top-0">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center mr-3">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="text-xl font-bold text-white">FinTech</span>
          </div>

          {/* Horizontal Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                isActive("/")
                  ? "text-white bg-white/5"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <LayoutDashboard
                size={18}
                className={isActive("/") ? "text-blue-500" : ""}
              />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/transactions"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                isActive("/transactions")
                  ? "text-white bg-white/5"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Wallet
                size={18}
                className={isActive("/transactions") ? "text-blue-500" : ""}
              />
              <span>Transactions</span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 pl-4 border-l border-white/5 focus:outline-none"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-slate-400">Pro Account</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 flex items-center justify-center text-white font-bold border-2 border-[#0B1120]">
                {user?.name?.charAt(0)}
              </div>
              <ChevronDown
                size={14}
                className={`text-slate-400 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-[#1e293b] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden"
                  >
                    <div className="p-2 space-y-1">
                      <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                        <User size={16} />
                        <span>Profile</span>
                      </button>
                      <div className="h-px bg-white/10 my-1" />
                      <button
                        onClick={logout}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#020617] p-4 sm:p-6 lg:p-8 relative">
        <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto space-y-8 h-full flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
