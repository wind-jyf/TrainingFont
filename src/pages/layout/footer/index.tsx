import React from 'react';
import $style from "./style.module.scss";
import intl from '../../../utils/intlSafe';

export const Footer = () => {
    return (
        <div className={$style['footer']}>
            <span className={$style['copyright']}>{intl.get('footer_copyright')}</span>
            <span>{intl.get('Homepage_Title')}</span>
        </div>
    )
}