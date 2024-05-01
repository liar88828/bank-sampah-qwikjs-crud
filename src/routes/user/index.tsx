import { component$ } from "@builder.io/qwik";
import { type RequestHandler } from "@builder.io/qwik-city";

export const onRequest: RequestHandler = async ({ redirect }) => {
  throw redirect(308, "/user/profile");
};

export default component$(() => {
  return <div>Hello Qwik!</div>;
});
