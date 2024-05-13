import { component$ } from "@builder.io/qwik"
import { Table } from "./Table"
import { CardLayout } from "~/components/basic/body/card/card-layout"

export default component$(() => {
  return (
    <CardLayout href="" title="Lihat Transaksi">
      <Table />
    </CardLayout>
  )
})
