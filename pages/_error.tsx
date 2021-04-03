import Error from 'next/error'
import {NextPageContext} from "next";
import * as React from "react";
import {Result, Button} from "antd";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function Page({ errorCode}) {
    if (errorCode) {
        return (
            <p>
                {errorCode
                    ?  <Result
                        status="warning"
                        title="There are some problems with your operation."
                        extra={
                            <Button type="primary" key="console">
                                <Link href="/"><a>Go Home</a></Link>
                            </Button>
                        }
                    />
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


