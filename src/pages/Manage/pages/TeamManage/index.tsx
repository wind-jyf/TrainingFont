/**
 * @file: description
 * @author: yangqianjun
 * @Date: 2020-07-03 18:46:49
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-05 15:49:27
 */
import React, { useEffect, useState, useCallback, useRef } from "react";
import { Divider, Input, Table, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { getGroupList, deleteTeamById } from "../../../../api/team";

import $style from "./style.module.scss";

import axios from "axios";

interface Iprops {
  [key: string]: any;
}

const pageDefault = {
  page: 1,
  page_size: 5,
};

export const TeamManage = (props: Iprops) => {
  const [data, setData] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [page, setPage] = useState(pageDefault) as any;

  const uploadImg = useRef(null);
  const [file, setFile] = useState(null) as any;

  const hanldePageInit = (res: any) => {
    setData(res.groupList);
    setPage(res.pagination);
  };

  const getData = useCallback(() => {
    getGroupList(page).then((res) => {
      hanldePageInit(res);
    });
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const handleToTeamEdit = () => {};

  const handleToTeamDelete = (id: number) => {
    deleteTeamById({ id, lan: "zh-CN" }).then((res) => getData());
  };

  const handleToTeamPost = () => {
    const formdata = new FormData();
    // formdata.append('file', uploadImg.current && uploadImg.current.files && uploadImg.current.files[0]);
    formdata.append("avator", file);
    formdata.append("lan", "zh-CN");
    formdata.append("describe", description);
    formdata.append("name", name);
    //@ts-ignore
    for (const value of formdata.values()) {
      console.log(value);
    }
    var request = new XMLHttpRequest();
    request.open("POST", "/api/crophe/group");
    request.setRequestHeader("content-type", 'multipart/form-data;')
    request.send(formdata);
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    getGroupList({ page, page_size: pageSize }).then((res) => {
      hanldePageInit(res);
    });
  };

  const columns = [
    {
      title: "姓名",
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
          <Button
            // onClick={handleToTeamEdit(record.id)}
            onClick={handleToTeamEdit}
            type="primary"
            style={{ marginRight: "20px" }}
          >
            编辑
          </Button>
          <Button onClick={() => handleToTeamDelete(record.id)} danger>
            删除
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className={$style["team-manage"]}>
      <div>
        <div>添加团队成员</div>
        <Divider />
        <div>
          <div>姓名</div>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <div>导入图片</div>
          <input
            ref={uploadImg}
            type="file"
            onChange={(e) => {
              console.log(e.target.files && e.target.files[0]);
              e.target.files && setFile(e.target.files[0]);
            }}
          />
          {/* <Button>点击上传</Button> */}
        </div>
        <div>
          <div>描述</div>
          <Input.TextArea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {/* <Input value={name} onChange={(e) => setName(e.target.value)} /> */}
        </div>
        <Button type="primary" onClick={handleToTeamPost}>
          提交
        </Button>
      </div>
      <div style={{ paddingTop: "100px" }}>
        <div>修改/删除</div>
        <Divider />
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
