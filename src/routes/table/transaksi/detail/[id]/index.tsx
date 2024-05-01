import { component$ } from "@builder.io/qwik"
import { Form, Link, routeLoader$ } from "@builder.io/qwik-city"
import { useDeleteTransaksi } from "~/action/transaksi.action"
import { getDate } from "~/lib/utils/date"
import { CardBody } from "~/components/basic/body/card/card-body"
import { CardHead } from "~/components/basic/body/card/card-head"
import { type LoaderTransaksi_Detail } from "~/type/zz/transaksi.type"
import { db } from "~/db/db"

export const useGetTransaksiDetail = routeLoader$(
  async ({ params, status }) => {
    const res = await db.transaksi.findDetail(Number(params["id"]))
    // console.log(res)
    if (!res) {
      status(404)
    }
    console.log("execute")
    return res as LoaderTransaksi_Detail
  },
)

export default component$(() => {
  const { value: transaksi } = useGetTransaksiDetail()
  const deleteTransaksi = useDeleteTransaksi()
  return (
    <CardBody>
      <CardHead
        href="#"
        title={` User detail :${getDate(transaksi?.tgl_transaksi)}`}
      />
      <table class="">
        <tbody>
          <tr>
            <td>Nama</td>
            <td> : </td>
            <td>{transaksi?.User?.nama}</td>
          </tr>
          <tr>
            <td>Alamat</td>
            <td> : </td>
            <td>{transaksi?.User?.alamat}</td>
          </tr>

          <tr>
            <td>No Hp</td>
            <td> : </td>
            <td>{transaksi?.User?.no_hp}</td>
          </tr>

          <tr>
            <td>Berat</td>
            <td> : </td>
            <td>{transaksi?.Sampah_Transaksi?.total_berat}</td>
          </tr>
          <tr>
            <td>Harga </td>
            <td> : </td>
            <td>{transaksi?.Sampah_Transaksi?.total_harga}</td>
          </tr>
          <tr>
            <td>Tanggal Transaksi</td>
            <td> : </td>
            <td>{getDate(transaksi?.tgl_transaksi)}</td>
          </tr>
        </tbody>
      </table>

      <div class="card-actions ">
        <Link
          href={`/table/transaksi/edit/${transaksi?.id}`}
          class="btn btn-info"
        >
          Edit
        </Link>

        <Form action={deleteTransaksi}>
          <input type="hidden" value={transaksi?.id} name={"id"} />

          <button class="btn btn-error" type="submit">
            Delete
          </button>
        </Form>
        <Link href={`/table/transaksi/`} class="btn btn-primary">
          Back
        </Link>
      </div>
    </CardBody>
  )
})
