import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ExpenseItem } from "./ExpenseItem";
import { deleteExpense } from "../slices/expenseSlice";

export default function TransactionList () {
     const expenses = useSelector((state) => state.expense.expenses);
     const dispatch = useDispatch();

     const recentTransaction = useMemo(() => {
     const fortyEightHourAgo = new Date();
     fortyEightHourAgo.setHours(fortyEightHourAgo.getHours() - 72);
     console.log('48',fortyEightHourAgo);

     return expenses.filter((expense) => {
          if (!expense.date) return false;

          const expenseDate = new Date(expense.date);
          // console.log('expenseDate', expenseDate);
          const final = expenseDate >= fortyEightHourAgo;
          // console.log('final', final);
          return final;
     });
     }, [expenses]);

     // Pagination Field
       //How many items you want per page
       const ITEMS_PER_PAGE = 5;
     
       //Track the active page
       const [currentPage, setCurrentPage] = useState(1);
     
       //Calculate total number of pages
       const totalPages = Math.ceil(recentTransaction.length / ITEMS_PER_PAGE);
     
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
         return recentTransaction.slice(startIndex, startIndex + ITEMS_PER_PAGE);
       }, [recentTransaction, currentPage]);

       const handleDeleteExpense = (id) => {
           dispatch(deleteExpense(id));
         };

     return(
                <div className="lg:col-span-2 flex flex-col justify-between">
                  {/* The Table Container */}
                  <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
                    {recentTransaction.length === 0 ? (
                      <div className="text-center text-gray-500 py-10 bg-gray-50">
                        No recent transactions.
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
                            recentTransaction.length,
                          )}
                        </span>{" "}
                        of{" "}
                        <span className="text-gray-800">{recentTransaction.length}</span>{" "}
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
     );
}