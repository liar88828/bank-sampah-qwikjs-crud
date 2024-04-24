import { component$ } from "@builder.io/qwik";

export const Questions = component$(() => {
  return (
    <section class="bg-base-100 pt-10 shadow">
      <div class="mx-auto max-w-screen-xl px-4 pb-8 lg:px-6 lg:pb-24">
        <h2 class="mb-6 text-center text-3xl font-extrabold tracking-tight text-base-content lg:mb-8 lg:text-3xl">
          Frequently asked questions
        </h2>
        <div class="mx-auto max-w-screen-md ">
          <Accordion />
        </div>
      </div>
    </section>
  );
});

export const Accordion = component$(() => {
  return (
    <div class="space-y-2 ">
      <div class="collapse collapse-arrow bg-base-200   ">
        <input type="radio" name="my-accordion-2" checked />
        {/* ---- */}
        <div class="collapse-title text-xl font-medium ">
          Can I use Landwind in open-source projects?
        </div>
        <div class="collapse-content">
          <p>
            Landwind is an open-source library of interactive components built
            on top of Tailwind CSS including buttons, dropdowns, modals,
            navbars, and more.
          </p>
        </div>
      </div>
      {/* ---- */}
      <div class="collapse-arrow collapse bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div class="collapse-title text-xl font-medium">
          Check out this guide to learn how to
        </div>
        <div class="collapse-content">
          <p>
            and start developing websites even faster with components on top of
            Tailwind CSS.
          </p>
        </div>
      </div>
      {/* ---- */}
      <div class="collapse-arrow collapse bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div class="collapse-title text-xl font-medium">
          Is there a Figma file available?
        </div>
        <div class="collapse-content">
          <p>
            Landwind is first conceptualized and designed using the Figma
            software so everything you see in the library has a design
            equivalent in our Figma file.
          </p>
        </div>
      </div>
      {/* ---- */}
      <div class="collapse-arrow collapse bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div class="collapse-title text-xl font-medium">
          What are the differences between Landwind and Tailwind UI?
        </div>
        <div class="collapse-content">
          <p>
            The main difference is that the core components from Landwind are
            open source under the MIT license, whereas Tailwind UI is a paid
            product. Another difference is that Landwind relies on smaller and
            standalone components, whereas Tailwind UI offers sections of pages.
          </p>
        </div>
      </div>
    </div>
  );
});
