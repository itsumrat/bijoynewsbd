import * as React from "react";

const Footer = () => {

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <footer>
                        <img src="/static/img/logo.png" />
                            <ul>
                                <li><a href="#">বিজয় নিউজ</a></li>
                                <li><a href="#">গোপনীয়তা নীতি</a></li>
                                <li><a href="#">নীতিমালা</a></li>
                                <li><a href="#">যোগাযোগ</a></li>
                            </ul>
                            <hr />
                                <p>স্বত্ব © ২০২১ বিজয় নিউজ</p>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Footer;
