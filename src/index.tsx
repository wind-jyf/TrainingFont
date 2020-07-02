import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import intl, { getInitialLocale, setInitialLocale } from './utils/intlSafe';

import { ConfigProvider } from 'antd';
import { createBrowserHistory } from 'history';
import { Route, Router, Switch } from 'react-router';

import './index.css';
import 'antd/dist/antd.css';
import enUS from 'antd/lib/locale-provider/en_US';
import zhCN from 'antd/es/locale-provider/zh_CN';
import { LOCALES } from './constants';
import { locales } from './locales';
import Home from './Home';

import { Context } from './context';
import { useUserReducer } from './context/reducer';

export const history = createBrowserHistory();

const App = () => {
    const [ currentLocale, setCurrentLocale] = useState(getInitialLocale());
    const getAntLocale = () =>  {
        let antLocale = enUS;
        switch (currentLocale) {
            
            case LOCALES.en:
                antLocale = zhCN;
            break;

            default:
                antLocale = zhCN;
        }
        return antLocale;
    };

    const handleChangeLocale = (locale:string) => {
        const options = intl.getInitOptions();
        intl.init({
            ...options,
            currentLocale: locale
        });
        setInitialLocale(locale);
        setCurrentLocale(locale);
    };


    return(
        <ConfigProvider locale={getAntLocale()}>
            <Context.Provider value={useUserReducer()}>
                <Router history={history}>
                    <Switch>
                        <Route path="/" render={() => <Home 
                            currentLocale={currentLocale} 
                            handleChangeLocale={handleChangeLocale}
                            />} />
                    </Switch>
                </Router>
            </Context.Provider>
        </ConfigProvider>
    )};


intl.init({
    currentLocale: getInitialLocale(),
    locales
}).then(() => {
    ReactDOM.render(<App />, document.getElementById('root'));
})
