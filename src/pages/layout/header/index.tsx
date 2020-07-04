import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu, Dropdown } from 'antd';
import $style from "./style.module.scss";
import intl, {isZhCN} from '../../../utils/intlSafe';

import { Login } from '../../components/login';

import { LANGUAGE_MENU } from '../../../constants';

import { Context } from '../../../context';

interface IMenuItem {
    title: string;
    route: string;
    children?: any;
    hide?: boolean
}

interface Iprops {
    changeLocale:any
    currentLocale:string
}

const getMenus = (admin:boolean) => {
  const MENUS: IMenuItem[] = [
    {
        title: 'news', route: '/news'
    },
    {
        title: 'team', route: '/team'
    },
    {
      title: 'instrument', route: '/instrument',
    },
    {
      title: 'article', route: '/article',
    },
    {
      title: 'project', route: '/project', hide: !isZhCN()
    },
    {
      title: 'data', route: '/dataSearch'
    },
    {
      title: 'manage', route: '/manage'
    },
    {
      title: 'position', route: '/position'
    }
  ];
  return MENUS.filter(item => !item.hide)
}



export const Header = (props: Iprops) => {
    const { currentLocale, changeLocale } = props;

    const { state: {admin} } = useContext(Context);
    const menus = getMenus(admin);

    const handleMenuClick = (data:any) => {
        changeLocale(data.key);
      };

    const activeTitle = (
        // menus.find(v => window.location.pathname.includes(v.route)) || {}
        // 别的路由如果携带相关字符，也会 active
        menus.find(v => window.location.pathname.match(new RegExp( v.route + "$","gim"))) || {}
      ).title;

      const languageMenuJSX = (
        <Menu onClick={handleMenuClick} selectedKeys={[currentLocale]}>
          {Object.keys(LANGUAGE_MENU).map(item => (
            <Menu.Item className={$style[`${currentLocale === item ? 'ant-dropdown-menu-item-selected' : ''}`]} key={item}>
              {LANGUAGE_MENU[item]}
            </Menu.Item>
          ))}
        </Menu>
      );
    return (
        <div className={$style['header']}>
            <div className={$style['logo-container']}>
                <div className={$style['logo']}></div>
            </div>
            <nav>
                {menus.map(v => (
                    <Link
                        className={$style[`${activeTitle === v.title ? 'active' : ''}`]}
                        key={v.title}
                        to={v.route}
                    >
                        {intl.get(v.title)}
                    </Link>
                ))}
            </nav>
            <div className={$style['actions']}>
                <Login/>
                <Dropdown overlayClassName="language-dropdown" overlay={languageMenuJSX}>
                  <Button className={$style["language-btn"]}>
                    {LANGUAGE_MENU[currentLocale]}
                    <span className={$style["triangle"]} />
                  </Button>
                </Dropdown>
              </div>
        </div>
    )
}