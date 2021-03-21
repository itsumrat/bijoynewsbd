import React, {useState} from "react";
import {NextPage} from "next";
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,

} from "react-share";
import {Drawer, Button, Avatar, Tooltip, Comment, Form, Input} from 'antd';
import {createMarkup} from '../../../src/utils/createMarkup';
import moment from "moment";
import StoryCard from "../../../components/story/StoryCard";
import Link from "next/link";
import DefaultLayout from "../../../components/layouts/DefaultLayout";
import {constants}  from '../../../constants';
import Head from "../../../components/head";

const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};

const SingleNews: NextPage<any> = ({story, category}) => {
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    const onFinish = (values: any) => {
        console.log(values);
    };
    const stories = category.stories;

    return (
        <div>
            <Head
                title={`Bijoynews | ${story.title}` || ''}
                description={story.description || ''}
                ogImage={story.featuredImg}
                url={`${constants.BASE_URL}/news/${category.name}/${story.slug}`}
            />
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
                            <Button onClick={showDrawer} type="link" className="comments">
                                3 Comments
                            </Button>
                            <div className="social-share">
                                <h6>Share the article:</h6>
                                <ul>
                                    <li>
                                        <a>
                                            <FacebookShareButton
                                                url={`${constants.BASE_URL}/news/${story.category.name}/${story.slug}`}>
                                                <img src="/static/img/fb.png"/> Facebook
                                            </FacebookShareButton>
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <TwitterShareButton
                                                url={`${constants.BASE_URL}/news/${story.category.name}/${story.slug}`}>
                                                <img src="/static/img/twitter.png"/> Twitter
                                            </TwitterShareButton>
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <LinkedinShareButton
                                                url={`${constants.BASE_URL}/news/${story.category.name}/${story.slug}`}>
                                                <img src="/static/img/in.png"/> LinkedIn
                                            </LinkedinShareButton>
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <EmailShareButton
                                                url={`${constants.BASE_URL}/news/${story.category.name}/${story.slug}`}
                                            >
                                                <img src="/static/img/mail.png"/> Email
                                            </EmailShareButton>
                                        </a>
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
                            <StoryCard key={ story.id} story={story} category={category.name}/>
                        ))
                    }


                </div>
                <Drawer
                    title="Comments"
                    placement="right"
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                    width='40vw'
                >
                    <Form {...layout} name="nest-messages" onFinish={onFinish}>

                        <Form.Item name='comment' label="Comment"
                                   rules={[
                                       { required: true, message: 'Please input your comment!' },
                                       {max: 500, message: 'Can not be more than 500 characters'}
                                   ]}>
                            <Input.TextArea  />
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    <Comment
                        author={<a>Han Solo</a>}
                        avatar={
                            <Avatar
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                alt="Han Solo"
                            />
                        }
                        content={
                            <p>
                                We supply a series of design principles, practical patterns and high quality design
                                resources (Sketch and Axure), to help people create their product prototypes beautifully
                                and efficiently.
                            </p>
                        }
                        datetime={
                            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                <span>{moment().fromNow()}</span>
                            </Tooltip>
                        }
                    />
                </Drawer>
            </div>
        </div>
    );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
SingleNews.Layout = DefaultLayout;


export function getServerSideProps(ctx: any) {
    return {
        props: {
            story: JSON.parse(JSON.stringify(ctx.query.story)),
            category: JSON.parse(JSON.stringify(ctx.query.category))
        }
    };
}

export default SingleNews;
