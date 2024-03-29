// import { Transaksi } from "@prisma/client";

import { Transaksi } from "./transaksi";

export type Material = {
  berat: number;
  nama: string;
  id?: number;
};

export type Material_Relasional = {
  berat: number;
  nama: string;
  id?: number;
  Transaksi: Transaksi[];
};
