import React, { useState } from 'react';
import $style from './style.module.scss';

interface IProps {
    data: any;
}

export const DataDisplayer = (props:IProps) => {
    const { data } = props;
    
    const loading = data.length === 0;
    return (
        <>
            {loading ? null : (
            <div className={$style['dataWrapper']}>
                {data.map((item:any, index:number) => {
                    return <div className={$style['dataItemWrapper']} key={index}>
                        {Object.keys(item).map((res, index) => {
                            return (
                                <div className={$style['dataItem']} key={index}>
                                    <div className={$style['dataKey']}>{res}</div>
                                    <div className={$style['dataValue']}>{item[res]}</div>
                                </div>
                            )
                        })}
                    </div>
                })}
            </div>
           )}
       </>
    )
}