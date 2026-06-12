import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function MonthlySpendingChart({ data }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm w-full mb-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-5 bg-blue-600 rounded-full"></div>
                    <h3 className="text-lg font-bold text-gray-800">Monthly Spending Trends</h3>
                </div>
                <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full uppercase">Last 6 Months</span>
            </div>

            <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                        <defs>
                            <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 600 }} dy={10} padding={{ left: 15, right: 15 }} />
                        <YAxis hide={true} />
                        <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px' }} formatter={(val) => [`$${val}`, 'Spent']} />
                        <Area type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#spendingGradient)" dot={{ stroke: '#2563eb', strokeWidth: 3, fill: '#fff', r: 5 }} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
