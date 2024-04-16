import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export const Breadcrumbs = component$(
  ({ data }: { data: { name: string; link: string }[] }) => {
    return (
      <div class="breadcrumbs text-sm">
        <ul>
          {data.map((d, i) => (
            <li key={d.name}>
              <Link href={d.link}>{d.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
