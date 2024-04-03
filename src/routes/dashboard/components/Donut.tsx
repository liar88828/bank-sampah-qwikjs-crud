import { component$ } from "@builder.io/qwik";
import { Charts } from "~/components/chart/chart";
import { $ } from "@builder.io/qwik";
import { Chart } from "chart.js";
const data = [
  { day: "Samsung", count: 20 },
  { day: "Huawei", count: 30 },
  { day: "Apple", count: 70 },
];

export const Donut = component$(() => {
  const afterdatasetDraw = $(function (chart: Chart) {
    const {
      ctx,
      data,
      chartArea: { width, right, top, height },
    } = chart;
    ctx.save();
    ctx.fillStyle = "white";
    // ctx.textAlign = "center";
    ctx.font = "bold 12px sans-serif  ";
    // const x = chart.getDatasetMeta(0).data[0].x;
    // const y = chart.getDatasetMeta(0).data[0].y;
    const text = "20M";
    ctx.fillText(
      text,
      // width / 2, top + height / 2
      width / 2-5,
      top + height / 2 + 4,
    );
  });

  return (
    <>
      <Charts
        height={100}
        width={100}
        option={{
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
              // afterdatasetDraw
              // afterDatasetDraw(chart, arg, pluginOption) {
              // const { ctx, data } = chart;
              // const text = "iki center ya";
              // ctx.save();
              // const x = chart.getDatasetMeta(0).data[0].x;
              // const y = chart.getDatasetMeta(0).data[0].y;
              // ctx.font = "bold 12px sans-serif";
              // ctx.fillText(text, x, y);
              // },
            },
          ],
          options: {
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: { display: false },
              },
              y: { grid: { display: false }, ticks: { display: false } },
            },
          },
        }}
      />
    </>
  );
});
