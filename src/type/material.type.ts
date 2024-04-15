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
export type PropsSelect = {
  jenis: string;
  _count: {
    jenis: number;
  };
  _sum: {
    berat: number | null;
  };
};export type PropsMaterialUser = {
  id: number;
  nama: string;
  berat: number;
  jenis: string;
  id_sampahTransaksi: number | null;
};
export type TSearchData = { nama: string; jenis: string; };

