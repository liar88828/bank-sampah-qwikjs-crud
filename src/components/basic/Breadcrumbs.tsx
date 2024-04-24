import { component$, } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export const Breadcrumbs = component$(
  ({ data }: { data: { name: string; link: string }[] }) => {
    // const newData = useComputed$(() => {
    //   const array = data.map((item, index) => ({
    //     ...item,
    //     link: index === 0 ? "#" : item.link,
    //   }));
    //   // console.log(array)
    //   return array;
    // });

    return (
      <div class="breadcrumbs static text-sm">
        <ul class="static">
          {data.map((d) => (
            <li key={d.name} class="static">
              <Link class="static" href={d.link}>
                {d.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
