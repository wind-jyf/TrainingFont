import React, { useContext } from 'react';
import intl, { isZhCN } from './utils/intlSafe';

import { Route, Switch, withRouter  } from 'react-router';
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
<<<<<<< HEAD
import { Layout } from './pages/layout';
import { DataShow } from './pages/DataShow';
import { Download } from './pages/Download';
=======
import { Rice } from './pages/Data/pages/Rice';
import { Maize } from './pages/Data/pages/Maize';
import { Rape } from './pages/Data/pages/Rape';
import { Cotton } from './pages/Data/pages/Cotton';
// import { Index } from './pages/Data/pages/Index';
import { AdminRice } from './pages/Data/pages/AdminRice';
import { AdminMaize } from './pages/Data/pages/AdminMaize';
import { AdminRape } from './pages/Data/pages/AdminRape';
import { AdminCotton } from './pages/Data/pages/AdminCotton';
import { RiceImagesData } from './pages/Data/pages/RiceManage/RiceImagesData';
import { AddRiceImages } from './pages/Data/pages/RiceManage/AddRiceImages';
import { AddRiceData } from './pages/Data/pages/RiceManage/AddRiceData';
import { MaizeImagesData } from './pages/Data/pages/MaizeManage/MaizeImagesData';
import { AddMaizeImages } from './pages/Data/pages/MaizeManage/AddMaizeImages';
import { AddMaizeData } from './pages/Data/pages/MaizeManage/AddMaizeData';
import { RapeImagesData } from './pages/Data/pages/RapeManage/RapeImagesData';
import { AddRapeImages } from './pages/Data/pages/RapeManage/AddRapeImages';
import { AddRapeData } from './pages/Data/pages/RapeManage/AddRapeData';
import { CottonImagesData } from './pages/Data/pages/CottonManage/CottonImagesData';
import { AddCottonImages } from './pages/Data/pages/CottonManage/AddCottonImages';
import { AddCottonData } from './pages/Data/pages/CottonManage/AddCottonData';
import { Layout } from './pages/layout'
>>>>>>> 376872eb3fc619538262487c8275874612371061

import { Context } from './context';

interface Ipros {
  currentLocale: string;
  handleChangeLocale: any;
}

const getRoutes = (admin: boolean) => {

  const routes = [
    { path: '/news', component: News },
    { path: '/newsDetail', component: NewsDetail },
    { path: '/team', component: isZhCN() ? Team : TeamEn },
    { path: '/article', component: Article },
    { path: '/project', component: Project, hide: !isZhCN() },
    { path: '/teamDetail', component: isZhCN() ? TeamDetail : TeamDetailEn },
    { path: '/instrument', component: isZhCN() ? Instrument : InstrumentEn },
    { path: '/instrumentDetail', component: isZhCN() ? InstrumentDetail : InstrumentDetailEn },
<<<<<<< HEAD
    { path: '/dataSearch', component: Data },
    { path: '/dataShow/:type', component: DataShow },
    { path: '/download', component: Download },

=======
    { path: '/data', component: Data},
>>>>>>> 376872eb3fc619538262487c8275874612371061
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
