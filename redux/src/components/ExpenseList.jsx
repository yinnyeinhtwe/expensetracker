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
        amount: 0,
        type: "expense",
    });

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
        return expense.description.toLowerCase().includes(searchTerm.toLowerCase());
    })
    
    const handleAddExpense = () => {
        dispatch(addExpense(newExpense));
        setNewExpense({
        description: "",
        amount: 0,
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
            <h1 className="w-full text-2xl font-bold text-gray-800 mb-6 flex items-center justify-between gap-4">
                {/* Left Side: Title */}
                <div className="flex items-center gap-2">
                    <span>📋</span> Expense List
                </div>

                <div>
                    <input
                        placeholder="Search Transactions"
                        onChange={handleSearch}
                        className="px-4 py-2 w-[300px] border border-gray-300 rounded-lg focus:outline-none text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                    
                </div>

                {/* Right Side: Totals Group Container
                <div className="flex items-center gap-3">
                    <span className="p-2 bg-green-100 text-base md:text-lg text-green-800 rounded-lg font-semibold whitespace-nowrap">
                        Total Income: ${income}
                    </span>
                    <span className="p-2 bg-red-100 text-base md:text-lg text-red-800 rounded-lg font-semibold whitespace-nowrap">
                        Total Expense: ${expense}
                    </span>
                </div> */}
            </h1>

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-5 bg-white rounded-xl my-8">
                <div className="w-[250px] h-[100px] p-2 bg-white text-base md:text-lg text-gray-500 border border-white shadow shadow-lg rounded-lg font-semibold whitespace-nowrap">
                    Total Balance
                    <div className="text-2xl mt-3 text-blue-500 font-bold">
                        ${balance}
                    </div>
                </div>
                <div className="w-[250px] h-[100px] p-2 bg-white text-base md:text-lg text-gray-500 border border-white shadow shadow-lg rounded-lg font-semibold whitespace-nowrap">
                    Total Income
                    <div className="text-2xl mt-3 text-green-500 font-bold">
                        ${income}
                    </div>
                </div>
                <div className="w-[250px] h-[100px] p-2 bg-white text-base md:text-lg text-gray-500 border border-white shadow shadow-lg rounded-lg font-semibold whitespace-nowrap">
                    Total Expense
                    <div className="text-2xl mt-3 text-red-500 font-bold">
                        ${expense}
                    </div>
                </div>
                <div className="w-[250px] h-[100px] p-2 bg-white text-base md:text-lg text-gray-500 border border-white shadow shadow-lg rounded-lg font-semibold whitespace-nowrap">
                    Total Expense
                    <div className="text-2xl mt-3 text-red-500 font-bold">
                        ${expense}
                    </div>
                </div>
            </div>

            

            {/* Form Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <input
                type="text"
                placeholder="Description"
                onChange={(e) =>
                    setNewExpense({ ...newExpense, description: e.target.value })
                }
                value={newExpense.description}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />

                <input
                type="number"
                placeholder="Amount"
                onChange={(e) =>
                    setNewExpense({ ...newExpense, amount: Number(e.target.value) })
                }
                value={newExpense.amount}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />

                <select
                onChange={(e) =>
                    setNewExpense({ ...newExpense, type: e.target.value })
                }
                value={newExpense.type}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
                </select>
            </div>

            {/* Add Button */}
            <button
                onClick={handleAddExpense}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 shadow-sm mb-8"
            >
                Add Expense
            </button>

            {/* Expense List */} 
            <div className="space-y-3">
                {filteredExpenses.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">
                        No transactions found.
                    </div>
                ) : (
                    filteredExpenses.map((expense) => (
                    <div
                        key={expense.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-sm transition"
                    >
                        <span className="font-medium text-gray-700">
                        {expense.description}
                        </span>

                        {/* Dynamic Badge for Income vs Expense */}
                        <div className="flex items-center gap-4">
                        <span
                            className={`text-sm font-semibold px-3 py-1 rounded-full ${
                            expense.type === "income"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                        >
                            {expense.type === "income" ? "+" : "-"}${expense.amount}
                        </span>

                        <ExpenseItem key={expense.id} expense={expense} />

                        <span>
                            <button
                            onClick={() => handleDeleteExpense(expense.id)}
                            className="text-red-500 hover:text-red-700"
                            >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-trash-fill"
                                viewBox="0 0 16 16"
                            >
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                            </svg>
                            </button>
                        </span>
                        </div>
                    </div>
                )
                    
                ))}
            </div>
        </div>
    );
}
