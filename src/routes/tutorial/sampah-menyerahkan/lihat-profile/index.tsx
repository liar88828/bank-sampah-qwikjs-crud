import { component$ } from "@builder.io/qwik";
import { ProfileIndex } from "~/components/page/profile/ComponentProfile"
import { Foot, useDataUser } from "../layout"

export default component$(() => {
  const dataLoad = useDataUser()
  return (
    <>
      <ProfileIndex
        //@ts-ignore
        data={dataLoad.value}
      />
      <Foot />
    </>
  )
})
