import { component$ } from "@builder.io/qwik";

export const Pagination = component$(() => {
  return (
    <div class="join">
      <button class="btn join-item btn-xs">«</button>
      <button class="btn join-item btn-xs">Page 22</button>
      <button class="btn join-item btn-xs">»</button>
    </div>
  );
});
