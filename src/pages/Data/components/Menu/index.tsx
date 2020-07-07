import React, { useContext } from "react";
import { Menu } from "antd";
import { routes } from "../../route";
import { Link } from "react-router-dom";

import { Context } from '../../../../context';

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

  const { state: { admin } } = useContext(Context);

  const DEFAULT_ACTIVE_ITEM = {
    name: "Rice(Images)",
    path: routes.riceImages.path
  }


  const getMenus = (admin: boolean) => {
    const MENUS: IMenuItem[] = [
      {
        name: "Rice",
        subMenu: [
          {
            name: DEFAULT_ACTIVE_ITEM.name,
            path: DEFAULT_ACTIVE_ITEM.path
          }, {
            name: "Rice(Data)",
            path: routes.riceData.path
          }
        ]
      },

    ];
    return MENUS.filter(item => !item.hide)
  }

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
  }

  const defaultOpenKeys = getMenus(admin).map((item: any) => item.name);

  const renderMenu = (menus: IMenuItem[]) => {
    return menus.map(item => {
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
    <Menu
      mode="inline"
      defaultOpenKeys={defaultOpenKeys}
      selectedKeys={[getDefaultSelectedName(getMenus(admin))]}
    >
      {renderMenu(getMenus(admin))}
    </Menu>
  );
};
