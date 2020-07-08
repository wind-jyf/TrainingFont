/**
 * @file: description
 * @author: xinguangtai
 * @Date: 2020-07-02 17:45:07
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-05 17:17:12
 */
import { request } from './http';

export async function getInstrumentList(data:any) {
  const res: any = await request('/instrumentList', {
    method: "get",
    data
  });
  return res.data;
}

export async function getInstrumentById(data:any) {
  const res: any = await request('/instrumentById', {
    method: "get",
    data
  });
  return res.data;
}

export async function postiInstrument(data: {
  name: string;
  content: string;
  lan: string;
}) {
  const res: any = await request("/instrument", {
    method: "post",
    data,
  });
  return res;
}

export async function deleteInstrumentById(data: {
  id: number;
  lan: "en-US" | "zh-CN";
}) {
  const res: any = await request("/instrument", {
    method: "delete",
    data,
  });
  return res;
}