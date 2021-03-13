import React from "react";
import Link from "next/link";
import moment from "moment";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/ban-ts-comment
// @ts-ignore
const CategoryCard = ({story, category}) => {

    return(
        <div className="card mb-3">
            <div className="row no-gutters">
                <div className="col-md-9">
                    <div className="card-body">
                        <h5 className="card-title">
                            <Link href={`/news/${category}/${story.slug}`}>
                                <a>{story.title}</a>
                            </Link>
                        </h5>
                        <p className="card-text">{story.description}</p>
                        <small className="text-muted">{moment(story.publishedDate).locale('bn').format('LLLL')}</small>
                    </div>
                </div>
                <div className="col-md-3">
                    <img src={story.featuredImg || '/static/img/pic.jpg'} className="card-img" alt="..." />
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;
