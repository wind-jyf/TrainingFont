import React, { useState } from 'react';
import $style from './style.module.scss';
import { Modal } from 'antd';

interface IProps {
    data: any;
    rotate?: any;
}

export const ImgDisplayer = (props:IProps) => {
    const { data, rotate } = props;
    const [modalShow, setModalShow] = useState(false);
    const [currentPath, setCurrentPath] = useState();
    
    const loading = data.length === 0;
    return (
        <>
            {loading ? null : (
            <div className={$style['imgWrapper']}>
                {
                    data.map((item:any, index:number) => {
                        return (
                            <div className={$style['imgItem']} key={index}>
                                <img className={$style['picture']} src={`/${item.path}`} 
                                    style={rotate && {transform: rotate}} 
                                    onClick={() => {
                                        setModalShow(true);
                                        setCurrentPath(item.path)
                                    }} 
                                />
                            </div>
                        )
                    })                    
                }
            </div>
           )}
            <Modal
                visible={modalShow}
                onCancel={() => setModalShow(false)}
                footer={null} 
            >
               <img className={$style['bigImg']} style={rotate && {transform: rotate}}  src={`/${currentPath}`}></img> 
            </Modal>
       </>
    )
}