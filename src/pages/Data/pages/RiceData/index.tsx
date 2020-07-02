import React, { useState, useEffect } from 'react';
import { Form, Select } from 'antd';
import $style from "./style.module.scss";

import { SearchPanel } from '../../components/SearchPanel';
import { DataDisplayer } from '../../components/dataDisplayer';

import { getRiceDataId, getRiceData } from '../../../../api/rice';
import { getPermission } from '../../../../api/permission';

const defaultPermissionQuery = {
    s_tp: 'rice',
    s_user: 'LzXWnY',
    s_img_data: 'data'
}

const { Option } = Select;


export const RiceData = () => {
    const [year, setYear] = useState([]) as any;
    const [query, setQuery] = useState([]) as any;
    const [riceData, setRiceData] = useState([]) as any;

    const [form] = Form.useForm();

    const handleGetAccessionId = (data?: any) => {
        data = data || form.getFieldsValue();

        return getRiceDataId(data).then((result) => {
            setQuery(result);
        }).then(() => {
            form.resetFields(['id', 'trait', 'growStage']);
        }).catch((err) => console.log(err));
    }
    useEffect(() => {
        getPermission(defaultPermissionQuery).then((res) => {
            setYear(res);
            if(res.length !== 0) {
                handleGetAccessionId({year: res[0].s_year}).then(() => {
                    form.resetFields();
                }).catch((err) => console.log(err));
            }
        }).catch((err) => console.log(err));
    }, []);

    const searchData = () => {
        const { validateFields, getFieldsValue } = form;
        validateFields().then(() => {
            const value = getFieldsValue();
            getRiceData(value).then((res) => {
                setRiceData(res);
                console.log(res);
            }).catch((err) => console.log(err)); 
        });          
    }

    const getFormContent = (searchYear:string) => {
        switch(searchYear) {
            case '2013-drought':
            case '2016-drought':
            default:
                return (
                    <Form form={form} layout='inline' key="drought">
                        <Form.Item name="year" label='Year:' rules={[{ required: true, message: 'Year is required'}]} initialValue={year[0] && year[0].s_year}>
                            <Select style={{width: 200}} showSearch placeholder='Pick year' onChange={() => handleGetAccessionId()}>
                                {year.map((item: {[key:string]: string}) => <Option key={item.s_id} value={item.s_year}>{item.s_year}</Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item name="id" label='Accession ID:' rules={[{ required: true, message: 'Id is required'}]} initialValue={query.id && query.id[0].value}>
                            <Select style={{width: 200}} showSearch placeholder='Pick Id'>
                                {query.id && query.id.map((item: {[key:string]: string}) => <Option key={item.value} value={item.name}>{item.value}</Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item name="trait" label='Trait:' rules={[{ required: true, message: 'Trait is required'}]} initialValue={query.trait && query.trait[0].value}>
                            <Select style={{width: 200}} showSearch placeholder='Pick Condition'>
                                {query.trait && query.trait.map((item: {[key:string]: string}) => <Option key={item.value} value={item.value}>{item.name}</Option>)}
                            </Select>
                        </Form.Item>
                    </Form>
                )
            case '2013-WUE':
            case '2014-WUE':
                return (
                    <Form form={form} layout='inline' key="wue">
                        <Form.Item name="year" label='Year:' rules={[{ required: true, message: 'Year is required'}]} initialValue={year[0] && year[0].s_year}>
                            <Select style={{width: 200}} showSearch placeholder='Pick year' onChange={() => handleGetAccessionId()}>
                                {year.map((item: {[key:string]: string}) => <Option key={item.s_id} value={item.s_year}>{item.s_year}</Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item name="id" label='Accession ID:' rules={[{ required: true, message: 'Id is required'}]} initialValue={query.id && query.id[0].value}>
                            <Select style={{width: 200}} showSearch placeholder='Pick Id'>
                                {query.id && query.id.map((item: {[key:string]: string}) => <Option key={item.value} value={item.name}>{item.value}</Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item name="growStage" label='Growth Stage:' rules={[{ required: true, message: 'GrowStage is required'}]} initialValue={query.growStage && query.growStage[0].value}>
                            <Select style={{width: 200}} showSearch placeholder='Pick Id'>
                                    {query.growStage && query.growStage.map((item: {[key:string]: string}) => <Option key={item.value} value={item.value}>{item.name}</Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item name="trait" label='Trait:' rules={[{ required: true, message: 'Trait is required'}]} initialValue={query.trait && query.trait[0].value}>
                        <Select style={{width: 200}} showSearch placeholder='Pick Condition'>
                            {query.trait && query.trait.map((item: {[key:string]: string}) => <Option key={item.value} value={item.value}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>
                    </Form>
                )
            case '2015-tiller': 
            return (
                <Form form={form} layout='inline' key="tiller">
                    <Form.Item name="year" label='Year:' rules={[{ required: true, message: 'Year is required'}]} initialValue={year[0] && year[0].s_year}>
                        <Select style={{width: 200}} showSearch placeholder='Pick year' onChange={() => handleGetAccessionId()}>
                            {year.map((item: {[key:string]: string}) => <Option key={item.s_id} value={item.s_year}>{item.s_year}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item name="id" label='Accession ID:' rules={[{ required: true, message: 'Id is required'}]} initialValue={query.id && query.id[0].value}>
                        <Select style={{width: 200}} showSearch placeholder='Pick Id'>
                            {query.id && query.id.map((item: {[key:string]: string}) => <Option key={item.value} value={item.name}>{item.value}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item name="trait" label='Trait:' rules={[{ required: true, message: 'Trait is required'}]} initialValue={query.trait && query.trait[0].value}>
                        <Select style={{width: 200}} showSearch placeholder='Pick Condition'>
                            {query.trait && query.trait.map((item: {[key:string]: string}) => <Option key={item.value} value={item.value}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>
                </Form>
            )
        }
    }

    return (
        <div className={$style['riceDataWrapper']}>
            <SearchPanel 
                formContent={getFormContent(form.getFieldValue('year'))}
                searchData={searchData}
            />
            <DataDisplayer 
                data={riceData}
            />
        </div>
    )
}