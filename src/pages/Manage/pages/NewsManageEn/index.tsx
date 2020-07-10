/**
 * @file: description
 * @author: xinguangtai
 * @Date: 2020-07-03 21:44:22
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-09 00:30:56
 */

import React, { useContext, useState, useEffect } from "react";
import { Menu, Divider } from "antd";
import { routes } from "../../route";
import { Link } from "react-router-dom";

import { Context } from "../../../../context";
import { Table, Tag, Space, Button, Modal, Input, message } from "antd";
import { homedir } from "os";

import { getNewsList, deleteNews, putNews } from "../../../../api/news";
import { postNews } from "../../../../api/newsManage";
import { stringify } from "querystring";

const { TextArea } = Input;

const pageDefault = {
  page: 1,
  page_size: 15,
};

export const NewsManageEn = (props: any) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState({}) as any;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [newsTitle, setNewsTitle] = useState("");
  const [newsContent, setNewsContent] = useState("");
  const [newsId, setNewsId] = useState(-1);

  useEffect(() => {
    getNewsList({ ...pageDefault, lan: "en-US" }).then((res) => {
      hanldePageInit(res);
    });
  }, []);

  const hanldePageInit = (res: any) => {
    setData(res.newsList);
    setPage(res.pagination);
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    getNewsList({ page, page_size: pageSize, lan: "en-US" }).then((res) => {
      hanldePageInit(res);
    });
  };

  // const handleToNewsDetail = (id: number) => {
  //   return () => props.history.push(`/newsDetail?id=${id}`);
  // };

  const handleToNewsEdit = (id?: number, name?: string, content?: string) => {
    // return id != null
    //   ? () => props.history.push(`/manage/newsEdit?id=${id}`)
    //   : () => props.history.push(`/manage/newsEdit`);
    return () => {
      setIsModalVisible(true);
      if (id != null) {
        setNewsId(id);
        name && setNewsTitle(name);
        content && setNewsContent(content);
        // set
        // putNews({id, name: newsTitle, content: newsContent, lan: 'en-US'}).then(res => {
        //   getNewsList({ page: page.page, page_size: page.page_size, lan: "en-US" }).then((res) => {
        //     hanldePageInit(res);
        //   });
        // })
      } else {
        setNewsId(-1);
        // postNews({name: newsTitle, content: newsContent, lan: 'en-US'}).then(res => {
        //   getNewsList({ page: page.page, page_size: page.page_size, lan: "en-US" }).then((res) => {
        //     hanldePageInit(res);
        //   });
        // })
      }
    };
  };

  const handleToNewsDelete = (id: number) => {
    return () => {
      const con: boolean = window.confirm('请确认删除吗？');
      if (con) {
        deleteNews({ id, lan: "en-US" }).then((res) => {
          res.code === 0 ? message.success(res.data, 3) : message.error(res.data, 3)
          getNewsList({
            page: page.page,
            page_size: page.page_size,
            lan: "en-US",
          }).then((res) => {
            hanldePageInit(res);
          });
        });
      }
    };
  };

  const columns = [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: any) => (
        <div
          style={{
            fontSize:'18px',
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        // onClick={handleToNewsDetail(record.id)}
        >
          {text}
        </div>
      ),
    },
    {
      title: "内容",
      dataIndex: "content",
      key: "content",
      render : (text)=>(<div style={{fontSize:'18px'}}>
        {text}
      </div>)
    },
    {
      title: "操作",
      key: "action",
      width: 200,
      render: (record: any) => (
        <>
          <Button
            onClick={handleToNewsEdit(record.id, record.title, record.content)}
            type="primary"
            style={{ marginRight: "20px", fontSize: "16px", height: "40px", marginTop: "30px" }}
          >
            编辑
          </Button>
          <Button style={{ fontSize: "16px", height: "40px" }} onClick={handleToNewsDelete(record.id)} danger>
            删除
          </Button>
        </>
      ),
    },
  ];

  const handleOk = () => {
    if (newsId === -1) {
      postNews({ name: newsTitle, content: newsContent, lan: "en-US" }).then(
        (res) => {
          res.code === 0 ? message.success(res.data, 3) : message.error(res.data, 3)
          getNewsList({
            page: page.page,
            page_size: page.page_size,
            lan: "en-US",
          }).then((res) => {
            hanldePageInit(res);
          });
          setNewsContent("");
          setNewsTitle("");

        }

      );
    } else {
      putNews({
        id: newsId,
        name: newsTitle,
        content: newsContent,
        lan: "en-US",
      }).then((res) => {
        res.code === 0 ? message.success(res.data, 3) : message.error(res.data, 3)
        getNewsList({
          page: page.page,
          page_size: page.page_size,
          lan: "en-US",
        }).then((res) => {
          hanldePageInit(res);
        });
        setNewsContent("");
        setNewsTitle("");
      });
    }
    setIsModalVisible(false);
    // postNews()
  };

  return (
    <div style={{ marginLeft: '2%',fontFamily:'Times New Roman'}}>
      <Modal
        title="英文首页"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Input
          // rows={200}
          placeholder="标题"
          value={newsTitle}
          onChange={(e) => setNewsTitle(e.target.value)}
          style={{ fontSize: "18px" }}
        />
        <TextArea
          rows={10}
          placeholder="内容"
          value={newsContent}
          onChange={(e) => setNewsContent(e.target.value)}
          style={{ fontSize: "18px" }}
        />
      </Modal>

      <Button style={{ fontSize: "16px", height: "40px" }} type="primary" onClick={handleToNewsEdit()}>
        新增CPC
      </Button>
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
      />
    </div>
  );
};
