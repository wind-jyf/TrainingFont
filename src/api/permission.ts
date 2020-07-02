import { request } from './http';

export async function getPermission(data:any) {
  const res: any = await request('/permissionList', {
    method: "get",
    data
  });
  return res.data;
}

export async function getAuthorizationList(data:any) {
  const res: any = await request('/authorizationList', {
    method: "get",
    data
  });
  return res.data;
}

export async function updateAuth(data:any) {
  const res: any = await request('/updateAuth', {
    method: "put",
    data
  });
  return res.data;
}