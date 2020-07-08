/**
 * @file: description
 * @author: yangqianjun
 * @Date: 2020-07-03 14:47:16
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-03 22:45:34
 */
import React, { useEffect, useState, useRef } from "react";
// import $style from "./style.module.scss";
// import { LOCALES } from "../../../../constants/index";


import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Iprops {
  [key: string]: any;
}


export const Editor = (props: Iprops) => {

  const [editor, setEditor] = useState("") as any;

  const reactQuillRef = useRef(null);

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
    <div>
    {/* <div className={$style["editor-wrapper"]}> */}
          <ReactQuill
            // className={$style["editor"]}
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
  );
};
