import React from 'react';
import ReactEcharts from 'echarts-for-react';
import $style from './style.module.scss';

interface IProps {
    xData: any,
    yData: any,
    valueData: any
}

export const LineMarkerEcharts = (props: IProps) => {
    const { xData, yData, valueData } = props;

    const endWidth = 500 / xData.length;

    const getOtion = () => {
        const option = {
            title: {
                text: 'Line Charts',
                textStyle: {
                    fontFamily: '微软雅黑',
                    fontSize: 14,
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                show: true,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: { readOnly: false },
                    magicType: { type: ['line', 'bar'] },
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xData
            },
            yAxis: {
                type: 'value',

            },
            dataZoom: [
                {
                    show: true,
                    start: 1,
                    end: endWidth
                },
                {
                    type: 'inside',
                    start: 1,
                    end: endWidth
                },
                /*                 {
                                    show: true,
                                    yAxisIndex: 0,
                                    filterMode: 'empty',
                                    width: 10,
                                    height: '80%',
                                    showDataShadow: false,
                                    left: '93%'
                                } */
            ],
            series: [
                {
                    name: '数值',
                    type: 'line',
                    //data: [11, 11, 15, 13, 12, 13, 10],
                    data: yData,
                    markPoint: {
                        symbol: 'pin', //标记(气泡)的图形
                        symbolSize: 50, //标记(气泡)的大小
                        data: valueData
                    },
                },
            ]
        };
        return option;
    }
    return (
        <div className={$style['echartsWrapper']}>
            <ReactEcharts
                option={getOtion()}
                style={{ height: '350px', width: '1000px' }}
                className='react_for_echarts' />
        </div>

    );
};
