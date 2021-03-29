import React from 'react';
import AdminLayout from "../../../../components/layouts/adminLaout";
import NewStoryComponent from "../../../../components/editor/NewStoryComponent";
import {NextPageContext} from "next";

interface Props {
    categories: any[];
    story: any[];
    source: string;
}


const EditStoryPage: React.FC<any> = ({categories, story}) => {
    return   (<div>
        <NewStoryComponent categories={categories} isEdit={true} story={story}/>
    </div>)
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
EditStoryPage.Layout = AdminLayout;

export async function getServerSideProps(ctx: NextPageContext) {
    const props: Props = {
        source: 'server',
        categories: JSON.parse(JSON.stringify(ctx.query.categories)),
        story: JSON.parse(JSON.stringify(ctx.query.story)),
    };

    return { props };
}

export default EditStoryPage;
