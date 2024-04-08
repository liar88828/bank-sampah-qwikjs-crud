import { Resource, component$ } from "@builder.io/qwik";
import { useDataGroup } from "../../page";
import { useNavigate } from "@builder.io/qwik-city";

// const datas = [
//   { name: "Aaron", city: "Syria", size: 823 },
//   { name: "Eddie", city: "Tuvalu", size: 918 },
//   { name: "Roy", city: "Iraq", size: 110 },
//   { name: "sd", city: "Iraq", size: 110 },
//   { name: "Linnie", city: "Ecuador", size: 644 },
//   { name: "Jordan", city: "Algeria", size: 913 },
// ];
type dataProps = {
  jenis: string;
  _sum: {
    berat: number | null;
  };
}[];
export const JenisSampah = component$(({ data }: { data: dataProps }) => {
  // const datas = useDataGroup();
  const nav = useNavigate();
  // console.log(data);

  const totalBerat = data
    .map((d) => d._sum.berat)
    .reduce((a, b) => {
      if (a !== null) {
        if (b) return a + b
      }
      return a
    }, 0);

  return (
    <div class="flex flex-row gap-5">
      <button
        type="button"
        class="btn btn-info"
        onClick$={() => nav("/menu/page?jenis=")}
      >
        <div class="flex items-center text-xl font-bold">
          <span>All</span>
          <span class="badge badge-neutral">{totalBerat}</span>
        </div>
      </button>
      
      {data.map((d,i) => (
        <button
          key={d.jenis + d._sum.berat+i}
          type="button"
          class="btn btn-info"
          onClick$={() => nav("/menu/page?jenis=" + d.jenis)}
        >
          <div class="flex items-center text-xl font-bold">
            <span>{d.jenis}</span>
            <span class="badge badge-neutral">{d._sum.berat}</span>
          </div>
        </button>
      ))}
    </div>
  );
});
{
  /* <>
<div class="rounded bg-base-300 p-5  shadow  shadow-gray-400">
  <h1 class="text-xl font-bold">Sampah Material</h1>
  <div class="overflow-x-auto">
    <table class="table table-xs static sm:table-sm md:table-md ">
      {/* head */
}
// <thead>
//   <tr>
//     <th>No</th>
//     <th>id</th>
//     <th>Nama</th>
//     <th>Berat</th>
//     <th>Jenis</th>
//     <th>Action</th>
//   </tr>
// </thead>
// <tbody>
//   {/* row 1 */}
//   {data.map((d, i) => (
//     <tr key={d.id}>
//       <td>{i+1}</td>
//       <td>{d.id}</td>
//       <td>{d.nama}</td>
//       <td>{d.jenis}</td>
//       <td>{d.berat}Kg</td>
//       <th>
//         <button class="btn btn-info btn-sm">details</button>
//       </th>
//     </tr>
//   ))}
// </tbody>
{
  /* foot */
}
{
  /* <tfoot>
        <tr>
          <th
          // colSpan={2}
          >
            <div class="join">
              <button class="btn join-item btn-sm">«</button>
              <button class="btn join-item btn-sm">Page 22</button>
              <button class="btn join-item btn-sm">»</button>
            </div>
          </th>
          <th
          // colSpan={2}
          >
            <select class="select select-bordered select-sm w-full max-w-xs">
              <option disabled selected>
                Who shot first?
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
          </th>
        </tr>
      </tfoot> */
}
//     </table>
//   </div>
// </div>
// </> */}
