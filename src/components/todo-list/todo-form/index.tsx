import { Modal } from "antd";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { getTodos, postTodo } from "../../../app/slice/todo-list";
import Button from "../../button";
import TodoItem from "../todo-item";
import { initialState } from "./todoForm.config";
import "./todoForm.scss";

export default function TodoForm() {
  const [request, setRequest] = useState(initialState);
  const dispatch = useAppDispatch();
  const [valueInput, setInputValue] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onAddItemHandler = () => {
    if (valueInput) {
      const body = {
        ...request,
        description: valueInput,
      };
      dispatch(postTodo(body));
      setInputValue("");
    } else {
      setIsModalVisible(true);
    }
  };

  const onKeyDownHandler = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === "Enter") {
      const body = {
        id: "",
        description: valueInput,
        isFinished: false,
      };

      dispatch(postTodo(body));
    }
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p> You must enter greater than 1 character </p>
      </Modal>
      <div className="wrapper-todo-form-LawuzE1">
        <h3>all task</h3>
        <div className="todo-form__content">
          <input
            placeholder="Enter a new task or search"
            value={valueInput}
            onChange={onChangeInputHandler}
            onKeyDown={onKeyDownHandler}
          />

          <div className="todo-form__content--btn">
            <Button
              value="add new todo"
              className="btn-add"
              onClick={onAddItemHandler}
            />
          </div>
        </div>
        <TodoItem valueSearch={valueInput} />
      </div>
    </div>
  );
}
