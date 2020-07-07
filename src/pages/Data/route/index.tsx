import { Rice } from '../pages/Rice';
import { Maize } from '../pages/Maize';
import { Rape } from '../pages/Rape';
import { Cotton } from '../pages/Cotton';
import { Index } from '../pages/Index';
import { AdminRice } from '../pages/AdminRice';
import { AdminMaize } from '../pages/AdminMaize';
import { AdminRape } from '../pages/AdminRape';
import { AdminCotton } from '../pages/AdminCotton';
import { RiceImagesData } from '../pages/RiceManage/RiceImagesData';
import { AddRiceImages } from '../pages/RiceManage/AddRiceImages';
import { AddRiceData } from '../pages/RiceManage/AddRiceData';
import { MaizeImagesData } from '../pages/MaizeManage/MaizeImagesData';
import { AddMaizeImages } from '../pages/MaizeManage/AddMaizeImages';
import { AddMaizeData } from '../pages/MaizeManage/AddMaizeData';
import { RapeImagesData } from '../pages/RapeManage/RapeImagesData';
import { AddRapeImages } from '../pages/RapeManage/AddRapeImages';
import { AddRapeData } from '../pages/RapeManage/AddRapeData';
import { CottonImagesData } from '../pages/CottonManage/CottonImagesData';
import { AddCottonImages } from '../pages/CottonManage/AddCottonImages';
import { AddCottonData } from '../pages/CottonManage/AddCottonData';

interface IRouteData {
  [key: string]: any
}

export const routes: IRouteData = {
  data: {
    path: "/data"
  },
  rice: {
    path: "/data/rice"
  },
  maize: {
    path: '/data/maize'
  },
  rape: {
    path: '/data/rape'
  },
  cotton: {
    path: '/data/cotton'
  },
  adminRice: {
    path: "/data/adminRice"
  },
  adminMaize: {
    path: "/data/adminMaize"
  },
  adminRape: {
    path: "/data/adminRape"
  },
  adminCotton: {
    path: "/data/adminCotton"
  },
  riceImagesData: {
    path: '/data/adminRice/riceImagesData'
  },
  addRiceImages: {
    path: '/data/adminRice/addRiceImages'
    
  },
  addRiceData: {
    path: '/data/adminRice/addRiceData'
    
  },
  maizeImagesData: {
    path: '/data/adminMaize/maizeImagesData'
    
  },
  addMaizeImages: {
    path: '/data/adminMaize/addMaizeImages'
    
  },
  addMaizeData: {
    path: '/data/adminMaize/addMaizeData'
    
  },
  rapeImagesData: {
    path: '/data/adminRape/rapeImagesData'
    
  },
  addRapeImages: {
    path: '/data/adminRape/addRapeImages'
    
  },
  addRapeData: {
    path: '/data/adminRape/addRapeData'
    
  },
  cottonImagesData: {
    path: '/data/adminCotton/cottonImagesData'
    
  },
  addCottonImages: {
    path: '/data/adminCotton/addCottonImages'
    
  },
  addCottonData: {
    path: '/data/adminCotton/addCottonData'
  }
}
