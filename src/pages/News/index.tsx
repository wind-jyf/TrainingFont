/**
 * @file: description
 * @author: yangqianjun
 * @Date: 2020-07-02 17:45:07
 * @LastEditors: yangqianjun
 * @LastEditTime: 2020-07-03 16:41:56
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

export const News = (props: Iprops) => {
  const [newsList, setNewsList] = useState<Array<news>>([]);
  const [page, setPage] = useState({}) as any;

  const [newsImg, setNewsImg] = useState(newsPic as any);

  const hanldePageInit = (res: any) => {
    const { newsList, pagination } = res;
    // setNewsList(newsList);
    setPage(pagination);

    console.log(newsList);
    // 分页器初始化后，根据需求需要拿到内容并显示一部分,
    // TODO: 用 promise.all
    Promise.all(
      newsList.map((news: any) => {
        return new Promise((resolve, reject) => {
          getNewsById({ id: news.id }).then((res) => {
            let str = res.content.slice(0);
            str.match(/\^+(?=<)/g);
            let result = str.match(/[^>]+(?=<)/g);
            result = result ? result.join(",") : "";

            const picSrc = res.content.match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i);
            picSrc[1] && newsImg === newsPic && setNewsImg(picSrc[1])

            news.subtitle = result.slice(0, 100);
            resolve(news);
          });
        });
      })
    ).then((list) => setNewsList(list as news[]));
  };

  useEffect(() => {
    getNewsList(pageDefault).then((res) => {
      hanldePageInit(res);
    });
  }, []);

  const handlePageChange = (page: number, pageSize?: number) => {
    getNewsList({ page, page_size: pageSize }).then((res) => {
      hanldePageInit(res);
    });
  };

  const handleToNewsDetail = (id: number) => {
    return () => props.history.push(`/newsDetail?id=${id}`);
  };

  const loading = newsList.length === 0;

  const renderNewsMainContent = (title: string, content: string, id: number) => (
    <div className={$style["news-main-content"]} onClick={handleToNewsDetail(id)}>
      <h3 className={$style["news-main-content-title"]}>{title}</h3>
      <p className={$style["news-main-content-bottom"]}>{content}</p>
    </div>
  );

  // console.log('state', newsList[0]?.subtitle)
  return (
    <div className={$style["newsWrapper"]}>
      <Spin spinning={loading}>
        <div className={$style["newsList"]}>
          {loading ? null : (
            <>
              {page.page === 1 && (
                <>
                  <div className={$style["newsListTop"]}>
                    <div className={$style["news-img-wrapper"]}>
                      <img src={newsImg} width="100%"  height="100%" alt="" />
                    </div>
                    <div className={$style["news-img-right-part"]}>
                      {renderNewsMainContent(
                        newsList[0].name,
                        String(newsList[0].subtitle), 0
                      )}
                      {/* {String(newsList[0].subtitle)} */}
                      {renderNewsMainContent(
                        newsList[1].name,
                        newsList[1].subtitle ? newsList[1].subtitle : "", 1
                      )}
                    </div>
                  </div>

                  <div className={$style["news-list-middle"]}>
                    {renderNewsMainContent(
                      newsList[2].name,
                      newsList[2].subtitle + "", 2
                    )}
                    {renderNewsMainContent(
                      newsList[3].name,
                      newsList[3].subtitle + "", 3
                    )}
                  </div>
                </>
              )}
              <div className={$style["news-list-bottom"]}>
                {newsList
                  .slice(page.page === 1 ? 4 : 0)
                  .map((news: news, index) => (
                    <div
                      key={news.id}
                      onClick={handleToNewsDetail(news.id)}
                      className={
                        $style["newsItem"]
                        // index % 2 === 0
                        //   ? $style["newsItem"]
                        //   : $style["dark"] + " " + $style["newsItem"]
                      }
                    >
                      <div className={$style["news-date"]}>
                        <div className={$style["news-date-day"]}>
                          {news.date.slice(8)}
                        </div>
                        <div className={$style["news-date-year"]}>
                          {news.date.slice(0, 7)}
                        </div>
                      </div>
                      <div className={$style["news-content"]}>
                        <h3 className={$style["newsTitle"]}>{news.name}</h3>
                        <span className={$style["newsSubtitle"]}>
                          {newsList[page.page === 1 ? index + 4 : index]
                            .subtitle
                            ? newsList[page.page === 1 ? index + 4 : index]
                                .subtitle
                            : ""}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
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
