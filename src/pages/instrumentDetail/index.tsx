/**
 * @file: description
 * @author: yangqianjun
 * @Date: 2020-07-02 17:45:07
 * @LastEditors: yangqianjun
 * @LastEditTime: 2020-07-03 10:08:22
 */
import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import queryString from 'query-string';
import $style from "./style.module.scss";

import { getInstrumentById } from '../../api/instrument';
import { LOCALES } from '../../constants/index';

export const InstrumentDetail = () => {
    const searchQuerys = queryString.parse(window.location.search);
    const [instrumentInfo, setInstrumentInfo] = useState({}) as any;

    useEffect(() => {
        getInstrumentById({lan: LOCALES.zh, id:searchQuerys.id}).then((res: any) => {
            setInstrumentInfo(res);
        });
    }, []);

    const loading = !Boolean(instrumentInfo.id);

    return (
        <Spin spinning={loading}>
            <div className={$style['detailWrapper']}>
                <div className={$style['groupName']}>{instrumentInfo.name}</div>
                <div className={$style['detailContent']} dangerouslySetInnerHTML={{__html: instrumentInfo.content}}></div>
            </div>
        </Spin>
    )
}