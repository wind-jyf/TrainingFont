import React, { useState, useEffect } from 'react';
import { Form, Select, Input, Button, Menu, Modal, message } from 'antd';
import { Link } from "react-router-dom";
import $style from "./style.module.scss";

import { SearchPanel } from '../../components/SearchPanel';
import { getCategory, deleteImgCategory, deleteDataCategory } from '../../../../api/admin';

const { Option } = Select;
const { TextArea } = Input;
const { SubMenu } = Menu;

interface IProps {
  [key: string]: any;
}
let category: any = []
let categoryArray: any = []
let keywords = ''   //如果不是因为textarea那里面的defaultValue不能设置表达式，谁又愿意设置这个变量呢
let DataPath = {
  pathname: 'adminMaize/addMaizeData',
  query: { key: '', itemObject: {} },
}
let ImagePath = {
  pathname: 'adminMaize/addMaizeImages',
  query: { key: '', itemObject: {} },
}
let ChangeImagePath = {
  pathname: 'adminMaize/changeMaizeImages',
  query: { key: '', itemObject: {} },
}
let ChangeDataPath = {
  pathname: 'adminMaize/changeMaizeData',
  query: { key: '', itemObject: {} },
}

const Menu_left = (props: IProps) => {
  const { yearImages, yearData, dataCategory, imageCategory, handleCategory, handleIsDataOrImages } = props;
  console.log("handleCategory:", handleCategory);

  const [currentMenuItem, setCurrentMenuItem] = useState('') as any
  // const [categoryArrayCopy, setCategoryArrayCopy] = useState('') as any

  console.log("yearImages123:", yearImages);
  console.log("dataCategory123:", dataCategory);
  console.log("imgCategory123:", imageCategory);

  const handleClick = (e: any) => {
    setCurrentMenuItem(e.key)
    console.log("e:", e);
    if (e.key.includes('data')) {
      DataPath.query.key = e.key
      ChangeDataPath.query.key = e.key
      handleIsDataOrImages(false)
      dataCategory && dataCategory.forEach((item: any) => {
        if (e.key.includes(item.Year_item)) {
          category = item
          DataPath.query.itemObject = category
          ChangeDataPath.query.itemObject = category
          let categoryArrayCopy = []
          for (let key in category) {
            if (category[key] !== null && key.includes('category')) {
              categoryArrayCopy.push(category[key])
            }
          }
          keywords = category.key_name + ':' + category.key_type
          handleCategory(categoryArrayCopy, category)
          // setCategoryArrayCopy(categoryArray)
          console.log("categorydata:", category);
          console.log("categoryArrayCopydata:", categoryArrayCopy);
          // console.log("categoryArrayCopy:", categoryArrayCopy);
        }
      })
    } else {
      ImagePath.query.key = e.key
      ChangeImagePath.query.key = e.key
      handleIsDataOrImages(true)
      imageCategory && imageCategory.forEach((item: any) => {
        if (e.key.includes(item.Year_item)) {
          category = item
          ImagePath.query.itemObject = category
          ChangeImagePath.query.itemObject = category
          let categoryArrayCopy = []
          for (let key in category) {
            if (category[key] !== null && key.includes('category')) {
              categoryArrayCopy.push(category[key])
            }
          }
          keywords = category.key_name + ':' + category.key_type
          handleCategory(categoryArrayCopy, category)
          // setCategoryArrayCopy(categoryArray)
          console.log("categoryImage:", category);
          console.log("categoryArrayCopyImage:", categoryArrayCopy);
          // console.log("categoryArrayCopy:", categoryArrayCopy);
        }
      })
    }
  }

  useEffect(() => {
    console.log("yearImages:", yearImages);
    if (yearImages && yearImages[0]) {
      setCurrentMenuItem('images:' + String(yearImages[0]))
      ImagePath.query.key = 'images:' + String(yearImages[0])
      ChangeImagePath.query.key = 'images:' + String(yearImages[0])
    }
  }, [yearImages]);

  return (
    <Menu
      mode="inline"
      defaultOpenKeys={['Maize(Images', 'Maize(Data)']}
      selectedKeys={[currentMenuItem]}
      onClick={handleClick}
    >
      <SubMenu key="Maize(Images)" title="Maize(Images)" className={$style['subMenu']}>
        {yearImages.map((item: any, index: any) => <Menu.Item key={'images:' + item}  className={$style['menuItem']}>{item}</Menu.Item>)}
      </SubMenu>
      <SubMenu key="Maize(Data)" title="Maize(Data)" className={$style['subMenu']}>
        {yearData.map((item: any, index: any) => <Menu.Item key={'data:' + item}  className={$style['menuItem']}>{item}</Menu.Item>)}
      </SubMenu>
    </Menu>
  )
}
export const MaizeImagesData = (year: string) => {
  const [dataYear, setDataYear] = useState([]) as any;
  const [imageYear, setImageYear] = useState([]) as any;

  const [directoryList, setDirectoryList] = useState([]) as any;

  const [dataCategory, setDataCategory] = useState([]) as any;
  const [imageCategory, setImageCategory] = useState([]) as any;
  const [categoryItemArray, setCategoryItemArray] = useState([]) as any;
  const [itemObject, setItemObject] = useState({}) as any;
  const [isDataOrImages, setIsDataOrImages] = useState(true) as any;
  const [visible, setVisible] = useState(false) as any;

  const [condition, setCondition] = useState({
    id: null,
    type: '',
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
  }) as any;

  const [query, setQuery] = useState([]) as any;

  const [form] = Form.useForm();
  const getCategoryData = () => {
    getCategory({ condition: { type: 'maize' } }).then(res => {
      console.log("res111222333:", res);
      setDataCategory(res.data);
      setImageCategory(res.image);

      category = res.image[0]   //初始目录
      ImagePath.query.itemObject = category
      ChangeImagePath.query.itemObject = category
      console.log("初始目录:", category);
      keywords = category && category.key_name + ':' + category && category.key_type
      setItemObject(category)
      categoryArray=[]
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
    })
  }
  const handleCategory = (item1: any, item2: any) => {
    setCategoryItemArray(item1)
    setItemObject(item2)
  }
  const handleIsDataOrImages = (isImage: boolean) => {
    setIsDataOrImages(isImage)
  }

  const handleDelete: any = () => {
    setVisible(true)
  }
  const handleOK: any = (id: number, isDataOrImages: boolean) => {
    if (isDataOrImages) {
      deleteImgCategory({ condition: { id } }).then(res => {
        if (res.code === 0) {
          message.success('删除成功');
          getCategoryData()
        } else {
          message.error('删除失败');
          getCategoryData()
        }
      })
    } else {
      deleteDataCategory({ condition: { id } }).then(res => {
        if (res.code === 0) {
          message.success('删除成功');
          getCategoryData()
        } else {
          message.error('删除失败');
          getCategoryData()
        }
      })
    }
    setVisible(false)

  }
  const handleCancel: any = () => {
    setVisible(false)
  }

  const handleAddDirectory = () => {
    let temdirectoryList = directoryList.slice()
    temdirectoryList.push([24, 25, 26, 27, 28])
    setDirectoryList(temdirectoryList);
    form.resetFields();
  }
  const handleYearChange = (title: any, e: any) => {
    let value = e.target.value
    let data = Object.assign({},)
  }

  useEffect(() => {
    getCategoryData()
  }, []);

  const formContent = (
    <div className={$style['leftWrapper']}>
      <Menu_left yearImages={imageYear} yearData={dataYear} dataCategory={dataCategory} imageCategory={imageCategory} handleCategory={handleCategory} handleIsDataOrImages={handleIsDataOrImages} >
      </Menu_left>
      <Button type="primary"><Link to={'/download'}>下载</Link></Button>
    </div>
  )

  const rightContent = (
    <div className={$style['rightWrapper']}>
      <Form form={form} layout='inline'>
        <Form.Item label='请输入说明:' rules={[{ required: true, message: 'Year is required' }]} >
          <textarea rows={4} cols={50} disabled defaultValue={itemObject && itemObject.note}></textarea>
        </Form.Item>
      </Form>


      <div className={$style['firstQueryDirectory']}>
        <Form form={form} layout='inline'>
          <Form.Item label='请输入年份和类别' rules={[{ required: true, message: 'Year is required' }]} >
            <Input value={itemObject && itemObject.Year_item} disabled />
          </Form.Item>
        </Form>

        {/* <Button type="primary" className={$style['firstQueryDirectory_right']} onClick={handleAddDirectory}>新增查询目录</Button> */}
      </div>

      <div>
        <Form form={form} layout='inline' >
          {categoryItemArray.map((item: any, index: number) =>
            <Form.Item className={$style['QueryDirectories']} key={index} label={isDataOrImages ? '请输入查询目录' : '请输入查询类别'} >
              <Input value={item} disabled />
            </Form.Item>
          )}
        </Form>


        <div className={$style['firstQueryDirectory']}>
          <Form form={form} layout='inline' className={$style['firstQueryDirectory_left']} >
            <Form.Item label='请输入查询列的关键字:'  >
              <textarea rows={2} cols={20} disabled defaultValue={keywords}></textarea>
            </Form.Item>
          </Form>
        </div>

        <div className={$style['buttons']}>
          <Button type="primary" >{isDataOrImages ? <Link to={ChangeImagePath}>修改</Link> : <Link to={ChangeDataPath}>修改</Link>}</Button>
          <Button type="primary" onClick={handleDelete}>删除</Button>
          {isDataOrImages && <Button type="primary" ><Link to={ImagePath}>新增图片</Link></Button>}
          {!isDataOrImages && <Button type="primary" ><Link to={DataPath}>新增数据</Link></Button>}
          {/* 下面这个判断是为了在左边data菜单年份为空时也能显示出新增数据按钮 */}
          {!dataCategory[0] && <Button type="primary" ><Link to={DataPath}>新增数据</Link></Button>}
          <Modal
            title="提示"
            visible={visible}
            onOk={() => handleOK(itemObject && itemObject.id, isDataOrImages)}
            onCancel={handleCancel}
          >
            <p>确认要删除{itemObject && itemObject.Year_item}的条目?</p>
          </Modal>
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