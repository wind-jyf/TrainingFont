/**
 * @file: description
 * @author: xinguangtai
 * @Date: 2020-07-02 17:45:07
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-09 11:06:47
 */
import React from 'react';
import $style from "./style.module.scss";
import intl from '../../../utils/intlSafe';

export const Footer = () => {
    return (
        <div>
            <div className={$style['footer']}>
                 <div>
                <span className={$style['copyright']}>{intl.get('footer_copyright')}</span>
                <span>{intl.get('Homepage_Title')}</span>
                <span className={$style['right']}></span>
                </div>
                <span>{intl.get('footer-middle')}</span>
                <span>{intl.get('footer-adress')}</span> 

                {/*<div>
                    <div className={$style['footer']}>
                        <div>
                            <span className={$style['copyright']}>{intl.get('footer_copyright')}</span>
                            <span>{intl.get('Homepage_Title')}</span>
                        </div>
                        <span>作物表型中心</span>
                        <span>通讯地址：中国 · 湖北 · 武汉 南湖狮子山街一号　邮编：430070</span>
                    </div>
                </div>
                */}
            </div>
        </div>
    )
}