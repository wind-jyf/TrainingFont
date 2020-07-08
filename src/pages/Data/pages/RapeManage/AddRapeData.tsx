import React, { useState, useEffect } from 'react';
import { Form, Select, Input, Button, Menu, Modal, message } from 'antd';
import { Link } from "react-router-dom";
import $style from "./style.module.scss";

import { SearchPanel } from '../../components/SearchPanel';
import { getCategory, addDataCategory } from '../../../../api/admin';

const { Option } = Select;
const { TextArea } = Input;
const { SubMenu } = Menu;

interface IProps {
  [key: string]: any;
}
let category: any = []
let categoryArray: any = []
let categoryArrayCopy: any = []
let keywords = ''   //如果不是因为textarea那里面的defaultValue不能设置表达式，谁又愿意设置这个变量呢
let firstFlag = false //标记是否是从上个路由第一次进来
let tempYearArray: any = []    //拿这个存左边的年份，因为左边的年份在这里不会变
let condition: any = {
  id: null,
  type: 'rape',
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
let YearKey = ''
const Menu_left = (props: IProps) => {
  const { handleCategory, handleIsDataOrImages,  category } = props;
  console.log("handleCategory:", handleCategory);

  const [currentMenuItem, setCurrentMenuItem] = useState('') as any

  let tempYearKey = window.localStorage.getItem('YearKey')
  if (tempYearKey) {
    YearKey = JSON.parse(tempYearKey)
    // setCurrentMenuItem(YearKey)
  }
  console.log('tempYearKey :>> ', tempYearKey);
  useEffect(() => {
    setCurrentMenuItem(YearKey)
  }, [YearKey]);

  return (
    <Menu
      mode="inline"
      defaultOpenKeys={['Rape(Images):', 'Rape(Data):']}
      selectedKeys={[currentMenuItem]}
    // onClick={handleClick}
    >
      <SubMenu key="Rape(Images):" title="Rape(Images):" className={$style['subMenu']}>
        {/* {yearImages.map((item: any, index: any) => <Menu.Item key={'images:' + item} >{item}</Menu.Item>)} */}
        {/* <Menu.Item key={YearKey} >{YearKey}</Menu.Item> */}
      </SubMenu>
    </Menu>
  )
}
export const AddRapeData = (props: IProps) => {
  const [dataYear, setDataYear] = useState([]) as any;
  const [imageYear, setImageYear] = useState([]) as any;

  const [directoryList, setDirectoryList] = useState([]) as any;

  const [dataCategory, setDataCategory] = useState([]) as any;
  const [imageCategory, setImageCategory] = useState([]) as any;
  const [categoryItemArray, setCategoryItemArray] = useState([]) as any;
  const [itemObject, setItemObject] = useState({}) as any;
  const [isDataOrImages, setIsDataOrImages] = useState(true) as any;
  const [visible, setVisible] = useState(false) as any;
  const [form] = Form.useForm();
  const getCategoryData = (index: any, itemObject?: any) => {
    getCategory({ condition: { type: 'rape' } }).then(res => {
      console.log("res111222333:", res);
      setDataCategory(res.data);
      setImageCategory(res.image);

      category = itemObject || res.image[index]   //初始目录
      condition.id = category.id
      condition.type = 'rape'
      console.log("初始目录:", category);
      keywords = category.key_name + ':' + category.key_type
      setItemObject(category)
      categoryArray = []
      for (let key in category) {
        if (category[key] !== null && key.includes('category')) {
          categoryArray.push(category[key])
        }
      }
      setCategoryItemArray(categoryArray)

      console.log("category_first:", category);
      let tempDataYear: any = [], tempImageYear: any = []
      res.data.forEach((item: any) => {
        tempDataYear.push(item.Year_item)
      })
      res.image.forEach((item: any) => {
        tempImageYear.push(item.Year_item)
      })
      setDataYear(tempDataYear)
      setImageYear(tempImageYear)
      tempYearArray = tempImageYear
    })
  }

  const handleCategory = (item1: any, item2: any) => {
    setCategoryItemArray(item1)
    setItemObject(item2)
  }
  const handleIsDataOrImages = (isImage: boolean) => {
    setIsDataOrImages(isImage)
  }


  const handleAddDirectory = () => {
    let temdirectoryList = categoryItemArray.slice()
    temdirectoryList.push([])
    setCategoryItemArray(temdirectoryList)
    console.log("categoryItemArray:", categoryItemArray);
  }
  const handleNote: any = (e: any) => {
    let value = e.target.value
    condition.note = value
    console.log("condition.note:", condition);
    let data = Object.assign({}, itemObject, { 'note': value })
    setItemObject(data)
  }
  const handleYearChange: any = (e: any) => {
    let value = e.target.value
    condition.Year_item = value
    console.log("condition.Year_item:", condition);
    !condition.Year_item && message.error('年份不能为空');
    let data = Object.assign({}, itemObject, { 'Year_item': value })
    setItemObject(data)
  }
  const handleCategoryItemArray: any = (index: number, e: any) => {
    let value = e.target.value
    let category_name = 'category_name' + (index + 1)
    console.log("category_name:", category_name);
    condition[category_name] = value
    console.log("condition.category_name:", condition);
    let data = Object.assign({}, itemObject, { category_name: value })
    setItemObject(data)
  }
  let timer: any = null  //避免提示太多次了
  const handleKeyWords: any = (e: any) => {
    let value = e.target.value
    console.log('value.split[0] :>> ', value.split(':')[0]);
    console.log('value.split[1] :>> ', value.split(':')[1]);
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      condition.key_name = value.split(':')[0]
      condition.key_type = value.split(':')[1]

      console.log('key_name :>> ', condition.key_name);
      console.log('key_type :>> ', condition.key_type);
      if (!condition.key_name || !condition.key_type) {
        message.error("请检查关键字格式和内容")
      }
      console.log("condition.handleKeyWords:", condition);
      //不要让undefined显示在用户的上面
      if (condition.key_name == undefined) condition.key_name = ''
      if (condition.key_type == undefined) condition.key_type = ''
      let data = Object.assign({}, itemObject, { 'key_name': condition.key_name, 'key_type': condition.key_type })
      setItemObject(data)
    }, 0)
  }
  const onAddItem = () => {
    let flag = true;
    console.log('conditionBefore :>> ', condition);
    console.log('itemObject :>> ', itemObject);
    // console.log('condition :>> ', condition);
    console.log(typeof condition);
    for (let key in condition) {
      if (key == 'Year_item') {
        condition[key] = condition[key].trim();
        if (!condition[key]) {
          flag = false
          message.error('年份不能为空');
        }
        console.log('Year_item :>> false');
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
    console.log('flag :>> ', flag);
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
          console.log('categoryArray66667777 :>> ', categoryArray);
          window.localStorage.setItem('category', JSON.stringify(condition))
          window.localStorage.setItem('categoryArray', JSON.stringify(categoryArray))
          window.localStorage.setItem('YearKey', JSON.stringify(condition.Year_item))
          window.history.go(-1); 
        } else {
          message.error('增加失败')
        }
      })
    }
  }
  useEffect(() => {
    // if (location.query) {
    //   const category = location.query.itemObject
    //   console.log("11111111122222223333:", category);
    //   setItemObject(category)
    //   window.localStorage.setItem('YearKey', JSON.stringify(category.Year_item))
    //   console.log('firstYearKey :>> ', category.Year_item);
    //   condition.id = category.id
    //   condition.type = category.type
    //   keywords = category.key_name + ':' + category.key_type
    //   condition = JSON.parse(JSON.stringify(category))
    //   categoryArray = []
    //   for (let key in category) {
    //     if (category[key] !== null && key.includes('category')) {
    //       categoryArray.push(category[key])
    //     }
    //   }
    //   keywords = category.key_name + ":" + category.key_type
    //   setCategoryItemArray(categoryArray)
    //   window.localStorage.setItem('category', JSON.stringify(category))
    //   window.localStorage.setItem('categoryArray', JSON.stringify(categoryArray))
    // } else {
    //   let tempCategory = window.localStorage.getItem('category');
    //   let tempCategoryArray = window.localStorage.getItem('categoryArray');
 
    //   console.log('categoryArray :>> ', tempCategoryArray);
    //   if (tempCategory != null && tempCategoryArray != null) {
    //     setItemObject(JSON.parse(tempCategory));
    //     condition = JSON.parse(tempCategory)
    //     setCategoryItemArray(JSON.parse(tempCategoryArray));
    //     keywords = JSON.parse(tempCategory).key_name + ":" + JSON.parse(tempCategory).key_type
    //   }
    // }
  }, []);

  const formContent = (
    <div className={$style['leftWrapper']}>
      <Menu_left handleCategory={handleCategory} handleIsDataOrImages={handleIsDataOrImages} category={category} >
      </Menu_left>
    </div>
  )

  const rightContent = (
    <div className={$style['rightWrapper']}>
      <Form form={form} layout='inline'>
        <Form.Item label='请输入说明:' rules={[{ required: true, message: 'Year is required' }]} >
          {/* <textarea rows={4} cols={50} defaultValue={itemObject.note} onChange={handleNote}></textarea> */}
          <TextArea rows={4} cols={50} value={itemObject.note} onChange={handleNote} />
        </Form.Item>
      </Form>

      <div className={$style['firstQueryDirectory']}>
        <Form form={form} layout='inline'>
          <Form.Item label='请输入年份和类别' rules={[{ required: true, message: 'Year is required' }]} >
            <Input value={itemObject.Year_item} onChange={handleYearChange} />
          </Form.Item>
        </Form>

        <Button type="primary" className={$style['firstQueryDirectory_right']} onClick={handleAddDirectory}>新增查询目录</Button>
      </div>

      <div>
        <Form form={form} layout='inline' >
          {categoryItemArray.map((item: any, index: number) =>
            <Form.Item className={$style['QueryDirectories']} key={index} label={isDataOrImages ? '请输入查询目录' : '请输入查询类别'} >
              <Input defaultValue={item} onChange={(e) => handleCategoryItemArray(index, e)} />
            </Form.Item>
          )}
        </Form>


        <div className={$style['firstQueryDirectory']}>
          <Form form={form} layout='inline' className={$style['firstQueryDirectory_left']} >
            <Form.Item label='请输入查询列的关键字:' rules={[{ required: true, message: '关键字不能为空' }]} >
              {/* <textarea rows={2} cols={20} defaultValue={keywords} onChange={handleKeyWords}></textarea> */}
              <TextArea rows={2} cols={20} value={itemObject.key_name ? (itemObject.key_name+ ':' + itemObject.key_type) : ''} onChange={handleKeyWords} />
            </Form.Item>
          </Form>
        </div>

        <div className={$style['buttons']} >
          <Button type="primary" onClick={onAddItem}>增加</Button>
          {/* <Modal
            title="提示"
            visible={visible}
            onOk={() => handleOK(itemObject.id, isDataOrImages)}
            onCancel={handleCancel}
          >
            <p>确认要删除{category.Year_item}的条目?</p>
          </Modal> */}
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