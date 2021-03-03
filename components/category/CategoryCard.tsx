import React from "react";

const CategoryCard = () => {

    return(
        <div className="card mb-3">
            <div className="row no-gutters">
                <div className="col-md-9">
                    <div className="card-body">
                        <h5 className="card-title"><a href="single-post.php">১৭ বছর পর দেশে ফিরে দেখলেন থাকার জায়গাটাও
                            নেই</a></h5>
                        <p className="card-text">সৌদি আরব থেকে নাসির উদ্দিন ফিরেছেন খালি হাতে। ফেরার আগে বৈধ কাগজ না
                            থাকায় তাঁকে সেখানে ১৮</p>
                        <small className="text-muted">২১ জানুয়ারি, ২০২১, ০৫:৫০ PM</small>
                    </div>
                </div>
                <div className="col-md-3">
                    <img src="/static/img/pic.jpg" className="card-img" alt="..." />
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;
