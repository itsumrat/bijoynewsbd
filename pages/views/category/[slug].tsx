import React from "react";
import CategoryCard from "../../../components/category/CategoryCard";
import {NextPage, NextPageContext} from "next";

interface SSProps {
    category: any | null;
    source: string;
}
const SingleCategory:NextPage<any> = () => {

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
export function getServerSideProps(ctx: NextPageContext) {
    const category = ctx.query.category || null;
    console.log(ctx.query)
    const props: SSProps = {
        source: 'server',
        category: category as any,
    };


    if (props.category === null) {
        // https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
        // return object with notFound equal to true for 404 error
        return {
            notFound: true,
        };
    }

    return { props };
}
export default SingleCategory;
