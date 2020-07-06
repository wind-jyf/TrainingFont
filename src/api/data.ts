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

export async function getDownloadList(data: any) {
    const res: any = await request('/getdownloadlist', {
        method: 'get',
        data
    })
    return res.data;
}

export async function uploadFile(data: any) {
    const res: any = await request('/uploadfile', {
        method: 'post',
        data,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return res;
}

export async function deleteFileById(data: any) {
    const res: any = await request('/deletefile', {
        method: 'get',
        data
    })
    return res;
}