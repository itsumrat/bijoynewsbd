import React, {useEffect, useState} from "react";
import {NextPageContext} from "next";
import {useFormik} from 'formik';
import {AiFillEdit} from "react-icons/ai";
import {BsTrash} from "react-icons/bs";
import * as yup from 'yup';
import httpClient from "../../../src/utils/httpClient";
import {ToasterError, ToasterSuccess} from "../../../src/utils/statusMessage";
import { Modal } from "react-bootstrap";

interface Props {
    categories: any[];
    source: string;
}

const Categoryschema = yup.object().shape({
    name: yup.string()
        .required('Category name is required')
        .min(2, "Category name can not be less then 2 character")
        .max(50, "Category name can not be more then 50 character")
});
const AdminCategoriesPage:React.FC<Props> = ({categories}) => {
    const [categoriesData, setCategoriesData] = useState(categories);
    const [selectecCategory, setSelectedCategory] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: Categoryschema,
        onSubmit: async  (values: any) => {
            const response = await fetch('/category', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(values),
            });
           await response.json()
                .then(r=>{
                    console.log(r);
                    setCategoriesData(prevState => [
                        ...prevState, r
                    ]);
                })
               .catch(err=>{
                   console.log(err)
               })
        },
    });

    const CategoryEditFormik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: Categoryschema,
        onSubmit: async  (values: any) => {
            const response = await fetch(`/category/${selectecCategory.id}`, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify({...values, id: selectecCategory.id}),
            });
            await response.json()
                .then(r=>{
                    console.log(r);
                    const ind  = categoriesData.findIndex(cat=>cat.id === selectecCategory.id);
                    setCategoriesData(prevState => {
                        prevState[ind] = {...values, id: selectecCategory.id};
                        return prevState;
                    })
                    ToasterSuccess('Successfully updated');
                    setShow(false)
                })
                .catch(err=>{
                    ToasterError("Couldn't update");
                    console.log(err)
                })
        },
    });

    useEffect(()=>{
        if(selectecCategory){CategoryEditFormik.setFieldValue('name', selectecCategory.name);}
    },[selectecCategory])

    const handleDelete = (id: number) =>{
        console.log(id)
        httpClient.delete(`/category/${id}`)
            .then(res=>{
                setCategoriesData(prevState => prevState.filter((category)=>category.id !== id));
                ToasterSuccess('Successfully deleted');
            })
            .catch(err=>{
                console.log(err);
                ToasterError("Couldn't delete");
            });
    }


    return (
        <main className="page-content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="page-title">
                            <h1>Categories</h1>
                        </div>
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="category-list">
                                    <table id="category-list" className="table table-striped table-bordered"
                                           style={{width: '100%'}}>
                                        <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            categoriesData.map((category, i)=>{
                                                return(
                                                    <tr key={i}>
                                                        <td>{category.name}</td>
                                                        <td className="d-flex justify-content-around">
                                                            {/* TODO onclick open modal and edit category*/}
                                                            <AiFillEdit onClick={()=>{
                                                                setSelectedCategory(category);
                                                                setShow(true);
                                                            }} style={{cursor: 'pointer'}} />
                                                            <BsTrash onClick={()=>handleDelete(category.id)} style={{cursor: 'pointer'}}/>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="new-category">
                                    <h6>Create New Category</h6>
                                    <form onSubmit={formik.handleSubmit}>
                                       <div className="form-group" style={{height: '5rem'}}>
                                           <label className="mt-2 font-weight-bold">Name</label>
                                           <input
                                               type="text"
                                               className="form-control"
                                               name="name"
                                               placeholder="Category"
                                               onChange={formik.handleChange}
                                               value={formik.values.name}
                                           />
                                           <small className="text-danger">{formik.errors['name']}</small>
                                       </div>
                                        <button type="submit" className="btn btn-primary btn-main mt-3">save</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={CategoryEditFormik.handleSubmit}>
                        <div className="form-group" style={{height: '5rem'}}>
                            <label className="mt-2 font-weight-bold">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                placeholder="Category"
                                onChange={CategoryEditFormik.handleChange}
                                value={CategoryEditFormik.values.name}
                            />
                            <small className="text-danger">{CategoryEditFormik.errors['name']}</small>
                        </div>
                        <button type="button" className="btn btn-outline-danger btn-main mr-3">close</button>
                        <button type="submit" className="btn btn-primary btn-main ">save</button>
                    </form>
                </Modal.Body>
            </Modal>
        </main>
    );
};

export async function getServerSideProps(ctx: NextPageContext) {
    const props: Props = {
        source: 'server',
        categories: JSON.parse(JSON.stringify(ctx.query.categories))
    };




    return { props };
}

export default AdminCategoriesPage;
