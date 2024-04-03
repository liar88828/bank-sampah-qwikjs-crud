import { $, QRL, component$, useSignal, useStore } from "@builder.io/qwik";
import { Color, ScriptableContext } from "chart.js";
import { LinesConfig } from "~/components/chart/Lines";
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

export const Lines = component$(() => {
  return (
    <>
      <LinesConfig height={100} width={100} />
    </>
  );
});
