import { request } from './http';

export async function getAccessionIdMqdList(data:any) {
  const res: any = await request('/accessionIdMqdList', {
    method: "get",
    data
  });
  return res.data;
}

export async function getMqdImgList(data:any) {
  const res: any = await request('/mqdImgList', {
    method: "get",
    data
  });
  return res.data;   
}

export async function getAccessionIdJbyList(data:any) {
  const res: any = await request('/accessionIdJbyList', {
    method: "get",
    data
  });
  return res.data;
}

export async function getJbyImgList(data:any) {
  const res: any = await request('/jbyImgList', {
    method: "get",
    data
  });
  return res.data;   
}

export async function getMaizeDataId(data:any) {
  const res: any = await request('/maizeDataId', {
    method: "get",
    data
  });
  return res.data;
}

export async function getMaizeData(data:any) {
  const res: any = await request('/maizeData', {
    method: "get",
    data
  });
  return res.data;
}