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

const data2 = [
  { day: "Senin", count: 52 },
  { day: "Selasa", count: 30 },
  { day: "Rabu", count: 54 },
  { day: "Kamis", count: 56 },
  { day: "Jumat", count: 90 },
  { day: "Sabtu", count: 30 },
  { day: "Minggu", count: 21 },
];

export const BarTopProduct = component$(() => {
  return (
    <Charts
      height={50}
      width={100}
      option={{
        type: "bar",
        data: {
          labels: data.map((row) => row.day),
          datasets: [
            {
              label: "Acquisitions by Day",
              data: data.map((row) => row.count),
              // borderRadius: 5,
              borderSkipped: false,
              backgroundColor: "#3e6be6",
              // borderWidth: 10,
              borderRadius: 20,
              // barPercentage: 1,
              categoryPercentage: 0.5,
            },
            {
              label: "Acquisitions test",
              data: data2.map((row) => row.count),
              backgroundColor: "#db5395",
              // borderWidth: 10,
              borderRadius: 20,
              borderSkipped: false,
              // spanGaps:1,
              // fill:false
              weight: 1,
              // barPercentage: 1,
              // borderWidth: 1,
              categoryPercentage: 0.5,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              // display: false,
            },
          },

          scales: {
            x: {
              grid: { display: false },
              // ticks: { display: false },
            },
            
            y: {
              grid: {
                display: true,
                drawOnChartArea: true,
                // drawTicks: true,
                color: "gray",
                lineWidth: 2,

                tickBorderDash: [5, 5],
              },
              border: {
                color: "gray",
                dash: [5, 5],
                // width: 20,
                display: false,
              },
            },
          },
        },
      }}
    />
  );
});
