import { getTotal } from "~/lib/utils/getTotal"
import type { TotalTransaksiReturn } from "~/type/controller/transaksi.type."
import type {
  DataMaterial,
  OpsiCase,
  UserFindMaterialReturn,
} from "~/type/db/join.type"
import type { Session } from "@auth/core/types"
import { OpsiKosong, caseKosong, materialKosong } from "~/assets/default"
import { db } from "~/db/db"

export class TransaksiController {
  opsiPenukaran(data: UserFindMaterialReturn): OpsiCase[] {
    return data.map((d) => {
      if (!d.Opsi) {
        return {
          ...OpsiKosong,
          Cases: [
            {
              ...caseKosong,
              Material: materialKosong,
            },
          ],
        }
      }
      return d.Opsi
    })
  }
  hitung(data: OpsiCase[]) {
    return {
      totalBerat: getTotal<OpsiCase>("berat", data),
      totalHarga: getTotal<OpsiCase>("harga", data),
    }
  }

  totalTransaksi(data: UserFindMaterialReturn): TotalTransaksiReturn | null {
    const opsiPenukaran = this.opsiPenukaran(data)

    return {
      opsiPenukaran,
      hitung: this.hitung(opsiPenukaran),
    }
  }

  async transaksiDetail(
    session: Session,
    id: number,
  ): Promise<{ user: Session["user"]; data: DataMaterial }> {
    return {
      user: session.user,
      data: await db.work.findId_Relations(id),
    }
  }
}
