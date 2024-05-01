import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik"
import { Chart, type ChartItem, type ChartConfiguration } from "chart.js/auto"

// interface GraphProps {
//   height: string;
//   width: string;
//   chartData: object;
// }

const data = [
  { year: 2010, count: 10 },
  { year: 2011, count: 20 },
  { year: 2012, count: 15 },
  { year: 2013, count: 25 },
  { year: 2014, count: 22 },
  { year: 2015, count: 30 },
  { year: 2016, count: 28 },
]

export const Test = component$(() =>
  // props: GraphProps
  {
    const outputRef = useSignal<Element>()
    // console.log("test");
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(
      ({ track }) => {
        track(() => outputRef.value)
        new Chart(
          outputRef.value as ChartItem,
          {
            type: "bar",
            data: {
              labels: data.map((row) => row.year),
              datasets: [
                {
                  label: "Acquisitions by year",
                  data: data.map((row) => row.count),
                },
              ],
            },
          } as ChartConfiguration,
        )

        // const update = () => (time.value = new Date().toLocaleTimeString());
        // const id = setInterval(update, 1000);
        // cleanup(() => clearInterval(id));
      },
      { strategy: "document-ready" },
    )

    return (
      <>
        <canvas ref={outputRef} width={800} height={200}></canvas>
      </>
    )
  },
)
