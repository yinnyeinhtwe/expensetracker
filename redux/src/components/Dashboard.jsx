import { useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { selectTotalBalance, selectTotalExpense, selectTotalIncome, selectTotalSaving } from "../slices/expenseSlice";
import MonthlySpendingChart from "./MonthlySpendingChart";
import TransactionList from "./TransactionList";
import { PieChart, Pie, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const expenses = useSelector((state) => state.expense.expenses);

//   const handleCalculateTotalIncome = () => {
//     dispatch(calculateTotalIncome());
//   };

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const income = useSelector(selectTotalIncome);

  const expense = useSelector(selectTotalExpense);
  
  const balance = useSelector(selectTotalBalance);

  const savingRate = useSelector(selectTotalSaving);

//   const recentTransaction = useMemo(() => {
//     const fortyEightHourAgo = new Date();
//     fortyEightHourAgo.setHours(fortyEightHourAgo.getHours() - 72);
//     console.log('48',fortyEightHourAgo);

//     return expenses.filter((expense) => {
//       if (!expense.date) return false;

//       const expenseDate = new Date(expense.date);
//       // console.log('expenseDate', expenseDate);
//       const final = expenseDate >= fortyEightHourAgo;
//       // console.log('final', final);
//       return final;
//     });
//   }, [expenses]);

  // 1. SIMPLEST WAY TO GENERATE CHART DATA
  // This will automatically adjust to show the last 6 months based on the current date
  
  const chartData = useMemo(() => {
    const monthNames = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const current = new Date();

    // 1. Generate the last 6 months dynamically relative to today
    const chartMap = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(
        current.getFullYear(),
        current.getMonth() - (5 - i),
        1,
      );
      return {
        name: monthNames[d.getMonth()],
        monthIndex: d.getMonth(),
        year: d.getFullYear(),
        income: 0, //track income
        expense: 0, //track expense
      };
    });
    console.log("CHART MAP", chartMap);
    // 2. Process all entries into their respective buckets
    expenses.forEach((item) => {
      if (item.date) {
        const expenseDate = new Date(item.date);
        const match = chartMap.find(
          (m) =>
            m.monthIndex === expenseDate.getMonth() &&
            m.year === expenseDate.getFullYear(),
        );

        if (match) {
          // Dynamically route the addition based on type
          if (item.type === "expense") {
            match.expense += Number(item.amount || 0);
          } else if (item.type === "income") {
            match.income += Number(item.amount || 0);
          }
        }
      }
    });

    // 3. Clean up the internal calendar markers before sending the array to Recharts
    return chartMap.map(({ name, expense, income }) => ({
      name,
      expense,
      income,
    }));
  }, [expenses]);
  // console.log("cadata",chartData);

  //Chart for spending amount by category
  const categoryData = useMemo(() => {
    // 1. Calculate absolute total of all expenses
    const totalExpenseAmount = expenses
      .filter((item) => item.type === "expense")
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);

    // 2. Define a clean color palette map for your options
    const colorMap = {
      food: { color: "bg-blue-600", fill: "#2563eb" },
      bills: { color: "bg-orange-500", fill: "#f97316" },
      entertainment: { color: "bg-purple-500", fill: "#6404bd" },
      shopping: { color: "bg-emerald-500", fill: "#10b981" },
      transport: { color: "bg-amber-500", fill: "#f59e0b" },
      utilities: { color: "bg-cyan-500", fill: "#06b6d4" },
      other: { color: "bg-slate-400", fill: "#94a3b8" },
    };

    // 3. Dynamically count amounts for whatever categories exist in the data
    const counts = {};
    expenses.forEach((item) => {
      if (item.type !== "expense" || !item.category) return;
      const catKey = item.category.toLowerCase();

      // Skip salary if it accidentally got added as an expense
      //test
      if (catKey === "salary") return;

      if (!counts[catKey]) {
        counts[catKey] = 0;
      }
      counts[catKey] += Number(item.amount || 0);
    });

    // 4. Transform into percentage arrays for Recharts and Tailwind bars
    return Object.keys(counts)
      .map((key) => {
        const amount = counts[key];
        const percentage =
          totalExpenseAmount > 0
            ? Math.round((amount / totalExpenseAmount) * 100)
            : 0;

        // Dynamic fallback palette config if a new unmapped key is introduced
        const style = colorMap[key] || {
          color: "bg-indigo-500",
          fill: "#6366f1",
        };

        return {
          name: key.toUpperCase(), // e.g., "ENTERTAINMENT"
          value: percentage, // Used by Recharts Donut
          color: style.color, // Used by Tailwind Progress Bar
          fill: style.fill, // Used by Recharts Cell
        };
      })
      .filter((cat) => cat.value > 0); // Only show categories that have actual expenses
  }, [expenses]);

  

  
  // const handleAddExpense = () => {
  //     if (!newExpense.description || newExpense.amount === "") {
  //         alert("Please enter a description and amount.");
  //         return;
  //     }

  //     dispatch(addExpense({
  //         description: newExpense.description,
  //         amount: Number(newExpense.amount),
  //         type: newExpense.type,
  //         date: new Date().toLocaleDateString(),
  //         category: newExpense.category,
  //     }));
  //         setNewExpense({
  //         description: "",
  //         amount: "",
  //         type: "expense",
  //         category: "",
  //     });
  // };


  return (
    <div className="max-w-6xl">
      {/* Title */}
      <header
        class="flex flex-col md:flex-row justify-between items-center mb-10 gap-4"
        data-purpose="header"
      >
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-4">
            <div class="bg-blue-700 p-2.5 rounded-xl shadow-lg shadow-blue-200">
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                ></path>
              </svg>
            </div>
            <div>
              <h1 class="text-4xl font-bold tracking-tight text-slate-800">
                Expense <span class="text-blue-700">List</span>
              </h1>
              <p class="text-sm font-medium text-slate-400 uppercase tracking-widest">
                Financial Overview
              </p>
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

        <div className="w-full min-h-[100px] p-4 bg-white text-base md:text-lg text-gray-500 border border-gray-100 border-t-3 border-t-[#6404bd] shadow-lg rounded-lg font-semibold">
          Saving Rate
          <div className="text-xl sm:text-2xl mt-2 text-[#6404bd] font-bold">
            {savingRate}%
          </div>
        </div>
      </div>

      {/* Chart Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch mt-15">
        <MonthlySpendingChart
          data={chartData}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full"
        />

        {/* LEFT COLUMN: Category Breakdown UI (Takes 1/3 width)  */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-full">
          <div>
            {/* Visual Title Header Accent Block */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-5 bg-blue-600 rounded-full"></div>
              <h3 className="text-lg font-bold text-gray-800">
                Spending by Category
              </h3>
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
              <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                Total
              </span>
            </div>
          </div>
        </div>
      </div>

      {balance < 0 && (
        <p className="text-red-600 font-medium text-sm mt-2 animate-pulse">
          ⚠️ Warning: Your balance is negative! You are overspending.
        </p>
      )}

      {/* Expense List Table */}
      <div className="flex items-center gap-2 text-2xl font-bold text-gray-800 mb-6 mt-15">
        Recent Transactions
      </div>

      {/* 1. Parent Wrapper Layout Grid */}
      <TransactionList />
    </div>
  );
}
