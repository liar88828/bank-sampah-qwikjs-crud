import { Slot, component$ } from "@builder.io/qwik"

export const TitleComponent = component$(({ title }: { title: string }) => {
  return (
    <div class="card-body">
      <h1 class="card-title">{title}</h1>
      <div class="flex justify-between">
        <Slot />
      </div>
    </div>
  )
})
