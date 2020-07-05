/**
 * @file: description
 * @author: xinguangtai
 * @Date: 2020-07-02 17:45:07
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-05 18:28:43
 */
import { request } from './http';

export async function getProjectList(data:any) {
  const res: any = await request('/projectList', {
    method: "get",
    data
  });
  return res.data;
}

export async function deleteProjectById(data:{id: number}) {
  const res: any = await request('/project', {
    method: "delete",
    data
  });
  return res.data;
}

export async function postProject(data:{projectname: string}) {
  const res: any = await request('/project', {
    method: "post",
    data
  });
  return res.data;
}

export async function putProject(data:{id: number, projectname: string}) {
  const res: any = await request('/project', {
    method: "put",
    data
  });
  return res.data;
}