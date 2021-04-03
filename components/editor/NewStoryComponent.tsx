import React, {useEffect, useRef, useState} from 'react';
import {useFormik} from "formik";
import Select from 'react-select'
import TinyEditor from "./TinyEditor";
import httpClient from "../../src/utils/httpClient";
import { TweenOneGroup } from 'rc-tween-one';
import { PlusOutlined } from '@ant-design/icons';
import {Button, Upload, message, DatePicker, Tag, Input, Checkbox} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import * as Yup from 'yup';


const storySchema = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Too Short!')
        .max(300, 'Too Long!')
        .required('Required'),
    description: Yup.string()
        .min(2, 'Too Short!')
        .max(300, 'Too Long!')
        .required('Required'),
    body: Yup.string()
        .min(2, 'Too Short!')
        .max(5000, 'Too Long!')
        .required('Required'),

    category: Yup.object().required('Required')

});


const NewStoryComponent: React.FC<any> = ({categories, isEdit, story}) => {
    const [categoryOptions, setCategoryOptions] = useState<any[]>([]);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [tags, setTags] = useState([])
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const textInput = useRef(null);


    const formikStory = useFormik({
        initialValues: {
            title: '',
            description: '',
            body: '',
            category: null,
            featuredImg: null,
            publishedDate: new Date(),
            tags: [],
            isPublished: false,
            featured: false,
        },
        validationSchema: storySchema,
        onSubmit: values => {
            handlePublished(values);

        },
    });

    useEffect(()=>{
        if(isEdit){
            formikStory.setFieldValue('title', story.title);
            formikStory.setFieldValue('description', story.description);
            formikStory.setFieldValue('body', story.body);
            if(story.category){
                formikStory.setFieldValue('category', {
                    label: story.category.name,
                    value: story.category.id,
                    id: story.category.id,
                });
            }
            formikStory.setFieldValue('featuredImg', story.featuredImg);
            setTags(story.tags)
            formikStory.setFieldValue('isPublished', story.isPublished);
            formikStory.setFieldValue('featured', story.featured);
        }

    },[isEdit, story]);

    const handleClose = (removedTag: any) => {
        setTags(prevState=> prevState.filter((tag: any) => tag !== removedTag))
    };

    const showInput = () => {
        setInputVisible( true );
    };

    const handleInputConfirm = () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            setTags(prevState => [...prevState, inputValue]);
        }
        setInputVisible(false);
        setInputValue('');
    };

    const handleInputChange = (e: any) => {
        setInputValue( e.target.value );
    };

    const  forMap = (tag: any) => {
        const tagElem = (
            <Tag
                closable
                onClose={e => {
                    e.preventDefault();
                    handleClose(tag);
                }}
            >
                {tag}
            </Tag>
        );
        return (
            <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
        );
    };

    const tagChild = tags.map(forMap)


    useEffect(() => {
        setCategoryOptions(categories.map((cat: { id: number; name: string; }) => ({
            id: cat.id,
            label: cat.name,
            value: cat.id,
        })))
    }, [categories]);

    useEffect(()=>{
        formikStory.setFieldValue('tags', tags)
    },[tags])



    const handlePublished = (values: any) => {

        if(isEdit){
            if(file){
                const formData = new FormData();
                formData.append('file', file);
                httpClient.post('/stories/image/upload', formData)
                    .then(r=>{

                        httpClient.put(`/stories/${story.id}`, {...values, featuredImg: r.data.Location, isPublished: true})
                            .then(res=>{

                                message.success('Successfully updated')
                            })
                    })
                    .catch(e=>{

                    })
            }else {
                httpClient.put(`/stories/${story.id}`, {...values, isPublished: true})
                    .then(res=>{
                        message.success('Successfully updated')
                    }).
                    catch(er=>{

                })
            }
        }else {
            if(file){
                const formData = new FormData();
                formData.append('file', file);
                httpClient.post('/stories/image/upload', formData)
                    .then(r=>{
                        httpClient.post('/stories', {...values, featuredImg: r.data.Location, isPublished: true})
                            .then(res=>{
                                message.success('Successfully created')
                            })
                    })
                    .catch(e=>{

                    })
            }else {
                httpClient.post('/stories', {...values, isPublished: true})
                    .then(res=>{
                        message.success('Successfully created')
                    })
            }
        }
    }
    const handleDraft = ()=> {
        formikStory.validateForm().then(res=>{
            if(Object.keys(res).length === 0 ){
                if(isEdit){
                    if(file){
                        const formData = new FormData();
                        formData.append('file', file);
                        httpClient.post('/stories/image/upload', formData)
                            .then(r=>{
                                httpClient.put(`/stories/${story.id}`, {...formikStory.values, featuredImg: r.data.Location, isPublished: false})
                                    .then(res=>{
                                        message.success('Successfully updated')
                                    })
                            })
                            .catch(e=>{
                            })
                    }else {
                        httpClient.put(`/stories/${story.id}`, {...formikStory.values, isPublished: false})
                            .then(res=>{
                                message.success('Successfully updated')
                            }).
                        catch(er=>{
                        })
                    }
                }else {
                 if (file){
                     const formData = new FormData();
                     formData.append('file', file);
                     httpClient.post('/stories/image/upload', formData)
                         .then(r=>{
                             httpClient.post('/stories', {...formikStory.values, featuredImg: r.data.Location, isPublished: false})
                                 .then(res=>{
                                     message.success('Successfully created')
                                 })
                         })
                         .catch(e=>{
                         })
                 }else {
                     httpClient.post('/stories', {...formikStory.values, isPublished: false})
                         .then(res=>{
                             message.success('Successfully created')
                         })
                 }
                }
            }
        });

    }


    const props = {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onRemove: (file: any) => {
            setFile(null);
        },
        beforeUpload: (file: any) => {
            setFile(file)
            return false;
        },
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const  onChange = (value: any, dateString: any) => {
        formikStory.setFieldValue('publishedDate', new Date(value.format('LLLL')))
    }

    const  onOk = (value: any)=> {
        formikStory.setFieldValue('publishedDate', new Date(value.format('LLLL')))
    }

    return(
        <main className="page-content">
            <div className="container-fluid">
                <div className="row">
                    <form onSubmit={formikStory.handleSubmit} className="col-12">
                        <div className="page-title">
                            <h1>Add New Post</h1>
                        </div>
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="new-post">
                                    <div className="form-group">
                                        <label htmlFor="title"> Add a title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            className="form-control post-title"
                                            placeholder="Enter title here"
                                            onChange={formikStory.handleChange}
                                            value={formikStory.values.title}
                                        />
                                        <small className="text-danger">{ formikStory.touched['title'] && formikStory.errors['title']}</small>
                                    </div>


                                    <div className="form-group">
                                        <label htmlFor="description"> Add description</label>
                                        <textarea
                                            id="description"
                                            className="form-control"
                                            placeholder="Enter title here"
                                            name="description"
                                            onChange={formikStory.handleChange}
                                            value={formikStory.values.description}
                                        />
                                        <small className="text-danger">{formikStory.touched['description'] && formikStory.errors['description']}</small>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="body">Add your story</label>
                                        <TinyEditor formik={formikStory}/>
                                        <small className="text-danger">{formikStory.touched['body'] && formikStory.errors['body']}</small>
                                    </div>

                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="new-post-sidebar">
                                    <div className="category-list">
                                        <label>Category</label>
                                        <Select
                                            closeMenuOnSelect={false}
                                            isMulti={false}
                                            options={categoryOptions}
                                            value={formikStory.values.category}
                                            onChange={(category: { id: number; label: string; }) => {
                                                formikStory.setFieldValue('category', {
                                                    id: category.id,
                                                    name: category.label,
                                                    label: category.label,
                                                    value: category.id
                                                });
                                            }}
                                        />
                                        <small className="text-danger">{formikStory.touched['category'] &&  formikStory.errors['category']}</small>
                                    </div>
                                    <div className="featured-img mt-5">
                                        <p>Featured Image</p>
                                        <Upload multiple={false} {...props}>
                                            <Button icon={<UploadOutlined />}>Select File</Button>
                                        </Upload>
                                    </div>
                                    <div className="mt-5">
                                        <Checkbox checked={formikStory.values.featured} onChange={(e)=>{
                                            formikStory.setFieldValue('featured', e.target.checked)
                                        }}>Checkbox</Checkbox>
                                    </div>
                                    <div className="date mt-5">
                                        <label>Date</label>
                                        <DatePicker value={moment(formikStory.values.publishedDate)} showTime onChange={onChange} onOk={onOk} />
                                    </div>
                                    <div className="tags mt-5">
                                        <label>Tags</label>
                                        <div>

                                                <div style={{ marginBottom: 16 }}>
                                                    <TweenOneGroup
                                                        enter={{
                                                            scale: 0.8,
                                                            opacity: 0,
                                                            type: 'from',
                                                            duration: 100,
                                                            onComplete: (e: any) => {
                                                                e.target.style = '';
                                                            },
                                                        }}
                                                        leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                                                        appear={false}
                                                    >
                                                        {tagChild}
                                                    </TweenOneGroup>
                                                </div>
                                                {inputVisible && (
                                                    <Input
                                                        ref={textInput}
                                                        type="text"
                                                        size="small"
                                                        style={{ width: 78 }}
                                                        value={inputValue}
                                                        onChange={handleInputChange}
                                                        onBlur={handleInputConfirm}
                                                        onPressEnter={handleInputConfirm}
                                                    />
                                                )}
                                                {!inputVisible && (
                                                    <Tag onClick={showInput} className="site-tag-plus">
                                                        <PlusOutlined /> New Tag
                                                    </Tag>
                                                )}

                                        </div>
                                    </div>

                                    <div className='row mt-5'>
                                        <div className="col-md-12">
                                            <Button type="primary" htmlType="submit"  className="btn btn-main mr-5">Publish</Button>
                                            <Button onClick={handleDraft} type="primary" htmlType="button"  className="btn btn-main">Save Draft</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default NewStoryComponent;
