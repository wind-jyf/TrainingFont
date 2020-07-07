import React, { useState, useContext } from 'react';
import { routes } from '../../route';
import { Link } from 'react-router-dom';
import $style from './style.module.scss';
import riceImg from '../../../../img/rice.jpg';
import maizeImg from '../../../../img/maize.jpg';
import rapeImg from '../../../../img/rape.jpg';
import cottonImg from '../../../../img/cotton.jpg';

import { Context } from '../../../../context';

export const Index = () => {

  const { state: { admin } } = useContext(Context);
  // const isAdmin =(admin: boolean)=>{
  //     return admin
  // }
    return (
        <div>
            <ul className={$style['wrapper']}>
                <li className={$style['item']}>
                    <Link className={$style['link']} to={!admin ? routes.rice.path : routes.adminRice.path } replace={true} >
                        <img className={$style['img']} src={riceImg} alt="rice" />
                        <div className={$style['shadow']}></div>
                        <div className={$style['icon']}>Click</div>
                    </Link>
                    <Link className={$style['subLink']} to={!admin ? routes.rice.path : routes.adminRice.path } >Rice (Oryza sativa)</Link>
                </li>
                <li className={$style['item']}>
                    <Link className={$style['link']} to={!admin ? routes.maize.path : routes.adminMaize.path } >
                        <img className={$style['img']} src={maizeImg} alt="maize" />
                        <div className={$style['shadow']}></div>
                        <div className={$style['icon']}>Click</div>
                    </Link>
                    <Link className={$style['subLink']} to={!admin ? routes.maize.path : routes.adminMaize.path } >Maize (Zea mays)</Link>
                </li>
                <li className={$style['item']}>
                    <Link className={$style['link']} to={!admin ? routes.rape.path : routes.adminRape.path } >
                        <img className={$style['img']} src={rapeImg} alt="rape" />
                        <div className={$style['shadow']}></div>
                        <div className={$style['icon']}>Click</div>
                    </Link>
                    <Link className={$style['subLink']} to={!admin ? routes.rape.path : routes.adminRape.path} >Rapeseed (Brassica napus)</Link>
                </li>
                <li className={$style['item']}>
                    <Link className={$style['link']} to={!admin ? routes.cotton.path : routes.adminCotton.path} >
                        <img className={$style['img']} src={cottonImg} alt="cotton" />
                        <div className={$style['shadow']}></div>
                        <div className={$style['icon']}>Click</div>
                    </Link>
                    <Link className={$style['subLink']} to={!admin ? routes.cotton.path : routes.adminCotton.path} >Cotton (Gossypium hirsutum)</Link>
                </li>
            </ul>
        </div>
    );
}