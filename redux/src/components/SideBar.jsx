import { useState } from "react";
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
                            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M12 12C12 11.4477 12.4477 11 13 11H19C19.5523 11 20 11.4477 20 12V19C20 19.5523 19.5523 20 19 20H13C12.4477 20 12 19.5523 12 19V12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path> 
                                    <path d="M4 5C4 4.44772 4.44772 4 5 4H8C8.55228 4 9 4.44772 9 5V19C9 19.5523 8.55228 20 8 20H5C4.44772 20 4 19.5523 4 19V5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path> 
                                    <path d="M12 5C12 4.44772 12.4477 4 13 4H19C19.5523 4 20 4.44772 20 5V7C20 7.55228 19.5523 8 19 8H13C12.4477 8 12 7.55228 12 7V5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path> 
                                </g>
                            </svg>
                            Dashboard
                        </NavLink>

                        <NavLink 
                            to="/transactions" 
                            onClick={() => setIsMobileOpen(false)}
                            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition ${
                                isActive ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                        >
                            <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier"> 
                                <path d="M17.0020048,13 C17.5542895,13 18.0020048,13.4477153 18.0020048,14 C18.0020048,14.5128358 17.6159646,14.9355072 17.1186259,14.9932723 L17.0020048,15 L5.41700475,15 L8.70911154,18.2928932 C9.0695955,18.6533772 9.09732503,19.2206082 8.79230014,19.6128994 L8.70911154,19.7071068 C8.34862757,20.0675907 7.78139652,20.0953203 7.38910531,19.7902954 L7.29489797,19.7071068 L2.29489797,14.7071068 C1.69232289,14.1045317 2.07433707,13.0928192 2.88837381,13.0059833 L3.00200475,13 L17.0020048,13 Z M16.6128994,4.20970461 L16.7071068,4.29289322 L21.7071068,9.29289322 C22.3096819,9.8954683 21.9276677,10.9071808 21.1136309,10.9940167 L21,11 L7,11 C6.44771525,11 6,10.5522847 6,10 C6,9.48716416 6.38604019,9.06449284 6.88337887,9.00672773 L7,9 L18.585,9 L15.2928932,5.70710678 C14.9324093,5.34662282 14.9046797,4.77939176 15.2097046,4.38710056 L15.2928932,4.29289322 C15.6533772,3.93240926 16.2206082,3.90467972 16.6128994,4.20970461 Z"></path> 
                                </g>
                            </svg>
                            Transactions
                        </NavLink>

                        <NavLink 
                            to="/analytics" 
                            onClick={() => setIsMobileOpen(false)}
                            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition ${
                                isActive ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                        >
                            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier"> <path d="M3 3V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M21 21H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> 
                                <path d="M7 16L12.25 10.75L15.75 14.25L21 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> 
                                </g>
                            </svg>
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
