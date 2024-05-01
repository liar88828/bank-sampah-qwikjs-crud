import { $, component$ } from "@builder.io/qwik"
import { routeLoader$ } from "@builder.io/qwik-city"
import { useDelete } from "~/action/material.action"
import { OptionsCard } from "~/components/basic/body/OptionsCard"
import { DetailOnly } from "~/components/card/Material/DetailOnly"
import { db } from "~/db/db"
import { type Session } from "@auth/core/types"

export const useGetId = routeLoader$(
  async ({ params, redirect, url, sharedMap }) => {
    const session: Session = sharedMap.get("session")
    const res = await db.material.findId_Relations(Number(params.id))
    if (!res) {
      throw redirect(303, `404.html?callback=?${url.pathname}`)
    }

    return { data: res, user: session.user }
  },
)

export default component$(() => {
  const {
    value: { data, user },
  } = useGetId()

  const deleteMaterial = useDelete()

  const handlerDelete = $(() => {
    deleteMaterial.submit({ id: Number(data.id) })
  })

  return (
    <DetailOnly data={data} user={user}>
      <OptionsCard
        onDelete={handlerDelete}
        onEdit={`/table/material/edit/${data?.id ?? ""}`}
      />
    </DetailOnly>
  )
})
