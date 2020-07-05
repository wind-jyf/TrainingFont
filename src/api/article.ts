/**
 * @file: description
 * @author: xinguangtai
 * @Date: 2020-07-02 17:45:07
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-05 23:32:38
 */
import { request } from "./http";

export async function getArticleList(data: any) {
  const res: any = await request("/articleList", {
    method: "get",
    data,
  });
  return res.data;
}

export async function deleteArticle(data: { id: number }) {
  const res: any = await request("/article", {
    method: "delete",
    data,
  });
  return res.data;
}