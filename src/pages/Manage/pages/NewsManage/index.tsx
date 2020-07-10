/**
 * @file: description
 * @author: xinguangtai
 * @Date: 2020-07-03 21:44:22
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-09 10:49:45
 */

import React, { useContext, useState, useEffect } from "react";
import { Menu } from "antd";
import { routes } from "../../route";
import { Link } from "react-router-dom";

import { Context } from "../../../../context";
import { Table, Tag, Space, Button, message } from "antd";
import { homedir } from "os";

import { getNewsList, deleteNews } from "../../../../api/news";

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

  const handleToNewsEdit = (id?: number) => {
    return id != null
      ? () => props.history.push(`/manage/newsManageEdit?id=${id}`)
      : () => props.history.push(`/manage/newsManageEdit`);
  };

  const handleToNewsDelete = (id: number) => {
    return () => {
      deleteNews({ id, lan: 'CH' }).then(res => {
        getNewsList({ page: page.page, page_size: page.page_size }).then((res) => {
          hanldePageInit(res);
        });
        res.code === 0 ? message.success(res.data, 3) : message.error(res.data, 3)
      })
    }
  }

  const columns = [
    {
      title: "新闻",
      dataIndex: "name",
      key: "name",
      //width: 800,
      render: (text: string, record: any) => (
        <div
          style={{
            width: "100%",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            fontSize: "16px",
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
      //width: 800,
      render: (date: string, record: any) => (
        <div
          style={{
            width: "100%",
            // overflow: "hidden",
            whiteSpace: "nowrap",
            fontSize: "16px",
            // textOverflow: "ellipsis",
          }}
        // onClick={handleToNewsDetail(record.id)}
        >
          {date}
        </div>
      ),
    },
    {
      title: "操作",
      key: "action",
      render: (record: any) => (
        <>
          <Button
            onClick={handleToNewsEdit(record.id)}
            type="primary"
            style={{ marginRight: "20px", fontSize: "16px" }}
          >
            编辑
          </Button>
          <Button onClick={handleToNewsDelete(record.id)} style={{ fontSize: "16px" }} danger>删除</Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ marginLeft: '2%' }}>
      <Button type="primary" onClick={handleToNewsEdit()}>
        新增新闻
      </Button>
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
    </div>
  );
};
