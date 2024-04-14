import { component$ } from "@builder.io/qwik";
import { CardBelakang } from "./component/CardLayout";
import { CardDepan } from "./component/CardLayout";
import { CardMember } from "./component/CardLayout";
import { MultiVertical } from "./component/CardLayout";
import { MultiHorizontal } from "./component/CardLayout";

export default component$(() => {
  return (
    <div class=" flex flex-col items-center justify-center">
      <CardSingle />
      <CardMulti />
    </div>
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
