import React from "react";
import NewStoryComponent from "../../../components/editor/NewStoryComponent";
import {NextPageContext} from "next";
import AdminLayout from "../../../components/layouts/adminLaout";
import isAuthenticated from "../../../src/utils/isAuthenticated";
import {Button, Result} from "antd";
import isAdmin from "../../../src/utils/isAdmin";

interface Props {
    categories: any[];
    source: string;
}


const NewStory: React.FC<any> = ({categories}) => {

    if(!isAuthenticated() || !isAdmin()){
        return (
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={<Button type="link">Back Home</Button>}
            />
        )
    }

    return(
        <div>
            <NewStoryComponent categories={categories} isEdit={false}/>
        </div>
    );
}
if(isAuthenticated() && isAdmin()) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    NewStory.Layout = AdminLayout;
}
export async function getServerSideProps(ctx: NextPageContext) {
    const props: Props = {
        source: 'server',
        categories: JSON.parse(JSON.stringify(ctx.query.categories))
    };




    return { props };
}

export default NewStory;
