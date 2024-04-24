import { component$ } from "@builder.io/qwik";
import { LuCheck } from "@qwikest/icons/lucide";

export const Designed = component$(() => {
  return (
    <section class="bg-base-100 shadow">
      <div class="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-24">
        <div class="mx-auto mb-8 max-w-screen-md text-center lg:mb-12">
          <h2 class="mb-4 text-3xl font-extrabold tracking-tight ">
            Designed for business teams like yours
          </h2>
          <p class="mb-5 font-light text-gray-500 dark:text-gray-400 sm:text-xl">
            Here at Landing we focus on markets where technology, innovation,
            and capital can unlock long-term value and drive economic growth.
          </p>
        </div>
        <div class="space-y-8 sm:gap-6 lg:grid lg:grid-cols-3 lg:space-y-0 xl:gap-10">
          {Array.from({ length: 3 }).map((i) => {
            return (
              <div
                key={i + "id"}
                class="mx-auto flex max-w-lg flex-col rounded-lg border p-6 text-center shadow  xl:p-8"
              >
                <h3 class="mb-4 text-2xl font-semibold">Company</h3>
                <p class="font-light sm:text-lg">
                  Relevant for multiple users, extended & premium support.
                </p>
                <div class="my-8 flex items-baseline justify-center">
                  <span class="mr-2 text-5xl font-extrabold">$99</span>
                  <span class="">/month</span>
                </div>
                <ul class="mb-8 space-y-4 text-left">
                  <li class="flex items-center space-x-3">
                    <LuCheck class="h-5 w-5 flex-shrink-0 text-primary" />

                    <span>Individual configuration</span>
                  </li>
                  <li class="flex items-center space-x-3">
                    <LuCheck class="h-5 w-5 flex-shrink-0 text-primary" />

                    <span>No setup, or hidden fees</span>
                  </li>
                  <li class="flex items-center space-x-3">
                    <LuCheck class="h-5 w-5 flex-shrink-0 text-primary" />

                    <span>
                      Team size:
                      <span class="font-semibold">10 developers</span>
                    </span>
                  </li>
                  <li class="flex items-center space-x-3">
                    <LuCheck class="h-5 w-5 flex-shrink-0 text-primary" />

                    <span>
                      Premium support:
                      <span class="font-semibold">24 months</span>
                    </span>
                  </li>
                  <li class="flex items-center space-x-3">
                    <LuCheck class="h-5 w-5 flex-shrink-0 text-primary" />

                    <span>
                      Free updates:
                      <span class="font-semibold">24 months</span>
                    </span>
                  </li>
                </ul>
                <a href="#" class="btn btn-primary">
                  Get started
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
