import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { LuArrowBigLeft, LuHome } from "@qwikest/icons/lucide";

export const NotFound = component$(
  ({
    message = "Were sorry, but the item you were looking for could not be found. Please check the URL or try navigating back to the homepage.",
    title = "Item Not Found",
    callback = "/",
  }: {
    message?: string;
    title?: string;
    callback?: string;
  }) => {
    return (
      <div class="container">
        <div class="card bg-base-100">
          <div class="card-body">
            <h1 class="card-title">{title}</h1>
            <p class="mt-4 ">{message}</p>
            <div class="card-actions">
              <Link class="btn btn-info" href={callback}>
                <LuArrowBigLeft />
                Back
              </Link>
              <Link class="btn btn-info" href={"/"}>
                <LuHome />
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
