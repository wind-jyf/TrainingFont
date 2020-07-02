import React, { useState, useEffect } from 'react';
import { Form, Select } from 'antd';
import $style from "./style.module.scss";

import { SearchPanel } from '../../components/SearchPanel';
import { ImgDisplayer } from '../../components/ImgDisplayer';
import { getAccessionIdMqdList, getMqdImgList } from '../../../../api/maize';
import { getPermission } from '../../../../api/permission';

const defaultPermissionQuery = {
    s_tp: 'maize',
    s_user: 'MqDWnY',
    s_img_data: 'img'
}

const { Option } = Select;


export const MaizeMqd = () => {
    const [year, setYear] = useState([]) as any;
    const [accessionId, setAccessionId] = useState([]) as any;
    const [img, setImg] = useState([]) as any;

    const [form] = Form.useForm();

    const handleGetAccessionId = (year: any) => {
        return getAccessionIdMqdList({year}).then((result) => {
            setAccessionId(result);
        }).then(() => {
            form.resetFields(['id']);
        }).catch((err) => console.log(err)); 
    }
    useEffect(() => {
        getPermission(defaultPermissionQuery).then((res) => {
            setYear(res);
            if(res.length !== 0) {
                handleGetAccessionId(res[0].s_year).then(() => {
                    form.resetFields();
                }).catch((err) => console.log(err));
            }
        }).catch((err) => console.log(err));
    }, []);

    const searchImg = () => {
        const { validateFields, getFieldsValue } = form;
        validateFields().then(() => {
            const value = getFieldsValue();
            getMqdImgList(value).then((res) => {
                setImg(res);
            }).catch((err) => console.log(err)); 
        });        
    }

    const formContent = (
        <Form form={form} layout='inline'>
            <Form.Item name="year" label='Year:' rules={[{ required: true, message: 'Year is required'}]} initialValue={year[0] && year[0].s_year}>
                <Select style={{width: 200}} showSearch placeholder='Pick year' onChange={(value) => handleGetAccessionId(value)}>
                    {year.map((item: {[key:string]: string}) => <Option key={item.s_id} value={item.s_year}>{item.s_year}</Option>)}
                </Select>
            </Form.Item>
            <Form.Item name="id" label='Accession ID:' rules={[{ required: true, message: 'ID is required'}]} initialValue={accessionId[0] && accessionId[0].id}>
            <Select style={{width: 200}} showSearch placeholder='Pick Id'>
                    {accessionId.map((item: {[key:string]: string}) => <Option key={item.id} value={item.id}>{item.id}</Option>)}
                </Select>
            </Form.Item>
        </Form>
    )

    return (
        <div className={$style['maizeMqdWrapper']}>
            <SearchPanel 
                formContent={formContent}
                searchImg={searchImg}
            />
            <ImgDisplayer
                data={img}
                rotate={'rotate(-90deg)'}
            />
        </div>
    )
}