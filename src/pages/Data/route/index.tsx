import { RouteProps } from "react-router-dom";
import { RiceQzWy } from '../pages/RiceQzWy';
import { RiceRlxWy } from '../pages/RiceRlxWy';
import { RiceData } from '../pages/RiceData';
import { MaizeMqd } from '../pages/MaizeMqd';
import { MaizeJby } from '../pages/MaizeJby';
import { MaizeData } from '../pages/MaizeData';
import { RapeImg } from '../pages/RapeImg';
import { CottonImg } from '../pages/CottonImg';
import { Authorization } from '../pages/Authorization';

interface IRouteData {
    [key: string]: any
  }

export const routes:IRouteData = {
    riceQzWy: {
        path: "/dataSearch/riceQzWy",
        component: RiceQzWy
    },
    riceRlxWy: {
        path: "/dataSearch/riceRlxWy",
        component: RiceRlxWy
    },
    riceData: {
        path: '/dataSearch/riceData',
        component: RiceData
    },
    maizeMqd: {
        path: '/dataSearch/maizeMqd',
        component: MaizeMqd
    },
    maizeJby: {
        path: '/dataSearch/maizeJby',
        component: MaizeJby
    },
    maizeData: {
        path: '/dataSearch/maizeData',
        component: MaizeData
    },
    rapeImg: {
        path: '/dataSearch/rapeImg',
        component: RapeImg
    },
    cottonImg: {
        path: '/dataSearch/cottonImg',
        component: CottonImg
    },
    authorization: {
        path: '/dataSearch/authorization',
        component: Authorization
    }
}