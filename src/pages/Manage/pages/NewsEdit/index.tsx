/**
 * @file: description
 * @author: xinguangtai
 * @Date: 2020-07-03 23:43:37
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-06 19:03:45
 */
import React, { useContext, useState, useEffect, useRef } from "react";

import { postNews, getNewsById, putNews } from "../../../../api/news";

import ReactQuill, { Quill } from "react-quill";

// import ImageResize from 'quill-image-resize-module';
import QuillResize from "quill-resize-module";
import "react-quill/dist/quill.snow.css";
import $style from "./style.module.scss";

import { Button, DatePicker, Input,message } from "antd";

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

export const NewsEdit = (props: any) => {
  const [editor, setEditor] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");

  // const [isAddNews, setIsAddNews] = useState(true);
  const [newsId, setNewsId] = useState(-1);

  const reactQuillRef = useRef(null);

  const handleNewsPost = () => {
    const content = getHTML();
    if (newsId === -1) {
      postNews({ date, name, content, lan: "CH" }).then(res => {
        res.code === 0 ? message.success('新增成功', 3) : message.error(res.message, 3)
      })
    } else {
      putNews({ id: newsId, date, name, content, lan: "CH" });
    }
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
    query[1] && setNewsId(query[1]);

    query[1] &&
      getNewsById({ id: query[1] }).then((res) => {
        setEditor(res.content);
      });
  }, []);

  const dateFormat = "YYYY-MM-DD";

  return (
    <>
      <div>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "30px" }}
        >
          <span style={{ width: "70px" }}>新闻标题:</span>
          <Input
            placeholder="新闻标题"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "20px",
            marginBottom: "10px",
          }}
        >
          <span style={{ width: "70px" }}>上传日期：</span>
          <DatePicker
            format={dateFormat}
            onChange={(value) => setDate(value ? value.format(dateFormat) : "")}
          />
        </div>

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
        onClick={handleNewsPost}
        // onClick={success}

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
