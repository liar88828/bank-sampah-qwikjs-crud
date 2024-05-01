import { component$ } from "@builder.io/qwik";
import { type RequestHandler } from "@builder.io/qwik-city"

export const onRequest: RequestHandler = async ({ redirect }) => {
  throw redirect(303, "/menu/dashboard")
}

export default component$(() => {
  return <div>Hello Qwik!</div>;
});
