import "antd/dist/antd.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import TodoForm from "./components/todo-list/todo-form";
import TodoEditItem from "./components/todo-list/todo-item/components/todo-edit-item";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<TodoForm />} />
        <Route path="/todo/:id" element={<TodoEditItem />} />
      </Routes>
    </Router>
  );
}

export default App;
