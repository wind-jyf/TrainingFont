/**
 * @file: description
 * @author: yangqianjun
 * @Date: 2020-07-02 17:45:07
 * @LastEditors: yangqianjun
 * @LastEditTime: 2020-07-03 17:05:43
 */
import React, { useEffect, useState, useRef } from "react";

import { Pagination, Spin } from "antd";

import { getInstrumentList } from "../../api/instrument";
import $style from "./style.module.scss";
import { LOCALES } from "../../constants/index";
import instrumentPic from "../../img/instrument-pic.jpg";
import { getInstrumentById } from "../../api/instrument";

import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Iprops {
  [key: string]: any;
}

const pageDefault = {
  lan: LOCALES.zh,
  page: 1,
  page_size: 4,
};

export const Instrument = (props: Iprops) => {
  const [instrumentList, setInstrumentList] = useState([]);
  const [page, setPage] = useState({}) as any;

  const [editor, setEditor] = useState("") as any;

  const reactQuillRef = useRef(null);

  //   useEffect(() => {
  //     // console.log(editor);
  //     // const e = BraftEditor.createEditorState('')
  //     // setEditor(e)
  //     // const s = BraftEditor.createEditorState(`<p>Hello <b>World!</b></p>`);
  //     // console.log(s.toHTML())
  //   }, []);

  const hanldePageInit = (res: any) => {
    const { instrumentList, pagination } = res;
    // setInstrumentList(instrumentList);
    setPage(pagination);

    Promise.all(
      instrumentList.map((item: any, index: any) => {
        return new Promise((resolve, reject) => {
          console.log(item);
          getInstrumentById({ lan: LOCALES.zh, id: item.id }).then((res) => {
            console.log(res);
            const picSrc = res.content.match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i);
            console.log(picSrc[1]);
            item.picSrc = picSrc[1]
              ? require("../../img/" + picSrc[1])
              : instrumentPic;
            resolve(item);
          });
          // item.picSrc = /<IMG src=\"([^\"]*?)\">/gi;
        });
      })
    ).then((res) => setInstrumentList(res as any));
  };

  useEffect(() => {
    getInstrumentList(pageDefault).then((res) => {
      hanldePageInit(res);
    });
  }, []);

  const handlePageChange = (page: number, pageSize?: number) => {
    getInstrumentList({ lan: LOCALES.zh, page, page_size: pageSize }).then(
      (res) => {
        hanldePageInit(res);
      }
    );
  };

  const handleToInstrumentDetail = (id: number) => {
    return () => props.history.push(`/instrumentDetail?id=${id}`);
  };

  const loading = instrumentList.length === 0;

  const submitContent = () => {
    const htmlContent = editor.toText();
    const htmlContent2 = String(editor.toHTML());
    // const result = await saveEditorContent(htmlContent)
    console.log(editor);
    console.log(htmlContent);
    console.log("1" + htmlContent2);
    // alert(htmlContent)
  };

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

        <div className={$style["instrumentList"]}>
          {loading
            ? null
            : instrumentList.map((item: any, index) => {
                return (
                  <div
                    key={item.id}
                    onClick={handleToInstrumentDetail(item.id)}
                    className={
                      index % 2 === 0
                        ? $style["instrumentItem"]
                        : $style["dark"] + " " + $style["instrumentItem"]
                    }
                  >
                    <div className={$style["instrument"]}>
                      <div className={$style["instrument-img-wrapper"]}>
                        {/* <img src={instrumentPic} alt="" /> */}
                        <img src={item.picSrc} alt="" />
                      </div>
                      <h3 className={$style["instrumentTitle"]}>{item.name}</h3>
                    </div>
                  </div>
                );
              })}
          <Pagination
            className={$style["pagination"]}
            size="small"
            showSizeChanger={false}
            showQuickJumper
            total={page.total ? page.total : 0}
            current={page.page ? page.page : 1}
            pageSize={page.page_size ? page.page_size : 10}
            onChange={handlePageChange}
          />
        </div>
      </Spin>
    </div>
  );
};
