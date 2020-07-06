/**
 * @file: projectname
 * @author: yangqianjun
 * @Date: 2020-07-03 18:46:49
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-06 08:56:26
 */
import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  createElement,
} from "react";
import { Divider, Input, Table, Button, Upload, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import {
  getProjectList,
  deleteProjectById,
  postProject,
  putProject,
} from "../../../../api/project";

import $style from "./style.module.scss";

import axios from "axios";

interface Iprops {
  [key: string]: any;
}

const pageDefault = {
  page: 1,
  page_size: 5,
};

export const ProjectManage = (props: Iprops) => {
  const [data, setData] = useState([]);

  const [projectname, setProjectName] = useState("");
  const [modalProjectname, setModalProjectname] = useState("");
  const [ModalId, setModalId] = useState(-1);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [page, setPage] = useState(pageDefault) as any;

  const uploadImg = useRef(null);
  const [file, setFile] = useState(null) as any;

  const hanldePageInit = (res: any) => {
    setData(res.projectList);
    setPage(res.pagination);
  };

  const getData = useCallback(() => {
    getProjectList(page).then((res) => {
      hanldePageInit(res);
    });
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const handleToProjectDelete = (id: number) => {
    deleteProjectById({ id }).then((res) => getData());
  };

  const handleToProjectPost = () => {
    postProject({ projectname }).then((res) => getData());
  };

  const handleToProjectEdit = (id: number, projectname: string) => {
    setModalProjectname(projectname);
    setModalId(id);
    setIsModalVisible(true);
    // putProject({ id, projectname }).then((res) => {
    //   getData();
    //   setModalProjectname("");
    // });
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    getProjectList({ page, page_size: pageSize }).then((res) => {
      hanldePageInit(res);
    });
  };

  const columns = [
    {
      title: "项目名",
      dataIndex: "projectname",
      key: "projectname",
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
            onClick={() => handleToProjectEdit(record.id, record.projectname)}
            type="primary"
            style={{ marginRight: "20px" }}
          >
            编辑
          </Button>
          <Button onClick={() => handleToProjectDelete(record.id)} danger>
            删除
          </Button>
        </>
      ),
    },
  ];

  const handleModalOk = () => {
    setIsModalVisible(false);
    putProject({ id: ModalId, projectname: modalProjectname }).then((res) => {
      getData();
      setModalProjectname("");
    });
  };

  return (
    <div className={$style["project-manage"]}>
      <Modal
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Input.TextArea
          rows={5}
          value={modalProjectname}
          onChange={(e) => setModalProjectname(e.target.value)}
          //   placeholder=""
        />
      </Modal>
      <div>
        <div
          // style={{ display: "flex", alignItems: "center", marginTop: "20px" }}
        >
          <div style={{ marginTop: "20px" ,width:'50px'}}>添加</div>
          <Divider
            style={{
              marginTop: "10px",
              marginBottom: "20px",
              borderBottom: "1px solid #ddd",
            }}
          />
          <div style={{  display: "flex", alignItems: "center",marginTop: "20px"}}>
            <div style={{ width: "80px" }}>项目介绍:</div>
            <Input.TextArea
              rows={5}
              value={projectname}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
          
        </div>
        <Button
          type="primary"
          onClick={handleToProjectPost}
          style={{ marginTop: "20px", marginLeft: "80px" }}
        >
          提交
        </Button>
      </div>
      <div style={{ paddingTop: "100px" }}>
        <div>修改/删除</div>
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
