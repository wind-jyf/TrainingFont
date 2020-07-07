import React, { useEffect, useState, useContext } from 'react';

import { Down } from './Down';
import { Upload } from './Upload';
import { Context } from '../../context';

interface Iprops {
    [key: string]: any;
}

export const Download = (props: Iprops) => {

    const { state: { admin } } = useContext(Context);

    return (
        <div>
            {
                admin ? <Upload /> : <Down />
            }
        </div>
    )
}