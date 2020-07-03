/**
 * @file: description
 * @author: yangqianjun
 * @Date: 2020-07-03 14:47:16
 * @LastEditors: yangqianjun
 * @LastEditTime: 2020-07-03 14:51:55
 */
import React, { useEffect, useState, useRef } from "react";

import { Pagination, Spin } from "antd";

import $style from "./style.module.scss";
import { LOCALES } from "../../constants/index";


import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Iprops {
  [key: string]: any;
}

const pageDefault = {
  lan: LOCALES.zh,
  page: 1,
  page_size: 12,
};

export const Manage = (props: Iprops) => {
  const [instrumentList, setInstrumentList] = useState([]);
  const [page, setPage] = useState({}) as any;

  const [editor, setEditor] = useState("") as any;

  const reactQuillRef = useRef(null);




  const loading = instrumentList.length === 0;

  // const submitContent = () => {
  //   const htmlContent = editor.toText();
  //   const htmlContent2 = String(editor.toHTML());
  //   // const result = await saveEditorContent(htmlContent)
  //   console.log(editor);
  //   console.log(htmlContent);
  //   console.log("1" + htmlContent2);
  //   // alert(htmlContent)
  // };

  const   modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  return (
    <div className={$style["instrumentWrapper"]}>
      <Spin spinning={loading}>
        <div>
          <ReactQuill
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
              // console.log(ReactQuill.getHTML(value))
            }}
          />
        </div>

{/* 
          {loading
            ? null
            : 
          } */}
      </Spin>
    </div>
  );
};
