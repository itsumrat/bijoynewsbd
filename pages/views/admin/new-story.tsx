import React from "react";
import NewStoryComponent from "../../../components/editor/NewStoryComponent";
import {NextPageContext} from "next";

interface Props {
    categories: any[];
    source: string;
}


const NewStory: React.FC<any> = ({categories}) => {

    return(
        <div>
            <NewStoryComponent categories={categories}/>
        </div>
    );
}

export async function getServerSideProps(ctx: NextPageContext) {
    const props: Props = {
        source: 'server',
        categories: JSON.parse(JSON.stringify(ctx.query.categories))
    };




    return { props };
}

export default NewStory;
