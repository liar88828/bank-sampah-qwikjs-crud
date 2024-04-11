export type TTransaksi = {
  id?: number;
  tgl_transaksi: Date;
  // berat: number;
  // harga: number;
  id_user?: number;
  // id_material?: number;
};

export type LoaderTransaksi = {
  id: number;
  tgl_transaksi: Date;
  createdAt: Date;
  updatedAt: Date;
  id_user: number;
};

export type LoaderTransaksi_Detail = {
  id: number;
  tgl_transaksi: Date;
  id_user: number | null;
  User: {
    nama: string | null;
    alamat: string;
    no_hp: string;
  } | null;
  Sampah_Transaksi: {
    id: number;
    total_berat: number;
    total_harga: number;
  } | null;
} | null;

// const data={
//     id: 1,
//     tgl_transaksi: new Date('2024-04-07T03:33:20.000Z'),
//     createdAt: new Date('2024-04-07T03:33:20.000Z'),
//     updatedAt: new Date('2024-04-07T03:33:20.000Z'),
//     id_user: 1
//   }
