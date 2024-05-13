import { auth } from "./auth"
import { db } from "~/db/db"
import type { Material } from "@prisma/client"
import { type RequestEventAction } from "@builder.io/qwik-city"
import { type SetType } from "~/type/global/global.type"

type SampahData = {
  nama: string
  deskripsi: string
  satuan: string
  berat: string
  kategori: string
  jumlah: string
  harga: string
}
export class PenyerahanController {
  sanitize(id_user: string, data: SampahData): SetType<Material> {
    return {
      id_user,
      kategori: data.kategori,
      satuan: data.satuan,
      jumlah: Number(data.jumlah),
      nama: data.nama,
      KategoriId: data.kategori,
      deskripsi: data.deskripsi,
      berat: Number(data.berat),
      harga: Number(data.harga),
    }
  }

  async penyerahanSampah(request: RequestEventAction, data: SampahData[]) {
    const userId = auth.userId(request)
    return db.work.penyerahanSampah({
      id_user: userId,
      transaksi: {
        userBuyId: userId,
        id_status: "SIMPAN",
        tgl_transaksi: new Date(),
      },
      material: data.map((d) => this.sanitize(userId, d)),
    })
  }
}
