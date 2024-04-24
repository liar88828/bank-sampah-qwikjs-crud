import { component$ } from "@builder.io/qwik";

export const CardBelakangComponent = component$(() => {
  return (
    <div class="h-[5.398cm] w-[8.56cm] rounded  bg-gradient-to-br from-green-500 via-green-400 to-green-500 p-4">
      <h1 class="text-[9pt] font-bold"> Catatan : </h1>
      <ul class="text-[8pt] ">
        <li>1. Kartu ini adalah identitas resmi anggota Bank Sampah.</li>
        <li>2. Gunakan kartu ini saat melakukan transaksi di Bank Sampah.</li>
        <li>3. Kartu ini tidak dapat dipinjamkan kepada orang lain. </li>
        <li>4. Harap jaga kartu ini dengan baik. </li>
        <li>
          5. Kehilangan kartu ini harus segera dilaporkan ke petugas Bank
          Sampah.
        </li>
        <li>
          6. Kartu ini memiliki masa berlaku selama Anda menjadi anggota Bank
          Sampah.
        </li>
      </ul>
    </div>
  );
});
