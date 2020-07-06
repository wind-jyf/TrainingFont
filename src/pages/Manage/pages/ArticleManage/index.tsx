/**
 * @file: description
 * @author: xinguangtai
 * @Date: 2020-07-03 20:07:23
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-06 08:48:41
 */
/**
 * @file: description
 * @author: yangqianjun
 * @Date: 2020-07-03 18:46:49
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-05 23:28:23
 */
import React, { useEffect, useState, useCallback, useRef } from "react";
import { Divider, Input, Table, Button, Upload, DatePicker, Radio } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { getArticleList, deleteArticle } from "../../../../api/article";

import $style from "./style.module.scss";

import axios from "axios";

interface Iprops {
  [key: string]: any;
}

const pageDefault = {
  page: 1,
  page_size: 5,
};

export const ArticleManage = (props: Iprops) => {
  const [data, setData] = useState([]);
  const [date, setDate] = useState("");
  const [lan, setLan] = useState("CN");

  const [name, setName] = useState("");

  const [page, setPage] = useState(pageDefault) as any;

  const uploadImg = useRef(null);
  const [file, setFile] = useState(null) as any;

  const hanldePageInit = (res: any) => {
    setData(res.articleList);
    setPage(res.pagination);
  };

  const getData = useCallback(() => {
    getArticleList(page).then((res) => {
      hanldePageInit(res);
    });
  }, []);

  useEffect(() => {
    getData();
  }, []);

  //   const handleToTeamEdit = (id: number) => {
  //     props.history.push(`/manage/teamEdit?id=${id}`);
  //   };

  const handleToArticleDelete = (id: number) => {
    deleteArticle({ id }).then((res) => getData());
  };

  const handleToTeamPost = () => {
    const form = document.createElement("form");
    const formdata = new FormData(form);
    // formdata.append('file', uploadImg.current && uploadImg.current.files && uploadImg.current.files[0]);
    formdata.append("file", file);
    formdata.append("lan", lan);
    formdata.append("date", date);
    formdata.append("name", name);
    //@ts-ignore
    for (const value of formdata.values()) {
      console.log(value);
    }
    axios({
      headers: {
        "content-type": "multipart/form-data;",
      },
      method: "post",
      url: "/api/crophe/article",
      data: formdata,
    }).then((res) => {
      getData();
    });
    setName("");
    // if (uploadImg.current) {
    //   uploadImg.current.files = null;
    // }
    // let request = new XMLHttpRequest();
    // request.open("POST", "/api/crophe/group");
    // request.setRequestHeader("content-type", 'multipart/form-data;')
    // request.send(formdata);
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    getArticleList({ page, page_size: pageSize }).then((res) => {
      hanldePageInit(res);
    });
  };

  const handleToArticle = (path: string) => {
      window.open(path)
  }

  const columns = [
    {
      title: "文章名",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <div
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
          onClick={() => handleToArticle(record.path)}
        >
          {text}
        </div>
      ),
    },
    {
      title: "语言",
      dataIndex: "language",
      key: "language",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "日期",
      dataIndex: "date",
      key: "date",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "操作",
      key: "action",
      render: (record: any) => (
        <Button onClick={() => handleToArticleDelete(record.id)} danger>
          删除
        </Button>
      ),
    },
  ];

  const dateFormat = "YYYY-MM-DD";

  return (
    <div className={$style["article-manage"]}>
      <div>
        <div style={{ marginTop: "20px" }}>添加</div>
        <Divider
          style={{
            marginTop: "10px",
            marginBottom: "20px",
            borderBottom: "1px solid #ddd",
          }}
        />
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "20px" }}
        >
          <div style={{ width: "60px" }}>文章名:</div>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "20px",
            marginBottom: "10px",
          }}
        >
          <span style={{ width: "70px" }}>发表日期：</span>
          <DatePicker
            format={dateFormat}
            onChange={(value) => setDate(value ? value.format(dateFormat) : "")}
          />
        </div>

        <div>
          <Radio.Group onChange={(e) => setLan(e.target.value)} value={lan}>
            <Radio value={"EN"}>English</Radio>
            <Radio value={"CN"}>Chinese</Radio>
          </Radio.Group>
        </div>

        <div
          style={{ display: "flex", alignItems: "center", marginTop: "20px" }}
        >
          <div style={{ marginTop: "8px", width: "70px" }}>导入pdf:</div>
          <input
            ref={uploadImg}
            type="file"
            onChange={(e) => {
              console.log(e.target.files && e.target.files[0]);
              e.target.files && setFile(e.target.files[0]);
            }}
          />
        </div>
        <Button
          type="primary"
          onClick={handleToTeamPost}
          style={{ marginTop: "20px", marginLeft: "60px" }}
        >
          提交
        </Button>
      </div>
      <div style={{ paddingTop: "100px" }}>
        <div>操作</div>
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
    </div>
  );
};
