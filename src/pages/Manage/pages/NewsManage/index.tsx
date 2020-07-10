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
import { Table, Tag, Space, Button, message, Modal } from "antd";
import { homedir } from "os";

import { getNewsList, deleteNews } from "../../../../api/news";

const pageDefault = {
  page: 1,
  page_size: 15,
};

export const NewsManage = (props: any) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState({}) as any;

  const [visibleDelete, setVisibleDelete] = useState(false) as any;

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

  const handleToNewsDelete = () => {
    setVisibleDelete(true)
    // return () => {
    //   deleteNews({id, lan: 'CH'}).then(res => {
    //     getNewsList({ page: page.page, page_size: page.page_size }).then((res) => {
    //       hanldePageInit(res);
    //     });
    //     res.code === 0? message.success(res.data,3):message.error(res.data,3)
    //   })
    // }
  }

  const handleCancel = () => {
    setVisibleDelete(false)
  }
  const handleOK = (id: number) => {
    console.log('handleOKid :>> ', id);
    setVisibleDelete(false)
  }


  const columns = [
    {
      title: "新闻",
      dataIndex: "name",
      key: "name",
      width: 800,
      render: (text: string, record: any) => (
        <div
          style={{
            width: "1000px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            fontSize:"1.5em",
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
      width: 800,
      render: (date: string, record: any) => (
        <div
          style={{
            width: "100px",
            // overflow: "hidden",
            whiteSpace: "nowrap",
            fontSize:"1.5em",
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
            style={{ marginRight: "20px",fontSize:"1.2em" }}
          >
            编辑
          </Button>
          <Button onClick={handleToNewsDelete} style={{ fontSize:"1.2em" }} danger>删除</Button>
          <Modal
            title="提示"
            visible={visibleDelete}
            onOk={() => handleOK(record.id)}
            onCancel={handleCancel}
          >
            <p>确认要删除吗?</p>
          </Modal>
        </>
      ),
    },
  ];

  return (
    <div style={{paddingLeft:"10vw",paddingRight:"10vw"}}>
      <Button type="primary" onClick={handleToNewsEdit()} style={{ marginLeft: "20px",marginBottom:"20px",marginTop:"10px",fontSize:"1.2em" }}>
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
