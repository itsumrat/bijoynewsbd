import React, {useContext} from 'react';
import {Form, Input, Button, Checkbox, Row, Col, message} from 'antd';
import Link from "next/link";
import httpClient from "../../src/utils/httpClient";
import {useRouter} from "next/router";
import {ProfileContext} from "../../context/ProfileContext";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const LoginPage = () => {
    const router = useRouter();
    const profileCtx = useContext(ProfileContext);

    const onFinish = (values: any) => {
        httpClient.post('/auth/login', values)
            .then(res=>{
                localStorage.setItem('access_token', res.data.access_token);
                message.success("Successfully login");
                profileCtx.getCurrentUser();
                if(router.pathname === '/views/admin/login'){
                    router.push('/admin');
                }else {
                    router.push('/');
                }

            })
            .catch((err: any)=>{
                message.error("Couldn't login");
            })
    };

    const onFinishFailed = (errorInfo: any) => {};
    return(
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 vw-100">
            <Row>
                <Col>
                    <img src='/static/img/logo.png' alt='Bijoynews bd'/>
                </Col>
            </Row>
            <Row>
                <Col span={24} >
                    <Form
                        {...layout}
                        name="LoginForm"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <Form.Item {...tailLayout} className='d-flex justify-content-end'>
                            <p>Register ? <Link href='/signup'><a>Signup</a></Link></p>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default LoginPage;
