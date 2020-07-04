/**
 * @file: description
 * @author: xinguangtai
 * @Date: 2020-07-04 14:00:06
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-04 16:21:36
 */
import React, { useEffect, useState } from 'react';
import $style from "./style.module.scss";
import map from "../../img/map.jpg";
import positionPic from "../../img/position-pic.jpg";


interface Iprops {
    [key:string]: any;
}

export const Position = (props: Iprops) => {
    return (
        <div className={$style['position']}>
            <div className={$style['position-title']}>位置：中国●湖北●武汉 南湖狮子山街一号 430070</div>
            <div className={$style['position-map']}>
                <img src={map}  alt="" />
            </div>


            <div className={$style['position-map-card1']}>
                <div className={$style['img1']}>
                    <img src={positionPic}  alt="" />
                </div>
                <div className={$style['position-card1']}>
                    <h2>武汉天河国际机场</h2>
                    <span>公交路线：机场大巴一线 → 地铁2号线 → 571路</span><br></br>
                    <span>全程约3小时10分钟</span><br></br>
                    <span>打车费用： 130元（按驾车的最短路程计算）</span>
                </div>
            </div>

            <div className={$style['position-map-card2']}>
                <div className={$style['img2']}>
                    <img src={positionPic}  alt="" />
                </div>
                <div className={$style['position-card2']}>
                    <h2>武昌火车站</h2>
                    <span>公交路线：571路 全程约1小时</span><br></br>
                    <span>地铁4号线 → 地铁2号线 → 576路 全程约1小时 </span><br></br>
                    <span>打车费用： 26元（按驾车的最短路程计算）</span>
                </div>
            </div>

            <div className={$style['position-map-card3']}>
                <div className={$style['img3']}>
                    <img src={positionPic}  alt="" />
                </div>
                <div className={$style['position-card3']}>
                    <h2>武汉火车站</h2>
                    <span>公交线路：地铁4号线 → 576路 全程约1小时30分钟 </span><br></br>
                    <span>地铁4号线 → 571路 全程约1小时30分钟</span><br></br>
                    <span>地铁4号线 → 地铁2号线 → 591路 全程约1小时30分钟</span><br></br>
                    <span>打车费用： 60元（按驾车的最短路程计算）</span>
                </div>
            </div>

            <div className={$style['position-map-card4']}>
                <div className={$style['img4']}>
                    <img src={positionPic}  alt="" />
                </div>
                <div className={$style['position-card4']}>
                    <h2>汉口火车站</h2>
                    <span>地铁2号线 → 地铁4号线 → 571路 全程约1小时50分钟</span><br></br>
                    <span>地铁2号线 → 576路 全程约1小时30分钟</span><br></br>
                    <span>打车费用： 80元（按驾车的最短路程计算）</span>
                </div>
            </div>
           
        </div>)
}
