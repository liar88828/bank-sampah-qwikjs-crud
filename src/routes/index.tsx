import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useAuthSession } from "./plugin@auth";
// import { TransaksiCreate } from "~/components/form/transaksi-create";
export default component$(() => {
  // const session = useAuthSession();
  // console.log(session.value?.user);

  return (
    <>
      <div class="">
        <h1>Hi 👋</h1>
        <p>
          Can't wait to see what you build with qwik!
          <br />
          Happy coding.
        </p>
        {/* <TransaksiCreate/> */}
        {/* <Lines height={100}width={200}/> */}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
