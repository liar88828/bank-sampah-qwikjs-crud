import { $, useId, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { toJpeg } from "html-to-image";

export const useDownloadJpg = () => {
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

  const handlerDownload = $(() => {
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
  return { handlerDownload, elemId };
};
