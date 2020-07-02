import React, { useContext } from 'react';
import intl, { isZhCN } from './utils/intlSafe';

import { Route, Switch } from 'react-router';
import HelmetTemplate from './componets/Helmet';

import { Team } from './pages/Team';
import { TeamEn } from './pages/TeamEn';
import { News } from './pages/News';
import { Instrument } from './pages/instrument';
import { Article } from './pages/Article';
import { Project } from './pages/Project';
import { InstrumentEn } from './pages/instrumentEn';
import { NewsDetail } from './pages/NewsDetail';
import { TeamDetail } from './pages/TeamDetail';
import { TeamDetailEn } from './pages/TeamDetailEn';
import { InstrumentDetail } from './pages/instrumentDetail';
import { InstrumentDetailEn } from './pages/instrumentDetailEn';
import { Data } from './pages/Data';
import { Layout } from './pages/layout'

import { Context } from './context';

interface Ipros {
  currentLocale: string;
  handleChangeLocale: any;
}

const getRoutes = (admin:boolean) => {

  const routes = [
    { path: '/news', component: News },
    { path: '/newsDetail', component: NewsDetail },
    { path: '/team', component: isZhCN() ? Team : TeamEn },
    { path: '/article', component: Article },
    { path: '/project', component: Project, hide:!isZhCN() },
    { path: '/teamDetail', component: isZhCN() ? TeamDetail : TeamDetailEn },
    { path: '/instrument', component: isZhCN() ? Instrument : InstrumentEn },
    { path: '/instrumentDetail', component: isZhCN() ? InstrumentDetail : InstrumentDetailEn },
    { path: '/dataSearch', component: Data},
    { key: 'default', component: News } // 兜底页面
  ];
  return routes.filter((item:any) => !item.hide);
};

const Home = (props:Ipros) => {
  const {state:{ admin }} = useContext(Context);
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
