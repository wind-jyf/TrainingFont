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
                <span className={$style['right']}>版权所有</span>
                </div>
                <span>作物表型中心</span>
                <span>通讯地址：中国 · 湖北 · 武汉 南湖狮子山街一号　邮编：430070</span>
            </div>
        </div>
    )
}