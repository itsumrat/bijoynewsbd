import Error from 'next/error'
import {NextPageContext} from "next";
import * as React from "react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function Page({ errorCode}) {
    if (errorCode) {
        return (
            <p>
                {errorCode
                    ? `An error ${errorCode} occurred on server`
                    : 'An error occurred on client'}
            </p>
        )
    }

    return <div>Next stars: </div>
}


export async function getServerSideProps(ctx: NextPageContext) {
    return {
        props: {
            errorCode:ctx.res.statusCode
        }
    };
}


