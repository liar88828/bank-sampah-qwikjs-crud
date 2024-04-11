// import { Transaksi } from "@prisma/client";

import { TTransaksi } from "./transaksi.type";

export type TMaterial = {
  id?: number;
  nama: string;
  jenis: string;
  berat: number;
  id_sampahTransaksi?: number;
};

export type Material_Relasional = {
  berat: number;
  nama: string;
  id?: number;
  Transaksi: TTransaksi[];
};
