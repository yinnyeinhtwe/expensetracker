import { createSlice } from "@reduxjs/toolkit";

const saveExpenses = localStorage.getItem("expenses");

const expenseSlice = createSlice({
    name: "expense",
    initialState: {
        expenses: saveExpenses? JSON.parse(saveExpenses): [{id: 1, description: "Salary", amount: 1000, type: "income"}, {id: 2, description: "Rent", amount: 500, type: "expense"}],
        // totalIncome: 0,
    },
    reducers: {
        addExpense: (state, action) => {
            const newExpense = {
                id: state.expenses.length > 0 ? state.expenses[state.expenses.length - 1].id + 1 : 1,
                description: action.payload.description,
                amount: action.payload.amount,
                type: action.payload.type,
            };
            state.expenses.push(newExpense);
        },

        deleteExpense: (state, action) => {
            console.log("The payload is:", action.payload);
            state.expenses = state.expenses.filter((expense) => expense.id !== action.payload);
        },

        editExpense: (state, action) => {
            const {id, description, amount, type} = action.payload;
            const existingExpense = state.expenses.find((expense) => expense.id === id);
            if (existingExpense) {
                existingExpense.description = description;
                existingExpense.amount = amount;
                existingExpense.type = type;
            }
        },

        // calculateTotalIncome: (state) => {
        //     const income = state.expenses.filter((expense) => expense.type === "income");
        //     let incomeTotal=0;
        //     income.forEach(item => {
        //         incomeTotal += item.amount;
        //     });
        //     state.totalIncome = incomeTotal;
        //     // return totalIncome;
        //  },

    }
});

export const { addExpense, deleteExpense, editExpense, calculateTotalIncome } = expenseSlice.actions;
export default expenseSlice.reducer;