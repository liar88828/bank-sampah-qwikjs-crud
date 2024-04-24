import { component$ } from "@builder.io/qwik";

export const Trial = component$(() => {
  return (
    <section class="bg-base-100 shadow">
      <div class="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div class="mx-auto max-w-screen-sm text-center">
          <h2 class="mb-4 text-3xl font-extrabold leading-tight tracking-tight ">
            Start your free trial today
          </h2>
          <p class="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
            Try Landwind Platform for 30 days. No credit card required.
          </p>
          <a href="#" class="btn btn-primary">
            Free trial for 30 days
          </a>
        </div>
      </div>
    </section>
  );
});
