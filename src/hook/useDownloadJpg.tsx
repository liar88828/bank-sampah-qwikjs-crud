import { $, useSignal } from "@builder.io/qwik";
import { toJpeg } from "html-to-image";

export const useDownload = ({ id }: { id: string }) => {
  const elemIdSignal = useSignal<string | null>(null);
  const handlerDownload = $(() => {
    // console.log('click')
    const elem = document.getElementById(id);
    elemIdSignal.value = elem?.getAttribute("id") || null;

    console.log(elem);
    if (!elemIdSignal.value) {
      return;
    }
    toJpeg(elem as any, {
      quality: 1,
    })
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => console.error(error));
  });
  return { handlerDownload };
};
