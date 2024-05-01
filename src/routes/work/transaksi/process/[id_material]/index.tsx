import { component$ } from "@builder.io/qwik"
import { routeLoader$ } from "@builder.io/qwik-city"
import { TimeLine, getStatusObject } from "~/components/timeline/TimeLine"
import { DetailOnly } from "~/components/card/Material/DetailOnly"
import { control } from "~/controller/controller"
import { type Session } from "@auth/core/types"

export const useLoadMaterialId = routeLoader$(async ({ params, sharedMap }) => {
  const session: Session = sharedMap.get("session")

  return control.transaksi.transaksiDetail(
    session,
    Number(params["id_material"]),
  )
})

export default component$(() => {
  const loadData = useLoadMaterialId()
  return (
    <div class="container space-y-2 ">
      <div class=" card-compact card static bg-base-100">
        <div class="card-body">
          <h1 class="card-title">Process Transaksi</h1>
          <div class="flex justify-center">
            <TimeLine status={getStatusObject("SIMPAN")} />
          </div>
        </div>
      </div>

      <div class=" card-compact card static bg-base-100">
        <div class="card-body">
          {/* <h1 class="card-title">Material</h1> */}
          <DetailOnly {...loadData.value} />
        </div>
      </div>
    </div>
  )
})

// export const Heads = component$(() => {
//   return (
//     <>
//       <Link class="btn btn-warning btn-xs" href="/user/profile">
//         Back
//       </Link>
//       <Breadcrumbs
//         data={
//           ""
//           //   [
//           //   {
//           //     name: "Home",
//           //     link: "/",
//           //   },
//           //   {
//           //     name: "Profile",
//           //     link: "/user/profile/",
//           //   },
//           //   {
//           //     name: "Edit",
//           //     link: "/user/profile/edit",
//           //   },
//           // ]
//         }
//       />
//     </>
//   )
// })
