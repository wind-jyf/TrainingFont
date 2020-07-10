/**
 * @file: description
 * @author: xinguangtai
 * @Date: 2020-07-03 23:43:37
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-08 21:28:19
 */
import React, { useContext, useState, useEffect, useRef } from "react";

import { postiInstrument } from "../../../../api/instrument";

import ReactQuill, { Quill } from "react-quill";

// import ImageResize from 'quill-image-resize-module';
import QuillResize from "quill-resize-module";
import "react-quill/dist/quill.snow.css";
import $style from "./style.module.scss";

import { Button, DatePicker, Input ,message } from "antd";

// Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/resize", QuillResize);

const modules = {
  toolbar: [
    // [{ header: [1, 2, false] }],
    // ["bold", "italic", "underline", "strike", "blockquote"],
    // [
    //   { list: "ordered" },
    //   { list: "bullet" },
    //   { indent: "-1" },
    //   { indent: "+1" },
    // ],
    ["link", "image"],
    // ["clean"],
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"],
  ],
  // ImageResize: { modules: ["Resize", "DisplaySize", "Toolbar"] },
  resize: { modules: ["Resize", "DisplaySize", "Toolbar"] },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export const InstrumentEdit = (props: any) => {
  const [editor, setEditor] = useState("");
  const [name, setName] = useState("");

  const reactQuillRef = useRef(null);

  const [lan, setLan] = useState("zh-CN");

  const handleInstrumentPost = () => {
    const content = getHTML();
    postiInstrument({ name, content, lan }).then(res=>{
      res.code === 0? message.success(res.data,3):message.error(res.data,3)
    });
    // if (newsId === -1) {
    //   postNews({ date, name, content, lan: "CH" });
    // } else {
    //   putNews({ id: newsId, date, name, content, lan: "CH" });
    // }
  };

  const getHTML = () => {
    if (reactQuillRef && reactQuillRef.current) {
      // @ts-ignore
      const e = reactQuillRef.current.getEditor();
      // @ts-ignore
      const unprivilegedEditor = reactQuillRef.current.makeUnprivilegedEditor(
        e
      );
      // You may now use the unprivilegedEditor proxy methods
      // console.log(unprivilegedEditor.getHTML());
      return unprivilegedEditor.getHTML();
    }
  };

  useEffect(() => {
    const search = props.history.location.search;
    if (!search) {
      return;
    }
    const query = search.split("=");
    query[1] && setLan(query[1]);
    console.log(query[1]);
  }, []);

  return (
    <div style={{marginLeft:'2%'}}>
      <div>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "30px",width:"800px"}}
        >
          <span style={{width:'80px'}}>仪器名称:</span>
          <Input
            placeholder="仪器名称"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>介绍如下:</div>
        <ReactQuill
          className={$style["newsEditWrapper"]}
          theme="snow"
          modules={modules}
          formats={formats}
          ref={reactQuillRef}
          value={editor}
          onChange={(value) => {
            setEditor(value);

            // if (reactQuillRef && reactQuillRef.current) {
            //   // @ts-ignore
            //   const e = reactQuillRef.current.getEditor();
            //   // @ts-ignore
            //   const unprivilegedEditor = reactQuillRef.current.makeUnprivilegedEditor(
            //     e
            //   );
            //   // You may now use the unprivilegedEditor proxy methods
            //   console.log(unprivilegedEditor.getHTML());
            // }
          }}
        />
      </div>
      <Button
        className={$style["submit"]}
        type="primary"
        onClick={handleInstrumentPost}
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
    </div>
  );
};
