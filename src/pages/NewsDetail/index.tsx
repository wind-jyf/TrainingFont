/**
 * @file: description
 * @author: yangqianjun
 * @Date: 2020-07-02 17:45:07
 * @LastEditors: yangqianjun
 * @LastEditTime: 2020-07-03 19:45:59
 */
import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import queryString from 'query-string';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';

import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import $style from "./style.module.scss";

import { getNewsById } from '../../api/news';

export const NewsDetail = () => {
    const searchQuerys = queryString.parse(window.location.search);
    const [newsInfo, setNewsInfo] = useState({}) as any;
    const [editorState, setEditorState] = useState({}) as any;

    useEffect(() => {
        getNewsById({id:searchQuerys.id}).then((res: any) => {
            const { content } = res;
            // alert(content + '')
            // if(!content) return
            const contentBlock = htmlToDraft(content);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            setEditorState(editorState);
            setNewsInfo(res);
        });
    }, []);

    const loading = !Boolean(newsInfo.content);

    return (
        <Spin spinning={loading}>
            <div className={$style['detailContainer']}>
                <div className={$style['newsName']}>{newsInfo.name}</div>
                {loading ? null :
                    <Editor
                        toolbarHidden
                        readOnly
                        editorState={editorState}
                        wrapperClassName={$style['detailWrapper']}
                        editorClassName={$style['detalEditor']}
                    />
                }
            </div>
        </Spin>
    )
}