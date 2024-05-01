import { component$ } from "@builder.io/qwik"
import { Instruction } from "~/components/basic/Instruction"
import { Heads } from "~/components/basic/head/Heads"
import { FormCreateUser } from "~/components/page/user/form-create-user"

export default component$(() => {
  return (
    <section class="container space-y-3">
      <Heads />
      <div class="grid rounded-2xl bg-base-200 sm:grid-cols-2">
        <Instruction title={"profile"} />
        <FormCreateUser />
      </div>
    </section>
  )
})
