import * as React from 'react';
import {NextPage, NextPageContext} from 'next';
import StoryCard from "../../components/story/StoryCard";
import Link from "next/link";
import {StoryInterface} from "../../src/story/interface/story.interface";
import DefaultLayout, {DefaultLayoutContext} from "../../components/layouts/DefaultLayout";
import {useContext} from "react";
import Head from 'components/head';

interface Props {
    stories: any;
    categories: any[]
}

const Home: NextPage<Props> = ({stories}) => {

    const defaultLayoutContext = useContext(DefaultLayoutContext);
    const categories = defaultLayoutContext.categories;
    const storiesData = stories.items || [];
    console.log(stories)
    return (
        <div>
            <Head
                title="Bijoynewsbd"
                description={'Story teller'}
                ogImage={'/static/img/logo.png'}
            />
            <div className="container mt-4">
                <div className="row">
                    {
                        storiesData.length > 0 && (
                            <div className="col-lg-6">
                                <div className="article-preview-left">
                                    <div className="card">
                                        <img style={{height: '285px'}} src={storiesData[0].featuredImg || "/static/img/pic.jpg"}
                                             className="card-img-top" alt={storiesData[0].title || ''}/>
                                        <div className="card-body">
                                            <Link href={`/news/${storiesData[0].category.name}/${storiesData[0].slug}`}>
                                                <a className="article-preview-title">{storiesData[0].title}</a>
                                            </Link>
                                            <p className="article-preview-desc">{storiesData[0].description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    <div className="col-lg-6">
                        <div className="row">
                            {
                                storiesData.slice(0, 4).map((story: StoryInterface) => (
                                    <div key={story.id} className="col-lg-6">
                                        <div className="article-preview-right">
                                            <div className="card">
                                                <img style={{height: '150px'}} src={story.featuredImg || "/static/img/pic.jpg"}
                                                     className="card-img-top" alt={story.title}/>
                                                <div className="card-body">
                                                    <p className="article-preview-title">
                                                        <Link href={`/news/${story.category.name}/${story.slug}`}>
                                                            <a>{story.title}</a>
                                                        </Link>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>

                {
                    categories.map((category: any) => (
                        <div key={category.id} className="row">
                            <div className="col-12">
                                <div className="section-title">
                                    <h1>{category.name}</h1>
                                    <Link href={`/news/${category.name}`}><a className="all">আরো খবর </a></Link>
                                </div>
                            </div>
                            {
                                category.stories.length === 0 && (
                                    <div className="container-fluid">
                                        <div className="flex justify-content-center align-items-center text-center">
                                            <h3>No content found</h3>
                                        </div>
                                    </div>)
                            }
                            {
                                category.stories.slice(0,4).map((story: any) => <StoryCard key={story.id} story={story}
                                                                                category={category.name}/>)
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Home.Layout = DefaultLayout;

export async function getServerSideProps(ctx: NextPageContext) {

    return {
        props: {
            stories: JSON.parse(JSON.stringify(ctx.query.stories)),
            categories: JSON.parse(JSON.stringify(ctx.query.categories))
        }
    };
}

export default Home;
