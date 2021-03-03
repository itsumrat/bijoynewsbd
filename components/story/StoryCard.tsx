import React from "react";
import Link from "next/link";

const StoryCard: React.FC<any> = ({story}) => {

    return(
        <div className="col-lg-3 col-md-4" style={{marginBottom: '16px'}}>
            <div className="article-item">
                <div className="card">
                    <img src={story.featuredImg || '/static/img/pic.jpg'} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <p className="article-preview-title">
                            <Link href={`/news/category/${story.slug}`}>
                                <a>{story.title}</a>
                            </Link>
                        </p>
                        <p className="article-preview-desc">{story.description}।</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoryCard;
