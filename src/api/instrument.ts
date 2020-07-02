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