import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { listMenu } from "~/assets/listMenu";
import { listTable } from "~/assets/listTable";
import { listWork } from "~/assets/listWork";


export const SideBarLink = component$(() => {
  return (
    <ul class="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
      <li class={"mb-10"}>Home</li>

      <div class="divider divider-success">Menu</div>
      {listMenu.map((d) => (
        <li key={d.text}>
          <Link href={d.href}>
            {d.icon} {d.text}
          </Link>
        </li>
      ))}

      <div class="divider divider-success">Table</div>
      {listTable.map((d) => (
        <li key={d.text}>
          <Link href={d.href}>
            {d.icon} {d.text}
          </Link>
        </li>
      ))}

      <div class="divider divider-accent">Work</div>
      {listWork.map((d) => (
        <li key={d.text}>
          <Link href={d.href}>
            {d.icon} {d.text}
          </Link>
        </li>
      ))}
    </ul>
  );
});
