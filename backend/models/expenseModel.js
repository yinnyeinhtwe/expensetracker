// File: expenseModel.js (or whatever you name your query file)
const pool = require("../config/db"); // Imports your PostgreSQL pool connection

// 1. Function to insert a new expense linked to a specific user
const createExpense = async (userId, description, amount, type, date, category) => {
     const result = await pool.query(
          "INSERT INTO expenses(user_id, description, amount, type, date, category) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
          [userId, description, amount, type, date, category]
     );
     return result.rows[0];
};

// 2. Function to fetch ONLY the expenses belonging to the logged-in user
const findExpensesByUserId = async (userId) => {
     const result = await pool.query(
          "SELECT * FROM expenses WHERE user_id = $1",
          [userId]
     );
     return result.rows; // Returns an array of expenses
};

module.exports = {
     createExpense,
     findExpensesByUserId,
};
