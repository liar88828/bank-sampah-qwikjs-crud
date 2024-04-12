import {
  $,
  component$,
  useId,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { LuUser } from "@qwikest/icons/lucide";

import { toJpeg, toPng } from "html-to-image";
import { useDownload } from "~/hook/useDownload";
export default component$(() => {
  return (
    <div class=" container flex  flex-col">
      <CardImage />
    </div>
  );
});

export const CardImage = component$(() => {
  return (
    <div class=" flex gap-5">
      <div class="">
        <CardDepan />
        <CardBelakang />
      </div>
      <CardMember />
    </div>
  );
});

export const CardDepan = component$(() => {
  const elemIdSignal = useSignal<string | null>(null);
  const id = useId();
  const elemId = `${id}-example`;
  console.log("server-side id:", elemId);
  // eslint-disable-next-line qwik/no-use-visible-task
  //   useVisibleTask$(({ track }) => {
  //     track(() => elemId);
  //     const elem = document.getElementById(elemId);
  //     elemIdSignal.value = elem?.getAttribute("id") || null;
  //   });

  const handleDownload = $(() => {
    const elem = document.getElementById(elemId);
    elemIdSignal.value = elem?.getAttribute("id") || null;

    if (!elemIdSignal.value) {
      return;
    }
    // console.log(elem);
    toJpeg(elem as any, { quality: 0.95 })
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => console.error(error));
  });

  return (
    <div>
      <div class="">
        <h1 class="font-bold">Depan</h1>
        <button onClick$={() => handleDownload()} class="btn btn-primary">
          Download
        </button>
      </div>

      <div
        id={elemId}
        // ref={elemIdSignal}
        class=" save h-[5.398cm]  w-[8.56cm] rounded  bg-gradient-to-br from-green-500 via-green-400 to-green-500 p-2"
      >
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
    </div>
  );
});

export const CardBelakang = component$(() => {
  const elemIdSignal = useSignal<string | null>(null);
  const id = useId();
  //   const elemId = `${id}-example`;

  const handleDownload = $(() => {
    const elem = document.getElementById(id);
    elemIdSignal.value = elem?.getAttribute("id") || null;

    if (!elemIdSignal.value) {
      return;
    }
    // console.log(elem);
    toJpeg(elem as any, { quality: 0.95 })
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => console.error(error));
  });

  return (
    <div>
      <div>
        <h1 class="font-bold">Belakang</h1>
        <button onClick$={() => handleDownload()} class="btn btn-primary">
          Download
        </button>
      </div>

      <div
        id={id}
        class="h-[5.398cm] w-[8.56cm] rounded  bg-gradient-to-br from-green-500 via-green-400 to-green-500 p-4"
      >
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
    </div>
  );
});

export const CardMember = component$(() => {
  const elemIdSignal = useSignal<string | null>(null);
  const id = useId();
  const { handlerDownload } = useDownload({
    id,
    elemIdSignal,
  });
  return (
    <div>
      <div>
        <h1 class="font-bold">Tegak</h1>
        <button onClick$={handlerDownload} class="btn btn-primary">
          Download
        </button>
      </div>

      <div
        id={id}
        class=" grid h-[8.5cm] w-[5.5cm] gap-6 rounded border bg-gradient-to-br from-green-500 via-green-400 to-green-500 p-6 "
      >
        <div class="flex flex-col items-center gap-1">
          <img
            alt="Photo"
            class="rounded"
            height="90"
            width="90"
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
          <div class="grid gap-1 text-center text-sm">
            <h3 class="font-semibold">Alice Johnson</h3>
            <p class="text-xs text-gray-500">Frontend Developer</p>
          </div>
        </div>
        <div class="flex flex-col gap-1 text-xs">
          <dl class="grid gap-1">
            <div class="flex justify-between">
              <dt class="font-bold">Nama</dt>
              <dd>Acme, Inc.</dd>
            </div>
            <div class="flex justify-between">
              <dt class="font-bold">No</dt>
              <dd>123456</dd>
            </div>
            <div class="flex justify-between">
              <dt class="font-bold">Alamat</dt>
              <dd>(555) 123-4567</dd>
            </div>
            <div class="flex justify-between">
              <dt class="font-bold">No Hp</dt>
              <dd>alice@example.com</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
});

export const CardProfile = component$(() => {
  return (
    <div>
      <div class="card static  bg-white">
        <div class="card-body  w-full max-w-md border p-6">
          <div class="flex items-center space-x-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 shadow-sm">
              <LuUser class="h-8 w-8" />
            </div>
            <div class="grid gap-0.5">
              <h1 class="text-lg font-bold">Alice Smith</h1>
              <p class="text-sm text-gray-500">Gold Member</p>
            </div>
          </div>
          <div class="mt-6 grid gap-1.5">
            <div class="flex items-center space-x-2">
              <p class="text-sm font-medium">Membership Number</p>
              <p class="text-sm text-gray-500">123456789</p>
            </div>
            <div class="flex items-center space-x-2">
              <p class="text-sm font-medium">Expires</p>
              <p class="text-sm text-gray-500">2023-01-01</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export const CardTest = component$(() => {
  return <div class=" h-[5.398cm] w-[8.56cm] border bg-red-500">text</div>;
});
