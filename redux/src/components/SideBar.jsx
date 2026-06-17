import { NavLink } from "react-router-dom";

export default function SideBar({ children }) {
    return (
        <div className="flex h-screen w-screen bg-white overflow-hidden font-sans">
            
            <aside className="w-64 h-full bg-white border-r border-gray-200 flex flex-col justify-between p-6 shrink-0 z-20">
                <div>
                    {/* App Branding Title Logo Section */}
                    <div className="flex items-center gap-3 mb-8 px-2">
                        <div className="bg-blue-700 p-2.5 rounded-xl shadow-lg shadow-blue-200">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                            </svg>
                        </div>
                        <span className="font-black text-3xl tracking-tight text-gray-800">
                            FinTrack
                        </span>
                    </div>

                    {/* Navigation Menu Link Rows List Layout */}
                    <nav className="space-y-1">
                        
                        {/* 💡 Dashboard Link (Dynamic Active State) */}
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition ${
                                isActive 
                                    ? "bg-blue-50 text-blue-600 shadow-sm/5" 
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                        >
                            {/* SVG stroke code scales dynamically with the text color */}
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 12C13 11.4477 13.4477 11 14 11H19C19.5523 11 20 11.4477 20 12V19C20 19.5523 19.5523 20 19 20H14C13.4477 20 13 19.5523 13 19V12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path> 
                                <path d="M4 5C4 4.44772 4.44772 4 5 4H9C9.55228 4 10 4.44772 10 5V12C10 12.5523 9.55228 13 9 13H5C4.44772 13 4 12.5523 4 12V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path> 
                                <path d="M4 17C4 16.4477 4.44772 16 5 16H9C9.55228 16 10 16.4477 10 17V19C10 19.5523 9.55228 20 9 20H5C4.44772 20 4 19.5523 4 19V17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path> 
                                <path d="M13 5C13 4.44772 13.4477 4 14 4H19C19.5523 4 20 4.44772 20 5V7C20 7.55228 19.5523 8 19 8H14C13.4477 8 13 7.55228 13 7V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path> 
                            </svg>
                            Dashboard
                        </NavLink>

                        {/* 💡 Transactions Link (Dynamic Active State) */}
                        <NavLink 
                            to="/transactions" 
                            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition ${
                                isActive 
                                    ? "bg-blue-50 text-blue-600 shadow-sm/5" 
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 4h14v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2zm2 2h10v8H3z"/>
                            </svg>
                            Transactions
                        </NavLink>

                        {/* 💡 Analytics Link (Dynamic Active State) */}
                        <NavLink 
                            to="/analytics" 
                            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition ${
                                isActive 
                                    ? "bg-blue-50 text-blue-600 shadow-sm/5" 
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M4 11H2v3h2zm5-4H7v7h2zm5-5v12h-2V2z"/>
                            </svg>
                            Analytics
                        </NavLink>
                    </nav>
                </div>

                {/* Bottom Profile Account Section Card footer */}
                <div className="border-t border-gray-100 pt-4 flex items-center gap-3 px-2">
                    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-sm shadow-inner uppercase">
                        JD
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-800 tracking-tight leading-none mb-0.5">John Doe</span>
                        <span className="text-xs text-gray-400 font-medium leading-none">Standard User</span>
                    </div>
                </div>
            </aside>

            {/* 3. INDEPENDENT MAIN BODY SECTION */}
            <main className="flex-1 h-full overflow-y-auto p-8 lg:pt-6 ">
                {children}
            </main>

        </div>
    );
}
