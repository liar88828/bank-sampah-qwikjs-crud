import { type Session } from "@auth/core/types"
import { type Material } from "@prisma/client"

export class MaterialController {
  sanitize(
    session: Session,
    data: {
      nama: string
      deskripsi: string
      jumlah: string
      satuan: string
      berat: string
      kategori: string
      harga: string
    },
  ): Omit<Material, "createdAt" | "updatedAt"> {
    return {
      id_user: session.user.id,
      jumlah: Number(data.harga),
      berat: Number(data.berat),
      harga: Number(data.harga),
      nama: data.nama,
      kategori: data.kategori,
      deskripsi: data.deskripsi,
      satuan: data.satuan,
      KategoriId: "",
      id: 0,
    }
  }
}
