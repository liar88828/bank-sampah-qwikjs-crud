import { component$ } from "@builder.io/qwik"
import { BarTopProduct } from "~/components/chart/bar/bar-topProduct"
import { UserActive } from "~/components/page/dashboard/UserActive"
import { MaterialWarehouse } from "~/components/page/dashboard/MaterialWarehouse"
import { BestSelling } from "~/components/page/dashboard/BestSelling"
import { Status } from "~/components/page/dashboard/Status"
import { type DashboardProps } from "~/db/join/dashboard"

export const Dashboard = component$(({ data }: { data: DashboardProps }) => {
  return (
    <section class="   w-full px-5">
      <Status data={data.status} />

      <div class="mt-5 grid  grid-cols-1 gap-5 sm:grid-cols-2">
        <UserActive data={data.table.userActive} />
        <MaterialWarehouse data={data.table.totalMaterial} />
      </div>

      <div class="mt-5 bg-base-100">
        <BestSelling data={data.bestTransaction} />
      </div>

      <div class="mt-5 bg-base-100">
        <div class=" shadow-gray rounded p-5 shadow ">
          <h1 class="text-xl font-bold ">Top Product</h1>
          {/* <div class="h-96"> */}
          <BarTopProduct />
          {/* </div> */}
        </div>
      </div>
    </section>
  )
})
