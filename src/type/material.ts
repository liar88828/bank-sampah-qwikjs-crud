// import { Transaksi } from "@prisma/client";

import {TTransaksi} from "./TTransaksi";

export type Material = {
  berat: number;
  nama: string;
  id?: number;
};

export type Material_Relasional = {
  berat: number;
  nama: string;
  id?: number;
  Transaksi: TTransaksi[];
};
