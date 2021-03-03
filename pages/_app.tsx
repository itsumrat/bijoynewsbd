import { FC } from 'react';
import  { AppProps } from 'next/app';
import Header from "../components/header";
import '../static/css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "../components/footer";
import * as React from "react";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div >
        <Header/>
        <Component {...pageProps} />
        <Footer/>
    </div>
  );
};

export default MyApp;
