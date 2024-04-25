import { component$ } from "@builder.io/qwik";
import { getBreadcrumbTrail } from "~/assets/getBreadcrumbTrail";
import { Breadcrumbs } from "~/components/basic/Breadcrumbs";

export default component$(() => {
  // console.log(local)

  return (
    <section class="container space-y-3">
      <Heads />
      <Forms />
    </section>
  );
});

export const Heads = component$(() => {
  return <Breadcrumbs data={getBreadcrumbTrail("CreatePenukaran")} />;
});

export const Forms = component$(() => {
  return <div>Forms</div>;
});
