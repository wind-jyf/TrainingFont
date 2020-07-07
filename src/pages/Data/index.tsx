import React, { useState, useContext } from "react";
import $style from "./style.module.scss";

import { Switch, Route } from "react-router-dom";
import { Rice } from './pages/Rice';
import { Maize } from './pages/Maize';
import { Rape } from './pages/Rape';
import { Cotton } from './pages/Cotton';
import { Index } from './pages/Index';
import { AdminRice } from './pages/AdminRice';
import { AdminMaize } from './pages/AdminMaize';
import { AdminRape } from './pages/AdminRape';
import { AdminCotton } from './pages/AdminCotton';
import { RiceImagesData } from './pages/RiceManage/RiceImagesData';
import { AddRiceImages } from './pages/RiceManage/AddRiceImages';
import { AddRiceData } from './pages/RiceManage/AddRiceData';
import { ChangeRiceData } from './pages/RiceManage/ChangeRiceData';
import { ChangeRiceImages } from './pages/RiceManage/ChangeRiceImages';
import { ChangeRapeData } from './pages/RapeManage/ChangeRapeData';
import { ChangeRapeImages } from './pages/RapeManage/ChangeRapeImages';
import { ChangeMaizeData } from './pages/MaizeManage/ChangeMaizeData';
import { ChangeMaizeImages } from './pages/MaizeManage/ChangeMaizeImages';
import { ChangeCottonData } from './pages/CottonManage/ChangeCottonData';
import { ChangeCottonImages } from './pages/CottonManage/ChangeCottonImages';
import { MaizeImagesData } from './pages/MaizeManage/MaizeImagesData';
import { AddMaizeImages } from './pages/MaizeManage/AddMaizeImages';
import { AddMaizeData } from './pages/MaizeManage/AddMaizeData';
import { RapeImagesData } from './pages/RapeManage/RapeImagesData';
import { AddRapeImages } from './pages/RapeManage/AddRapeImages';
import { AddRapeData } from './pages/RapeManage/AddRapeData';
import { CottonImagesData } from './pages/CottonManage/CottonImagesData';
import { AddCottonImages } from './pages/CottonManage/AddCottonImages';
import { AddCottonData } from './pages/CottonManage/AddCottonData';
import { IndexContainer } from './components/IndexContainer';
import { routes } from './route/index';
import { Context } from '../../context';

interface IProps {
  [key: string]: any
}
// interface IRouteData {
//   [key: string]: any
// }
const getRoutes = (admin: boolean) => {
  const routes = [
    // {
    //   path: "/data",
    //   component: Index
    // },
    {
      path: "/data/rice",
      component: Rice,
      hide: admin
    },
    {
      path: '/data/maize',
      component: Maize,
      hide: admin
    },
    {
      path: '/data/rape',
      component: Rape,
      hide: admin
    },
    {
      path: '/data/cotton',
      component: Cotton,
      hide: !admin
    },
    {
      path: "/data/adminRice",
      component: AdminRice,
      hide: !admin
    },
    {
      path: "/data/adminMaize",
      component: AdminMaize,
      hide: !admin
    },
    {
      path: "/data/adminRape",
      component: AdminRape,
      hide: !admin
    },
    {
      path: "/data/adminCotton",
      component: AdminCotton,
      hide: !admin
    },
    {
      path: '/data/adminRice/riceImagesData',
      component: RiceImagesData,
      hide: !admin
    },
    {
      path: '/data/adminRice/addRiceImages',
      component: AddRiceImages,
      hide: !admin
    },
    {
      path: '/data/adminRice/addRiceData',
      component: AddRiceData,
      hide: !admin
    },
    {
      path: '/data/adminRice/changeRiceData',
      component: ChangeRiceData,
      hide: !admin
    },
    {
      path: '/data/adminRice/changeRiceImages',
      component: ChangeRiceImages,
      hide: !admin
    },
    {
      path: '/data/adminRape/changeRapeData',
      component: ChangeRapeData,
      hide: !admin
    },
    {
      path: '/data/adminRape/changeRapeImages',
      component: ChangeRapeImages,
      hide: !admin
    },
    {
      path: '/data/adminMaize/changeMaizeData',
      component: ChangeMaizeData,
      hide: !admin
    },
    {
      path: '/data/adminMaize/changeMaizeImages',
      component: ChangeMaizeImages,
      hide: !admin
    },
    {
      path: '/data/adminCotton/changeCottonData',
      component: ChangeCottonData,
      hide: !admin
    },
    {
      path: '/data/adminCotton/changeCottonImages',
      component: ChangeCottonImages,
      hide: !admin
    },
    {
      path: '/data/adminMaize/maizeImagesData',
      component: MaizeImagesData,
      hide: !admin
    },
    {
      path: '/data/adminMaize/addMaizeImages',
      component: AddMaizeImages,
      hide: !admin
    },
    {
      path: '/data/adminMaize/addMaizeData',
      component: AddMaizeData,
      hide: !admin
    },
    {
      path: '/data/adminRape/rapeImagesData',
      component: RapeImagesData,
      hide: !admin
    },
    {
      path: '/data/adminRape/addRapeImages',
      component: AddRapeImages,
      hide: !admin
    },
    {
      path: '/data/adminRape/addRapeData',
      component: AddRapeData,
      hide: !admin
    },
    {
      path: '/data/adminCotton/cottonImagesData',
      component: CottonImagesData,
      hide: !admin
    },
    {
      path: '/data/adminCotton/addCottonImages',
      component: AddCottonImages,
      hide: !admin
    },
    {
      path: '/data/adminCotton/addCottonData',
      component: AddCottonData,
      hide: !admin
    },
    { key: 'default', component: Index }
  ]

  return routes.filter((item: any) => !item.hide);
}


export const Data = (props: IProps) => {
  const { state: { admin } } = useContext(Context);
  return (
    <div >
      <IndexContainer>
        <Switch>
          <Route exact path={routes.data.path} component={Index}></Route>
          {getRoutes(admin).map((item: any) => (
            <Route exact path={item.path} component={item.component} />
          ))}
        </Switch>
      </IndexContainer>
    </div>
  );
};
