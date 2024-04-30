import { component$ } from "@builder.io/qwik";

export type PropsStatus = "SIMPAN" | "PROCESS" | "SELESAi";

type StatusObject = {
  terima: boolean;
  process: boolean;
  selesai: boolean;
};

export function getStatusObject(status: PropsStatus): StatusObject {
  const statusOrder: PropsStatus[] = ["SIMPAN", "PROCESS", "SELESAi"];
  const statusIndex = statusOrder.indexOf(status);

  return {
    terima: true,
    process: statusIndex >= 1,
    selesai: statusIndex >= 2,
  };
}

export const TimeLine = component$(({ status }: { status: StatusObject }) => {
  return (
    <ul class="timeline timeline-horizontal static ">
      <li class="static">
        <div class="timeline-start timeline-box">Terima</div>
        <div class="timeline-middle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class={`h-5 w-5  ${status.terima && "text-primary"}`}
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <hr class={`${status.process && "bg-primary"} `} />
      </li>

      <li class="static">
        <hr class={`${status.process && "bg-primary"} `} />
        <div class="timeline-start timeline-box">Process</div>
        <div class="timeline-middle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class={`h-5 w-5  ${status.process && "text-primary"}`}
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <hr class={`${status.selesai && "bg-primary"} `} />
      </li>

      <li class="static">
        <hr class={`${status.selesai && "bg-primary"} `} />
        <div class="timeline-start timeline-box">Selesai</div>
        <div class="timeline-middle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class={`h-5 w-5  ${status.selesai && "text-primary"}`}
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </li>
    </ul>
  );
});
