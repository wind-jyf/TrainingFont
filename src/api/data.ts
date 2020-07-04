import { request } from './http';

export async function getImgData(data: any) {
    const res: any = await request('/getimgdata', {
        method: 'post',
        data
    });
    return res.data;
}

export async function getDataData(data: any) {
    const res: any = await request('/getdatadata', {
        method: 'post',
        data
    })
    return res.data;
}