import React, { useState, useEffect } from 'react';
import { Form, Select, Input, Button, Menu, Typography } from 'antd';
import { Link } from "react-router-dom";
import $style from "./style.module.scss";
import { Note } from '../../components/Note';

import { SearchPanel } from '../../components/SearchPanel';
import { getCategory } from '../../../../api/admin';
import { getImgCategory, getDataCategory } from '../../../../api/userDataPart';

const { Option } = Select;
const { TextArea } = Input;
const { SubMenu } = Menu;
const { Title } = Typography;

interface IProps {
  [key: string]: any;
}
let category: any = []
let categoryArray: any = []
let keywords = ''   //如果不是因为textarea那里面的defaultValue不能设置表达式，谁又愿意设置这个变量呢
let DataPath: any = {
  pathname: '/dataShow/data',
  query: {},
}
let ImagePath: any = {
  pathname: '/dataShow/image',
  query: {},
}
let DataPathCopy: any = {
  pathname: '/dataShow/data',
  query: [],
}
let ImagePathCopy: any = {
  pathname: '/dataShow/image',
  query: [],
}

DataPath.query.type = 'cotton'
ImagePath.query.type = 'cotton'

let ImagePathQueryArray: any = []
let DataPathQueryArray: any = []
const Menu_left = (props: IProps) => {
  const { yearImages, yearData, dataCategory, imageCategory, handleCategory, handleIsDataOrImages, handleDirectoryList } = props;
  console.log("handleCategory:", handleCategory);

  const [currentMenuItem, setCurrentMenuItem] = useState('') as any


  const handleClick = (e: any) => {
    setCurrentMenuItem(e.key)

    let Year_item = e.key.split(':')[1]
    console.log('e.key.split[1] :>> ', e.key.split(':')[1], e.key.split(':')[0] == 'images', e.key.split(':')[0] == 'data');
    if (e.key.split(':')[0] == 'images') {
      ImagePathQueryArray = []
      ImagePathQueryArray.push({ type: 'cotton' })

      ImagePath.query['Year_item'] = Year_item
      ImagePathQueryArray.push({ 'Year_item': Year_item })

      handleIsDataOrImages(true)

      imageCategory && imageCategory.forEach((item: any) => {
        if (e.key.includes(item.Year_item)) {
          category = item
          keywords = category.key_name + ':' + category.key_type
          handleCategory(category)
        }
      })

      getImgCategory({ type: 'cotton', Year_item: Year_item }).then(res => {
        console.log('getImgCategory :>> ', res);
        handleDirectoryList(res)
        res.forEach((item: any) => {
          ImagePath.query[item.title] = item.array[0]
          // let title = item.title
          // let value = item.array[0]
          let obj: any = {}
          obj[item.title] = item.array[0]
          ImagePathQueryArray.push(obj)
        })
        ImagePathCopy.query = ImagePathQueryArray
        console.log('ImagePathCopy2 :>> ', ImagePathCopy.query);
      })
    } else {

      DataPathQueryArray = []
      DataPathQueryArray.push({ type: 'cotton' })

      DataPath.query['Year_item'] = Year_item
      DataPathQueryArray.push({ 'Year_item': Year_item })

      handleIsDataOrImages(false)
      dataCategory && dataCategory.forEach((item: any) => {
        if (e.key.includes(item.Year_item)) {
          category = item
          keywords = category.key_name + ':' + category.key_type
          handleCategory(category)
          console.log("categorydata:", category);
        }
      })
      getDataCategory({ type: 'cotton', Year_item: Year_item }).then(res => {
        console.log('getDataCategory :>> ', res);
        handleDirectoryList(res)
        res.forEach((item: any) => {
          DataPath.query[item.title] = item.array[0]
          // let title = item.title
          // let value = item.array[0]
          let obj: any = {}
          obj[item.title] = item.array[0]
          DataPathQueryArray.push(obj)
        })
        DataPathCopy.query = DataPathQueryArray
        console.log('DataPathCopy2 :>> ', DataPathCopy.query);
      })
    }


    if (e.key.includes('data')) {

    } else {

    }
  }

  useEffect(() => {
    console.log("yearImages:", yearImages);
    if (yearImages && yearImages[0]) {
      setCurrentMenuItem('images:' + String(yearImages[0]))
    }
  }, [yearImages]);

  return (
    <Menu
      mode="inline"
      defaultOpenKeys={['Cotton(Images)', 'Cotton(Data)']}
      selectedKeys={[currentMenuItem]}
      onClick={handleClick}
    >
      <SubMenu key="Cotton(Images)" title="Cotton(Images)" className={$style['subMenu']}>
        {yearImages.map((item: any, index: any) => <Menu.Item key={'images:' + item} className={$style['menuItem']}>{item}</Menu.Item>)}
      </SubMenu>
      <SubMenu key="Cotton(Data)" title="Cotton(Data)" className={$style['subMenu']}>
        {yearData.map((item: any, index: any) => <Menu.Item key={'data:' + item} className={$style['menuItem']}>{item}</Menu.Item>)}
      </SubMenu>
    </Menu>
  )
}
export const Cotton = (year: string) => {
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
    getCategory({ condition: { type: 'cotton' } }).then(res => {
      console.log("res111222333:", res);
      setDataCategory(res.data);
      setImageCategory(res.image);

      category = res.image[0]   //初始目录
      category&&getImgCategory({ type: 'cotton', Year_item: category.Year_item }).then(res => {
        console.log('getImgCategory :>> ', res);
        setDirectoryList(res)
        ImagePathQueryArray = []
        ImagePathQueryArray.push({ 'type': 'cotton' })
        ImagePathQueryArray.push({ 'Year_item': category.Year_item })
        res.forEach((item: any) => {
          console.log('res 6666:>> ', res);
          ImagePath.query[item.title] = item.array[0]
          ImagePath.query['Year_item'] = category.Year_item
          // let title = item.title
          // let value = item.array[0]
          let obj: any = {}
          obj[item.title] = item.array[0]
          ImagePathQueryArray.push(obj)
        })
        ImagePathCopy.query = ImagePathQueryArray
        console.log('ImagePathCopyFirst :>> ', ImagePathCopy.query);
      })

      console.log("初始目录:", category);
      keywords = category && category.key_name + ':' + category && category.key_type
      setItemObject(category)
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
  const handleCategory = (item: any) => {
    setItemObject(item)
  }
  const handleDirectoryList = (item: any) => {
    setDirectoryList(item)
  }
  const handleIsDataOrImages = (isImage: boolean) => {
    setIsDataOrImages(isImage)

  }
  const handleSelect = (e: any, title: any) => {
    console.log('handleSelect :>> ', e.target.value, title);
    if (isDataOrImages) {
      ImagePath.query[title] = e.target.value
      console.log('ImagePath :>> ', ImagePath.query);
    } else {
      DataPath.query[title] = e.target.value
      console.log('DataPath :>> ', DataPath.query);
    }
  }

  // const handleAddDirectory = () => {
  //   let temdirectoryList = directoryList.slice()
  //   temdirectoryList.push([24, 25, 26, 27, 28])
  //   setDirectoryList(temdirectoryList);
  //   form.resetFields();
  // }
  const handleYearChange = (title: any, e: any) => {
    let value = e.target.value
    let data = Object.assign({},)
  }

  useEffect(() => {
    getCategoryData()
    console.log('DataPath :>> ', DataPath.query);
    console.log('ImagePath :>> ', ImagePath.query);
  }, []);

  const formContent = (
    <div className={$style['leftWrapper']}>
      <Menu_left yearImages={imageYear} yearData={dataYear} dataCategory={dataCategory} imageCategory={imageCategory} handleCategory={handleCategory} handleIsDataOrImages={handleIsDataOrImages} handleDirectoryList={handleDirectoryList} >
      </Menu_left>
      <Button type="primary"><Link to={'/download'}>下载</Link></Button>
    </div>
  )

  const rightContent = (
    <div className={$style['rightWrapper']}>
      <Note html={itemObject && itemObject.note}></Note>

      <div className={$style['directories']}>
        {directoryList.map((items: any, index: number) =>
          <div className={$style['QueryDirectories']}>
            <Title level={4} className={$style['category']}>{items.title}</Title>
            <select name="directory" size={5} onChange={(e) => handleSelect(e, items.title)}>
              {items.array.map((item_each: any, indexEach: any) => <option value={item_each} selected={indexEach == 0 ? true : false}>{item_each}</option>)}
            </select>
          </div>
        )}

      </div>

      <div className={$style['buttons']}>
        {isDataOrImages && <Button type="primary" className={$style['botton']} ><Link to={ImagePathCopy}>Search images</Link></Button>}
        {!isDataOrImages && <Button type="primary" className={$style['botton']}><Link to={DataPathCopy}>Search data</Link></Button>}
        {/* 下面这个判断是为了在左边data菜单年份为空时也能显示出新增数据按钮 */}
        {!dataCategory[0] && <Button type="primary" className={$style['botton']}><Link to={DataPathCopy}>Search data</Link></Button>}
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