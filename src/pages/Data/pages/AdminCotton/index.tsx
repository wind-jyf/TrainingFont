import React, { useState } from "react";

import { Switch, Route } from "react-router-dom";

import { routes } from '../../route/index';
import { CottonImagesData } from '../CottonManage/CottonImagesData';

interface IProps {
  [key: string]: any
}

export const AdminCotton = (props: IProps) => {

  return (
    <div >
      <Switch>
          <Route exact path={routes.adminCotton.path} component={CottonImagesData}></Route>
      </Switch>
    </div>
  );
};
