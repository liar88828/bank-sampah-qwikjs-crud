// import { work } from "~/db/work/work";

// type PenyerahanSampah = {
//   nama: string;
//   berat: string;
//   kategori: string;
//   deskripsi: string;
//   harga: string;
//   satuan: string;
//   jumlah: string;
// };

// class PenyerahanController {
//   async penyerahanSampah(id: number, data: Omit<PenyerahanSampah, "id">[]) {
//     return work.penyerahanSampah({
//       ...data,
//       id_user: id,
//       status: "Menunggu Konfirmasi",
//       sampah: data.map((s) => {
//         return {
//           id_user: id,
//           nama: s.nama,
//           deskripsi: s.deskripsi,
//           satuan: s.satuan,
//           kategori: s.kategori,
//           berat: Number(s.berat),
//           jumlah: Number(s.jumlah),
//           harga: Number(s.harga),
//         };
//       }),
//     });
//   }
// }
// export const penyerahanController = new PenyerahanController();
