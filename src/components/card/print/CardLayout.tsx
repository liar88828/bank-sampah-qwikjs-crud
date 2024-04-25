import { component$, useId } from "@builder.io/qwik";
import { useDownload } from "~/hook/useDownloadJpg";
import { CardBelakangComponent } from "./CardBelakang";
import { CardDepanComponent } from "./CardDepan";
import { CardTegakComponent } from "./CardMember";

export const MultiVertical = component$(() => {
  const id = useId();
  const { handlerDownload } = useDownload({ id });
  return (
    <div class="flex flex-col gap-2">
      <button class="btn btn-info" onClick$={handlerDownload}>
        Vertical Download
      </button>

      <div class="flex flex-col gap-5" id={id}>
        <CardDepanComponent />
        <CardBelakangComponent />
      </div>
    </div>
  );
});
export const MultiHorizontal = component$(() => {
  const id = useId();
  const { handlerDownload } = useDownload({ id });
  return (
    <div class="flex flex-col gap-2">
      <button class="btn btn-info" onClick$={handlerDownload}>
        Horizontal Download
      </button>

      <div class="flex gap-5" id={id}>
        <CardDepanComponent />
        <CardBelakangComponent />
      </div>
    </div>
  );
});
export const CardDepan = component$(() => {
  const id = useId();
  const { handlerDownload } = useDownload({ id });

  return (
    <div class="flex flex-col gap-2">
      <button onClick$={() => handlerDownload()} class="btn btn-primary">
        Depan Download
      </button>
      <div id={id}>
        <CardDepanComponent />
      </div>
    </div>
  );
});
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
export const CardBelakang = component$(() => {
  const id = useId();
  const { handlerDownload } = useDownload({ id });

  return (
    <div class="flex flex-col gap-2">
      <button onClick$={() => handlerDownload()} class="btn btn-primary">
        Belakang Download
      </button>
      <div id={id}>
        <CardBelakangComponent />
      </div>
    </div>
  );
});
