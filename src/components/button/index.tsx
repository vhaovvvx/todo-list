import React from "react";
import "./button.scss";
import cls from "classnames";
import { TButton } from "./button.helper";

export default function Button({
  value,
  className = "",
  labelName,
  dataId,
  icon,
  ...props
}: TButton) {
  const onClickHandler = () => {
    if (props.onClick) {
      if (dataId) {
        props.onClick(dataId);
      } else {
        props.onClick();
      }
    }
  };
  return (
    <div className={cls(`wrapper-btn-2AslW ${className}`, {})}>
      <button onClick={onClickHandler}>
        {icon} &nbsp;
        {value}
      </button>
    </div>
  );
}
