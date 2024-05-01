import { component$ } from "@builder.io/qwik"
import { listTutorial } from "~/assets/tutorial.list"
import { CollapseButton } from "~/components/basic/CollapseButton"
import { Heads } from "~/components/basic/head/Heads"

export default component$(() => {
  return (
    <section class="container ">
      <Heads />
      <div class="card static bg-base-100 shadow">
        <div class="card-body">
          <h1 class="card-title mb-2">Langkah Langkah Penggunaan</h1>
          {listTutorial["page"].map((d) => (
            <CollapseButton
              href={d.href}
              title={d.title}
              textButton="Masuk"
              key={d.title}
            />
          ))}
        </div>
      </div>
    </section>
  )
})
