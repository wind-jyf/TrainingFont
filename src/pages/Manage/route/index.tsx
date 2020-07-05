/**
 * @file: description
 * @author: yangqianjun
 * @Date: 2020-07-03 18:37:55
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-05 09:53:26
 */
import { RouteProps } from "react-router-dom";
import { NewsManage } from '../pages/NewsManage';
import { NewsManageEn } from '../pages/NewsManageEn';
import { TeamManage } from '../pages/TeamManage';
import { InstrumentManage } from '../pages/InstrumentManage';
import { ArticleManage } from '../pages/ArticleManage';
import { ProjectManage } from '../pages/ProjectManage';
import { NewsEdit } from '../pages/NewsEdit';
import { NewsEditEn } from '../pages/NewsEditEn';

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
    default: {
        path: '/manage',
        component: NewsManage
    },
}