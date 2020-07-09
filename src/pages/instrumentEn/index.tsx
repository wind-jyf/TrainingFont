/**
 * @file: description
 * @author: yangqianjun
 * @Date: 2020-07-02 17:45:07
 * @LastEditors: yangqianjun
 * @LastEditTime: 2020-07-03 20:00:31
 */
import React, { useEffect, useState, useRef } from "react";

import { Pagination, Spin } from "antd";

import { getInstrumentList } from "../../api/instrument";
import $style from "./style.module.scss";
import { LOCALES } from "../../constants/index";
import instrumentPic from "../../img/instrument-pic.jpg";
import { getInstrumentById } from "../../api/instrument";
interface Iprops {
  [key: string]: any;
}

const pageDefault = {
  lan: LOCALES.en,
  page: 1,
  page_size: 4,
};

export const InstrumentEn = (props: Iprops) => {
  const [instrumentList, setInstrumentList] = useState([]);
  const [page, setPage] = useState({}) as any;

  const hanldePageInit = (res: any) => {
    const { instrumentList, pagination } = res;
    // setInstrumentList(instrumentList);
    setPage(pagination);

    Promise.all(
      instrumentList.map((item: any, index: any) => {
        return new Promise((resolve, reject) => {
          console.log(item);
          getInstrumentById({ lan: LOCALES.en, id: item.id }).then((res) => {
            console.log(res);
            const picSrc = res.content.match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i);
            console.log(picSrc[1]);
            item.picSrc = picSrc[1]
              //   ? require("../../img/" + picSrc[1])
              ? picSrc[1]
              : instrumentPic;
            resolve(item);
          });
          // item.picSrc = /<IMG src=\"([^\"]*?)\">/gi;
        });
      })
    ).then((res) => setInstrumentList(res as any));
  };

  useEffect(() => {
    getInstrumentList(pageDefault).then((res) => {
      hanldePageInit(res);
    });
  }, []);

  const handlePageChange = (page: number, pageSize?: number) => {
    getInstrumentList({ lan: LOCALES.en, page, page_size: pageSize }).then(
      (res) => {
        hanldePageInit(res);
      }
    );
  };

  const handleToInstrumentDetail = (id: number) => {
    return () => props.history.push(`/instrumentDetail?id=${id}`);
  };

  const loading = instrumentList.length === 0;

  return (
    <div className={$style["instrumentWrapper"]}>
      <Spin spinning={loading}>

        <div className={$style["instrumentList"]}>
          {loading
            ? null
            : instrumentList.map((item: any, index) => {
              return (
                <div
                  key={item.id}
                  onClick={handleToInstrumentDetail(item.id)}
                  className={
                    index % 2 === 0
                      ? $style["instrumentItem"]
                      : $style["dark"] + " " + $style["instrumentItem"]
                  }
                >
                  <div className={$style["instrument"]}>
                    <div className={$style["instrument-img-wrapper"]}>
                      {/* <img src={instrumentPic} alt="" /> */}
                      <img src={item.picSrc} alt="" />
                    </div>
                    <h3 className={$style["instrumentTitle"]}>{item.name}</h3>
                  </div>
                </div>
              );
            })}
        </div>
      </Spin>
      <Pagination
        className={$style["pagination"]}
        size="small"
        showSizeChanger={false}
        showQuickJumper
        total={page.total ? page.total : 0}
        current={page.page ? page.page : 1}
        pageSize={page.page_size ? page.page_size : 10}
        onChange={handlePageChange}
      />
    </div>
  );
};
