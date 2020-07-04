/**
 * @file: description
 * @author: yangqianjun
 * @Date: 2020-07-03 14:47:16
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-04 00:00:52
 */
import React, { useEffect, useState, useRef } from "react";

import { Switch, Route } from "react-router-dom";

import { routes } from "./route/index";

// import { Pagination, Spin } from "antd";

import { Menus } from "./components/Menus/Menus";

import $style from "./style.module.scss";
import { LOCALES } from "../../constants/index";

import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Iprops {
  [key: string]: any;
}

// const pageDefault = {
//   lan: LOCALES.zh,
//   page: 1,
//   page_size: 12,
// };

export const Manage = (props: Iprops) => {
  return (
    <div className={$style["layoutContainer"]}>
      <div className={$style["menuContainer"]}>
        <Menus />
      </div>
      <div className={$style["mainContainer"]}>
        <Switch>
          <Route
            path={routes.newsManage.path}
            component={routes.newsManage.component}
          ></Route>
          <Route
            path={routes.teamManage.path}
            component={routes.teamManage.component}
          ></Route>
          <Route
            path={routes.instrumentManage.path}
            component={routes.instrumentManage.component}
          ></Route>
          <Route
            path={routes.articleManage.path}
            component={routes.articleManage.component}
          ></Route>
          <Route
            path={routes.projectManage.path}
            component={routes.projectManage.component}
          ></Route>
          <Route
            path={routes.newsEdit.path}
            component={routes.newsEdit.component}
          ></Route>
          <Route
            path={routes.default.path}
            component={routes.default.component}
          ></Route>
        </Switch>
      </div>
    </div>
  );
};
