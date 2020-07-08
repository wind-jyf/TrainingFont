/**
 * @file: description
 * @author: yangqianjun
 * @Date: 2020-07-02 17:45:07
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-06 12:43:35
 */
import React, { useContext } from 'react';
import intl, { isZhCN } from './utils/intlSafe';

import { Route, Switch, withRouter } from 'react-router';
import HelmetTemplate from './componets/Helmet';

import { Team } from './pages/Team';
import { TeamEn } from './pages/TeamEn';
import { News } from './pages/News';
import { NewsEn } from './pages/NewsEn';
import { Instrument } from './pages/instrument';
import { Article } from './pages/Article';
import { Project } from './pages/Project';
import { InstrumentEn } from './pages/instrumentEn';
import { NewsDetail } from './pages/NewsDetail';
import { NewsDetailEn } from './pages/NewsDetailEn';
import { TeamDetail } from './pages/TeamDetail';
import { TeamDetailEn } from './pages/TeamDetailEn';
import { InstrumentDetail } from './pages/instrumentDetail';
import { InstrumentDetailEn } from './pages/instrumentDetailEn';
import { Data } from './pages/Data';
import { Layout } from './pages/layout'
import { Manage } from './pages/Manage'
import { Position } from './pages/Position'
import { DataShow } from './pages/DataShow';
import { Download } from './pages/Download';


import { Context } from './context';

interface Ipros {
  currentLocale: string;
  handleChangeLocale: any;
}

const getRoutes = (admin: boolean) => {

  const routes = [
    { path: '/news', component: isZhCN() ? News : NewsEn },
    { path: '/newsDetail', component: isZhCN() ? NewsDetail : NewsDetailEn },
    { path: '/team', component: isZhCN() ? Team : TeamEn },
    { path: '/article', component: Article },
    { path: '/project', component: Project, hide: !isZhCN() },
    { path: '/teamDetail', component: isZhCN() ? TeamDetail : TeamDetailEn },
    { path: '/instrument', component: isZhCN() ? Instrument : InstrumentEn },
    { path: '/manage', component: Manage, hide: !admin},
    { path: '/position', component: Position,hide:!isZhCN()},
    { path: '/instrumentDetail', component: isZhCN() ? InstrumentDetail : InstrumentDetailEn },
    { path: '/dataSearch', component: Data },
    { path: '/dataShow/:type', component: DataShow },
    { path: '/download', component: Download },
    { path: '/data', component: Data },
    { key: 'default', component: News } // 兜底页面
  ];
  return routes.filter((item: any) => !item.hide);
};

const Home = (props: Ipros) => {
  const { state: { admin } } = useContext(Context);
  const { handleChangeLocale, currentLocale } = props;

  return (
    <Layout
      header={{
        changeLocale: handleChangeLocale,
        currentLocale
      }}
    >
      <HelmetTemplate
        title={intl.get('Homepage_Title')}
        keywords={intl.get('Homepage_Keywords')}
        description={intl.get('Homepage_Description')}
      />
      <Switch>
        {getRoutes(admin).map(item => (
          <Route key={item.key || item.path} path={item.path} component={item.component} />
        ))}
      </Switch>
    </Layout>
  );
}

export default Home;
