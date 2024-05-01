import { component$ } from "@builder.io/qwik"

export const Checkbox = component$(
  ({ key, label }: { key: string; label: string }) => {
    return (
      <div class="form-control ">
        <label class="label cursor-pointer">
          <input
            type="checkbox"
            name={key}
            checked
            class="checkbox-success checkbox"
          />
          <span class="label-text">{label}</span>
        </label>
      </div>
    )
  },
)
