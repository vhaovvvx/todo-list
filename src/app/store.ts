import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./slice/todo-list";

export const store = configureStore({
  reducer: {
    todosSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>; // A global type to access reducers types
export type AppDispatch = typeof store.dispatch; // Type to access dispatch
