import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addExpense } from "../slices/expenseSlice";

export function ExpenseList() {
    const [newExpense, setNewExpense] = useState({
        description: "",
        amount: 0,
        type: "expense",
    });

    const expenses = useSelector((state) => state.expense.expenses);
    
    useEffect(() => {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }, [expenses]);

    const dispatch = useDispatch();

    const handleAddExpense = () => {
        dispatch(addExpense(newExpense));
        setNewExpense({
            description: "",
            amount: 0,
            type: "expense",
        });
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100 my-8">
            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span>📋</span> Expense List
            </h1>

            {/* Form Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <input
                type="text"
                placeholder="Description"
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                value={newExpense.description}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                
                <input
                type="number"
                placeholder="Amount"
                onChange={(e) => setNewExpense({ ...newExpense, amount: Number(e.target.value) })}
                value={newExpense.amount}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />

                <select
                onChange={(e) => setNewExpense({ ...newExpense, type: e.target.value })}
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
                {expenses.map((expense) => (
                <div
                    key={expense.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-sm transition"
                >
                    <span className="font-medium text-gray-700">{expense.description}</span>
                    
                    {/* Dynamic Badge for Income vs Expense */}
                    <span
                    className={`text-sm font-semibold px-3 py-1 rounded-full ${
                        expense.type === "income"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                    >
                    {expense.type === "income" ? "+" : "-"}${expense.amount}
                    </span>
                </div>
                ))}
            </div>
        </div>
     ); 
}