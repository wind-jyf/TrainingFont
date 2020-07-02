import React from 'react';

import { Footer } from './footer';
import { Header } from './header';

interface IProps {
    children?: any;
    header: any;
}

export const Layout = (props:IProps) => {
    return (
        <div>
            <Header {...props.header}/>
            {props.children}
            <Footer/>
        </div>
    )
}