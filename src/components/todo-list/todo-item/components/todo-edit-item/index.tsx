import { EditOutlined } from "@ant-design/icons";
import { Radio, RadioChangeEvent, Select, Space } from "antd";
import { Option } from "antd/lib/mentions";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { editTodo, selectTodos } from "../../../../../app/slice/todo-list";
import { TTodosItem } from "../../../../../app/slice/todo-list/typeTodoList";
import Button from "../../../../button";
import Spacing from "../../../../spacing";
import "./editItem.scss";

export default function TodoEditItem() {
  const request = useAppSelector(selectTodos);
  const { todos } = request;
  const [itemSelect, setItemSelect] = useState<TTodosItem[]>([]);

  const [inputValue, setInputValue] = useState("");
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const editItemHandler = () => {
    if (id) {
      const body = {
        id,
        description: inputValue,
        isFinished: itemSelect[0].isFinished,
      } as TTodosItem;
      dispatch(editTodo(body));
      navigate(-1);
    }
  };

  useEffect(() => {
    if (id) {
      const getItemSelected = todos.filter((item) => item.id == id);
      if (getItemSelected) {
        setItemSelect(getItemSelected);
        setInputValue(getItemSelected[0].description);
      }
    } else {
      navigate("/");
    }
  }, []);

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onChangeRadioGroupHandler = (e: RadioChangeEvent) => {
    const getValueIsCompleted = e.target.value;
    const clone = [{ ...itemSelect[0], isFinished: getValueIsCompleted }];
    setItemSelect(clone);
  };

  return (
    <div className="edit-item-2Aiskxm">
      {itemSelect.length > 0 && (
        <div>
          <div className="text-bold">Edit description</div>
          <input
            onChange={onChangeInputHandler}
            defaultValue={itemSelect[0].description}
          />
          <Spacing mTop={30} mBottom={30}>
            <div className="edit-item__finished">
              <div className="text-bold">Edit Is Finished</div>
              <Radio.Group
                onChange={onChangeRadioGroupHandler}
                defaultValue={itemSelect[0].isFinished}
                name="isFinished"
              >
                <div>
                  <Space direction="vertical">
                    <Radio value={false}>Unfinished</Radio>
                    <Radio value={true}>Finished</Radio>
                  </Space>
                </div>
              </Radio.Group>
            </div>
          </Spacing>

          <div className="edit-item__btn">
            <Button
              value="save change"
              className="btn-add"
              onClick={editItemHandler}
            />{" "}
            <Button
              className="btn-delete"
              value="cancel"
              onClick={() => navigate(-1)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
