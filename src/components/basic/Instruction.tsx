import { component$ } from "@builder.io/qwik";
import { instructionList } from "../../assets/instructionList";

type InstructionListKey = keyof typeof instructionList;

export const Instruction = component$(
  ({ title }: { title: InstructionListKey }) => {
    return (
      <div class="card sm:card-compact static">
        <div class="card-body">
          <h1 class="text-lg font-bold">{instructionList[title].h1}</h1>
          {instructionList[title].list.map((d) => (
            <div key={d.title} class="mt-2">
              <h2 class="font-semibold">{d.title}</h2>
              <ul>
                {d.li.map((li, i) => (
                  <li key={li}>
                    {i + 1}. {li}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  },
);

// type InstructionList = keyof typeof instructionList;

// type InstructionListType<K extends InstructionList> =
//   (typeof instructionList)[K]["list"];

// type InstructionListTypes<K extends keyof typeof instructionList> =
//   (typeof instructionList)[K]["h1"];

// type test<K extends keyof typeof instructionList> = (typeof instructionList)[K];

// // Example usage
// type MaterialListType = InstructionListType<'material'>;
