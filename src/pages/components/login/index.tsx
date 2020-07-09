import React, { useState, useContext } from 'react';

import intl from '../../../utils/intlSafe';
import $style from "./style.module.scss";
import { Dropdown, Menu, Modal, Form, Input, Button } from 'antd'

import { checkLogin, loginAccount, logout } from '../../../api/login';
import { Context } from '../../../context';
import { ACTION_TYPE } from '../../../context/actions';

export const Login = () => {
    const [login, setLogin ] = useState(false);
    const [username, setUsername] = useState('');
    const [modalVisable, setModalVisable] = useState(false);

    const [form] = Form.useForm();
    const { dispatch } = useContext(Context);

    const handleLogout = () => {
        logout().then(() => {
            dispatch({
                type: ACTION_TYPE.UPDATE_USER_STATE,
                data: false
            });
            window.location.reload();
            setLogin(false)
        })
    }
    const overlay = (
        <Menu>
            <Menu.Item onClick={handleLogout}>
              {intl.get('logout')}
            </Menu.Item>
        </Menu> 
    );

    const hanleLoginAfter = (res:any) => {
        const { login, username, role } = res;
        if(role === 'Admin') {
            setLogin(login);
            dispatch({
                type: ACTION_TYPE.UPDATE_USER_STATE,
                data: true
            });
        }
        setUsername(username);
    }

    const handleLogin = () => {
        const { validateFields, getFieldsValue } = form;
        validateFields().then(() => {
            const value = getFieldsValue();
            loginAccount(value).then((res) => {
                hanleLoginAfter(res);
                setModalVisable(false);
                window.location.reload();
            }).catch((err) => console.error(err))
        });
    }

    if(!login) {
        checkLogin().then((res) => {
            hanleLoginAfter(res);
        })
    }

    return (
        <div className={$style['loginWrapper']}>
            <div className={$style['login']}>
                {login ?
                        <a className={$style['userName']}  onClick={handleLogout}>
                            {intl.get('logout')}
                        </a>
                    :
                    <a className={$style['active']} onClick={() => setModalVisable(true)}>
                        {intl.get('Sign_In')}
                    </a>
                }
            </div>
            <Modal
                wrapClassName={$style['loginModal']}
                visible={modalVisable}
                title=""
                width={328}
                footer={null}
                onCancel={() => setModalVisable(false)}
            >
                <div className={$style['formWrapper']}>
                    <Form form={form} >
                        <Form.Item name="username" rules={[
                            {
                                required: true,
                                message: intl.get('username_null_tip')
                            }
                        ]}>
                            <Input placeholder={intl.get('username')}/>
                        </Form.Item>
                        <Form.Item name="password" rules={[
                            {
                                required: true,
                                message: intl.get('password_null_tip')
                            }
                        ]}>
                            <Input.Password placeholder={intl.get('password')}/>
                        </Form.Item>
                    </Form>
                </div>
                <Button
                    className={$style['signButton']}
                    onClick={handleLogin}
                    htmlType="submit"
                    >
                    {intl.get('Sign_In')}
                </Button>       
            </Modal>
        </div>
    )
}