// import { Transaksi } from "@prisma/client";

import { TTransaksi } from "./TTransaksi";

export type TMaterial = {
  berat: number;
  nama: string;
  id?: number;
  jenis: string;
  id_sampahTransaksi: number;
};

export type Material_Relasional = {
  berat: number;
  nama: string;
  id?: number;
  Transaksi: TTransaksi[];
};
