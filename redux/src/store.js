import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import movieReducer from "./slices/movieSlice";
import expenseReducer from "./slices/expenseSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    movie: movieReducer,
    expense: expenseReducer,
  },
});