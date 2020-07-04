/**
 * @file: description
 * @author: xinguangtai
 * @Date: 2020-07-02 17:45:07
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-03 21:24:01
 */
import React, { useState } from "react";
import $style from "./style.module.scss";

import { Switch, Route } from "react-router-dom";

import { Layout } from './components/Layout';
import { routes } from './route/index';

interface IProps {
    [key:string]: any
  }

export const Data = (props:IProps) => {

  return (
    <div className={$style['dataWrapper']}>
        <Switch>
            <Layout>
                <Route path={routes.riceQzWy.path} component={routes.riceQzWy.component}></Route>
                <Route path={routes.riceRlxWy.path} component={routes.riceRlxWy.component}></Route>
                <Route path={routes.riceData.path} component={routes.riceData.component}></Route>
                <Route path={routes.maizeMqd.path} component={routes.maizeMqd.component}></Route>
                <Route path={routes.maizeJby.path} component={routes.maizeJby.component}></Route>
                <Route path={routes.maizeData.path} component={routes.maizeData.component}></Route>
                <Route path={routes.rapeImg.path} component={routes.rapeImg.component}></Route>
                <Route path={routes.cottonImg.path} component={routes.cottonImg.component}></Route>
                <Route path={routes.authorization.path} component={routes.authorization.component}></Route>
                <Route exact path={'/dataSearch'} component={routes.riceQzWy.component}></Route>
            </Layout>
        </Switch>
    </div>
  );
};
