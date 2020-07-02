import { request } from './http';

export async function getAccessionIdQzWy(data:any) {
  const res: any = await request('/accessionIdQzWYList', {
    method: "get",
    data
  });
  return res.data;
}

export async function getQzWyImg(data:any) {
  const res: any = await request('/imgQzWyList', {
    method: "get",
    data
  });
  return res.data;   
}

export async function getAccessionIdRlxWy(data:any) {
  const res: any = await request('/accessionIdRlxWyList', {
    method: "get",
    data
  });
  return res.data;
}

export async function getRlxWyImg(data:any) {
  const res: any = await request('/imgRlxWyList', {
    method: "get",
    data
  });
  return res.data;
}

export async function getRiceDataId(data:any) {
  const res: any = await request('/riceDataId', {
    method: "get",
    data
  });
  return res.data;
}

export async function getRiceData(data:any) {
  const res: any = await request('/riceData', {
    method: "get",
    data
  });
  return res.data;
}