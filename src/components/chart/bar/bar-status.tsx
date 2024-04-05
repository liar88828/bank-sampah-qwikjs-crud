import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Chart, ChartConfiguration } from "chart.js/auto";

const data = [
  { day: "Senin", count: 10 },
  { day: "Selasa", count: 20 },
  { day: "Rabu", count: 15 },
  { day: "Kamis", count: 25 },
  { day: "Jumat", count: 22 },
  { day: "Sabtu", count: 30 },
  { day: "Minggu", count: 28 },
];

export const BarStatus = component$(() => {
  const time = useSignal("paused");
  const outputRef = useSignal<Element>();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(
    ({ cleanup, track }) => {
      track(() => outputRef.value);
      new Chart(outputRef.value as any, {
        type: "bar",
        data: {
          labels: data.map((row) => row.day),
          datasets: [
            {
              label: "Acquisitions by Day",
              data: data.map((row) => row.count),
              borderRadius: 5,
              borderSkipped: false,
            },
          ],
        },
        options: {

          responsive: true,
          maintainAspectRatio: false,

          plugins: {
            legend: {
              display: false,
            },
          },
          
          scales: {
            x: {
              grid: { display: false },
              ticks: { display: false },
              border: { display: false },
            },
            y: {
              grid: { display: false },
              ticks: { display: false },
              border: { display: false },
            },
          },
        },
      });
    },
    { strategy: "document-ready" },
  );

  return (
    <>
      <canvas ref={outputRef} class="h-auto w-full sm:w-20"></canvas>
    </>
  );
});
