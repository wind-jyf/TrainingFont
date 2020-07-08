import React, { useState } from "react";

import { Switch, Route } from "react-router-dom";

import { routes } from '../../route/index';
import { RapeImagesData } from '../RapeManage/RapeImagesData';
interface IProps {
  [key: string]: any
}

export const AdminRape = (props: IProps) => {
  return (
    <div >
      <Switch>
          <Route exact path={routes.adminRape.path} component={RapeImagesData}></Route>
      </Switch>
    </div>
  );
};
