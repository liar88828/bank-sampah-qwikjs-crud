import { type QRL } from "@builder.io/qwik";
import { Material } from "@prisma/client";

export type TotalMaterialProps = {
  id: number;
  nama: string;
  berat: number;
  jenis: string;
  id_user: number | null;
  satuan: string;
  deskripsi: string;
  harga: number;
  kategori: string;
};

type Material_ = {
  id: number;
  nama: string;
  berat: number;
  jenis: string;
  id_sampahTransaksi: number | null;
  satuan: string;
  deskripsi: string;
  harga: number;
  kategori: string;
};

export type TestData = keyof {
  id: number;
  total_berat: number;
  total_harga: number;
  Material: TotalMaterialProps[];
};

export type ProfileProps = {
  id: number;
  nama: string | null;
  alamat: string;
  no_hp: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TransaksiSampahProps = {
  id: number;
  harga: number | null;
  berat: number;
  deskripsi: string | null;
};

export type SampahStore = {
  list: {
    id: number;
    berat: number;
    jenis: string;
    nama: string;
  }[];
  add: QRL<(this: SampahStore) => void>;
  remove: QRL<(this: SampahStore, index: number) => void>;
};
export type TPenyerahanSampah = {
  id_user: string | number;
  status: string;
  sampah: Material[];
};
