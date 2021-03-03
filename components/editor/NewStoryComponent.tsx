import React, {useEffect, useState} from 'react';
import {useFormik} from "formik";
import Select from 'react-select'
import TinyEditor from "./TinyEditor";
import httpClient from "../../src/utils/httpClient";
import {ToasterSuccess} from "../../src/utils/statusMessage";

const NewStoryComponent: React.FC<any> = ({categories}) => {
    console.log(categories);
    const [categoryOptions, setCategoryOptions] = useState<any[]>([]);
    useEffect(() => {
        setCategoryOptions(categories.map((cat: { id: number; name: string; }) => ({
            id: cat.id,
            label: cat.name,
            value: cat.id,
        })))
    }, [categories])
    const formikStory = useFormik({
        initialValues: {
            title: '',
            description: '',
            body: '',
        },
        onSubmit: values => {
           console.log(values)
            httpClient.post('/stories', values)
                .then(res=>{
                    console.log(res)
                    ToasterSuccess('Successfully created')
                })
        },
    });

    console.log(formikStory.values)
    console.log(categoryOptions)

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
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="body">Add your story</label>
                                        <TinyEditor formik={formikStory}/>
                                    </div>

                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="new-post-sidebar">
                                    <div className="category-list">
                                        <label>Category</label>
                                        <Select
                                            closeMenuOnSelect={false}
                                            isMulti
                                            options={categoryOptions}
                                            onChange={(categories: { id: number; label: string; }[]) => {
                                                formikStory.setFieldValue('categories', categories && categories.map((cat: { id: number; label: string; }) => {
                                                    return {
                                                        id: cat.id,
                                                        name: cat.label,
                                                        value: cat.id,
                                                        label: cat.label
                                                    }
                                                }))
                                            }}
                                        />
                                    </div>
                                    <div className="featured-img">
                                        <p>Featured Image</p>
                                    </div>
                                    <div className="date">
                                        <label>Date</label>
                                        <div className="input-group date" id="datetimepicker-demo"
                                             data-target-input="nearest">
                                            <input type="text" className="form-control datetimepicker-input"
                                                   data-target="#datetimepicker-demo" />
                                            <div className="input-group-append" data-target="#datetimepicker-demo"
                                                 data-toggle="datetimepicker">
                                                <div className="input-group-text">
                                                    <i className="far fa-calendar-alt"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tags">
                                        <label>Tags</label>
                                        <select multiple data-role="tagsinput" className="term-input form-control">
                                            <option value="jQuery">jQuery</option>
                                            <option value="Angular">Angular</option>
                                            <option value="React">React</option>
                                            <option value="Vue">Vue</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-main">Publish</button>
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
