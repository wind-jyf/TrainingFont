import React, { useState, useEffect } from 'react';
import { Form, Select, Input, Button, Menu,message } from 'antd';
import $style from "./style.module.scss";

import { SearchPanel } from '../../components/SearchPanel';
import { getCategory, addDataCategory } from '../../../../api/admin';

const { Option } = Select;
const { TextArea } = Input;
const { SubMenu } = Menu;

interface IProps {
  [key: string]: any;
}
let categoryArray: any = []

let condition: any = {
  id: null,
  type: 'rice',
  Year_item: '',
  note: '',
  key_name: '',
  key_type: '',
  category_name1: null,
  category_name2: null,
  category_name3: null,
  category_name4: null,
  category_name5: null,
  category_name6: null,
  category_name7: null,
  category_name8: null,
  category_name9: null,
  category_name10: null,
}
const Menu_left = (props: IProps) => {
  const {imageYear,dataYear} = props;

  return (
    <Menu
      mode="inline"
      defaultOpenKeys={['Rice(images)']}
      // selectedKeys={[currentMenuItem]}
    // onClick={handleClick}
    >
      <SubMenu key="Rice(images)" title="Rice(images)" className={$style['subMenu']}>
        {imageYear.map((item: any, index: any) => <Menu.Item key={'images:' + item} >{item}</Menu.Item>)}
      </SubMenu>
    </Menu>
  )
}
export const AddRiceImages = (props: IProps) => {
  const [dataYear, setDataYear] = useState([]) as any;
  const [imageYear, setImageYear] = useState([]) as any;
  const [categoryItemArray, setCategoryItemArray] = useState([]) as any;
  const [itemObject, setItemObject] = useState({}) as any;
  const [form] = Form.useForm();
  const getCategoryData = () => {
    getCategory({ condition: { type: 'rice' } }).then(res => {

      const category = res.image[0]   //初始目录

      let tempDataYear: any = [], tempImageYear: any = []
      res.data.forEach((item: any) => {
        tempDataYear.push(item.Year_item)
      })
      res.image.forEach((item: any) => {
        tempImageYear.push(item.Year_item)
      })
      setDataYear(tempDataYear)
      setImageYear(tempImageYear)
    })
  }


  const handleAddDirectory = () => {
    let temdirectoryList = categoryItemArray.slice()
    temdirectoryList.push([])
    setCategoryItemArray(temdirectoryList)
  }
  const handleNote: any = (e: any) => {
    let value = e.target.value
    condition.note = value
    let data = Object.assign({}, itemObject, { 'note': value })
    setItemObject(data)
  }
  const handleYearChange: any = (e: any) => {
    let value = e.target.value
    condition.Year_item = value
    !condition.Year_item && message.error('年份不能为空');
    let data = Object.assign({}, itemObject, { 'Year_item': value })
    setItemObject(data)
  }
  const handleCategoryItemArray: any = (index: number, e: any) => {
    let value = e.target.value
    let category_name = 'category_name' + (index + 1)
    condition[category_name] = value
    let data = Object.assign({}, itemObject, { category_name: value })
    setItemObject(data)
  }
  let timer: any = null  //避免提示太多次了
  const handleKeyWords: any = (e: any) => {
    let value = e.target.value

    timer && clearTimeout(timer)
    condition.key_name = value.split(':')[0]
    condition.key_type = value.split(':')[1]

    //不要让undefined显示在用户的上面
    if (condition.key_name == undefined) condition.key_name = ' '
    if (condition.key_type == undefined) {
      if (!condition.key_name.includes(' ')) {
        condition.key_name += ' '
      }
      condition.key_type = ''
    }
    let data = Object.assign({}, itemObject, { 'key_name': condition.key_name, 'key_type': condition.key_type })
    setItemObject(data)
  }
  const onAddItem = () => {
    let flag = true;
    for (let key in condition) {
      if (key == 'Year_item') {
        condition[key] = condition[key].trim();
        if (!condition[key]) {
          flag = false
          message.error('年份不能为空');
        }
      } else if (key.includes('category_name')) {
        condition[key] = condition[key] && condition[key].trim();
        if (condition[key] === '') condition[key] = null
      } else if (key.includes('key')) {
        condition[key] = condition[key] && condition[key].trim();
        if (!condition[key]) {
          flag = false
          message.error('请检查关键字格式和内容')
        }
      }
    }
    if (flag) {
      addDataCategory({ condition }).then(res => {
        if (res.code === 0) {
          message.success('增加成功')
          categoryArray = []
          for (let key in condition) {
            if (condition[key] !== null && key.includes('category')) {
              categoryArray.push(condition[key])
            }
          }
          setCategoryItemArray(categoryArray)
          window.localStorage.setItem('category', JSON.stringify(condition))
          window.localStorage.setItem('categoryArray', JSON.stringify(categoryArray))
          window.history.go(-1);
        } else {
          message.error('增加失败')
        }
      })
    }
  }
  useEffect(() => {
    getCategoryData();
  }, []);

  const formContent = (
    <div className={$style['leftWrapper']}>
      <Menu_left dataYear={dataYear} imageYear={imageYear}  >
      </Menu_left>
    </div>
  )

  const rightContent = (
    <div className={$style['rightWrapper']}>
      <Form form={form} layout='inline'>
        <Form.Item label='请输入说明:' rules={[{ required: true, message: 'Year is required' }]} >
          {/* <textarea rows={4} cols={50} defaultValue={itemObject.note} onChange={handleNote}></textarea> */}
          <TextArea rows={4} cols={50} placeholder='这里如果要展示文件：例如<a href="http://plantphenomics.hzau.edu.cn/data/explaination/test.pdf">点我去百度</a>' value={itemObject.note} onChange={handleNote} />
        </Form.Item>
      </Form>

      <div className={$style['firstQueryDirectory']}>
        <Form form={form} layout='inline'>
          <Form.Item label='请输入年份和类别' rules={[{ required: true, message: 'Year is required' }]} >
            <Input value={itemObject.Year_item} onChange={handleYearChange} />
          </Form.Item>
        </Form>

        <Button type="primary" className={$style['firstQueryDirectory_right']} onClick={handleAddDirectory}>新增查询类别</Button>
      </div>

      <div>
        <Form form={form} layout='inline' >
          {categoryItemArray.map((item: any, index: number) =>
            <Form.Item className={$style['QueryDirectories']} key={index} label='请输入查询类别' >
              <Input defaultValue={item} onChange={(e) => handleCategoryItemArray(index, e)} />
            </Form.Item>
          )}
        </Form>


        <div className={$style['firstQueryDirectory']}>
          <Form form={form} layout='inline' className={$style['firstQueryDirectory_left']} >
            <Form.Item label='请输入查询列的关键字:' rules={[{ required: true, message: '关键字不能为空' }]} >
              {/* <textarea rows={2} cols={20} defaultValue={keywords} onChange={handleKeyWords}></textarea> */}
              <TextArea rows={4} cols={40} placeholder='关键字规则为关键字标题加上英文冒号再加各项,各项间以英文逗号间隔，例如Trait:all,1,2,3,4' value={itemObject.key_name ? (itemObject.key_name + ':' + itemObject.key_type) : ''} onChange={handleKeyWords} />
            </Form.Item>
          </Form>
        </div>

        <div className={$style['buttons']} >
          <Button type="primary" onClick={onAddItem}>增加</Button>
        </div>
      </div>
    </div >
  )


  return (
    <div className={$style['ManageWrapper']}>
      <SearchPanel
        formContent={formContent}
      />
      {rightContent}
    </div>
  )
}