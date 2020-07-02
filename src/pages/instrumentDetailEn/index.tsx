import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import queryString from 'query-string';
import $style from "./style.module.scss";

import { getInstrumentById } from '../../api/instrument';
import { LOCALES } from '../../constants/index';

export const InstrumentDetailEn = () => {
    const searchQuerys = queryString.parse(window.location.search);
    const [instrumentInfo, setInstrumentInfo] = useState({}) as any;

    useEffect(() => {
        getInstrumentById({lan: LOCALES.en, id:searchQuerys.id}).then((res: any) => {
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