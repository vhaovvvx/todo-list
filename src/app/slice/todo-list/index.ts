import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import todoList from "../../../service/todo-list";
import { RootState } from "../../store";
import { TInitialStateTodos, TTodosItem } from "./typeTodoList";

const initialState: TInitialStateTodos = {
  todos: [],
};

export const getTodos = createAsyncThunk(
  "todosReducer/getTodo",
  async (req: {}, thunkAPI) => {
    try {
      const res = await todoList.getAllTodo(req, "");
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const postTodo = createAsyncThunk(
  "todosReducer/postTodo",
  async (req: TTodosItem, thunkAPI) => {
    try {
      const res = await todoList.postTodo(req, "");
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todosReducer/deleteTodo",
  async (req: {id:string}, thunkAPI) => {
    try {
      const res = await todoList.deleteTodo(req, "", req.id);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editTodo = createAsyncThunk(
  "todosReducer/editTodo",
  async (req: TTodosItem, thunkAPI) => {
    try {
      const res = await todoList.editTodo(req, "", req.id);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const todosSlice = createSlice({
  name: "todosReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
    });

    builder.addCase(postTodo.fulfilled, (state, action) => {
      state.todos = [...state.todos, action.payload];
      notification.success({
        message: "Add todo successfully",
      });
    });

    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload.id);

      notification.success({
        message: "Delete todo successfully",
      });
    });

    builder.addCase(editTodo.fulfilled, (state, action) => {
      const replaceItemEdit = state.todos.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );

      state.todos = replaceItemEdit;
    });
  },
});

export const selectTodos = (state: RootState) => state.todosSlice;

export default todosSlice.reducer;
