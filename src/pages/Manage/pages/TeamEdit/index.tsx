/**
 * @file: description
 * @author: xinguangtai
 * @Date: 2020-07-03 23:43:37
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-05 23:45:44
 */
import React, { useContext, useState, useEffect, useRef } from "react";

import { getGroupById } from "../../../../api/team";

import $style from "./style.module.scss";

import { Button, Input } from "antd";
import axios from "axios";

export const TeamEdit = (props: any) => {
  const [name, setName] = useState("");
  const [id, setId] = useState(-1);
  const [avator, setAvator] = useState("");
  const [descripe, setDescripe] = useState("");
  const [file, setFile] = useState(null) as any;

  const handleTeamPost = () => {
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("lan", "zh-CN");
    formdata.append("descripe", descripe);
    formdata.append("avator", file);
    //@ts-ignore
    for (const value of formdata.values()) {
      console.log(value);
    }
    axios({
      headers: {
        "content-type": "multipart/form-data;",
      },
      method: "put",
      // method: "post",
      url: "/api/crophe/group",
      data: formdata,
    }).then((res) => {
      // getData();
      // 关闭页面
    });
  };

  useEffect(() => {
    const search = props.history.location.search;
    if (!search) {
      return;
    }
    const query = search.split("=");
    query[1] && setId(query[1]);

    query[1] &&
      getGroupById({ id: query[1] }).then((res) => {
        setName(res.name);
        setDescripe(res.descripe);
        setAvator(res.img);
      });
  }, []);

  return (
    <>
      <div>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "30px" }}
        >
          <span style={{ width: "70px" }}>姓名:</span>
          <Input
            // className={$style["newsTitle"]}
            placeholder="姓名"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <img width="100px" height="100px" alt="人相" src={avator} />
        </div>
        <div>
          {" "}
          <input
            type="file"
            onChange={(e) => {
              console.log(e.target.files && e.target.files[0]);
              e.target.files && setFile(e.target.files[0]);
            }}
          />
        </div>
        <div>
          <Input.TextArea
            rows={15}
            value={descripe}
            onChange={(e) => setDescripe(e.target.value)}
          />
        </div>
      </div>
      <Button
        className={$style["submit"]}
        type="primary"
        onClick={handleTeamPost}
      >
        提交
      </Button>

      {/* <Button
        className={$style["preview"]}
        type="primary"
        onClick={handleNewsPost}
      >
        预览
      </Button> */}
    </>
  );
};
