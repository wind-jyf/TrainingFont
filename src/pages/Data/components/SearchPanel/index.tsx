import React, { ReactNode } from 'react';
import { Button } from 'antd';
import $style from "./style.module.scss";

interface Iprops {
    formContent: ReactNode,
    searchData?: any,
    searchImg?: any
}

export const SearchPanel = (props: Iprops) => {
    const { searchData, formContent, searchImg } = props;
    return (
        <div className={$style['searchPanel']}>
            <div className={$style['formWrapper']}>
                {formContent}
            </div>
            <div className={$style['buttonWrapper']}>
                {searchData && <Button type='primary' onClick={searchData} className={$style['dataButton']}>Search Data</Button>}
                {searchImg && <Button type='primary' onClick={searchImg} className={$style['imgButton']}>Search Img</Button>}
            </div>
        </div>
    )
}