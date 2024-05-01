import { component$ } from "@builder.io/qwik"
import {
  CardDepan,
  MultiHorizontal,
  MultiVertical,
} from "~/components/card/print/CardLayout"
import { CardBelakangComponent } from "~/components/card/print/CardBelakang"
import { CardMember } from "~/components/card/print/CardMember"

export default component$(() => {
  return (
    <section class="container space-y-3">
      <Cards />
    </section>
  )
})

export const Cards = component$(() => {
  return (
    <div class="card static bg-base-100">
      <div class="card-body">
        <div class=" flex flex-col items-center justify-center">
          <CardSingle />
          <CardMulti />
        </div>
      </div>
    </div>
  )
})
export const CardSingle = component$(() => {
  return (
    <div class="  bg-base-200 p-2">
      <h1 class="">Single</h1>
      <div class=" flex-wrap gap-5">
        <div class="space-y-2">
          <CardDepan />
          <CardBelakangComponent />
        </div>
        <CardMember />
      </div>
    </div>
  )
})

export const CardMulti = component$(() => {
  return (
    <div class="bg-base-200">
      <h1 class="">Multi</h1>
      <div class="space-y-2">
        <MultiHorizontal />
        <MultiVertical />
      </div>
    </div>
  )
})
