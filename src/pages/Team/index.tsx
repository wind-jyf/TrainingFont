import React, { useEffect, useState } from 'react';

import { Pagination, Spin } from 'antd';

import { getGroupList } from '../../api/team';
import $style from "./style.module.scss";
import { LOCALES } from '../../constants/index';
import teamPic from "../../img/team-pic.jpg";
import { getGroupById } from '../../api/team';

interface Iprops {
    [key:string]: any;
}

const pageDefault = {
    lan:LOCALES.zh,
    page: 1,
    page_size: 6
}

export const Team = (props:Iprops) => {
    const [groupList, setGroupList] = useState([]);
    const [page, setPage] = useState({}) as any;

    const hanldePageInit = (res: any) => {
        const { groupList, pagination } = res;
        setGroupList(groupList);
        setPage(pagination);

        // Promise.all(
        //     groupList.map((item: any, index: any) => {
        //       return new Promise((resolve, reject) => {
        //         console.log(item);
        //         getGroupById({ lan: LOCALES.zh, id: item.id }).then((res) => {
        //           console.log(res);
        //           const picSrc = res.content.match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i);
        //           console.log(picSrc[1]);
        //           item.picSrc = picSrc[1]
        //             ? require("../../img/" + picSrc[1])
        //             : teamPic;
        //           resolve(item);
        //         });
        //         // item.picSrc = /<IMG src=\"([^\"]*?)\">/gi;
        //       });
        //     })
        //   ).then((res) => setGroupList(res as any));
        // };
    }

  

    useEffect(() => {
        getGroupList(pageDefault).then((res) => {
            hanldePageInit(res);
        });
    }, []);

    const handlePageChange = (page:number, pageSize?:number) => {
        getGroupList({lan: LOCALES.zh, page, page_size: pageSize}).then((res) => {
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
                            <div key={item.id} onClick={handleToTeamDetail(item.id)} className={$style['groupItem']}>
                            {/* <div key={item.id} onClick={handleToTeamDetail(item.id)} className={index % 2 === 0 ? $style['groupItem'] : $style['dark'] + ' ' + $style['groupItem']}> */}
                                {/* <img src={item.img} width='187' height='245'/> */}
                                <div className={$style['group']}>
                                    <div className={$style['group-img-wrapper']}>
                                        <img src={item.img} alt="" />
                                        {/*<img src={teamPic}  alt="" />*/}
                                    </div>
                                    <h2 className={$style['group-title']}>{item.name}</h2>
                                    <span></span>
                                    <p  className={$style['group-subtitle']}>{item.descripe.slice(0, 100)}</p>
                                    {/* <h3 className={$style['group-subTitle']}>{}</h3> */}
                                    {/* <div className={$style['groupContent']} dangerouslySetInnerHTML={{__html: item.descripe}}></div> */}
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