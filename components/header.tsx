import * as React from "react";
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import Link from "next/link";
const Header: React.FC<any> =() =>{


    return(
        <header>
            <div className="top-header container-fluid">
                <div className="d-none d-sm-block">বৃহস্পতিবার, ২১ জানুয়ারি, ২০২১</div>
                <div>
                    <Link href="/">
                        <a className="navbar-brand">
                            <img src="/static/img/logo.png" />
                        </a>
                    </Link>
                </div>
                <div>
                    <a className="btn btn-primary" href="#" data-toggle="modal" data-target="#loginModal">Login</a>
                </div>
            </div>
            <Navbar collapseOnSelect expand="lg" >
                {/*<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>*/}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <div className="nav-item active">
                        <a className="nav-link selected" href="category-page.php">জাতীয়</a>
                    </div>
                    <div className="nav-item active">
                        <a className="nav-link selected" href="category-page.php">রাজনীতি</a>
                    </div>
                    <div className="nav-item active">
                        <a className="nav-link selected" href="category-page.php">অর্থনীতি</a>
                    </div>
                    <div className="nav-item active">
                        <a className="nav-link selected" href="category-page.php">আন্তর্জাতিক</a>
                    </div>
                    <div className="nav-item active">
                        <a className="nav-link selected" href="category-page.php">সারাদেশ</a>
                    </div>
                    <div className="nav-item active">
                        <a className="nav-link selected" href="category-page.php">খেলা</a>
                    </div>
                    <div className="nav-item active">
                        <a className="nav-link selected" href="category-page.php">শিক্ষাঙ্গন</a>
                    </div>
                    <div className="nav-item active">
                        <a className="nav-link selected" href="category-page.php">লাইফ স্টাইল</a>
                    </div>
                    <div className="nav-item active">
                        <a className="nav-link selected" href="category-page.php">শিক্ষাঙ্গন</a>
                    </div>
                    <div className="nav-item active">
                        <a className="nav-link selected" href="category-page.php">লাইফ স্টাইল</a>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
};

export default Header;
