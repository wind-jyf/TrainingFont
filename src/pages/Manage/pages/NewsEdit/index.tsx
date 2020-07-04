/**
 * @file: description
 * @author: xinguangtai
 * @Date: 2020-07-03 23:43:37
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-04 23:37:20
 */
import React, { useContext, useState, useEffect, useRef } from "react";

import { postNews } from "../../../../api/news";

import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import $style from "./style.module.scss";

import { Button } from "antd";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
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
  const [editor, setEditor] = useState("") as any;

  const reactQuillRef = useRef(null);
  return (
    <>
      <div>
        <ReactQuill
          className={$style["newsEditWrapper"]}
          theme="snow"
          modules={modules}
          formats={formats}
          ref={reactQuillRef}
          value={editor}
          onChange={(value) => {
            setEditor(value);

            if (reactQuillRef && reactQuillRef.current) {
              // @ts-ignore
              const e = reactQuillRef.current.getEditor();
              // @ts-ignore
              const unprivilegedEditor = reactQuillRef.current.makeUnprivilegedEditor(
                e
              );
              // You may now use the unprivilegedEditor proxy methods
              console.log(unprivilegedEditor.getHTML());
            }
          }}
        />
      </div>
      <Button type="primary">提交</Button>
    </>
  );
};
