/**
 * @file: description
 * @author: yangqianjun
 * @Date: 2020-07-03 18:46:49
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-06 11:00:05
 */
import React, { useEffect, useState, useCallback } from "react";
import {
  Divider,
  Input,
  Table,
  Button,
  Upload,
  Pagination,
  Collapse,
  message
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { getGroupList, deleteTeamById } from "../../../../api/team";

import $style from "./style.module.scss";
import { DropdownAndPickUp } from "./DropdownAndPickUp";

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

  // const uploadImg = useRef(null);
  const [file, setFile] = useState(null) as any;


  const hanldePageInit = (res: any) => {
    setData(res.groupList);
    setPage(res.pagination);
  };

  const getData = useCallback(() => {
    getGroupList({ ...page, lan: "en-US" }).then((res) => {
      hanldePageInit(res);
    });
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const handleTeamAdd = () => {
    props.history.push("/manage/TeamEnManageEdit");
  };

  const handleToTeamEdit = (id: number) => {
    props.history.push(`/manage/TeamEnManageEdit?id=${id}`);
  };

  const handleToTeamDelete = (id: number) => {
    return () => {
      console.log('id :>> ', id);
      const con: boolean = window.confirm('请确认删除吗？');
      if (con) {
        deleteTeamById({ id, lan: "en-US" }).then((res) => { getData(); res.code === 0 ? message.success(res.data, 3) : message.error(res.data, 3) });
      }
    }
  };


  const handlePageChange = (page: number, pageSize?: number) => {
    getGroupList({ page, page_size: pageSize, lan: "en-US" }).then((res) => {
      hanldePageInit(res);
    });
  };

  const renderPersonData = (
    id: number,
    img: string,
    left: string,
    content: string,
    foot: string
  ) => (
      <div>
        <Button style={{ marginTop: '10px' }} danger onClick={handleToTeamDelete(id)}>删除</Button>
        <Button style={{ marginLeft: '10px' }} type="primary" onClick={() => handleToTeamEdit(id)}>修改</Button>
        <div className={$style["personData"]}>Person Data</div>
        <div className={$style["imgWrapper"]}>

          <div
            className={$style["left"]}
            dangerouslySetInnerHTML={{ __html: left }}
          ></div>
          <div className={$style["personImg"]}>
            <img src={img} />
          </div>
        </div>
        <DropdownAndPickUp>
          <div
            className={$style["content"]}
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
          <div
            className={$style["foot"]}
            dangerouslySetInnerHTML={{ __html: foot }}
          ></div>
        </DropdownAndPickUp>
      </div>
    );

  return (
    <div className={$style["team-manage"]}>
      <Button type="primary" onClick={handleTeamAdd}>
        添加
      </Button>

      {data.map((item: any) =>
        renderPersonData(item.id, item.img, item.left, item.content, item.foot)
      )}
      {/* <div>
        <div style={{marginTop:'20px'}}>添加团队成员</div>
        <Divider style={{marginTop:'10px',marginBottom:'20px',borderBottom:'1px solid #ddd'}}/>
        <div style={{display:'flex',alignItems: 'center', marginTop: '20px'}}>
          <div style={{width:'60px'}}>Name:</div>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div style={{display:'flex',alignItems: 'center', marginTop: '20px'}}>
          <div style={{marginTop:'8px',width:'70px'}}>导入图片:</div>
          <input type="file" onChange={e => {console.log(e)}} />
        
        </div>
        <div style={{display:'flex',alignItems: 'center', marginTop: '20px'}}>
          <div style={{marginTop:'20px',width:'60px'}}>描述:</div>
          <Input.TextArea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div> */}
      {/* <div style={{ paddingTop: "100px" }}>
        <div>修改/删除</div>
        <Divider style={{marginTop:'10px',marginBottom:'20px',borderBottom:'1px solid #ddd'}}/>
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
      </div> */}

      <Pagination
        className={$style["pagination"]}
        size="small"
        showSizeChanger={false}
        showQuickJumper
        total={page.total ? page.total : 0}
        current={page.page ? page.page : 1}
        pageSize={page.page_size ? page.page_size : 8}
        onChange={handlePageChange}
      />
    </div>
  );
};
