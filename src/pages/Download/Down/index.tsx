import React, { useEffect, useState } from 'react';
import $style from './style.module.scss';

import { Pagination, Spin } from 'antd';
import { getDownloadList } from '../../../api/data';
import download from '../../../img/download.png';
import { Back } from '../../components/Back';

interface Iprops {
    [key: string]: any;
}

const pageDefault = {
    page: 1,
    page_size: 10
}

export const Down = (props: Iprops) => {

    const [fileList, setFileList] = useState([]);
    const [page, setPage] = useState({}) as any;

    const handlePageInit = (res: any) => {
        const { fileList, pagination } = res;
        setFileList(fileList);
        setPage(pagination);
    }

    useEffect(() => {
        getDownloadList(pageDefault).then((res) => {
            handlePageInit(res);
        })
    }, [])

    const handlePageChange = (page: number, pageSize?: number) => {
        getDownloadList({
            page,
            page_size: pageSize
        }).then((res) => {
            handlePageInit(res);
        })
    }

    const backClick: any = () => {
        window.history.go(-1);
    }

    const loading = fileList.length === 0;

    return (
        <div className={$style['downlaodWrapper']}>
            <Back />
            <Spin spinning={loading}>
                <div className={$style['table-title']}>
                    <div className={`${$style['table-title-long']} ${$style['table-title-color']}`}>Data</div>
                    <div className={`${$style['table-item-short']} ${$style['table-title-color']}`}>Date</div>
                    <div className={`${$style['table-item-short']} ${$style['table-title-color']}`}>Download</div>
                </div>
                {
                    loading ? null :
                        fileList.map((item: any, index) => {
                            return (
                                <div key={item.id} className={$style["table-data"]}>
                                    <div className={`${$style['table-item-long']}`}><a href={item.path}> {item.name}</a></div>
                                    <div className={`${$style['table-item-short']}`}>{item.date}</div>
                                    <div className={`${$style['table-item-short']}`}> <a href={item.path}><img src={download} alt="" /></a></div>
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
            </Spin>
        </div>
    )
}