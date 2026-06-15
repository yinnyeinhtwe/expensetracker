import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import {
    addExpense,
    deleteExpense,
    //   calculateTotalIncome,
    searchTransaction,
} from "../slices/expenseSlice";
import { ExpenseItem } from "./ExpenseItem";
import MonthlySpendingChart from './MonthlySpendingChart';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';

export function ExpenseList() {

    const dispatch = useDispatch();
    const expenses = useSelector((state) => state.expense.expenses);

    const [newExpense, setNewExpense] = useState({
        description: "",
        amount: "",
        type: "expense",
        category: "",
    });

    const [activeFilter, setActiveFilter] = useState(() => {
        const savedFilter = localStorage.getItem("activeFilter");
        return savedFilter || "all"; 
    });

//   const handleCalculateTotalIncome = () => {
//     dispatch(calculateTotalIncome());
//   };

    useEffect(() => {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }, [expenses]);


//   const income = useSelector((state) => state.expense.totalIncome);

//   useEffect(() => {
//     handleCalculateTotalIncome();
//   }, [income]);

    const income = useSelector((state) => {
        return state.expense.expenses.filter((expense) => expense.type === "income")
            .reduce((total, expense) => total + expense.amount, 0);
    })

    const expense = useSelector((state) => {
        return state.expense.expenses.filter((expense) => expense.type === "expense")
            .reduce((total, expense) => total + expense.amount, 0);
    });

    const balance = income - expense;

    const searchTerm = useSelector((state) => state.expense.searchTerm);

    const filteredExpenses = expenses.filter((expense) => {
        const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = activeFilter === "all" || expense.type === activeFilter;

        return matchesFilter && matchesSearch;

    })

    // 1. SIMPLEST WAY TO GENERATE CHART DATA
    // This will automatically adjust to show the last 6 months based on the current date
    const chartData = useMemo(() => {
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        const current = new Date();
        
        // 1. Generate the last 6 months dynamically relative to today
        const chartMap = Array.from({ length: 6 }, (_, i) => {
            const d = new Date(current.getFullYear(), current.getMonth() - (5 - i), 1);
            return {
                name: monthNames[d.getMonth()],
                monthIndex: d.getMonth(),
                year: d.getFullYear(),
                income: 0, //track income
                expense: 0 //track expense
            };
        });
        console.log('CHART MAP', chartMap)
        // 2. Process all entries into their respective buckets
        expenses.forEach(item => {
            if (item.date) {
                const expenseDate = new Date(item.date);
                const match = chartMap.find(m => m.monthIndex === expenseDate.getMonth() && m.year === expenseDate.getFullYear());
                
                if (match) {
                    // Dynamically route the addition based on type
                    if (item.type === 'expense') {
                        match.expense += Number(item.amount || 0);
                    } else if (item.type === 'income') {
                        match.income += Number(item.amount || 0);
                    }
                }
            }
        });

        // 3. Clean up the internal calendar markers before sending the array to Recharts
        return chartMap.map(({ name, expense, income }) => ({ name, expense, income }));
    }, [expenses]);
    // console.log("cadata",chartData);

    //Chart for spending amount by category
    const categoryData = useMemo(() => {
        const totalExpenseAmount = expenses
            .filter(item => item.type === "expense")
            .reduce((sum, item) => sum + Number(item.amount || 0), 0);

        const categories = {
            food: {name: "FOOD & DRINKS", amount: 0, color: "bg-blue-600", fill: "#2563eb"},
            shopping: { name: "SHOPPING", amount: 0, color: "bg-emerald-500", fill: "#10b981" },
            housing: { name: "HOUSING", amount: 0, color: "bg-orange-500", fill: "#f97316" },
            others: { name: "OTHERS", amount: 0, color: "bg-slate-400", fill: "#94a3b8" }
        }

        expenses.forEach(item => {
            if(item.type != "expense") return;

            const dropdownValue = (item.category || "").toLowerCase();

            switch(dropdownValue){
                case "food":
                    categories.food.amount += Number(item.amount || 0);
                    break;

                case "shopping":
                    categories.shopping.amount += Number(item.amount || 0);
                    break;

                case "bills":
                case "utilities":
                    categories.housing.amount += Number(item.amount || 0);
                    break;

                case "entertainment":
                case "transport":
                case "other":
                    categories.others.amount += Number(item.amount || 0);
                    break;
            }
        });

        return Object.values(categories).map((category) => {
            const percentage = totalExpenseAmount > 0 
                ? Math.round((category.amount / totalExpenseAmount) * 100)
                : 0;
            return {... category, value: percentage};
        });
    }, [expenses]);
    
    const handleAddExpense = () => {
        if (!newExpense.description || newExpense.amount === "") {
            alert("Please enter a description and amount.");
            return;
        }

        dispatch(addExpense({
            description: newExpense.description,
            amount: Number(newExpense.amount),
            type: newExpense.type,
            date: new Date().toLocaleDateString(),
            category: newExpense.category,
        }));
            setNewExpense({
            description: "",
            amount: "",
            type: "expense",
            category: "",
        });
    };

    const handleDeleteExpense = (id) => {
        dispatch(deleteExpense(id));
    };

    const handleSearch = (event) => {
        dispatch(searchTransaction(event.target.value));
    }

    function filterButton (option) {
        setActiveFilter(option);
        localStorage.setItem("activeFilter", option);
    }

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl my-8">
            {/* Title */}
            <header class="flex flex-col md:flex-row justify-between items-center mb-10 gap-4" data-purpose="header">
                <div class="flex items-center gap-3">
                    <div class="flex items-center gap-4">
                        <div class="bg-blue-700 p-2.5 rounded-xl shadow-lg shadow-blue-200">
                            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                            </svg>
                        </div>
                        <div>
                            <h1 class="text-4xl font-bold tracking-tight text-slate-800">
                            Expense <span class="text-blue-700">List</span>
                            </h1>
                            <p class="text-sm font-medium text-slate-400 uppercase tracking-widest">Financial Overview</p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-8 mt-10">
                <div className="w-full min-h-[100px] p-4 bg-white text-base md:text-lg text-gray-500 border border-gray-100 border-t-3 border-t-blue-500 shadow-lg rounded-lg font-semibold">
                    Total Balance
                    <div className="text-xl sm:text-2xl mt-2 text-blue-500 font-bold">
                    ${balance}
                    </div>
                </div>

                <div className="w-full min-h-[100px] p-4 bg-white text-base md:text-lg text-gray-500 border border-gray-100 border-t-3 border-t-green-500 shadow-lg rounded-lg font-semibold">
                    Total Income
                    <div className="text-xl sm:text-2xl mt-2 text-green-500 font-bold">
                    ${income}
                    </div>
                </div>

                <div className="w-full min-h-[100px] p-4 bg-white text-base md:text-lg text-gray-500 border border-gray-100 border-t-3 border-t-red-500 shadow-lg rounded-lg font-semibold">
                    Total Expense
                    <div className="text-xl sm:text-2xl mt-2 text-red-500 font-bold">
                    ${expense}
                    </div>
                </div>

                <div className="w-full min-h-[100px] p-4 bg-white text-base md:text-lg text-gray-500 border border-gray-100 border-t-3 border-t-red-500 shadow-lg rounded-lg font-semibold">
                    Total Expense
                    <div className="text-xl sm:text-2xl mt-2 text-red-500 font-bold">
                    ${expense}
                    </div>
                </div>
            </div>

            {/* Chart Display */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch mt-15">
            
                <MonthlySpendingChart data={chartData} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full" />

                {/* LEFT COLUMN: Category Breakdown UI (Takes 1/3 width)  */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-full">
                    <div>
                        {/* Visual Title Header Accent Block */}
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-1 h-5 bg-blue-600 rounded-full"></div>
                            <h3 className="text-lg font-bold text-gray-800">Spending by Category</h3>
                        </div> 

                        {/* Dynamic Progress Tracking Bars List Container */}
                        <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-1">
                            {categoryData.map((cat) => (
                                <div key={cat.name} className="space-y-1.5">
                                    <div className="flex justify-between text-xs font-bold tracking-wide">
                                        <span className="text-gray-500">{cat.name}</span>
                                        <span style={{ color: cat.fill }}>{cat.value}%</span>
                                    </div>
                                    {/* Background slider track track line */}
                                    <div className="w-full bg-gray-50 h-2 rounded-full overflow-hidden">
                                        {/* Colorful relative dynamic bar filler */}
                                        <div 
                                            className={`h-full rounded-full transition-all duration-500 ${cat.color}`} 
                                            style={{ width: `${cat.value}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Floating Concentric Donut Pie Section */}
                    <div className="w-full h-40 relative flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={45}
                                    outerRadius={60}
                                    paddingAngle={3}
                                    dataKey="value"
                                    fill="fill" 
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute text-center pointer-events-none">
                            <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Total</span>
                        </div>
                    </div>
                </div>
            </div>


            {
                balance < 0 && (
                    <p className="text-red-600 font-medium text-sm mt-2 animate-pulse">
                        ⚠️ Warning: Your balance is negative! You are overspending.
                    </p>
                )
            }

            {/* Form Grid */}
            <div className="max-w-7xl mx-auto bg-white rounded-xl p-6 mb-8 border border-gray-200 shadow-sm mt-10">
                <div className="flex items-center gap-2 mb-8">
                    <div className="w-1 h-5 bg-blue-600 rounded-full"></div>
                    <h3 className="text-xl font-bold text-gray-800">Add New Transaction</h3>
                </div>

                {/* Form Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 mb-6">
                    {/* Description Field Group */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-lg font-semibold text-gray-500 mb-2">Description</label>
                        <input
                            type="text"
                            placeholder="e.g., Grocery Shopping"
                            onChange={(e) =>
                                setNewExpense({ ...newExpense, description: e.target.value })
                            }
                            value={newExpense.description}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                        />
                    </div>

                    {/* Amount Field Group */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-lg font-semibold text-gray-500 mb-2">Amount</label>
                        <input
                            type="number"
                            placeholder="0.00"
                            onChange={(e) =>
                                setNewExpense({ ...newExpense, amount: e.target.value })
                            }
                            value={newExpense.amount}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                    </div>

                    {/* Type Field Group */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-lg font-semibold text-gray-500 mb-2">Type</label>
                        <select
                            onChange={(e) =>
                                setNewExpense({ ...newExpense, type: e.target.value })
                            }
                            value={newExpense.type}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                        >
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </div>

                    {/* Category Field Group */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-lg font-semibold text-gray-500 mb-2">Category</label>
                        <select
                            onChange={(e) =>
                                setNewExpense({ ...newExpense, category: e.target.value })
                            }
                            value={newExpense.category}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                        >
                            <option value="" disabled>Select Category</option>
                            <option value="food">Food</option>
                            <option value="bills">Bills</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="salary">Salary</option>
                            <option value="shopping">Shopping</option>
                            <option value="transport">Transport</option>
                            <option value="utilities">Utilities</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>


                {/* Add Button */}
                <button
                    onClick={handleAddExpense}
                    className="w-[200px] ml-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-2 rounded-full transition duration-200 shadow-sm mb-4 flex items-center justify-center gap-2"
                >
                    + Add Transaction
                </button>
            </div>
            

            {/* Expense List Table */} 
            <div className="flex items-center gap-2 text-2xl font-bold text-gray-800 mb-6 mt-15">
                Recent Transactions
                <input
                    placeholder="Search Transactions"
                    onChange={handleSearch}
                    className="px-4 py-2 w-[300px] ml-auto border border-gray-300 rounded-lg focus:outline-none text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => filterButton("all")}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition ${
                        activeFilter === "all"
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                    All
                </button>
                
                <button
                    onClick={() => filterButton("income")}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition ${
                        activeFilter === "income"
                            ? "bg-green-600 text-white shadow-sm"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                    Income
                </button>
                
                <button
                    onClick={() => filterButton("expense")}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition ${
                        activeFilter === "expense"
                            ? "bg-red-600 text-white shadow-sm"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                    Expense
                </button>
            </div>


            {/* 1. Parent Wrapper Layout Grid */}    
            <div className="lg:col-span-2 overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                {filteredExpenses.length === 0 ? (
                    <div className="text-center text-gray-500 py-10 bg-gray-50">
                        No transactions found.
                    </div>
                ) : (
                    <table className="w-full text-left border-collapse bg-white text-sm text-gray-500">
                        {/* Table Header */}
                        <thead className="bg-gray-100 text-sm font-semibold uppercase text-blue-700">
                            <tr>
                                <th scope="col" className="px-6 py-4">Date</th>
                                <th scope="col" className="px-6 py-4">Description</th>
                                <th scope="col" className="px-6 py-4">Category</th>
                                <th scope="col" className="px-6 py-4">Type</th>
                                <th scope="col" className="px-6 py-4">Amount</th>
                                <th scope="col" className="px-6 py-4 text-center">Action</th>
                            </tr>
                        </thead>
                        
                        {/* Table Body */}
                        <tbody className="divide-y divide-gray-200 border-t border-gray-200">
                            {filteredExpenses.map((expense) => (
                                <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
                                    {/* 1. Date */}
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-600">
                                        {(() => {
                                            if (!expense.date) return "N/A";
                                            const dateObj = new Date(expense.date);
                                            return dateObj.toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            });
                                        })()}
                                    </td>

                                    {/* 2. Description */}
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {expense.description}
                                    </td>

                                    {/* 3. Category */}
                                    <td className="px-6 py-4 font-medium text-gray-900 capitalize">
                                        {expense.category}
                                    </td>

                                    {/* 4. Type Badge */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                                                expense.type === "income"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {expense.type}
                                        </span>
                                    </td>

                                    {/* 5. Amount */}
                                    <td className={`px-6 py-4 whitespace-nowrap font-semibold ${
                                        expense.type === "income" ? "text-green-600" : "text-red-600"
                                    }`}>
                                        {expense.type === "income" ? "+" : "-"}${expense.amount}
                                    </td>

                                    {/* 6. Action */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center justify-center gap-4">
                                            <ExpenseItem expense={expense} />
                                            <button
                                                onClick={() => handleDeleteExpense(expense.id)}
                                                className="text-red-500 p-1 rounded transition"
                                                title="Delete Transaction"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    fill="currentColor"
                                                    className="bi bi-trash-fill"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

        </div>
    );
}
