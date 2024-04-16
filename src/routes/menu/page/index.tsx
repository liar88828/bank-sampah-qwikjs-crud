import { component$ } from "@builder.io/qwik";
import { NasabahActive } from "./component/NasabahActive";
import { MaterialSampah } from "./component/MaterialSampah";
import { Breadcrumbs } from "~/components/basic/Breadcrumbs";

export default component$(() => {
  return (
    <section class=" container ">
      <div class="space-y-5">
        <Breadcrumbs
          data={[
            {
              name: "Home",
              link: "/menu/page",
            },
            {
              name: "Page",
              link: "",
            },
          ]}
        />
        <NasabahActive />

        <MaterialSampah />
      </div>
    </section>
  );
});
