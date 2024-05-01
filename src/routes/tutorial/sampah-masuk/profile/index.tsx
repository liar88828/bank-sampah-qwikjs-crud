import { component$ } from "@builder.io/qwik"
import { Foot, useDataUser } from "../layout"
import { ProfileIndex } from "~/components/page/profile/ComponentProfile"

 

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
