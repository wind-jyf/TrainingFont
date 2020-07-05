/**
 * @file: description
 * @author: yangqianjun
 * @Date: 2020-07-03 18:37:55
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-05 23:52:55
 */
import { RouteProps } from "react-router-dom";
import { NewsManage } from '../pages/NewsManage';
import { NewsManageEn } from '../pages/NewsManageEn';
import { TeamManage } from '../pages/TeamManage';
import { TeamManageEn } from '../pages/TeamManageEn';
import { InstrumentManage } from '../pages/InstrumentManage';
import { ArticleManage } from '../pages/ArticleManage';
import { ProjectManage } from '../pages/ProjectManage';
import { NewsEdit } from '../pages/NewsEdit';
import { NewsEditEn } from '../pages/NewsEditEn';
import { TeamEdit } from '../pages/TeamEdit';
import { TeamEditEn } from '../pages/TeamEditEn';
import { InstrumentEdit } from '../pages/InstrumentEdit';

interface IRouteData {
    [key: string]: any
  }

export const routes:IRouteData = {
    newsManage: {
        path: "/manage/newsManage",
        component: NewsManage
    },
    newsManageEn: {
        path: "/manage/newsManageEn",
        component: NewsManageEn
    },
    teamManage: {
        path: "/manage/teamManage",
        component: TeamManage
    },
    teamManageEn: {
        path: "/manage/teamManageEn",
        component: TeamManageEn
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
    newsEditEn: {
        path: '/manage/newsEditEn',
        component: NewsEditEn
    },
    teamEdit: {
        path: '/manage/teamEdit',
        component: TeamEdit
    },
    teamEditEn: {
        path: '/manage/teamEditEn',
        component: TeamEditEn
    },
    instrumentEdit: {
        path: '/manage/instrumentEdit',
        component: InstrumentEdit
    },
    default: {
        path: '/manage',
        component: NewsManage
    },
}