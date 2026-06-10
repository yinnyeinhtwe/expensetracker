import { useState } from "react";
import { useDispatch } from "react-redux";
import { editExpense } from "../slices/expenseSlice";

export function ExpenseItem({ expense }) {
    const [isEdit, setIsEdit] = useState(false);
    const [newName, setNewName] = useState(expense.description);
    const [newAmount, setNewAmount] = useState(expense.amount);
    const [newType, setNewType] = useState(expense.type);

    const dispatch = useDispatch();

    const handleEditExpense = (id) => {
        dispatch(editExpense({id, description: newName, amount: newAmount, type: newType}));
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
                            ✏️ Edit Transaction
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
                                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition shadow-sm cursor-pointer"
                            >
                                Save Changes
                            </button>
                        </div>

                    </div>
                </div>
            )}

            <button onClick={() => setIsEdit(true)} className="text-black hover:text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                </svg>
            </button>
        </span>
    );
}