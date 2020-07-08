import { request } from './http';

export async function getCategory(data: any) {
  const res: any = await request('/getCategory', {
    method: "post",
    data
  });
  return res.data;
}


export async function deleteImgCategory(data: any) {
  const res: any = await request('/deleteImgCategory', {
    method: "post",
    data
  });
  return res;
}

export async function deleteDataCategory(data: any) {
  const res: any = await request('/deleteDataCategory', {
    method: "post",
    data
  });
  return res;
}

export async function updateImgCategory(data: any) {
  const res: any = await request('/updateImgCategory', {
    method: "post",
    data
  });
  return res;
}

export async function updateDataCategory(data: any) {
  const res: any = await request('/updateDataCategory', {
    method: "post",
    data
  });
  return res;
}

export async function addImgCategory(data: any) {
  const res: any = await request('/addImgCategory', {
    method: "post",
    data
  });
  return res;
}
export async function addDataCategory(data: any) {
  const res: any = await request('/addDataCategory', {
    method: "post",
    data
  });
  return res;
}
