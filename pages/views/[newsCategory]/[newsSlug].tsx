import React from "react";
import {NextPage} from "next";
import {createMarkup} from '../../../src/utils/createMarkup';
import moment from "moment";
import StoryCard from "../../../components/story/StoryCard";
import Link from "next/link";

const SingleNews: NextPage<any> = ({story, stories}) => {
    console.log(story)
    console.log(stories)
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <div className="full-post">
                        <Link href={`/news/category/${story.slug}`}>
                            <h1 className="post-title">{story.title}</h1>
                        </Link>
                        <small>{moment(story.createdAt).locale('bn').format('LLLL')}</small>
                        <img src={story.featuredImg || '/static/img/pic.jpg'} className="featured-img"/>
                        <div dangerouslySetInnerHTML={createMarkup(story.body)}/>

                    </div>
                </div>
                <div className="offset-lg-1 col-lg-3">
                    <div className="full-post-sidebar">
                        <a href="#" className="comments"><span className="material-icons">comment</span>3 Comments</a>
                        <div className="social-share">
                            <h6>Share the article:</h6>
                            <ul>
                                <li>
                                    <a href="#"><img src="/static/img/fb.png"/> Facebook</a>
                                </li>
                                <li>
                                    <a href="#"><img src="/static/img/twitter.png"/> Twitter</a>
                                </li>
                                <li>
                                    <a href="#"><img src="/static/img/in.png"/> LinkedIn</a>
                                </li>
                                <li>
                                    <a href="#"><img src="/static/img/mail.png"/> Email</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="section-title mt-5">
                        <h1>আরও খবর</h1>
                    </div>
                </div>
                {
                    stories.map((story: any)=>(
                        <StoryCard key={ story.id} story={story}/>
                    ))
                }


            </div>
        </div>
    );
};

export function getServerSideProps(ctx: any) {
    return {
        props: {
            story: JSON.parse(JSON.stringify(ctx.query.story)),
            stories: JSON.parse(JSON.stringify(ctx.query.stories))
        }
    };
}

export default SingleNews;
