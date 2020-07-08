import { request } from './http';


export async function getDataCategory(data: any) {
  const res: any = await request('/DataCategory', {
    method: "get",
    data
  });
  return res.data;
}

export async function getImgCategory(data: any) {
  const res: any = await request('/ImgCategory', {
    method: "get",
    data
  });
  return res.data;
}
