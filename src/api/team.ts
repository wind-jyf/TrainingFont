/**
 * @file: description
 * @author: xinguangtai
 * @Date: 2020-07-02 17:45:07
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-05 15:32:45
 */
import { request } from "./http";

export async function getGroupList(data: any) {
  const res: any = await request("/groupList", {
    method: "get",
    data,
  });
  return res.data;
}

export async function getGroupById(data: any) {
  const res: any = await request("/groupById", {
    method: "get",
    data,
  });
  return res.data;
}

export async function deleteTeamById(data: {
  id: number;
  lan: "en-US" | "zh-CN";
}) {
  const res: any = await request("/group", {
    method: "delete",
    data,
  });
  return res.data;
}
