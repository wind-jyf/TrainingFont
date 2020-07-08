import React, { useState } from "react";

import { Switch, Route } from "react-router-dom";

import { routes } from '../../route/index';
import { RiceImagesData } from '../RiceManage/RiceImagesData';
interface IProps {
  [key: string]: any
}

export const AdminRice = (props: IProps) => {
  return (
    <div >
      <Switch>
          <Route exact path={routes.adminRice.path} component={RiceImagesData}></Route>
      </Switch>
    </div>
  );
};
