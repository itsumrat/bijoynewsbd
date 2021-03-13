import { FC } from 'react';
import  { AppProps } from 'next/app';
import '../static/css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import * as React from "react";
import BlankLayout from "../components/layouts/blank";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const {Layout: Layout1} = Component;
    const Layout = Layout1 || BlankLayout;
  return (
    <div >

        <Layout>
            <Component {...pageProps} />
        </Layout>

    </div>
  );
};

export default MyApp;
