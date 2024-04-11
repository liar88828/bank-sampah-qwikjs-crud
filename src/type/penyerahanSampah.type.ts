export type TPenyerahanSampah = {
  id_user: string|number;
  status: string;
  sampah: {
    nama: string;
    jenis: string;
    berat: number | string;
  }[];
};
