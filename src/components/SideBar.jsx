import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function SideBar({ children }) {
    // State to handle opening and closing the sidebar drawer on mobile
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <div className="flex h-screen w-screen bg-white overflow-hidden font-sans relative">
            {/* 1. MOBILE HEADER BAR (Only visible on screens smaller than lg) */}
            <header className="lg:hidden fixed top-0 left-0 w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-30">
                <span className="font-black text-2xl tracking-tight text-gray-800">FinTrack</span>
                
                {/* Hamburger Toggle Button */}
                <button 
                    onClick={() => setIsMobileOpen(true)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </header>

            {/* ========================================================= */}
            {/* 2. MOBILE BACKGROUND OVERLAY (Darkens screen when menu is open) */}
            {/* ========================================================= */}
            {isMobileOpen && (
                <div 
                    onClick={() => setIsMobileOpen(false)}
                    className="lg:hidden fixed inset-0 bg-black/40 z-40 transition-opacity"
                />
            )}

            {/* ========================================================= */}
            {/* 3. SIDEBAR CONTAINER (Responsive sliding mechanics)       */}
            {/* ========================================================= */}
            <aside className={`
                fixed top-0 bottom-0 left-0 z-50 lg:z-20 w-64 h-full bg-white border-r border-gray-200 flex flex-col justify-between p-6 shrink-0 transition-transform duration-300 ease-in-out
                ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} 
                lg:static lg:translate-x-0
            `}>
                <div>
                    {/* Sidebar Brand Header & Mobile Close Button */}
                    <div className="flex items-center justify-between mb-8 px-2">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-700 p-2.5 rounded-xl shadow-lg shadow-blue-200">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                                </svg>
                            </div>
                            <span className="font-black text-3xl tracking-tight text-gray-800">FinTrack</span>
                        </div>

                        {/* Close button - Only visible on mobile drawer layouts */}
                        <button 
                            onClick={() => setIsMobileOpen(false)}
                            className="lg:hidden p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="space-y-1">
                        <NavLink 
                            to="/" 
                            onClick={() => setIsMobileOpen(false)} // Auto-closes mobile drawer on click
                            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition ${
                                isActive ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                        >
                            Dashboard
                        </NavLink>

                        <NavLink 
                            to="/transactions" 
                            onClick={() => setIsMobileOpen(false)}
                            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition ${
                                isActive ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                        >
                            Transactions
                        </NavLink>

                        <NavLink 
                            to="/analytics" 
                            onClick={() => setIsMobileOpen(false)}
                            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition ${
                                isActive ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                        >
                            Analytics
                        </NavLink>
                    </nav>
                </div>

                {/* Profile Card Footer */}
                <div className="border-t border-gray-100 pt-4 flex items-center gap-3 px-2">
                    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-sm uppercase">JD</div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-800 tracking-tight leading-none mb-0.5">John Doe</span>
                        <span className="text-xs text-gray-400 font-medium leading-none">Standard User</span>
                    </div>
                </div>
            </aside>

            {/* ========================================================= */}
            {/* 4. INDEPENDENT MAIN BODY SECTION (Adjusted for mobile topbar) */}
            {/* ========================================================= */}
            <main className="flex-1 h-full overflow-y-auto p-6 lg:p-12 pt-24 lg:pt-12">
                {children}
            </main>

        </div>
    );
}
