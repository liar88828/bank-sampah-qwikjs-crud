import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { $ } from "@builder.io/qwik";
import { Chart } from "chart.js";

const data = [
  { day: "Samsung", count: 20 },
  { day: "Huawei", count: 30 },
  { day: "Apple", count: 70 },
];

export const DonutStatus = component$(() => {
  const afterdatasetDraw = $(function (chart: Chart) {
    const {
      ctx,
      data,
      chartArea: { width, right, top, height },
    } = chart;
    ctx.save();
    ctx.fillStyle = "gray";
    // ctx.textAlign = "center";
    ctx.font = "bold 12px sans-serif  ";
    // const x = chart.getDatasetMeta(0).data[0].x;
    // const y = chart.getDatasetMeta(0).data[0].y;
    const text = "20M";
    ctx.fillText(
      text,
      // width / 2, top + height / 2
      width / 2 - 5,
      top + height / 2 + 4,
    );
  });

  const outputRef = useSignal<Element>();
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(
    ({ track }) => {
      track(() => outputRef.value);
      new Chart(outputRef.value as any, {
        type: "doughnut",
        data: {
          labels: data.map((row) => row.day),
          datasets: [
            {
              label: "Acquisitions by Day",
              data: data.map((row) => row.count),
            },
          ],
        },
        plugins: [
          {
            id: "centerText",
            afterDatasetDraw: afterdatasetDraw,
          },
        ],
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

      // const update = () => (time.value = new Date().toLocaleTimeString());
      // const id = setInterval(update, 1000);
      // cleanup(() => clearInterval(id));
    },
    { strategy: "document-ready" },
  );

  return (
    <>
      <canvas ref={outputRef} class="h-auto w-full sm:w-20"></canvas>
    </>
  );
});
