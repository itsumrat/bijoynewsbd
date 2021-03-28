import { FC } from 'react';
import  { AppProps } from 'next/app';
import '../static/css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import * as React from "react";
import BlankLayout from "../components/layouts/blank";
import {ProfileProvider} from "../context/ProfileContext";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const {Layout: Layout1} = Component;
    const Layout = Layout1 || BlankLayout;
  return (
    <ProfileProvider >
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </ProfileProvider>
  );
};

export default MyApp;
