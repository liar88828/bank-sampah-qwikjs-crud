import { RequestHandler } from "@builder.io/qwik-city";
import { user } from "~/db/users";

export const onGet: RequestHandler = async ({ json, query }) => {
    const nama = query.get('name') || ''
    const page = Number(query.get('page')) || 0

    const limit = 10
    const pages = page * 10

    const res = await user.findSearchPage(nama, pages, limit)
    // console.log(res)
    json(200,
        {
            data: await res
        })
}