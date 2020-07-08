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
} */


// const mySearchData = {
//     'type': 'rice',
//     'Year_item': '2013-drought',
//     'Acession_ID': '001(W062)',
//     'Trait': 'all'
// }

export const DataShow = (props: Iprops) => {

  const isImage = props.match.params.type === 'image' ? true : false;
  const { location } = props
  console.log('locationQuery :>> ', location.query);
  if (!location.query) {
    window.location.href = '/'
  }
  const mySearchData = location.query
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
    }

  }, []);

  return (
    <div>
      <p className={$style['data-title']}>{mySearchData[0].type}-{mySearchData[1].Year_item}</p>
      {
        isImage
          ? <div className={$style['pictureShow']}>
            <ImgDisplayer
              data={img}
              rotate={'rotate(-90deg)'}
            />
          </div>
          : <div className={$style['dataShow']}>
            <DataDisplayer
              data={data}
            />
            <LineMarkerEcharts
              xData={xData}
              yData={yData}
              valueData={valueData}
            />
          </div>
      }
    </div>

  )

}