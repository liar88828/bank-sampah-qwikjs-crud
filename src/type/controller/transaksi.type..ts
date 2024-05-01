import { type Session } from "@auth/core/types"
import type { Transaksi, Opsi } from "@prisma/client"
import type { TransaksiUser } from "~/type/db/join.type"
import type { OpsiCase } from "../db/join.type"

export type PropsTransaksiUser = {
  data: TransaksiUser[]
  user: Session["user"]
}

export type TotalTransaksiReturn = {
  opsiPenukaran: (OpsiCase | null)[]
  hitung: {
    totalBerat: number
    totalHarga: number
  }
}

export type OpsiTransaksi = Opsi & {
  Transaksi: Transaksi
}
