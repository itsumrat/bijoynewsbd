import * as React from 'react';
import { NextPage, NextPageContext } from 'next';
import StoryCard from "../../components/story/StoryCard";
import Link from "next/link";
import {StoryInterface} from "../../src/story/interface/story.interface";

interface Props {
  stories: StoryInterface[];
}

const Home: NextPage<Props> = ({stories}) => {
  console.log(stories)
  return (
    <div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-lg-6">
            <div className="article-preview-left">
              <div className="card">
                <img src={stories[0].featuredImg || "/static/img/pic.jpg"} className="card-img-top" alt={stories[0].title || ''}  />
                  <div className="card-body">
                    <Link href={`/news/category/${stories[0].slug}`}>
                      <a className="article-preview-title">{stories[0].title}</a>
                    </Link>
                    <p className="article-preview-desc">{stories[0].description}</p>
                  </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-6">
                <div className="article-preview-right">
                  <div className="card">
                    <img src="/static/img/pic.jpg" className="card-img-top" alt="..."  />
                      <div className="card-body">
                        <p className="article-preview-title">
                          <a href="single-post.php">ইতিহাস গড়ে শপথ নিলেন বাইডেন-কমলা</a>
                        </p>
                      </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6" style={{marginBottom: '16px'}}>
                <div className="article-preview-right">
                  <div className="card">
                    <img src="/static/img/pic.jpg" className="card-img-top" alt="..."  />
                      <div className="card-body">
                        <p className="article-preview-title">
                          <a href="single-post.php">ইতিহাস গড়ে শপথ নিলেন বাইডেন-কমলা</a>
                        </p>
                      </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="article-preview-right">
                  <div className="card">
                    <img src="/static/img/pic.jpg" className="card-img-top" alt="..."  />
                      <div className="card-body">
                        <p className="article-preview-title">
                          <a href="single-post.php">ইতিহাস গড়ে শপথ নিলেন বাইডেন-কমলা</a>
                        </p>
                      </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="article-preview-right">
                  <div className="card">
                    <img src="/static/img/pic.jpg" className="card-img-top" alt="..."  />
                      <div className="card-body">
                        <p className="article-preview-title">
                          <a href="single-post.php">ইতিহাস গড়ে শপথ নিলেন বাইডেন-কমলা</a>
                        </p>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="section-title">
              <h1>জাতীয়</h1>
              <Link href={`/categories/1`}><a className="all">আরো খবর </a></Link>
            </div>
          </div>
          {
            stories.map((story)=><StoryCard key={story.id} story={story}/>)
          }
        </div>
    </div>
    </div>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {

  return { props: {
    stories: JSON.parse(JSON.stringify(ctx.query.stories))
    } };
}

export default Home;
