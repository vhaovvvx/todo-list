import { EditOutlined, DeleteOutlined, CheckOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  deleteTodo,
  editTodo,
  getTodos,
  selectTodos,
} from "../../../app/slice/todo-list";
import { TTodosItem } from "../../../app/slice/todo-list/typeTodoList";
import Button from "../../button";
import "./todoItem.scss";
import cls from "classnames";
import _ from "lodash";

export default function TodoItem({ valueSearch }: { valueSearch: string }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const request = useAppSelector(selectTodos);
  const [check, setCheck] = useState(false);

  const { todos } = request;
  const [todoItems, setTodoItems] = useState(request.todos);

  const onClickFinished = (id: string) => {
    if (id) {
      const filterItem = todos.filter((item) => item.id == id);

      if (filterItem[0].isFinished) {
        return;
      }

      const body = {
        ...filterItem[0],
        isFinished: true,
      };

      dispatch(editTodo(body));
    }
  };

  useEffect(() => {
    const body = {};
    dispatch(getTodos(body));
  }, []);

  useEffect(() => {
    if (request.todos.length > 0) {
      setTodoItems(request.todos);
    }
  }, [request]);

  const onClickDeleteHandler = (id: string) => {
    if (id) {
      const body = {
        id,
      };

      dispatch(deleteTodo(body));
    }
  };

  const onFinishAllHandler = () => {
    const sortType = check ? "desc" : "asc";

    const sortItem = _.orderBy(todoItems, "isFinished", [sortType]);
    setTodoItems(sortItem);
    setCheck(!check);
  };

  return (
    <div className="todo-items-gjEkzo21">
      <Button
        className="btn-sort"
        value="sort by completed"
        onClick={onFinishAllHandler}
      />
      {todoItems.length > 0 &&
        todoItems
          .filter((item) => {
            if (valueSearch === "") {
              return item;
            } else if (
              item.description.toLowerCase().includes(valueSearch.toLowerCase())
            ) {
              return item;
            }
          })
          .map((item) => (
            <div className="todo-items__description" key={item.id}>
              <div
                className={cls("todo-items__description--item", {
                  finished: item.isFinished,
                })}
              >
                <div className="description--item__content">
                  {item.description}
                </div>
                <div className="todo-items__btn">
                  <Button
                    value="completed"
                    dataId={item.id}
                    className="btn-finished"
                    icon={<CheckOutlined />}
                    onClick={onClickFinished}
                  />
                  <Button
                    dataId={item.id}
                    value="delete"
                    className="btn-delete"
                    icon={<DeleteOutlined />}
                    onClick={onClickDeleteHandler}
                  />

                  <Button
                    className="btn-edit"
                    icon={<EditOutlined />}
                    value="edit"
                    onClick={() => navigate(`/todo/${item.id}`)}
                  />
                </div>
              </div>
            </div>
          ))}
    </div>
  );
}
