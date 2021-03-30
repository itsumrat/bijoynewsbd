import React, {useContext, useState} from "react";
import {NextPage} from "next";
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,

} from "react-share";
import {Drawer, Button, Avatar, Tooltip, Comment, Form, Input, message} from 'antd';
import {createMarkup} from '../../../src/utils/createMarkup';
import moment from "moment";
import StoryCard from "../../../components/story/StoryCard";
import Link from "next/link";
import DefaultLayout from "../../../components/layouts/DefaultLayout";
import {constants}  from '../../../constants';
import Head from "../../../components/head";
import {IComment} from "../../../src/comment/interface/IComment";
import httpClient from "../../../src/utils/httpClient";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons/lib";
import {ProfileContext} from "../../../context/ProfileContext";

const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};

const SingleNews: NextPage<any> = ({story, category, comments}) => {
    const [tempComments, setTempComments] = useState(comments);
    const [selectedComment, setSelectedComment] = useState(null);
    const [editComment, setEditComment] = useState(false);
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const profileCtx = useContext(ProfileContext);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };


    const onFinish = (values: any) => {
     if(editComment){

         httpClient.put(`/comments/${selectedComment.id}`, {
             ...values, id: selectedComment.id, story: {id: story.id}
         })
             .then(r=>{
                 setTempComments((prevState: IComment[])=>{
                     const ind = prevState.findIndex(v => v.id === selectedComment.id);
                     prevState[ind].message = r.data.message;
                     return prevState;
                 })
                 setEditComment(false);
                 message.success("Successfully updated")
                 form.resetFields();
             });
     }else {
         httpClient.post('/comments', {
             ...values, story: {id: story.id}
         })
             .then(r=>{
                 setTempComments((prevState: IComment[])=>{
                     return [...prevState, r.data];
                 });
                 form.resetFields();
             });
     }
    };

    const deleteComment = (id: number) =>{
        httpClient.delete(`/comments/${id}`)
            .then((re: any)=>{
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    setTempComments((prevState: IComment[])=>{
                        return prevState.filter(comment => comment.id !== id);;
                    });

                message.success("Comment deleted")
            })
            .catch(err=>{
                message.error("Couldn't delete")
            })
    }
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
                                {`${tempComments.length} comments`}
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
                    <Form form={form} {...layout} name="nest-messages" onFinish={onFinish}>

                        <Form.Item
                            name='message'
                            label="Comment"

                           rules={[
                               { required: true, message: 'Please input your comment!' },
                               {max: 500, message: 'Can not be more than 500 characters'}
                           ]}>
                            <Input.TextArea  />
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
                            <Button disabled={!profileCtx.isLoggedIn && profileCtx.user === null} type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    {

                        tempComments.map((com: IComment,i: number)=>{
                            console.log(profileCtx.user)
                            console.log(com)
                            return(
                                <Comment
                                    key={i}
                                    author={<a>{com.author.name}</a>}
                                    avatar={
                                        <Avatar
                                            src={com.author.profileImage || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
                                            alt={com.author.name}
                                        />
                                    }
                                    content={
                                        <div className="d-flex flex-column">
                                            <p>
                                                {com.message}
                                            </p>
                                            {
                                                profileCtx.isLoggedIn  && profileCtx.user && profileCtx.user.id === com.author.id &&
                                                (
                                                    <div className="d-flex">
                                                        <EditOutlined onClick={()=>{
                                                            setSelectedComment(com);
                                                            form.setFieldsValue({message: com.message})
                                                            setEditComment(true);
                                                        }} className="mr-4"/>
                                                        <DeleteOutlined onClick={()=>deleteComment(com.id)} />
                                                    </div>
                                                )
                                            }

                                        </div>
                                    }
                                    datetime={
                                        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                            <span>{moment().fromNow()}</span>
                                        </Tooltip>
                                    }
                                />
                            )
                        })
                    }
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
            category: JSON.parse(JSON.stringify(ctx.query.category)),
            comments: JSON.parse(JSON.stringify(ctx.query.comments))
        }
    };
}

export default SingleNews;
