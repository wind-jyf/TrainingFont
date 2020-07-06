/**
 * @file: description
 * @author: xinguangtai
 * @Date: 2020-07-03 23:43:37
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-06 11:23:40
 */
import React, { useContext, useState, useEffect, useRef } from "react";

import { getGroupById } from "../../../../api/team";

import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import $style from "./style.module.scss";

import { Button, DatePicker, Input } from "antd";
import Axios from "axios";

export const TeamEditEn = (props: any) => {
  const [content, setContent] = useState("");
  const [foot, setFoot] = useState("");
  const [img, setImg] = useState("");
  const [left, setLeft] = useState("");
  const [id, setId] = useState(-1);

  const [file, setFile] = useState(null) as any;

  const handleTeamEnPost = () => {
    const formdata = new FormData();
    formdata.append("content", content);
    formdata.append("lan", "en-US");
    formdata.append("foot", foot);
    formdata.append("img", file);
    formdata.append("left", left);

    if(id === -1) {
      Axios({
        method: 'post',
        headers: {
          "content-type": "multipart/form-data;",
        },
        url: "/api/crophe/group",
        data: formdata,
      })
    } else {
      formdata.append("id", id + '');
      Axios({
        method: 'put',
        headers: {
          "content-type": "multipart/form-data;",
        },
        url: "/api/crophe/group",
        data: formdata,
      })
    }
  };

  useEffect(() => {
    const search = props.history.location.search;
    if (!search) {
      return;
    }
    const query = search.split("=");
    query[1] && setId(query[1]);

    query[1] &&
      getGroupById({ id: query[1], lan: "en-US" }).then((res) => {
        setFoot(res.foot);
        setLeft(res.left);
        setImg(res.img);
        setContent(res.content);
      });
  }, []);

  return (
    <>
      <div className={$style['wrapper']}>
        <div style={{width:'800px'}}>
          <div style={{marginTop:'20px'}}>添加Name, Gender, Telephone, Email</div>
          <Input.TextArea
            rows={10}
            placeholder="left"
            value={left}
            onChange={(e) => setLeft(e.target.value)}
          />
        </div>
        <div className={$style['img-wrapper']}>
          <div style={{marginLeft:'40px',marginTop:'40px'}}>
            <img src={img} width="100px" height="100px" />
          </div>
          <div style={{marginTop:'60px',display:'flex'}}>
            <div>导入照片</div>
            <input
              type="file"
              // value={file}
              onChange={(e) => {
                console.log(e.target.files && e.target.files[0]);
                e.target.files && setFile(e.target.files[0]);
              }}
            />
          </div>
        </div>
      </div>
      
     
      <div style={{marginTop:'30px'}}>
        <div style={{marginTop:'20px'}}>添加Institution, Adress(可以为空)</div>
        <Input.TextArea
          rows={10}
          placeholder="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div style={{marginTop:'30px'}}>
        <div style={{marginTop:'20px'}}>添加Education, Position Held, Current Research Interests, Current Research Activities, Current Research Programs, Honors and Rewards等信息</div>
        <Input.TextArea
          rows={10}
          placeholder="foot"
          value={foot}
          onChange={(e) => setFoot(e.target.value)}
        />
      </div>
      <Button type="primary" onClick={handleTeamEnPost} style={{marginTop:'20px'}}>
        提交
      </Button>
    </>
  );
};
