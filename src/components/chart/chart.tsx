import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik"
import { Chart, type ChartConfiguration } from "chart.js/auto"

// interface GraphProps {
//   height: string;
//   width: string;
//   chartData: object;
// }

// const data = [
//   { year: 2010, count: 10 },
//   { year: 2011, count: 20 },
//   { year: 2012, count: 15 },
//   { year: 2013, count: 25 },
//   { year: 2014, count: 22 },
//   { year: 2015, count: 30 },
//   { year: 2016, count: 28 },
// ];

// {
//   type: "bar",
//   data: {
//     labels: data.map((row) => row.year),
//     datasets: [
//       {
//         label: "Acquisitions by year",
//         data: data.map((row) => row.count),
//       },
//     ],
//   },
// } as ChartConfiguration,

type PropsChart = { width: number; height: number; option: ChartConfiguration }
export const Charts = component$(({ option, width, height }: PropsChart) =>
  // props: GraphProps
  {
    // const time = useSignal("paused")
    const outputRef = useSignal<Element>()
    // console.log("test");
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(
      ({ track }) => {
        track(() => outputRef.value)
        new Chart(outputRef.value as any, option)

        // const update = () => (time.value = new Date().toLocaleTimeString());
        // const id = setInterval(update, 1000);
        // cleanup(() => clearInterval(id));
      },
      { strategy: "document-ready" },
    )

    return (
      <>
        <canvas ref={outputRef} width={width} height={height}></canvas>
      </>
    )
  },
)
