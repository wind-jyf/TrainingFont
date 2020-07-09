import React from 'react';
import {Card} from 'antd';
import $style from './style.module.scss';

interface Iprops{
    html:string
}

export const Note =(props :Iprops)=>{
    return (
        <div className={$style['wrapper']}>
            <Card title="Note:" size="small" headStyle={{fontSize:20,color:"#43b344"}} bodyStyle={{fontSize:16}}>
                <div dangerouslySetInnerHTML={{__html: props.html}}></div>
            </Card>
        </div>
    )
}