import React, { useEffect, useState } from 'react';

import { Pagination, Spin } from 'antd';

import { getGroupList } from '../../api/team';
import $style from "./style.module.scss";
import { LOCALES } from '../../constants/index';

interface Iprops {
    [key:string]: any;
}

const pageDefault = {
    lan:LOCALES.en,
    page: 1,
    page_size: 12
}

export const TeamEn = (props:Iprops) => {
    const [groupList, setGroupList] = useState([]);
    const [page, setPage] = useState({}) as any;

    const hanldePageInit = (res: any) => {
        const { groupList, pagination } = res;
        setGroupList(groupList);
        setPage(pagination);
    }

    useEffect(() => {
        getGroupList(pageDefault).then((res) => {
            hanldePageInit(res);
        });
    }, []);

    const handlePageChange = (page:number, pageSize?:number) => {
        getGroupList({lan: LOCALES.en, page, page_size: pageSize}).then((res) => {
            hanldePageInit(res);
        });
    }

    const handleToTeamDetail = (id:number) => {
        return () => props.history.push(`/teamDetail?id=${id}`);
    }

    const loading = groupList.length === 0;

    return (
        <div className={$style['groupWrapper']}>
            <Spin spinning={loading }>
                <div className={$style['groupList']}>
                    {loading ? null :
                        groupList.map((item:any, index) => {
                            return (
                            <div key={item.id} onClick={handleToTeamDetail(item.id)} className={index % 2 === 0 ? $style['groupItem'] : $style['dark'] + ' ' + $style['groupItem']}>
                                <img src={item.img} width='187' height='245'/>
                                <div className={$style['group']}>
                                    <div className={$style['groupContent']} dangerouslySetInnerHTML={{__html: item.left}}></div>
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