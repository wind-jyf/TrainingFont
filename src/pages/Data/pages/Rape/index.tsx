import React, { useState, useEffect } from 'react';
import { Form, Select, Input, Button, Menu, Typography, Divider } from 'antd';
import { Link } from "react-router-dom";
import $style from "./style.module.scss";

import { SearchPanel } from '../../components/SearchPanel';
import { Note } from '../../components/Note';
import { getAccessionIdJbyList } from '../../../../api/maize';
import { getPermission } from '../../../../api/permission';

const { Option } = Select;
const { TextArea } = Input;
const { SubMenu } = Menu;
const { Title } = Typography;
//借用下这个接口看效果
const defaultPermissionQuery = {
  s_tp: 'maize',
  s_user: 'JbYWnY',
  s_img_data: 'data'
}

interface IProps {
  [key: string]: any;
}

const options: any = [];
for (let i = 0; i < 100000; i++) {
  const value = `${i.toString(36)}${i}`;
  options.push({
    value,
    disabled: i === 10,
  });
}

const Menu_left = (props: IProps) => {
  const { yearImages, yearData } = props;

  const [currentMenuItem, setCurrentMenuItem ] = useState('') as any

  console.log("yearImages123:",yearImages);

  const handleClick = (e:any) =>{
    setCurrentMenuItem(e.key)
  }

  useEffect(() => {
    if(yearImages&&yearImages[0]) {
      setCurrentMenuItem(String(yearImages[0].s_id+5))
    }
  }, [yearImages]);

  return (
    <Menu
      mode="inline"
      defaultOpenKeys={['Rape(Images):', 'Rape(Data):']}
      selectedKeys={[currentMenuItem]}
      onClick={handleClick}
    >
      <SubMenu key="Rape(Images):" title="Rape(Images):">
        {yearImages.map((item: any, index: any) => <Menu.Item key={item.s_id+5} >{item.s_year}</Menu.Item>)}
      </SubMenu>
      <SubMenu key="Rape(Data):" title="Rape(Data):">
        {yearData.map((item: any, index: any) => <Menu.Item key={item.s_id} >{item.s_year}</Menu.Item>)}
      </SubMenu>
    </Menu>
  )
}
export const Rape = (type: string) => {
  const [year, setYear] = useState([]) as any;
  const [directoryList, setDirectoryList] = useState([]) as any;
  const [query, setQuery] = useState([]) as any;

  const [form] = Form.useForm();

  const handleGetAccessionId = (year: any) => {
    console.log("6666666");
    return getAccessionIdJbyList({ year }).then((result) => {
      // setDirectoryList(result);//从这里读取到对应year下的的目录二维数组对象列表
    }).then(() => {
      form.resetFields(['id']);
    }).catch((err) => console.log(err));
  }


  const handleGetNextDirectory = (currentDirectory: any) => {
    // return getAccessionIdJbyList({ year }).then((result) => {
    //   let result1=[1,2,3,4,5];
    //   setDirectoryList(result1);//从这里读取到对应year下的的目录对象数组列表
    // }).then(() => {
    //   form.resetFields(['id']);
    // }).catch((err) => console.log(err));
  }
  useEffect(() => {
    getPermission(defaultPermissionQuery).then((res) => {
      setYear(res);  //从这里读取到year的数组列表，每个项是一个对象
      let result1 = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16, 17, 18], [19, 20, 21, 22, 23]];
      setDirectoryList(result1);//从这里读取到对应year下的的目录二维数组对象列表
      // setSelectedValue(result1);
      console.log("directoryList:", directoryList);
      if (res.length !== 0) {
        handleGetAccessionId(res[0].s_year).then(() => {
          form.resetFields();
        }).catch((err) => console.log(err));
      }
    }).catch((err) => console.log(err));
  }, []);

  const formContent = (
    <div className={$style['leftWrapper']}>
      <Menu_left yearImages={year} yearData={year}>
      </Menu_left>
    </div>
  )

  const rightContent = (
    <div className={$style['rightWrapper']}>
      <Note html={"welcome"}></Note>

      <div className={$style['directories']}>
        {directoryList.map((items: any, index: number) =>
          <div className={$style['QueryDirectories']}>
            <Title level={4}>目录{index}</Title>
            <select name="directory" size={10} >
              { items.map((item_each: any) => <option value={item_each}>{item_each}</option>) }
            </select>
          </div>

        )}


        {/* <div className={$style['firstQueryDirectory']}>
          <Form form={form} layout='inline' className={$style['firstQueryDirectory_left']} >
            <Form.Item name="KeyWords" label='请输入查询列的关键字:'  >
              <TextArea rows={2} cols={20} >
              </TextArea>
            </Form.Item>
          </Form>
        </div> */}
        {/* <div className={$style['QueryDirectories']}>
          <Title level={4}>关键字目录</Title>
          <Select style={{ width: 200 }} showSearch placeholder={items[0]} options={options} />
          <Divider />
        </div> */}
      </div>

      <div className={$style['buttons']}>
        <Button type="primary" >Search images</Button>
        <Button type="primary" >Search data</Button>
      </div>
    </div >
  )


  return (
    <div className={$style['userWrapper']}>
      <SearchPanel
        formContent={formContent}
      />
      {rightContent}
    </div>
  )
}