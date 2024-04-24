import { component$ } from "@builder.io/qwik";
import { LuFigma, LuGithub } from "@qwikest/icons/lucide";

export const Head = component$(() => {
  return (
    <section class="bg-base-100  shadow">
      <div class="mx-auto grid max-w-screen-xl px-4 pb-8 pt-20 lg:grid-cols-12 lg:gap-8 lg:py-16 lg:pt-28 xl:gap-0">
        <div class="mr-auto place-self-center lg:col-span-7">
          <h1 class="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl">
            Building digital <br />
            products & brands.
          </h1>
          <p class="mb-6 max-w-2xl font-light  md:text-lg lg:mb-8 lg:text-xl">
            This free and open-source landing page template was built using the
            utility classes from
            <a href="https://tailwindcss.com" class="hover:underline">
              Tailwind CSS
            </a>
            and based on the components from the{" "}
            <a
              href="https://flowbite.com/docs/getting-started/introduction/"
              class="hover:underline"
            >
              Flowbite Library
            </a>
            and the
            <a href="https://flowbite.com/blocks/" class="hover:underline">
              Blocks System
            </a>
            .
          </p>
          <div class="space-y-4 sm:flex sm:space-x-4 sm:space-y-0">
            <a
              href="https://github.com/themesberg/landwind"
              class="btn btn-neutral"
            >
              <LuGithub class="mr-2 h-4 w-4  " />
              View on GitHub
            </a>
            <a
              href="https://www.figma.com/community/file/1125744163617429490"
              class="btn btn-outline"
            >
              <LuFigma class="mr-2 h-4 w-4" />
              <title>Figma.logo</title>
              <desc>Created using Figma</desc>
              Get Figma file
            </a>
          </div>
        </div>
        <div class="hidden lg:col-span-5 lg:mt-0 lg:flex">
          <img
            width="400"
            height="200"
            src="https://picsum.photos/300/200?random=142"
            alt=" description"
          />
        </div>
      </div>
    </section>
  );
});
