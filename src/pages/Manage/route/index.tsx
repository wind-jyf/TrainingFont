/**
 * @file: description
 * @author: yangqianjun
 * @Date: 2020-07-03 18:37:55
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-03 23:58:50
 */
import { RouteProps } from "react-router-dom";
import { NewsManage } from '../pages/NewsManage';
import { TeamManage } from '../pages/TeamManage';
import { InstrumentManage } from '../pages/InstrumentManage';
import { ArticleManage } from '../pages/ArticleManage';
import { ProjectManage } from '../pages/ProjectManage';
import { NewsEdit } from '../pages/NewsEdit';

interface IRouteData {
    [key: string]: any
  }

export const routes:IRouteData = {
    newsManage: {
        path: "/manage/newsManage",
        component: NewsManage
    },
    teamManage: {
        path: "/manage/teamManage",
        component: TeamManage
    },
    instrumentManage: {
        path: '/manage/instrumentManage',
        component: InstrumentManage
    },
    articleManage: {
        path: '/manage/articleManage',
        component: ArticleManage
    },
    projectManage: {
        path: '/manage/projectManage',
        component: ProjectManage
    },
    newsEdit: {
        path: '/manage/newsEdit',
        component: NewsEdit
    },
    default: {
        path: '/manage',
        component: NewsManage
    },
}