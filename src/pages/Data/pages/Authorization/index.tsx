import React, { useState, useEffect } from 'react';
import { Form, Select, Transfer, message } from 'antd';
import $style from "./style.module.scss";

import { getAuthorizationList, updateAuth } from '../../../../api/permission';

const { Option } = Select;

const DEFAULT_QUERY = {
    s_tp: 'rice',
    s_img_data: 'img'
}

export const Authorization = () => {

    const [allList, setAllList] = useState([]) as any;
    const [ownList, setOwnList] = useState([]) as any;

    const [form] = Form.useForm();

    useEffect(() => {
        getAuthorizationList(DEFAULT_QUERY).then((res) => {
            const { allList, ownList } = res;
            setAllList(allList.reduce((arr:any, item:any) => {
                const { s_year } = item;
                arr.push({key: s_year, title: s_year});
                return arr;
            }, []));
            setOwnList(ownList.reduce((arr:any, item:any) => {
                const { s_year } = item;
                arr.push(s_year);
                return arr;
            }, []))
        })
    }, [])
    
    const handleChange = (targetKeys: string[], direction: string, moveKeys: string[]) => {
        const direction_purpose_map = {
            'right': 'ADD',
            'left': 'REMOVE'
        }
        if(moveKeys.length > 1) {
            message.warning('请一次操作一个');
        } else {
            updateAuth({
                ...form.getFieldsValue(),
                purpose: direction_purpose_map[direction as keyof typeof direction_purpose_map],
                s_year: moveKeys[0]
            }).then(() => {
                setOwnList(targetKeys)
                message.success('操作成功');
            })
        }
    }

    const  handleSelect = (value:any) => {
        getAuthorizationList(form.getFieldsValue()).then((res) => {
            const { allList, ownList } = res;
            setAllList(allList.reduce((arr:any, item:any) => {
                const { s_year } = item;
                arr.push({key: s_year, title: s_year});
                return arr;
            }, []));
            setOwnList(ownList.reduce((arr:any, item:any) => {
                const { s_year } = item;
                arr.push(s_year);
                return arr;
            }, []))
        })
    }
    
    return (
        <div className={$style['authWrapper']}>
            <div className={$style['formWrapper']}>
                <Form form={form} layout='inline'>
                    <Form.Item name="s_tp" label='作物种类：' initialValue={'rice'}>
                        <Select style={{width: 200}}  placeholder='选择作物种类' onChange={(value) => {handleSelect(value)}}>
                            <Option key={'rice'} value={'rice'}>{'水稻'}</Option>
                            <Option key={'maize'} value={'maize'}>{'玉米'}</Option>
                            <Option key={'rape'} value={'rape'}>{'油菜'}</Option>
                            <Option key={'cotton'} value={'cotton'}>{'棉花'}</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="s_img_data" label='数据类型:' initialValue={'img'}>
                        <Select style={{width: 200}}  placeholder='数据类型' onChange={(value) => {handleSelect(value)}}>
                            <Option key={'img'} value={'img'}>{'图片'}</Option>
                            <Option key={'data'} value={'data'}>{'数据'}</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </div>
            <div className={$style['transferWrapper']}>
            <Transfer
                titles={['没有的权限', '已有的权限']}
                dataSource={allList}
                targetKeys={ownList}
                onChange={handleChange}
                render={item => item.title as string}
            />
            </div>
        </div>
    )
}