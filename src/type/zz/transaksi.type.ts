export type LoaderTransaksi = {
  id: number
  tgl_transaksi: Date
  createdAt: Date
  updatedAt: Date
  id_user: number
  Sampah_Transaksi: {
    Material: {}[]
  }
}

export type LoaderTransaksi_Detail = {
  id: number
  tgl_transaksi: Date
  id_user: number | null
  User: {
    nama: string | null
    alamat: string
    no_hp: string
  } | null
  Sampah_Transaksi: {
    id: number
    total_berat: number
    total_harga: number
  } | null
} | null
