import { Material, Opsi_Penukaran, Opsi_Penyerahan, Transaksi } from "@prisma/client";

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
  Sampah_Transaksi: {
    Material: {}[];
  };
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

export type MaterialTransaction = Material & {
  Transaksi: Transaksi[];
};
export type PenyerahanTransaksi = Opsi_Penyerahan & {
  Transaksi: Transaksi;
};
export type PenukaranTransaksi = Opsi_Penukaran & {
  Transaksi: Transaksi;
};

// const data={
//     id: 1,
//     tgl_transaksi: new Date('2024-04-07T03:33:20.000Z'),
//     createdAt: new Date('2024-04-07T03:33:20.000Z'),
//     updatedAt: new Date('2024-04-07T03:33:20.000Z'),
//     id_user: 1
//   }
