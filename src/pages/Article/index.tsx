/**
 * @file: description
 * @author: yangqianjun
 * @Date: 2020-07-02 17:45:07
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-08 19:39:55
 */
import React, { useEffect, useState } from 'react';
import intl from '../../utils/intlSafe';

import { Pagination, Spin } from 'antd';

import { getArticleList } from '../../api/article';
import $style from "./style.module.scss";

interface Iprops {
    [key: string]: any;
}

const LAN_MAP = {
    'zh-CN': 'CH',
    'en-US': 'EN'
} as any;

export const Article = (props: Iprops) => {
    const [articleList, setArticleList] = useState([]);
    const [page, setPage] = useState({}) as any;
    const { currentLocale } = intl.getInitOptions();
    const lan = LAN_MAP[currentLocale];

    const hanldePageInit = (res: any) => {
        const { articleList, pagination } = res;
        setArticleList(articleList);
        setPage(pagination);
    }

    useEffect(() => {
        getArticleList({
            lan,
            page: 1,
            page_size: 10
        }).then((res) => {
            hanldePageInit(res);
        });
    }, [lan]);

    const handlePageChange = (page: number, pageSize?: number) => {
        getArticleList({ lan, page, page_size: pageSize }).then((res) => {
            hanldePageInit(res);
        });
    }

    const handleToArticle = (path: string) => {
        return () => window.open(path);
    }

    const loading = articleList.length === 0;

    return (
        <div className={$style['articleWrapper']}>
            <Spin spinning={loading}>
                <div className={$style['articleList']}>
                    {loading ? null :
                        articleList.map((item: any, index) => {
                            return (
                                <div key={item.id} onClick={handleToArticle(item.path)}
                                    className={
                                        index % 2 === 0
                                            ? $style["articleItem"]
                                            : $style["dark"] + " " + $style["articleItem"]
                                    }>
                                    <div className={$style['article']}>
                                        <h3 className={$style['articleTitle']}>{item.name}</h3>
                                    </div>
                                    <div className={$style['date']}>{item.date}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </Spin>
            <Pagination
                className={$style['pagination']}
                size="small"
                showSizeChanger={false}
                showQuickJumper
                total={page.total ? page.total : 0}
                current={page.page ? page.page : 1}
                pageSize={page.page_size ? page.page_size : 10}
                onChange={handlePageChange}
            />
        </div>
    )
}