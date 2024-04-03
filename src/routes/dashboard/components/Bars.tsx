import { component$ } from "@builder.io/qwik";
import { Charts } from "~/components/chart/chart";

const data = [
  { day: "Senin", count: 10 },
  { day: "Selasa", count: 20 },
  { day: "Rabu", count: 15 },
  { day: "Kamis", count: 25 },
  { day: "Jumat", count: 22 },
  { day: "Sabtu", count: 30 },
  { day: "Minggu", count: 28 },
];

export const Bars = component$(() => {
  return (
    <>
      <Charts
        height={100}
        width={100}
        option={{
          type: "bar",
          data: {
            labels: data.map((row) => row.day),
            datasets: [
              {
                label: "Acquisitions by Day",
                data: data.map((row) => row.count),
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: false,
              },
              // title: { display: false },
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: { display: false },
              },
              y: { grid: { display: false }, ticks: { display: false } },
            },
            // scales: {
            //   // yAxes: [
            //   //   {
            //   //     gridLines: {
            //   //       display: false,
            //   //     },
            //   //   },
            //   // ],
            // },
          },
        }}
      />
    </>
  );
});
