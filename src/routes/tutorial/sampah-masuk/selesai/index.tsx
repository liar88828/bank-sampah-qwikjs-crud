import { component$ } from "@builder.io/qwik";
import { Foot } from "../layout";
import { ComponentTable } from "../layout"

export default component$(() => {
  return (
    <>
      <ComponentTable />
      <Foot />
    </>
  );
});
