import { createSlice } from "@reduxjs/toolkit";

const saveExpenses = localStorage.getItem("expenses");

const expenseSlice = createSlice({
    name: "expense",
    initialState: {
        expenses: saveExpenses? JSON.parse(saveExpenses): [{id: 1, description: "Salary", amount: 1000, type: "income"}, {id: 2, description: "Rent", amount: 500, type: "expense"}],
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
        }
    },
});

export const { addExpense } = expenseSlice.actions;
export default expenseSlice.reducer;