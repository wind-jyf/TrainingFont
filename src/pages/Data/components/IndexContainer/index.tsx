import React from "react";
import $style from "./style.module.scss";

interface IProps {
    [key:string]: any
  }

export const IndexContainer = (props:IProps) => {
    return (
      <div className={$style["noMenu"]}>
          {props.children}
      </div>
    );
};
