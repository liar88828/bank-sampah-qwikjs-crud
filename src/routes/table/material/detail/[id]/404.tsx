import { component$ } from "@builder.io/qwik";
import { NotFound } from "~/components/errors/not-found";

export default component$(() => {
  // const location = useLocation();
  // console.log(location.prevUrl)
  // console.log(location.prevUrl?.searchParams.get("callback"))
  return (
    <NotFound
    //  callback={}
    />
  );
});
