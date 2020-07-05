/**
 * @file: description
 * @author: xinguangtai
 * @Date: 2020-07-05 19:19:22
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-05 21:27:10
 */
import React, { useEffect, useState, useCallback } from "react";
import {Button} from 'antd';

export const DropdownAndPickUp = (props: any) => {
  const [showChildren, setshowChildren] = useState(false);

  return (
    <>
      <Button
        onClick={() => setshowChildren(true)}
        size="small"
        style={{ display: showChildren ? "none" : "block", marginBottom:'10px' }}
      >
        for more
      </Button>
      {showChildren && props.children}
      <Button
        onClick={() => setshowChildren(false)}
        style={{ display: showChildren ? "block" : "none" }}
      >
        pick up
      </Button>
    </>
  );
};
