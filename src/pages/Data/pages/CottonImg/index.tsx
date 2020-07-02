import React, { useState, useEffect } from 'react';
import { Form, Select } from 'antd';
import $style from "./style.module.scss";

import { SearchPanel } from '../../components/SearchPanel';
import { ImgDisplayer } from '../../components/ImgDisplayer';
import { getAccessionIdCottonList, getCottonImgList } from '../../../../api/contton';
import { getPermission } from '../../../../api/permission';

const defaultPermissionQuery = {
    s_tp: 'cotton',
    s_img_data: 'img'
}

const { Option } = Select;


export const CottonImg = () => {
    const [year, setYear] = useState([]) as any;
    const [query, setQuery] = useState([]) as any;
    const [img, setImg] = useState([]) as any;

    const [form] = Form.useForm();

    const handleGetAccessionId = (year: any) => {
        return getAccessionIdCottonList({year}).then((result) => {
            setQuery(result);
        }).then(() => {
            form.resetFields(['id', 'condition']);
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
            getCottonImgList(value).then((res) => {
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
            <Form.Item name="id" label='Accession ID:' rules={[{ required: true, message: 'ID is required'}]} initialValue={query.id && query.id[0].value}>
                <Select style={{width: 200}} showSearch placeholder='Pick Id'>
                        {query.id && query.id.map((item: {[key:string]: string}) => <Option key={item.value} value={item.value}>{item.name}</Option>)}
                </Select>
            </Form.Item>
            <Form.Item name="condition" label='Condition:' rules={[{ required: true, message: 'Condition is required'}]} initialValue={query.condition && query.condition[0].value}>
                <Select style={{width: 200}} showSearch placeholder='Pick Condition'>
                    {query.condition && query.condition && query.condition.length !==0 && query.condition.map((item: {[key:string]: string}) => <Option key={item.value} value={item.value}>{item.name}</Option>)}
                </Select>
            </Form.Item>
        </Form>
    )

    return (
        <div className={$style['cottonWrapper']}>
            <SearchPanel 
                formContent={formContent}
                searchImg={searchImg}
            />
            <ImgDisplayer
                data={img}
            />
        </div>
    )
}