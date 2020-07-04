import React, { useEffect, useState } from 'react';
import $style from './style.module.scss';

import { getImgData, getDataData } from '../../api/data';
import { ImgDisplayer } from './components/ImgDisplayer';
import { DataDisplayer } from './components/dataDisplayer';
import { LineMarkerEcharts } from './components/dataEcharts';

interface Iprops {
    [key: string]: any;
}

/* const mySearchData = {
    'type': 'rice',
    'Year_item': '2013-drought',
    'Accession_ID': '001(W062)',
    'Condition': 'all'
}
 */

const mySearchData = {
    'type': 'rice',
    'Year_item': '2013-drought',
    'Accession_ID': '001(W062)',
    'Trait': 'E'
}

export const DataShow = (props: Iprops) => {

    const isImage = props.match.params.type === 'image' ? true : false;

    const [img, setImg] = useState([]) as any;
    const [data, setData] = useState([]) as any;
    const [xData, setXData] = useState([]) as any;
    const [yData, setYData] = useState([]) as any;
    const [valueData, setValueData] = useState([]) as any;

    useEffect(() => {
        if (isImage) {
            getImgData({
                searchData: mySearchData
            }).then(res => {
                setImg(res);
            })

        } else {
            getDataData({
                searchData: mySearchData
            }).then(res => {
                const xArr = [], yArr = [], valueArr = [];
                setData(res);
                const dataObj: any = res[0];
                let index = 0;
                for (let i in dataObj) {
                    xArr.push(i);
                    yArr.push(dataObj[i]);
                    valueArr.push({
                        value: dataObj[i],
                        xAxis: index,
                        yAxis: dataObj[i]
                    });
                    index++;
                }
                setXData(xArr);
                setYData(yArr);
                setValueData(valueArr);
            })
            //const tableData = [{ LNL_T1: "187.05", LNL_T2: "203.99", LNL_T3: "203.99", LNL_T4: "203.99", LNL_T5: "203.99", LNL_T6: "203.99", LNL_T7: "203.99", LNL_T8: "203.99", LNL_T9: "203.99", LNL_T10: "203.99", LNL_T11: "103.99", LNL_T12: "103.99", LNL_T13: "303.99", LNL_T14: "153.99", LNL_T15: "143.99" }];

        }
    }, []);

    if (isImage) {
        return (
            <div className={$style['pictureShow']}>
                <ImgDisplayer
                    data={img}
                    rotate={'rotate(-90deg)'}
                />
            </div>
        )
    } else {
        return (
            <div className={$style['dataShow']}>
                <DataDisplayer
                    data={data}
                />
                <LineMarkerEcharts
                    xData={xData}
                    yData={yData}
                    valueData={valueData}
                />
            </div>
        )
    }

}