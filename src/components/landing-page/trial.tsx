import { component$ } from "@builder.io/qwik";

export const Trial = component$(() => {
  return (
    <>
      <section class="bg-gray-50 dark:bg-gray-800">
        <div class="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
          <div class="mx-auto max-w-screen-sm text-center">
            <h2 class="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
              Start your free trial today
            </h2>
            <p class="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
              Try Landwind Platform for 30 days. No credit card required.
            </p>
            <a
              href="#"
              class="mb-2 mr-2 rounded-lg bg-purple-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
            >
              Free trial for 30 days
            </a>
          </div>
        </div>
      </section>
    </>
  );
});
