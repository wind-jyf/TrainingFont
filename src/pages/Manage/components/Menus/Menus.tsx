/**
 * @file: description
 * @author: xinguangtai
 * @Date: 2020-07-03 21:10:41
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-05 23:51:30
 */

import React, { useContext } from "react";
import { Menu } from "antd";
import { routes } from "../../route";
import { Link } from "react-router-dom";

import { Context } from "../../../../context";

const SubMenu = Menu.SubMenu;

interface IMenuItem {
  name: string;
  path?: string | string[];
  subMenu?: IMenuItem[];
  hide?: boolean;
}

interface IProps {
  [key: string]: any;
}

export const Menus = (props: IProps) => {
  const {
    state: { admin },
  } = useContext(Context);

  const DEFAULT_ACTIVE_ITEM = {
    name: "新闻管理",
    path: routes.newsManage.path,
  };

  const getMenus = (admin: boolean) => {
    const MENUS: IMenuItem[] = [
      // {
      //   name: DEFAULT_ACTIVE_ITEM.name,
      //   path: DEFAULT_ACTIVE_ITEM.path
      // },
      {
        name: "新闻管理",
        path: routes.newsManage.path,
      },
      {
        name: "团队管理",
        path:routes.teamManage.path,
      },
      {
        name: "仪器管理",
        path:routes.instrumentManage.path,
      },
      {
        name: "文章管理",  
        path:routes.articleManage.path,
      },
      {
        name: "项目管理",
        path:routes.projectManage.path,
      },
      {
        name: "About CPC",
        path:routes.newsManageEn.path,
      },
      {
        name: "Group",
        path:routes.teamManageEn.path,
      }
    //   {
    //     name: "Maize",
    //     subMenu: [
    //       {
    //         name: "Mingqiu Dai & Wanneng Yang",
    //         path: routes.maizeMqd.path,
    //       },
    //       {
    //         name: "Maize_Jianbing Yan & Wanneng Yang",
    //         path: routes.maizeJby.path,
    //       },
    //       {
    //         name: "Maize Data",
    //         path: routes.maizeData.path,
    //       },
    //     ],
    //   },
    //   {
    //     name: "Rape",
    //     subMenu: [
    //       {
    //         name: "Rape img",
    //         path: routes.rapeImg.path,
    //       },
    //     ],
    //   },
    //   {
    //     name: "Cotton",
    //     subMenu: [
    //       {
    //         name: "Cotton img",
    //         path: routes.cottonImg.path,
    //       },
    //     ],
    //   },
    //   {
    //     name: "数据授权管理",
    //     path: routes.authorization.path,
    //     hide: !admin,
    //   },
    ];
    return MENUS.filter((item) => !item.hide);
  };

  let name = DEFAULT_ACTIVE_ITEM.name;
  const getDefaultSelectedName = (menus: any) => {
    const { pathname } = window.location;
    for (let i = 0; i < menus.length; i++) {
      if (menus[i].subMenu) {
        name = getDefaultSelectedName(menus[i].subMenu);
      } else if (menus[i].path === pathname) {
        name = menus[i].name;
      }
    }
    return name;
  };

  const defaultOpenKeys = getMenus(admin).map((item: any) => item.name);

  const renderMenu = (menus: IMenuItem[]) => {
    return menus.map((item) => {
      if (item.subMenu) {
        return (
          <SubMenu key={item.name} title={item.name}>
            {renderMenu(item.subMenu)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.name}>
          <Link to={item.path as string}>{item.name}</Link>
        </Menu.Item>
      );
    });
  };

  return (
    <div >
    <Menu 

      mode="inline"
      defaultOpenKeys={defaultOpenKeys}
      selectedKeys={[getDefaultSelectedName(getMenus(admin))]}
    >
      {renderMenu(getMenus(admin))}
    </Menu>
    </div>
  );
};
