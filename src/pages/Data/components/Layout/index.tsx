import React, { useState } from "react";
import { Menus } from "../Menu";
import $style from "./style.module.scss";

interface IProps {
    [key:string]: any
  }

export const Layout = (props:IProps) => {

  return (
    <div className={$style["layoutContainer"]}>
      <div className={$style["menuContainer"]}>
        <Menus/>
      </div>
      <div className={$style["mainContainer"]}>
        {props.children}
      </div>
    </div>
  );
};
