import { LuQuote } from "@qwikest/icons/lucide";

export const Speak = () => {
  return (
    <section class="bg-base-100 shadow ">
      <div class="mx-auto max-w-screen-xl px-4 py-8 text-center lg:px-6 lg:py-24">
        <figure class="mx-auto max-w-screen-md">
          <LuQuote
            class="mx-auto mb-3 h-12  text-base-content"
            font-size={40}
          />

          <blockquote>
            <p class="text-xl font-medium md:text-2xl">
              "Landing is just awesome. It contains tons of presigned components
              and pages starting from login screen to complex dashboard. Perfect
              choice for your next SaaS application."
            </p>
          </blockquote>
          <figcaption class="mt-6 flex items-center justify-center space-x-3">
            <img
              width={8}
              height={9}
              class="h-6 w-6 rounded-full"
              src="https://picsum.photos/300/200?random=1231"
              alt="image_people"
            />
            <div class="flex items-center divide-x-2 divide-base-content ">
              <div class="pr-3 font-medium text-gray-900 ">Micheal Gough</div>
              <div class="pl-3 text-sm font-light text-gray-500 ">
                CEO at Google
              </div>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};
