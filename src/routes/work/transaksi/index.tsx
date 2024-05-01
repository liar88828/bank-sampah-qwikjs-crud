import { component$ } from "@builder.io/qwik"
import { Table } from "./Table"

export default component$(() => {
  return (
    <div class=" card static bg-base-100">
      <div class="card-body">
        <h1 class="card-title">Lihat Transaksi</h1>
        <Table />
      </div>
    </div>
  )
})


