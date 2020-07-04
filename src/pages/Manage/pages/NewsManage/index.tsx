/**
 * @file: description
 * @author: xinguangtai
 * @Date: 2020-07-03 21:44:22
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-03 23:48:31
 */

import React, { useContext, useState, useEffect } from "react";
import { Menu } from "antd";
import { routes } from "../../route";
import { Link } from "react-router-dom";

import { Context } from "../../../../context";
import { Table, Tag, Space, Button } from "antd";
import { homedir } from "os";

import { getNewsList } from "../../../../api/news";

const pageDefault = {
  page: 1,
  page_size: 15,
};

export const NewsManage = (props: any) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState({}) as any;

  useEffect(() => {
    getNewsList(pageDefault).then((res) => {
      hanldePageInit(res);
    });
  }, []);

  const hanldePageInit = (res: any) => {
    setData(res.newsList);
    setPage(res.pagination);
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    getNewsList({ page, page_size: pageSize }).then((res) => {
      hanldePageInit(res);
    });
  };

  const handleToNewsDetail = (id: number) => {
    return () => props.history.push(`/newsDetail?id=${id}`);
  };

  const handleToNewsEdit = (id: number) => {
    return () => props.history.push(`/manage/newsEdit?id=${id}`);
  };

  const columns = [
    {
      title: "新闻",
      dataIndex: "name",
      key: "name",
      width: 800,
      render: (text: string, record: any) => (
        <div
          style={{
            width: "700px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
          onClick={handleToNewsDetail(record.id)}
        >
          {text}
        </div>
      ),
    },
    {
      title: "时间",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "操作",
      key: "action",
      render: (record: any) => (
        <>
          <Button onClick={handleToNewsEdit(record.id)} type="primary" style={{ marginRight: "20px" }}>
            编辑
          </Button>
          <Button danger>删除</Button>
        </>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        size: "small",
        showSizeChanger: false,
        showQuickJumper: true,
        total: page.total ? page.total : 0,
        current: page.page ? page.page : 1,
        pageSize: page.page_size ? page.page_size : 15,
        onChange: handlePageChange,
      }}
    />
  );
};
