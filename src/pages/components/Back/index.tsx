import React from 'react';
import $style from './style.module.scss';

interface Iprops {
    [key: string]: any;
}


export const Back = (props: Iprops) => {

    const backClick: any = () => {
        window.history.go(-1);
    }

    return (
        <div className={$style['backButton']}>
            <button onClick={() => { backClick() }} >Back</button>
        </div>
    )
}
