import { component$ } from "@builder.io/qwik";

export const CardDepanComponent = component$(() => {
  return (
    <div class=" h-[5.398cm] w-[8.56cm] rounded  bg-gradient-to-br from-green-500 via-green-400 to-green-500 p-2">
      <div class=" ">
        <div class="flex-col pb-1 text-center">
          <h1 class="text-sm font-bold ">Kartu Anggota Bank Sampah</h1>
          <h2 class="text-xs font-semibold">Bank sampah Ceria </h2>
        </div>

        <div class=" flex flex-row items-center justify-around gap-2 border-y  py-1">
          <div class="avatar">
            <div class=" h-[2cm] w-[1.5cm] rounded ">
              <img
                height={3}
                width={2}
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>

          <table class="text-[7pt] ">
            <thead>
              <tr>
                <td class="font-bold">Nama</td>
                <td>:</td>
                <td>Alex</td>
              </tr>
              <tr>
                <td class="font-bold">No</td>
                <td>:</td>
                <td>12312312</td>
              </tr>
              <tr>
                <td class="font-bold">Alamat</td>
                <td>:</td>
                <td>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ullam, numquam!
                </td>
              </tr>
              <tr>
                <td class="font-bold">No HP</td>
                <td>:</td>
                <td>0123423423</td>
              </tr>
            </thead>
          </table>
        </div>

        <div class="mr-2 flex justify-end">
          <div class="text-center">
            <h1 class="text-[8pt] font-bold"> Semarang, 23-06-2022 </h1>
            <p class="text-[6pt] ">Kepala Bank Sampah CERIA</p>
            <div class="my-5"> </div>
            <p class="text-[7pt] font-bold underline">Hj. Nurhayati Spd</p>
          </div>
        </div>
      </div>
    </div>
  );
});
