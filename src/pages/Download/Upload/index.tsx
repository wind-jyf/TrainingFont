import React, { useEffect, useState } from 'react';
import $style from './style.module.scss';

import { Pagination, Spin, message } from 'antd';
import { getDownloadList, uploadFile, deleteFileById } from '../../../api/data';

interface Iprops {
  [key: string]: any;
}

const pageDefault = {
  page: 1,
  page_size: 10
}

export const Upload = (props: Iprops) => {
  const [fileList, setFileList] = useState([]);
  const [page, setPage] = useState({}) as any;
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [file, setFile] = useState(new Blob());
  const [loading2, setLoading2] = useState(false) as any;

  const loading = fileList.length === 0;


  const handlePageInit = (res: any) => {
    const { fileList, pagination } = res;
    setFileList(fileList);
    setPage(pagination);
  }

  useEffect(() => {
    getDownloadList(pageDefault).then((res) => {
      handlePageInit(res);
    })
  }, [])

  const handlePageChange = (page: number, pageSize?: number) => {
    getDownloadList({
      page,
      page_size: pageSize
    }).then((res) => {
      handlePageInit(res);
    })
  }

  const nameChanged = (e: any) => {
    setName(e.target.value);
  }

  const dateChanged = (e: any) => {
    setDate(e.target.value)
  }

  const fileChanged = (e: any) => {
    setFile(e.target.files[0]);
  }

  const submit = () => {
    console.log('file :>> ', file);
    if (name === '' || date === '' || file.size === 0) {
      message.error("请完善信息")
      return
    }
    const form = new FormData();
    form.append('name', name);
    form.append('date', date);
    form.append('file', file);
    setLoading2(true);
    uploadFile(form).then((res) => {
      setLoading2(false);
      if (res.code === 0) {
        alert('上传成功');
      } else {
        alert('上传失败');
      }
      setName('');
      setDate('');
      setFile(new Blob());
      getDownloadList(pageDefault).then((res) => {
        handlePageInit(res);
      })
    })
  }

  const deleteFile = (id: number, path: string) => {
    const msg = "请确认是否要删除？";
    if (window.confirm(msg) === false) return;
    deleteFileById({ id, path }).then((res) => {
      if (res.code === 0) {
        alert('删除成功');
      } else {
        alert('删除失败');
      }
      getDownloadList(pageDefault).then((res) => {
        handlePageInit(res);
      })
    })
  }

  return (
    <div className={$style['downlaodWrapper']}>
      <Spin spinning={loading2} tip="正在上传中...">
        <div className={$style['fileWrapper']}>
          <label>数据简介: <input type="text" value={name} onChange={e => nameChanged(e)} /></label>
          <label>上传日期: <input type="text" placeholder="例：2020-01-01" value={date} onChange={e => dateChanged(e)} /></label>
          <label className={$style['fileButton']} > <input id="file" type="file" onChange={e => fileChanged(e)} /></label>
          <button onClick={() => submit()}> 上传 </button>
        </div>
      </Spin>
      <Spin spinning={loading}>
        <div className={$style['table-title']}>
          <div className={`${$style['table-title-long']} ${$style['table-title-color']}`}>data</div>
          <div className={`${$style['table-item-short']} ${$style['table-title-color']}`}>date</div>
          <div className={`${$style['table-item-short']} ${$style['table-title-color']}`}>操作</div>
        </div>
        {
          loading ? null :
            fileList.map((item: any, index) => {
              return (
                <div key={item.id} className={$style["table-data"]}>
                  <div className={`${$style['table-item-long']}`}><a href={item.path}> {item.name}</a></div>
                  <div className={`${$style['table-item-short']}`}>{item.date}</div>
                  <div className={`${$style['table-item-short']}`}>
                    <div className={$style['deal']} onClick={() => { deleteFile(item.id, item.path) }}>删除</div>
                    <a href={item.path}> 下载</a>
                  </div>
                </div>
              )
            })
        }
        <Pagination
          className={$style['pagination']}
          size="small"
          showSizeChanger={false}
          showQuickJumper
          total={page.total ? page.total : 0}
          current={page.page ? page.page : 1}
          pageSize={page.page_size ? page.page_size : 10}
          onChange={handlePageChange}
        />
      </Spin>
    </div >
  )
}