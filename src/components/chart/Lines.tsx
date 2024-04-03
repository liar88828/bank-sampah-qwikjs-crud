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

type PropsChart = { width: number; height: number };

export const LinesConfig = component$(({ width, height }: PropsChart) => {
  const time = useSignal("paused");
  const outputRef = useSignal<Element>();
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(
    ({ cleanup, track }) => {
      track(() => outputRef.value);
      new Chart(outputRef.value as any, {
        type: "line",
        data: {
          labels: data.map((row) => row.day),
          datasets: [
            {
              label: "Acquisitions by Day",
              data: data.map((row) => row.count),
              backgroundColor: ({ chart }) => {
                const ctxs = chart.ctx;
                if (!chart.chartArea) {
                  return;
                }
                const {
                  ctx,
                  data,
                  chartArea: { top, bottom },
                } = chart;

                const gradient = ctx.createLinearGradient(0, top, 0, bottom);

                gradient.addColorStop(0, "rgb(0,235,255)");
                gradient.addColorStop(1, "rgba(0,0,0,0)");
                return gradient;
                console.log(chart.chartArea);
              },
              fill: true,
              tension: 0.5,
            },
          ],
        },
        options: {
          interaction: {
            intersect: false,
            mode: 'index',
          
          },
          elements: {
            point: {
              radius: 0,
            },
          },
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
        },
      });
    },
    { strategy: "document-ready" },
  );

  return (
    <>
      <canvas ref={outputRef} width={width} height={height}></canvas>
    </>
  );
});
