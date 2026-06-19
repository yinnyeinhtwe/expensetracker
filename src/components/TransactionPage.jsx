import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import { ExpenseItem } from "./ExpenseItem";
import TransactionList from "./TransactionList";

import {
  addExpense,
  searchTransaction,
  deleteExpense,
} from "./../slices/expenseSlice";

export default function TransactionPage() {
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

  const searchTerm = useSelector((state) => state.expense.searchTerm);

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase()); //type something if this something matches keep it(True), if not throw it(False)

    const matchesFilter =
      activeFilter === "all" || expense.type === activeFilter; //if filter is "all", look every transaction. if filter is "income", look only income transaction. same for "expense"

    return matchesFilter && matchesSearch; //filter button is income and the searching transaction name must be income transaction to show transaction, one of them is false the transaction would not occur on the screen.
  });

  // Pagination Field
  //How many items you want per page
  const ITEMS_PER_PAGE = 5;

  //Track the active page
  const [currentPage, setCurrentPage] = useState(1);

  //Reset to page 1 automatically if the user types a new search or switches filter tabs
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeFilter]);

  //Calculate total number of pages
  const totalPages = Math.ceil(filteredExpenses.length / ITEMS_PER_PAGE);
    
  const getPageNumbers = (current, total) => {
    const pages = [];

    // If total pages is small, just show all numbers
    if (total <= 5) {
      for (let i = 1; i <= total; i++) pages.push(i);
      return pages;
    }

    // Always include page 1, 2, 3
    if (current <= 3) {
      pages.push(1, 2, 3, "...", total);
    }
    // Handle middle pages
    else if (current > 3 && current < total - 2) {
      pages.push(1, "...", current, "...", total);
    }
    // Handle end pages
    else {
      pages.push(1, "...", total - 2, total - 1, total);
    }

    return pages;
  };

  const paginatedExpenses = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredExpenses.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredExpenses, currentPage]);

  const handleAddExpense = () => {
    if (!newExpense.description || newExpense.amount === "") {
      alert("Please enter a description and amount.");
      return;
    }

    dispatch(
      addExpense({
        description: newExpense.description,
        amount: Number(newExpense.amount),
        type: newExpense.type,
        date: new Date().toLocaleDateString(),
        category: newExpense.category,
      }),
    );
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
  };

  function filterButton(option) {
    setActiveFilter(option);
    localStorage.setItem("activeFilter", option);
  }

  return (
    <div className="max-w-6xl">
      <header
        class="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
        data-purpose="header"
      >
        <div class="flex items-center gap-3">
          <h1 class="text-4xl font-bold tracking-tight text-slate-800">
            Transaction<span class="text-blue-700"> Management</span>
            <p class="mt-1 text-sm font-medium text-slate-400 uppercase tracking-widest">
              Monitor and manage all financial movements across your accounts.
            </p>
          </h1>
        </div>
      </header>
      {/* Form Grid */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl p-6 mb-8 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-1 h-5 bg-blue-600 rounded-full"></div>
          <h3 className="text-xl font-bold text-gray-800">
            Add New Transaction
          </h3>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 mb-6">
          {/* Description Field Group */}
          <div className="flex flex-col gap-1.5">
            <label className="text-lg font-semibold text-gray-500 mb-2">
              Description
            </label>
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
            <label className="text-lg font-semibold text-gray-500 mb-2">
              Amount
            </label>
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
            <label className="text-lg font-semibold text-gray-500 mb-2">
              Type
            </label>
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
            <label className="text-lg font-semibold text-gray-500 mb-2">
              Category
            </label>
            <select
              onChange={(e) =>
                setNewExpense({ ...newExpense, category: e.target.value })
              }
              value={newExpense.category}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
            >
              <option value="" disabled>
                Select Category
              </option>
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
      <div className="lg:col-span-2 flex flex-col justify-between">
        {/* The Table Container */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
          {filteredExpenses.length === 0 ? (
            <div className="text-center text-gray-500 py-10 bg-gray-50">
              No transactions found.
            </div>
          ) : (
            <div className="flex flex-col justify-between h-full">
              <table className="w-full text-left border-collapse text-sm text-gray-500">
                <thead className="bg-gray-100 text-sm font-semibold uppercase text-blue-700">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      No.
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-4 text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 border-t border-gray-200 bg-white">
                  {/* 💡 Loop through paginatedExpenses instead of filteredExpenses */}
                  {paginatedExpenses.map((expense) => (
                    <tr
                      key={expense.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-600">
                        {expense.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-600">
                        {expense.date
                          ? new Date(expense.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {expense.description}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 capitalize">
                        {expense.category}
                      </td>
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
                      <td
                        className={`px-6 py-4 whitespace-nowrap font-semibold ${
                          expense.type === "income"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {expense.type === "income" ? "+" : "-"}${expense.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-4">
                          <ExpenseItem expense={expense} />
                          <button
                            onClick={() => handleDeleteExpense(expense.id)}
                            className="text-red-500 p-1 rounded transition"
                          >
                            <svg
                              xmlns="http://w3.org"
                              width="18"
                              height="18"
                              fill="currentColor"
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
            </div>
          )}
        </div>

        {/* NEW PAGINATION TOOLBAR CONTROLS ROW */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-100 bg-white px-6 py-4 rounded-xl mt-4 shadow-sm border">
            {/* LEFT SIDE: Dynamic range information text string */}
            <div className="text-sm font-semibold text-gray-600">
              Showing{" "}
              <span className="text-gray-800">
                {(currentPage - 1) * ITEMS_PER_PAGE + 1}
              </span>{" "}
              to{" "}
              <span className="text-gray-800">
                {Math.min(
                  currentPage * ITEMS_PER_PAGE,
                  filteredExpenses.length,
                )}
              </span>{" "}
              of{" "}
              <span className="text-gray-800">{filteredExpenses.length}</span>{" "}
              results
            </div>

            {/* RIGHT SIDE: Arrow and numbered page controls group */}
            <div className="flex items-center gap-1">
              {/* Left Arrow Button */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition"
              >
                <svg
                  xmlns="http://w3.org"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                  />
                </svg>
              </button>

              {/* Rendered Page Numbers & Ellipsis */}
              {getPageNumbers(currentPage, totalPages).map((page, index) => {
                if (page === "...") {
                  return (
                    <span
                      key={`ellipsis-${index}`}
                      className="px-3 py-1 text-sm font-semibold text-gray-400 select-none"
                    >
                      ...
                    </span>
                  );
                }

                return (
                  <button
                    key={`page-${page}`}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 flex items-center justify-center text-sm font-bold rounded-lg transition ${
                      currentPage === page
                        ? "bg-blue-600 text-white shadow-sm" // Matching active blue style
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              {/* Right Arrow Button */}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition"
              >
                <svg
                  xmlns="http://w3.org"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
