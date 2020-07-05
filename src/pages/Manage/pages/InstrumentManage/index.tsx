/**
 * @file: description
 * @author: yangqianjun
 * @Date: 2020-07-03 18:46:49
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-05 17:17:03
 */
import React, { useEffect, useState, useCallback, useRef } from "react";
import { Divider, Input, Table, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import {
  getInstrumentList,
  deleteInstrumentById,
} from "../../../../api/instrument";

import $style from "./style.module.scss";

import axios from "axios";

interface Iprops {
  [key: string]: any;
}

const pageDefault = {
  page: 1,
  page_size: 5,
};

export const InstrumentManage = (props: Iprops) => {
  const [data, setData] = useState([]);
  const [dataEn, setDataEn] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [page, setPage] = useState(pageDefault) as any;
  const [pageEn, setPageEn] = useState(pageDefault) as any;

  const uploadImg = useRef(null);
  const [file, setFile] = useState(null) as any;

  const hanldePageInit = (res: any) => {
    setData(res.instrumentList);
    setPage(res.pagination);
  };

  const hanldePageInitEn = (res: any) => {
    setDataEn(res.instrumentList);
    setPageEn(res.pagination);
  };

  const getData = useCallback(() => {
    getInstrumentList({ ...page, lan: "en-US" }).then((res) => {
      hanldePageInitEn(res);
    });
    getInstrumentList({ ...page, lan: "zh-CN" }).then((res) => {
      hanldePageInit(res);
    });
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const handleToTeamEdit = () => {};

  const handleToInstrumentDelete = (id: number, lan: "en-US" | "zh-CN") => {
    deleteInstrumentById({ id, lan }).then((res) => getData());
  };

//   const handleToTeamPost = () => {
//     const formdata = new FormData();
//     // formdata.append('file', uploadImg.current && uploadImg.current.files && uploadImg.current.files[0]);
//     formdata.append("avator", file);
//     formdata.append("lan", "zh-CN");
//     formdata.append("describe", description);
//     formdata.append("name", name);
//     //@ts-ignore
//     for (const value of formdata.values()) {
//       console.log(value);
//     }
//     var request = new XMLHttpRequest();
//     request.open("POST", "/api/crophe/group");
//     request.setRequestHeader("content-type", "multipart/form-data;");
//     request.send(formdata);
//   };

  const handlePageChange = (page: number, pageSize?: number) => {
    getInstrumentList({ page, page_size: pageSize, lan: "zh-CN" }).then(
      (res) => {
        hanldePageInit(res);
      }
    );
  };

  const handlePageChangeEn = (page: number, pageSize?: number) => {
    getInstrumentList({ page, page_size: pageSize, lan: "en-US" }).then(
      (res) => {
        hanldePageInitEn(res);
      }
    );
  };

  const columns = [
    {
      title: "仪器",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <div
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
          // onClick={handleToNewsDetail(record.id)}
        >
          {text}
        </div>
      ),
    },
    {
      title: "操作",
      key: "action",
      render: (record: any) => (
        <>
          <Button onClick={() => handleToInstrumentDelete(record.id, 'zh-CN')} danger>
            删除
          </Button>
        </>
      ),
    },
  ];

  const columnsEn = [
    {
      title: "仪器",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <div
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
          // onClick={handleToNewsDetail(record.id)}
        >
          {text}
        </div>
      ),
    },
    {
      title: "操作",
      key: "action",
      render: (record: any) => (
        <>
          <Button onClick={() => handleToInstrumentDelete(record.id, 'en-US')} danger>
            删除
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className={$style["team-manage"]}>
      <div style={{ paddingTop: "100px" }}>
        <Button type="primary" onClick={() => props.history.push(`/manage/instrumentEdit?lan=zh-CN`)}>增加仪器中文介绍</Button>
        <Divider
          style={{
            marginTop: "10px",
            marginBottom: "20px",
            borderBottom: "1px solid #ddd",
          }}
        />
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
        ></Table>
      </div>
      <div style={{ paddingTop: "100px" }}>
        <Button type="primary"  onClick={() => props.history.push(`/manage/instrumentEdit?lan=en-US`)}>增加仪器英文介绍</Button>
        <Divider
          style={{
            marginTop: "10px",
            marginBottom: "20px",
            borderBottom: "1px solid #ddd",
          }}
        />
        <Table
          columns={columnsEn}
          dataSource={dataEn}
          pagination={{
            size: "small",
            showSizeChanger: false,
            showQuickJumper: true,
            total: pageEn.total ? pageEn.total : 0,
            current: pageEn.page ? pageEn.page : 1,
            pageSize: pageEn.page_size ? pageEn.page_size : 15,
            onChange: handlePageChangeEn,
          }}
        ></Table>
      </div>
    </div>
  );
};
