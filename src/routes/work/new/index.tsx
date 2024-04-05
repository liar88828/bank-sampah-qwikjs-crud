import { component$, Slot, useStore } from "@builder.io/qwik";

export const Index = component$(() => {
  return (
    <Panel>
      <div q:slot="closed">▶ (collapsed summary)</div>
      <div q:slot="open">
        ▼
        <div>
          Content that should be displayed when the collapse component is open.
        </div>
      </div>
    </Panel>
  );
});

export const Panel = component$(() => {
  const store = useStore({ open: false });
  return (
    <div>
      <button onClick$={() => (store.open = !store.open)}>Click</button>
      {store.open ? <Slot name="open" /> : <Slot name="closed" />}
    </div>
  );
});
