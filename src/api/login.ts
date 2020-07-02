import { request } from './http';

export async function checkLogin() {
  const res: any = await request('/check_login', {
    method: "get"
  });
  return res.data;
}

export async function loginAccount(data:any) {
  const res: any = await request('/login', {
    method: "post",
    data
  });
  return res.data;
}

export async function logout() {
  const res: any = await request('/logout', {
    method: "get"
  });
  return res.data;
}