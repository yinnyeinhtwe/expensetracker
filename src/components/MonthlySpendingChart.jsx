import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function MonthlySpendingChart({ data }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm w-full mb-6">
            {/* Dynamic Card Header layout */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-5 bg-blue-600 rounded-full"></div>
                    <h3 className="text-lg font-bold text-gray-800">Cash Flow Trends</h3>
                </div>
                <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full uppercase">Last 6 Months</span>
            </div>

            <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                        <defs>
                            {/* Blue Gradient - Expenses */}
                            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0}/>
                            </linearGradient>
                            {/* Green Gradient - Income */}
                            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#16a34a" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#16a34a" stopOpacity={0.0}/>
                            </linearGradient>
                        </defs>
                        
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} padding={{ left: 15, right: 15 }} tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 600 }} dy={10} />
                        <YAxis hide={true} />
                        
                        {/* Custom formatted hover box */}
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px' }} 
                            formatter={(val, name) => [`$${val.toLocaleString()}`, name === 'income' ? 'Income' : 'Expense']} 
                        />
                        
                        {/* Adds small clickable labels showing which line color belongs to what type */}
                        <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 500 }} />

                        {/* LINE 1: Income (Green) */}
                        <Area 
                            type="monotone" 
                            dataKey="income" 
                            name="income"
                            stroke="#16a34a" 
                            strokeWidth={3} 
                            fillOpacity={1} 
                            fill="url(#incomeGradient)" 
                            dot={{ stroke: '#16a34a', strokeWidth: 2, fill: '#fff', r: 4 }} 
                        />

                        {/* LINE 2: Expense (Blue) */}
                        <Area 
                            type="monotone" 
                            dataKey="expense" 
                            name="expense"
                            stroke="#2563eb" 
                            strokeWidth={3} 
                            fillOpacity={1} 
                            fill="url(#expenseGradient)" 
                            dot={{ stroke: '#2563eb', strokeWidth: 2, fill: '#fff', r: 4 }} 
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
