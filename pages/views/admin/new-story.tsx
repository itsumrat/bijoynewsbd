import React from "react";
import NewStoryComponent from "../../../components/editor/NewStoryComponent";
import {NextPageContext} from "next";
import AdminLayout from "../../../components/layouts/adminLaout";

interface Props {
    categories: any[];
    source: string;
}


const NewStory: React.FC<any> = ({categories}) => {

    return(
        <div>
            <NewStoryComponent categories={categories} isEdit={false}/>
        </div>
    );
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
NewStory.Layout = AdminLayout;
export async function getServerSideProps(ctx: NextPageContext) {
    const props: Props = {
        source: 'server',
        categories: JSON.parse(JSON.stringify(ctx.query.categories))
    };




    return { props };
}

export default NewStory;
