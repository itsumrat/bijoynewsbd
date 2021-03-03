import React from "react";
import CategoryCard from "../../../components/category/CategoryCard";
import {NextPage, NextPageContext} from "next";


interface Props {
    categories: any[];
    source: string;
}
const CategoryPage: NextPage<any> = () => {

    return(
        <div className="container">
            <div className="row">
                <div className="col-lg-7">
                    <div className="category-post">
                        <CategoryCard/>
                    </div>
                </div>
                <div className="offset-lg-1 col-lg-4">
                    <div className="category-popular-post">
                        <h5>এই ক্যাটাগরির জনপ্রিয় সংবাদ</h5>
                        <ul>
                            <li><a href="#">১৭ বছর পর দেশে ফিরে দেখলেন থাকার জায়গাটাও নেই</a></li>
                            <li><a href="#">১৭ বছর পর দেশে ফিরে দেখলেন থাকার জায়গাটাও নেই</a></li>
                            <li><a href="#">১৭ বছর পর দেশে ফিরে দেখলেন থাকার জায়গাটাও নেই</a></li>
                            <li><a href="#">১৭ বছর পর দেশে ফিরে দেখলেন থাকার জায়গাটাও নেই</a></li>
                            <li><a href="#">১৭ বছর পর দেশে ফিরে দেখলেন থাকার জায়গাটাও নেই</a></li>
                            <li><a href="#">১৭ বছর পর দেশে ফিরে দেখলেন থাকার জায়গাটাও নেই</a></li>
                            <li><a href="#">১৭ বছর পর দেশে ফিরে দেখলেন থাকার জায়গাটাও নেই</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
export async function getServerSideProps(ctx: NextPageContext) {

    console.log(ctx.query)
    // const props: Props = {
    //     source: 'server',
    //     categories: ctx.query.categories as any,
    // };

    // if (!Array.isArray(props.posts)) {
    //     const service = new BlogService();
    //     props.posts = service.all();
    //     props.source = 'client';
    // }

    return { props:{} };
}

export default CategoryPage;
