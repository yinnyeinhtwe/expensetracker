import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
    addExpense,
    deleteExpense,
    //   calculateTotalIncome,
    searchTransaction,
} from "../slices/expenseSlice";
import { ExpenseItem } from "./ExpenseItem";

    export function ExpenseList() {
    const [newExpense, setNewExpense] = useState({
        description: "",
        amount: "",
        type: "expense",
    });

    const [activeFilter, setActiveFilter] = useState("all");

    const dispatch = useDispatch();
    const expenses = useSelector((state) => state.expense.expenses);

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
        }));
            setNewExpense({
            description: "",
            amount: "",
            type: "expense",
        });
    };

    const handleDeleteExpense = (id) => {
        dispatch(deleteExpense(id));
    };

    const handleSearch = (event) => {
        dispatch(searchTransaction(event.target.value));
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

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-5 bg-white rounded-xl my-8 mt-10">
                <div className="w-[250px] h-[100px] p-4 bg-white text-base md:text-lg text-gray-500 border border-gray-100 shadow shadow-lg rounded-lg font-semibold whitespace-nowrap">
                    Total Balance
                    <div className="text-2xl mt-2 text-blue-500 font-bold">
                        ${balance}
                    </div>
                </div>
                <div className="w-[250px] h-[100px] p-4 bg-white text-base md:text-lg text-gray-500 border border-gray-100 shadow shadow-lg rounded-lg font-semibold whitespace-nowrap">
                    Total Income
                    <div className="text-2xl mt-2 text-green-500 font-bold">
                        ${income}
                    </div>
                </div>
                <div className="w-[250px] h-[100px] p-4 bg-white text-base md:text-lg text-gray-500 border border-gray-100 shadow shadow-lg rounded-lg font-semibold whitespace-nowrap">
                    Total Expense
                    <div className="text-2xl mt-2 text-red-500 font-bold">
                        ${expense}
                    </div>
                </div>
                <div className="w-[250px] h-[100px] p-4 bg-white text-base md:text-lg text-gray-500 border border-gray-100 shadow shadow-lg rounded-lg font-semibold whitespace-nowrap">
                    Total Expense
                    <div className="text-2xl mt-2 text-red-500 font-bold">
                        ${expense}
                    </div>
                </div>
            </div>

            

            {/* Form Grid */}
            <div className="max-w-7xl mx-auto bg-white rounded-xl p-6 mb-8 border border-gray-200 shadow-sm mt-15">
                <div className="text-2xl font-bold text-gray-800 mb-6">
                    Add New Transaction
                </div>

                {/* Form Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
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
                    onClick={() => setActiveFilter("all")}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition ${
                        activeFilter === "all"
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                    All
                </button>
                
                <button
                    onClick={() => setActiveFilter("income")}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition ${
                        activeFilter === "income"
                            ? "bg-green-600 text-white shadow-sm"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                    Income
                </button>
                
                <button
                    onClick={() => setActiveFilter("expense")}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition ${
                        activeFilter === "expense"
                            ? "bg-red-600 text-white shadow-sm"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                    Expense
                </button>
            </div>


            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
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
                                <th scope="col" className="px-6 py-4">Type</th>
                                <th scope="col" className="px-6 py-4">Amount</th>
                                <th scope="col" className="px-6 py-4 text-center">Action</th>
                            </tr>
                        </thead>
                        
                        {/* Table Body */}
                        <tbody className="divide-y divide-gray-200 border-t border-gray-200">
                            {filteredExpenses.map((expense) => (
                                <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
                                    {/* 1. Date (Uses a fallback if date doesn't exist yet) */}
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-600">
                                        {expense.date || new Date().toLocaleDateString()}
                                    </td>

                                    {/* 2. Description */}
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {expense.description}
                                    </td>

                                    {/* 3. Type (Income vs Expense Badge) */}
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

                                    {/* 4. Amount */}
                                    <td className={`px-6 py-4 whitespace-nowrap font-semibold ${
                                        expense.type === "income" ? "text-green-600" : "text-red-600"
                                    }`}>
                                        {expense.type === "income" ? "+" : "-"}${expense.amount}
                                    </td>

                                    {/* 5. Action (Edit & Delete Buttons aligned horizontally) */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center justify-center gap-4">
                                            {/* Edit Button Container */}
                                            <ExpenseItem expense={expense} />

                                            {/* Delete Button */}
                                            <button
                                                onClick={() => handleDeleteExpense(expense.id)}
                                                className="text-red-500 p-1 rounded  transition"
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
