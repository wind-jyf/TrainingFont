import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu, Dropdown,Carousel } from 'antd';
import { DownOutlined } from '@ant-design/icons';
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
      title: 'manage', route: '/manage', hide: !admin,
    },
    {
      title: 'position', route: '/position',hide: !isZhCN()
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
      const menu = (
        <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.greenpheno.com">
          武汉谷丰光电科技有限公司
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.plant-phenotyping.org/">
          国际植物表型组学会		
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.plant-phenotyping-network.eu/">
          欧洲植物表型组学会		
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.ukppn.org.uk/">
          英国植物表型组学会				
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.dppn.de/dppn/EN/Home/home_node.html">
          德国植物表型组学会			
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://nappn.plant-phenotyping.org/">
          北美植物表型组学会				
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.plantphenomics.org.au/">
          澳大利亚植物表型中心			
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.plant-phenomics.ac.uk/en/">
          英国植物表型中心			
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://mustang.biol.mcgill.ca:8087/mcgill_mp3_summary.html">
          加拿大麦吉尔植物表型中心			
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.ipk-gatersleben.de/">
          德国IPK研究中心						
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.fz-juelich.de/ibg/ibg-2/DE/Organisation/JPPC/JPPC_node.html">
          德国尤利希植物表型中心			
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www1.montpellier.inra.fr/ibip/lepse/english/">
          法国蒙彼利埃INRA表型中				
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="https://www.cpib.ac.uk/">
          英国诺丁汉大学植物表整合植物生物学研究中心    			
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.au.dk/en/">
          丹麦奥胡斯大学		
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="https://ag.purdue.edu/plantsciences/Pages/Phenotyping.aspx">
          美国普渡大学植物表型研究组					
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.wisc.edu/">
          美国威斯康星大学		
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.danforthcenter.org/">
          美国丹佛植物科学研究中心		 
          </a>
        </Menu.Item>
      </Menu>
        )
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
      
      <div style={{marginBottom:'10px',background:'#fff'}}>
        <div className={$style['logo']}>
          <img style={{margin:'0 auto'}} src={require("../../../img/header.jpg")} alt="logo"/>
          <div className={$style['right']}>
            <Dropdown overlay={menu} placement="bottomCenter" trigger={['click']}>
              <Button>--友情链接--</Button>
            </Dropdown>
            
            <div className={$style['actions']}>               
                <Dropdown overlayClassName="language-dropdown" overlay={languageMenuJSX}>
                  <p className={$style["language-btn"]}>
                    {LANGUAGE_MENU[currentLocale]}
                    <span className={$style["triangle"]} />
                  </p>
                </Dropdown>
                <div style={{marginLeft:'30%'}}>
                <Login/>
                </div>
            </div>
          </div>
        </div>
        <div className={$style['header']}>
            <nav className={$style['nav']}>
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
            
        </div>
        <Carousel autoplay>
              <div>
                <img src={require("../../../img/baar1.png")} alt="bar"/>
              </div>
              <div>
                <img src={require("../../../img/baar2.png")} alt="bar"/>
              </div>
              <div>
                <img src={require("../../../img/baar3.png")} alt="bar"/>
              </div>
              <div>
                <img src={require("../../../img/baar4.png")} alt="bar"/>
              </div>
              <div>
                <img src={require("../../../img/baar5.png")} alt="bar"/>
              </div>
            </Carousel>
        </div>  
    )
}