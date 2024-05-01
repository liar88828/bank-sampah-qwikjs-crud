import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { SideBar } from "./SideBar";
import {} from "lucide-react";
import { ListMenu } from "./ListMenu";

export const Navbar = component$(() => {
  return (
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <SideBar />
      </div>
      <div class="navbar-center">
        <Link href={"/"} class="btn btn-ghost text-xl">
          daisyUI
        </Link>
      </div>
      <div class="navbar-end">
        <ListMenu />
      </div>
    </div>
  );
});

