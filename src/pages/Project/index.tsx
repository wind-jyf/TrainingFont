import React, { useEffect, useState } from 'react';

import { Pagination, Spin } from 'antd';

import { getProjectList } from '../../api/project';
import $style from "./style.module.scss";

interface Iprops {
    [key:string]: any;
}

export const Project = (props:Iprops) => {
    const [projectList, setProjectList] = useState([]);
    const [page, setPage] = useState({}) as any;

    const hanldePageInit = (res: any) => {
        const { projectList, pagination } = res;
        setProjectList(projectList);
        setPage(pagination);
    }

    useEffect(() => {
        getProjectList({
            page: 1,
            page_size: 20
        }).then((res) => {
            hanldePageInit(res);
        });
    }, []);

    const handlePageChange = (page:number, pageSize?:number) => {
        getProjectList({page, page_size: pageSize}).then((res) => {
            hanldePageInit(res);
        });
    }

    const loading = projectList.length === 0;

    return (
        <div className={$style['projectWrapper']}>
            <Spin spinning={loading }>
                <div className={$style['projectList']}>
                    {loading ? null :
                        projectList.map((item:any, index) => {
                            return (
                            <div key={item.id} className={index % 2 === 0 ? $style['projectItem'] : $style['dark'] + ' ' + $style['projectItem']}>
                                <div className={$style['project']}>
                                    <h3 className={$style['projectTitle']}>{item.projectname}</h3>
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