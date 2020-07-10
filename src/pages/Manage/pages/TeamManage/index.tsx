/**
 * @file: description
 * @author: yangqianjun
 * @Date: 2020-07-03 18:46:49
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-08 23:43:20
 */
import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  createElement,
} from "react";
import { Divider, Input, Table, Button, Upload ,message,Modal } from "antd";
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

  const [visible, setVisible] = useState(false) as any;

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

  const handleToTeamEdit = (id:number) => {
    props.history.push(`/manage/teamManageEdit?id=${id}`)
  };

  const handleToTeamDelete = () => {
    setVisible(true)
  };
  const handleCancel = () => {
    setVisible(false)
  }
  const handleOK = (id: number) => {
    deleteTeamById({ id, lan: "zh-CN" }).then((res) => {getData();res.code === 0? message.success(res.data,3):message.error(res.data,3)});
    setVisible(false)
  }
  const handleToTeamPost = () => {
    const form = document.createElement("form");
    const formdata = new FormData(form);
    // formdata.append('file', uploadImg.current && uploadImg.current.files && uploadImg.current.files[0]);
    formdata.append("avator", file);
    formdata.append("lan", "zh-CN");
    formdata.append("describe", description);
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
      url: "/api/crophe/group",
      data: formdata,
    }).then((res) => {
      getData();
      res.data.code === 0? message.success(res.data.data,3):message.error(res.data.data,3)
    });
    setFile(null);
    setName("");
    setDescription("");
    // if (uploadImg.current) {
    //   uploadImg.current.files = null;
    // }
    // let request = new XMLHttpRequest();
    // request.open("POST", "/api/crophe/group");
    // request.setRequestHeader("content-type", 'multipart/form-data;')
    // request.send(formdata);
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
            fontSize:"16px",
            height:"50px"
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
            onClick={() => handleToTeamEdit(record.id)}
            type="primary"
            style={{ marginRight: "20px",fontSize:"1.2em",marginTop:"20px" }}
          >
            编辑
          </Button>
          <Button onClick={handleToTeamDelete} style={{fontSize:"1.2em", }} danger>
            删除
          </Button>
          <Modal
            title="提示"
            visible={visible}
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
    <div className={$style["team-manage"]}>
      <div>
        <div style={{ marginTop: "20px",fontSize:"1.2em" }}>添加团队成员</div>
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
          <div style={{ width: "60px",fontSize:"16px" }}>姓名:</div>
          <Input value={name} onChange={(e) => setName(e.target.value)} style={{width:"600px"}}/>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "20px" }}
        >
          <div style={{ marginTop: "8px", width: "100px",fontSize:"16px" }}>导入图片:</div>
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
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "20px" }}
        >
          <div style={{ marginTop: "20px", width: "60px",fontSize:"1.2em" }}>描述:</div>
          <Input.TextArea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{width:"600px",height:"400px"}}
          />
        </div>
        <Button
          type="primary"
          onClick={handleToTeamPost}
          style={{ marginTop: "20px", marginLeft: "60px",fontSize:"16px" }}
        >
          提交
        </Button>
      </div>
      <div style={{ paddingTop: "100px",fontSize:"16px" }}>
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
