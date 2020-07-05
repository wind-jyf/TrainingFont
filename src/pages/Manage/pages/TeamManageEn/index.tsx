/**
 * @file: description
 * @author: yangqianjun
 * @Date: 2020-07-03 18:46:49
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-05 14:46:16
 */
import React, { useEffect, useState } from "react";
import { Divider, Input, Table, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import $style from "./style.module.scss";

interface Iprops {
  [key: string]: any;
}

const pageDefault = {
  page: 1,
  page_size: 15,
};

export const TeamManageEn = (props: Iprops) => {
  const [data, setData] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [page, setPage] = useState(pageDefault) as any;

  const handleToTeamEdit = () => {};

  const handleToTeamDelete = (id: number) => {};

  const handlePageChange = (page: number, pageSize?: number) => {
    // getNewsList({ page, page_size: pageSize }).then((res) => {
    //   hanldePageInit(res);
    // });
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
          <input type="file" onChange={e => {console.log(e)}} />
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
      </div>
      <div>
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
