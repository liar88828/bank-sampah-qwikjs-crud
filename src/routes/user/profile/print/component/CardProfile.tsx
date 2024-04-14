import { component$ } from "@builder.io/qwik";
import { LuUser } from "@qwikest/icons/lucide";


export const CardProfile = component$(() => {
  return (
    <div>
      <div class="card static  bg-white">
        <div class="card-body  w-full max-w-md border p-6">
          <div class="flex items-center space-x-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 shadow-sm">
              <LuUser class="h-8 w-8" />
            </div>
            <div class="grid gap-0.5">
              <h1 class="text-lg font-bold">Alice Smith</h1>
              <p class="text-sm text-gray-500">Gold Member</p>
            </div>
          </div>
          <div class="mt-6 grid gap-1.5">
            <div class="flex items-center space-x-2">
              <p class="text-sm font-medium">Membership Number</p>
              <p class="text-sm text-gray-500">123456789</p>
            </div>
            <div class="flex items-center space-x-2">
              <p class="text-sm font-medium">Expires</p>
              <p class="text-sm text-gray-500">2023-01-01</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
