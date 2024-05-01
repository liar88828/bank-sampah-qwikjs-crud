import { component$ } from "@builder.io/qwik";

export const OptionTableHead = component$(({ data }: { data: string[] }) => {
  return (
    <thead>
      <tr>
        {data.map((d) => (
          <th class="w-0" key={d}>
            {d}
          </th>
        ))}
      </tr>
    </thead>
  )
});
