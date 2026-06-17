import { useState } from "react";
import { useDispatch } from "react-redux";
import { editExpense } from "../slices/expenseSlice";

export function ExpenseItem({ expense }) {
    const [isEdit, setIsEdit] = useState(false);
    const [newName, setNewName] = useState(expense.description);
    const [newAmount, setNewAmount] = useState(expense.amount);
    const [newType, setNewType] = useState(expense.type);
    const [newCategory, setNewCategory] = useState(expense.category);

    const dispatch = useDispatch();

    const handleEditExpense = (id) => {
        dispatch(editExpense({id, description: newName, amount: newAmount, type: newType, category: newCategory}));
        setIsEdit(false);
    };

    return (
        <span>
            {isEdit && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
                    {/* Modal Box */}
                    <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-gray-100 p-6 relative animate-in fade-in zoom-in-95 duration-150">
                        
                        {/* Header */}
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            Edit Transaction
                        </h3>
                        
                        {/* Form Stack */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Description</label>
                                <input
                                    type="text"
                                    onChange={(e) => setNewName(e.target.value)}
                                    value={newName}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-800"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Amount</label>
                                <input
                                    type="number"
                                    onChange={(e) => setNewAmount(Number(e.target.value))}
                                    value={newAmount}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-800"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Type</label>
                                <select
                                    onChange={(e) => setNewType(e.target.value)}
                                    value={newType}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-800"
                                >
                                    <option value="expense">Expense</option>
                                    <option value="income">Income</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Type</label>
                                <select
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    value={newCategory}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-800"
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

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end gap-2 mt-6">
                            <button
                                onClick={() => setIsEdit(false)} // Closes modal safely
                                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition cursor-pointer"
                            >
                                Cancel
                            </button>
                            
                            <button
                                onClick={() => handleEditExpense(expense.id)}
                                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg transition shadow-sm cursor-pointer"
                            >
                                Save Changes
                            </button>
                        </div>

                    </div>
                </div>
            )}

            <button onClick={() => setIsEdit(true)} className="text-black hover:text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                </svg>
            </button>
        </span>
    );
}