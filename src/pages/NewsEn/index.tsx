/**
 * @file: description
 * @author: yangqianjun
 * @Date: 2020-07-02 17:45:07
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-06 12:17:37
 */
import React, { useEffect, useState } from "react";

import { Pagination, Spin } from "antd";

import { getNewsList } from "../../api/news";
import $style from "./style.module.scss";
import newsPic from "../../img/news-pic.jpg";
import { getNewsById } from "../../api/news";

interface Iprops {
  [key: string]: any;
}

interface news {
  name: string;
  id: number;
  date: string;
  subtitle?: string;
}

const pageDefault = {
  page: 1,
  page_size: 8,
};

export const NewsEn = (props: Iprops) => {
  const [newsList, setNewsList] = useState<Array<news>>([]);
  const [page, setPage] = useState({}) as any;

  const [newsImg, setNewsImg] = useState(newsPic as any);

  const hanldePageInit = (res: any) => {
    const { newsList, pagination } = res;
    setNewsList(newsList);
    setPage(pagination);

    console.log(newsList);
    // 分页器初始化后，根据需求需要拿到内容并显示一部分,
    // TODO: 用 promise.all
  };

  useEffect(() => {
    getNewsList({...pageDefault, lan: 'en-US'}).then((res) => {
      hanldePageInit(res);
    });
  }, []);

  const handlePageChange = (page: number, pageSize?: number) => {
    getNewsList({ page, page_size: pageSize }).then((res) => {
      hanldePageInit(res);
    });
  };

  // const handleToNewsDetail = (id: number) => {
  //   return () => props.history.push(`/newsDetail?id=${id}`);
  // };

  const loading = newsList.length === 0;

  return (
    <div className={$style["newsWrapper"]}>
      <Spin spinning={loading}>
        <div className={$style["newsList"]}>
          {loading ? null : (
            <>
              {
                newsList.map((item: any) => <div>
                  <div className={$style['news-name']}>{item.title}</div>
                  <div className={$style['news-content']}>{item.content}</div>
                </div>)
              }
            </>
          )}
          <Pagination
            className={$style["pagination"]}
            size="small"
            showSizeChanger={false}
            showQuickJumper
            total={page.total ? page.total : 0}
            current={page.page ? page.page : 1}
            pageSize={page.page_size ? page.page_size : 8}
            onChange={handlePageChange}
          />
        </div>
      </Spin>
    </div>
  );
};
