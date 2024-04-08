import { component$ } from "@builder.io/qwik";



export const BestSelling = component$(() => {
  const datas = [
    { name: "Aaron", city: "Syria", size: 823 },
    { name: "Eddie", city: "Tuvalu", size: 918 },
    { name: "Roy", city: "Iraq", size: 110 },
    { name: "Linnie", city: "Ecuador", size: 644 },
    { name: "Jordan", city: "Algeria", size: 913 },
  ];

  const total = datas.reduce((acc, data) => acc + data.size, 0);
  const datasWithPercentage = datas.map((data) => ({
    ...data,
    percent: (data.size / total) * 100,
  }));

  return (
    <>
      <div class=" rounded p-2 shadow shadow-gray-400">
        {/* <h1 class="text-xl font-bold">Active Users</h1> */}
        <div class="overflow-x-auto">
          <table class="table table-xs static sm:table-sm md:table-md ">
            {/* head */}
            <thead>
              <tr>
                <th class="text-xl font-bold">Best Selling Product</th>
                <th class="text-xl">Revenue ($ {total})</th>
                <th class="text-xl">Revenue (%)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {datas.map((d, i) => (
                <tr key={d.name}>
                  <td>
                    <div class="flex items-center gap-3">
                      <div class="avatar static">
                        <div class="h-12 w-20 rounded">
                          <img
                          height={10}
                          width={20}
                            src="https://picsum.photos/200/300?random=2"
                            alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                      <div>
                        <div class="font-bold">{d.name} </div>
                        <div class="text-sm  ">{d.city}</div>
                      </div>
                    </div>
                  </td>
                  <td class="">
                    <div class="flex  gap-2">
                      <span class="">${d.size}</span>
                      <span class="w-full">
                        <input
                          type="range"
                          min={0}
                          max={total}
                          value={d.size}
                          class="range range-accent range-xs " />
                      </span>
                    </div>
                  </td>
                  <td>{((d.size / total) * 100).toPrecision(2)}%</td>
                  <th>
                    <button class="btn btn-info  btn-sm">details</button>
                  </th>
                </tr>
              ))}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th colSpan={2}>
                  <div class="join">
                    <button class="btn join-item ">«</button>
                    <button class="btn join-item ">Page 22</button>
                    <button class="btn join-item ">»</button>
                  </div>
                </th>
                <th colSpan={2}>
                  <select class="select select-bordered   w-full max-w-xs">
                    <option disabled selected>
                      Who shot first?
                    </option>
                    <option>Han Solo</option>
                    <option>Greedo</option>
                  </select>
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
});
