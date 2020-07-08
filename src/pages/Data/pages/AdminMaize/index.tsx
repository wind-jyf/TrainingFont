import React, { useState } from "react";

import { Switch, Route } from "react-router-dom";

import { routes } from '../../route/index';
import { MaizeImagesData } from '../MaizeManage/MaizeImagesData';
interface IProps {
  [key: string]: any
}

export const AdminMaize = (props: IProps) => {

  return (
    <div >
      <Switch>
          <Route exact path={routes.adminMaize.path} component={MaizeImagesData}></Route>
      </Switch>
    </div>
  );
};
