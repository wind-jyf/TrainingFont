/**
 * @file: description
 * @author: xinguangtai
 * @Date: 2020-07-02 17:45:07
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-05 09:43:47
 */
import React, { useEffect, useState } from "react";

import { Pagination, Spin, Timeline } from "antd";

import { getProjectList } from "../../api/project";
import $style from "./style.module.scss";

// import { useState } from 'react';
// import { Timeline, Radio } from 'antd';

interface Iprops {
  [key: string]: any;
  date: string;
}

interface project {
  name: string;
  id: number;
  date: string;
}

export const Project = (props: Iprops) => {
  // function timeLine() {
  //     const [mode, setMode] = useState('left');

  //     const onChange = left => {
  //       setMode(left.target.value);
  //     };

  //     return (
  //       <>
  //         <Radio.Group
  //           onChange={onChange}
  //           value={mode}
  //           style={{
  //             marginBottom: 20,
  //           }}
  //         >
  //           <Radio value="left">Left</Radio>
  //         </Radio.Group>

  //         <Timeline mode={mode}>
  //           <Timeline.Item label="2015-09-01">Create a services</Timeline.Item>
  //           <Timeline.Item label="2015-09-01 09:12:11">Solve initial network problems</Timeline.Item>
  //           <Timeline.Item>Technical testing</Timeline.Item>
  //           <Timeline.Item label="2015-09-01 09:12:11">Network problems being solved</Timeline.Item>
  //         </Timeline>
  //       </>
  //     );
  //   }

  //   ReactDOM.render(<timeLine />, mountNode);

  const [projectList, setProjectList] = useState([]);
  const [page, setPage] = useState({}) as any;

  const hanldePageInit = (res: any) => {
    const { projectList, pagination } = res;
    setProjectList(projectList);
    setPage(pagination);
  };

  useEffect(() => {
    getProjectList({
      page: 1,
      page_size: 10,
    }).then((res) => {
      hanldePageInit(res);
    });
  }, []);

  const handlePageChange = (page: number, pageSize?: number) => {
    getProjectList({ page, page_size: pageSize }).then((res) => {
      hanldePageInit(res);
    });
  };

  const loading = projectList.length === 0;

  return (
    <div className={$style["projectWrapper"]}>
      <Spin spinning={loading}>
        <Timeline mode={"left"} className={$style["projectList"]}>
          {loading
            ? null
            : projectList.map((item: any, index) => {
                return (
                  // <div key={item.id} className={$style['projectItem']}>
                  //     <Timeline mode={'left'} className={$style["project"]}>
                  //         {projectList
                  //         // .slice(page.page === 1 ? 4 : 0)
                  //         .map((project: project, index) => (
                  //             // <>
                  //             //     <div className={$style["project-date"]}>
                  //             //         {project.date}
                  //             //     </div>
                  //             //     <div className={$style["projectTitle"]}>
                  //             //         {item.projectname}
                  //             //     </div>
                  //             // </>

                  <Timeline.Item
                    className={$style["projectItem"]}
                    label={item.projectname.match(
                      /20[0-9][0-9].[0-9]+[-]20[0-9][0-9].[0-9]+/gi
                    )}
                  >
                    <div className={$style["projectTitle"]}>
                      {" "}
                      {item.projectname}
                    </div>
                  </Timeline.Item>
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
        </Timeline>
      </Spin>
    </div>
  );
};
