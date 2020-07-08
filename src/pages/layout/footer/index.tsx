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
            </div>
        </div>
    )
}