import { request } from './http';

export async function getAccessionIdCottonList(data:any) {
  const res: any = await request('/accessionIdCottonList', {
    method: "get",
    data
  });
  return res.data;
}

export async function getCottonImgList(data:any) {
  const res: any = await request('/cottonImgList', {
    method: "get",
    data
  });
  return res.data;   
}