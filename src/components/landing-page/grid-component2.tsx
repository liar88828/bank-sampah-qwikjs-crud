import {
  LuGlobe2,
  LuMoveRight,
  LuServer,
  LuShoppingCart,
  LuUsers,
} from "@qwikest/icons/lucide";

export const GridComponent2 = () => {
  return (
    <section class="mt-10 bg-base-100 shadow">
      <div class="mx-auto max-w-screen-xl items-center px-4 py-8 lg:grid lg:grid-cols-4 lg:gap-16 lg:px-6 lg:py-24 xl:gap-24">
        <div class="col-span-2 mb-8">
          <p class="text-lg font-medium ">Trusted Worldwide</p>
          <h2 class="mb-4 mt-3 text-3xl font-extrabold tracking-tight  md:text-3xl">
            Trusted by over 600 million users and 10,000 teams
          </h2>
          <p class="font-light text-gray-500 dark:text-gray-400 sm:text-xl">
            Our rigorous security and compliance standards are at the heart of
            all we do. We work tirelessly to protect you and your customers.
          </p>
          <div class="mt-6 space-y-4 border-t border-base-300 pt-6 ">
            <div>
              <a
                href="#"
                class="inline-flex items-center  font-medium  hover:text-base-300 "
              >
                Explore Legality Guide
                <LuMoveRight class="ml-1 h-5 w-5" />
              </a>
            </div>
            <div>
              <a
                href="#"
                class="inline-flex items-center font-medium  hover:text-base-200"
              >
                Visit the Trust Center
                <LuMoveRight class="ml-1 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div class="col-span-2 space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0">
          <div>
            <LuServer class="mb-2 h-10 w-10 md:h-12 md:w-12" />

            <h3 class="mb-2 text-2xl font-bold text-base-content ">
              99.99% uptime
            </h3>
            <p class="font-light ">
              For Landwind, with zero maintenance downtime
            </p>
          </div>
          <div>
            <LuUsers class="mb-2 h-10 w-10 md:h-12 md:w-12" />
            <h3 class="mb-2 text-2xl font-bold text-base-content ">
              600M+ Users
            </h3>
            <p class="font-light ">
              Trusted by over 600 milion users around the world
            </p>
          </div>
          <div>
            <LuGlobe2 class="mb-2 h-10 w-10 md:h-12 md:w-12" />
            <h3 class="mb-2 text-2xl font-bold text-base-content ">
              100+ countries
            </h3>
            <p class="font-light ">
              Have used Landwind to create functional websites
            </p>
          </div>
          <div>
            <LuShoppingCart class="mb-2 h-10 w-10 md:h-12 md:w-12" />
            <h3 class="mb-2 text-2xl font-bold text-base-content ">
              5+ Million
            </h3>
            <p class="font-light ">Transactions per day</p>
          </div>
        </div>
      </div>
    </section>
  );
};
