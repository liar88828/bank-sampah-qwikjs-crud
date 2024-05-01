import { component$ } from "@builder.io/qwik"

export const ExampleCard = component$(() => {
  return (
    <div class="card">
      <div class="card-body ">
        <h2 class="card-title">Card title!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
          <button class=" btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  )
})
