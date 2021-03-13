import React from "react";
import CategoryCard from "../../../components/category/CategoryCard";
import {NextPage, NextPageContext} from "next";
import DefaultLayout from "../../../components/layouts/DefaultLayout";
import Link from "next/link";

const CategoryPage: NextPage<any> = ({category}) => {
    return(
        <div className="container">
            <div className="row">
                <div className="col-lg-7">
                    <div className="category-post">
                        {
                            category.stories.map((story: any)=> <CategoryCard key={story.id} story={story} category={category.name}/>)
                        }
                    </div>
                </div>
                <div className="offset-lg-1 col-lg-4">
                    <div className="category-popular-post">
                        <h5>এই ক্যাটাগরির জনপ্রিয় সংবাদ</h5>
                        <ul>

                                {
                                    category.stories.map((story: any) => (
                                        <li key={story.id}>
                                            <Link href={`/news/${category.name}/${story.slug}`}>
                                                <a>{story.title}</a>
                                            </Link>
                                        </li>
                                    ))
                                }

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
CategoryPage.Layout = DefaultLayout;
export async function getServerSideProps(ctx: NextPageContext) {
    return { props:{
        category: JSON.parse(JSON.stringify(ctx.query.category))
        } };
}

export default CategoryPage;
