import React, { useEffect, useState } from 'react';

import { Pagination, Spin } from 'antd';

import { getNewsList } from '../../api/news';
import $style from "./style.module.scss";
import news from '../../img/news.jpg';

interface Iprops {
    [key:string]: any;
}

const pageDefault = {
    page: 1,
    page_size: 10
}

export const News = (props:Iprops) => {
    const [newsList, setNewsList] = useState([]);
    const [page, setPage] = useState({}) as any;

    const hanldePageInit = (res: any) => {
        const { newsList, pagination } = res;
        setNewsList(newsList);
        setPage(pagination);
    }

    useEffect(() => {
        getNewsList(pageDefault).then((res) => {
            hanldePageInit(res);
        });
    }, []);

    const handlePageChange = (page:number, pageSize?:number) => {
        getNewsList({page, page_size: pageSize}).then((res) => {
            hanldePageInit(res);
        });
    }

    const handleToNewsDetail = (id:number) => {
        return () => props.history.push(`/newsDetail?id=${id}`);
    }

    const loading = newsList.length === 0;

    return (
        <div className={$style['newsWrapper']}>
            <Spin spinning={loading }>
                <div className={$style['newsList']}>
                    {loading ? null :
                        newsList.map((item:any, index) => {
                            return (
                            <div key={item.id} onClick={handleToNewsDetail(item.id)} className={index % 2 === 0 ? $style['newsItem'] : $style['dark'] + ' ' + $style['newsItem']}>
                                <img src={news} width='300' height='159'/>
                                <div className={$style['news']}>
                                    <h3 className={$style['newsTitle']}>{item.name}</h3>
                                    <span className={$style['newsDate']}>{item.date}</span>
                                </div>
                            </div>
                            )
                        })
                    }
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
            </Spin>
        </div>
    )
}