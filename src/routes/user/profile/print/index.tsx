import { component$ } from "@builder.io/qwik";
import {
  CardDepan,
  CardBelakang,
  CardMember,
  MultiVertical,
  MultiHorizontal,
} from "./component/CardLayout";
import { Link } from "@builder.io/qwik-city";
import { Breadcrumbs } from "~/components/basic/Breadcrumbs";

export default component$(() => {
  return (
    <section class="space-y-3">
      <Link class="btn btn-warning btn-xs" href="/user/profile">
        Back
      </Link>

      <Breadcrumbs
        data={[
          {
            name: "Home",
            link: "/",
          },
          {
            name: "Profile",
            link: "/user/profile/",
          },
          {
            name: "Print",
            link: "/user/profile/print",
          },
        ]}
      />
      <div class="static card bg-base-100">
        <div class="card-body">
          <div class=" flex flex-col items-center justify-center">
            <CardSingle />
            <CardMulti />
          </div>
        </div>
      </div>
    </section>
  );
});

export const CardSingle = component$(() => {
  return (
    <div class="  bg-base-200 p-2">
      <h1 class="">Single</h1>
      <div class=" flex-wrap gap-5">
        <div class="space-y-2">
          <CardDepan />
          <CardBelakang />
        </div>
        <CardMember />
      </div>
    </div>
  );
});

export const CardMulti = component$(() => {
  return (
    <div class="bg-base-200">
      <h1 class="">Multi</h1>
      <div class="space-y-2">
        <MultiHorizontal />
        <MultiVertical />
      </div>
    </div>
  );
});
