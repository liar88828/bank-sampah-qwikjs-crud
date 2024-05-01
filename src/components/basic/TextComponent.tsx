import { component$ } from "@builder.io/qwik"

export const TextComponent = component$(
  ({ label, text }: { label: string; text: string }) => {
    return (
      <div class={`${label.includes("Sebagai") && " ml-0.5 "}`}>
        <h1 class="text-sm font-semibold sm:text-lg">{label}</h1>

        <p>{text}</p>
      </div>
    )
  },
)
