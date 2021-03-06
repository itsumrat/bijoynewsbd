import React, {useContext, useEffect, useState} from 'react';
import {Navbar} from 'react-bootstrap';
import Link from "next/link";
import httpClient from "../../src/utils/httpClient";
import moment from 'moment';
import {ProfileContext} from "../../context/ProfileContext";

interface IDefaultLayout {
    categories: any[];
}

export const DefaultLayoutContext = React.createContext<IDefaultLayout>(
    {
        categories: []
    });

const DefaultLayout: React.FC = ({children}: { children: React.ReactChildren }) => {
    const [categories, setCategories] = useState([]);
    const profileCtx = useContext(ProfileContext);
    const getCategories = () => {
        httpClient.get('/category')
            .then(res => {
                setCategories(res.data.items);
            })
            .catch(err => {
            })
    }
    useEffect(() => {
        getCategories();
    }, [])
    return <div>
        <header className="container-fluid">
            <div className=" d-flex justify-content-between align-items-center">
                <div className="d-none d-sm-block">{moment().locale('bn').format('LLLL')}</div>
                <div>
                    <Link href='/'>
                        <a className="navbar-brand">
                            <img style={{height: 80}} src="/static/img/logo.png"/>
                        </a>
                    </Link>
                </div>
                <div>
                    {
                        profileCtx.isLoggedIn ? (
                            <div className="font-weight-bold text-capitalize">
                                {profileCtx.user && profileCtx.user.name}
                            </div>
                        ): (
                            <Link href='/login'>
                                <a>Login</a>
                            </Link>
                        )
                    }
                </div>
            </div>
        </header>
        <Navbar expand="lg" style={{background: 'white'}} className="container">
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <ul className="navbar-nav" >
                    {
                        categories.map(category => (<li key={category.id} className="nav-item active">
                            <Link href={`/news/${category.name}`}>
                                <a className="nav-link">{category.name}</a>
                            </Link>
                        </li>))
                    }
                </ul>
            </Navbar.Collapse>
        </Navbar>
        <DefaultLayoutContext.Provider value={{categories}}>  {children}</DefaultLayoutContext.Provider>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <footer>
                        <img src="/static/img/logo.png"/>
                        <ul>
                            <li><a href="#">??????????????? ????????????</a></li>
                            <li><a href="#">???????????????????????? ????????????</a></li>
                            <li><a href="#">????????????????????????</a></li>
                            <li><a href="#">?????????????????????</a></li>
                        </ul>
                        <hr/>
                        <p>?????????????????? ?? ???????????? ??????????????? ????????????</p>
                    </footer>
                </div>
            </div>
        </div>


    </div>
}

export default DefaultLayout;
