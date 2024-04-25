import { component$, useId } from "@builder.io/qwik";
import { useDownload } from "~/hook/useDownloadJpg";

export const CardMember = component$(() => {
  const id = useId();
  const { handlerDownload } = useDownload({
    id,
  });
  return (
    <div class="flex flex-col gap-2">
      <h1 class="font-bold"></h1>
      <button onClick$={handlerDownload} class="btn btn-primary">
        Tegak Download
      </button>
      <div id={id}>
        <CardTegakComponent />
      </div>
    </div>
  );
});

export const CardTegakComponent = component$(() => {
  return (
    <div class=" grid h-[8.5cm] w-[5.5cm] gap-6 rounded border bg-gradient-to-br from-green-500 via-green-400 to-green-500 p-6 ">
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
  );
});
