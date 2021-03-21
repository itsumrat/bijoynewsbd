import React from 'react';
import {
    Form,
    Input,
    Checkbox,
    Button, Row, Col, message,

} from 'antd';
import Link from 'next/link';
import httpClient from "../../src/utils/httpClient";
import {useRouter} from "next/router";


const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const RegistrationForm = () => {
    const [form] = Form.useForm();
    const router = useRouter()
    const onFinish = (values: any) => {
        httpClient.post('/auth/signup', values)
            .then(res=>{
                message.success("Successfully signup");
                router.push('/login');
            })
            .catch((err: any)=>{
                message.error("Couldn't signup");
            })
    };


    return (
       <div>
           <div className="d-flex justify-content-center" >
               <img src="/static/img/logo.png" alt="Bijoynews bd"/>
           </div>
           <Form
               {...formItemLayout}
               form={form}
               name="register"
               onFinish={onFinish}
               initialValues={{
                   residence: ['zhejiang', 'hangzhou', 'xihu'],
                   prefix: '86',
               }}
               scrollToFirstError
           >
               <Form.Item
                   name="email"
                   label="E-mail"
                   rules={[
                       {
                           type: 'email',
                           message: 'The input is not valid E-mail!',
                       },
                       {
                           required: true,
                           message: 'Please input your E-mail!',
                       },
                   ]}
               >
                   <Input />
               </Form.Item>

               <Form.Item
                   name="password"
                   label="Password"
                   rules={[
                       {
                           required: true,
                           message: 'Please input your password!',
                       },
                   ]}
                   hasFeedback
               >
                   <Input.Password />
               </Form.Item>

               <Form.Item
                   name="confirm"
                   label="Confirm Password"
                   dependencies={['password']}
                   hasFeedback
                   rules={[
                       {
                           required: true,
                           message: 'Please confirm your password!',
                       },
                       ({ getFieldValue }) => ({
                           validator(_, value) {
                               if (!value || getFieldValue('password') === value) {
                                   return Promise.resolve();
                               }
                               return Promise.reject(new Error('The two passwords that you entered do not match!'));
                           },
                       }),
                   ]}
               >
                   <Input.Password />
               </Form.Item>

               <Form.Item
                   name="name"
                   label="name"
                   tooltip="What do you want others to call you?"
                   rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
               >
                   <Input />
               </Form.Item>

               <Form.Item
                   name="agreement"
                   valuePropName="checked"
                   rules={[
                       {
                           validator: (_, value) =>
                               value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                       },
                   ]}
                   {...tailFormItemLayout}
               >
                   <Checkbox>
                       I have read the <a href="">agreement</a>
                   </Checkbox>
               </Form.Item>
               <Form.Item  className='d-flex justify-content-end'>
                   <p>Already have an account ? <Link href='/login'><a>Login</a></Link></p>
               </Form.Item>
               <Form.Item {...tailFormItemLayout}>
                   <Button type="primary" htmlType="submit">
                       Register
                   </Button>
               </Form.Item>
           </Form>
       </div>
    );
};

export default RegistrationForm;
