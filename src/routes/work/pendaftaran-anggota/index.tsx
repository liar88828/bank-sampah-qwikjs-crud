/*
pendaftaran
nama
alamat
nomor hp

 */

import { component$ } from "@builder.io/qwik"
import { routeAction$ } from "@builder.io/qwik-city"
import { zodUser } from "~/lib/zod/profile/zodUser"
import { ExampleCard } from "../laporan/ExampleCard"
import { db } from "~/db/db"
import { control } from "~/controller/controller"

export const useCreateUser = routeAction$(async (data, { redirect }) => {
  const res = await db.users.createOne(control.user.sanitize(data))
  if (res) {
    throw redirect(302, "/table/users")
  }
  return res
}, zodUser)

export default component$(() => {
  return <ExampleCard />
})
