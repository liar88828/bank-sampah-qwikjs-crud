import { LuCheckCircle } from "@qwikest/icons/lucide"

export const GridComponent = () => {
  return (
    <section class="bg-base-100 shadow">
      <div class="mx-auto max-w-screen-xl space-y-12 px-4 py-8 lg:space-y-20 lg:px-6 lg:py-24">
        <div class="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
          <div class="  sm:text-lg">
            <h2 class="mb-4 text-3xl font-extrabold tracking-tight ">
              Work with tools you already use
            </h2>
            <p class="mb-8 font-light lg:text-xl">
              Deliver great service experiences fast - without the complexity of
              traditional ITSM solutions. Accelerate critical development work,
              eliminate toil, and deploy changes with ease.
            </p>
            <ul
              // border-base-300
              role="list"
              class="my-7 space-y-5 border-t 
              pt-8 "
            >
              <li class="flex space-x-3">
                <LuCheckCircle class="h-5 w-5 flex-shrink-0 text-primary " />
                <span class="text-base font-medium leading-tight  ">
                  Continuous integration and deployment
                </span>
              </li>
              <li class="flex space-x-3">
                <LuCheckCircle class="h-5 w-5 flex-shrink-0 text-primary " />
                <span class="text-base font-medium leading-tight  ">
                  Development workflow
                </span>
              </li>
              <li class="flex space-x-3">
                <LuCheckCircle class="h-5 w-5 flex-shrink-0 text-primary " />
                <span class="text-base font-medium leading-tight  ">
                  Knowledge management
                </span>
              </li>
            </ul>
            <p class="mb-8 font-light lg:text-xl">
              Deliver great service experiences fast - without the complexity of
              traditional ITSM solutions.
            </p>
          </div>
          <img
            width="300"
            height="200"
            class="mb-4 hidden w-full rounded-lg lg:mb-0 lg:flex"
            src="https://picsum.photos/300/200?random=1342"
            alt="dashboard feature "
          />
        </div>
        <div class="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
          <img
            width="300"
            height="200"
            class="mb-4 hidden w-full rounded-lg lg:mb-0 lg:flex"
            src="https://picsum.photos/300/200?random=152"
            alt="feature   2"
          />
          <div class="text-gray-500 dark:text-gray-400 sm:text-lg">
            <h2 class="mb-4 text-3xl font-extrabold tracking-tight text-base-content ">
              We invest in the world’s potential
            </h2>
            <p class="mb-8 font-light lg:text-xl">
              Deliver great service experiences fast - without the complexity of
              traditional ITSM solutions. Accelerate critical development work,
              eliminate toil, and deploy changes with ease.
            </p>
            <ul
              role="list"
              class="my-7 space-y-5 border-t border-gray-200 pt-8 dark:border-gray-700"
            >
              <li class="flex space-x-3">
                <LuCheckCircle class="h-5 w-5 flex-shrink-0 text-primary " />
                <span class="text-base font-medium leading-tight ">
                  Dynamic reports and dashboards
                </span>
              </li>
              <li class="flex space-x-3">
                <LuCheckCircle class="h-5 w-5 flex-shrink-0 text-primary " />
                <span class="text-base font-medium leading-tight ">
                  Templates for everyone
                </span>
              </li>
              <li class="flex space-x-3">
                <LuCheckCircle class="h-5 w-5 flex-shrink-0 text-primary " />
                <span class="text-base font-medium leading-tight ">
                  Development workflow
                </span>
              </li>
              <li class="flex space-x-3">
                <LuCheckCircle class="h-5 w-5 flex-shrink-0 text-primary " />
                <span class="text-base font-medium leading-tight ">
                  Limitless business automation
                </span>
              </li>
              <li class="flex space-x-3">
                <LuCheckCircle class="h-5 w-5 flex-shrink-0 text-primary " />
                <span class="text-base font-medium leading-tight ">
                  Knowledge management
                </span>
              </li>
            </ul>
            <p class="font-light lg:text-xl">
              Deliver great service experiences fast - without the complexity of
              traditional ITSM solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
