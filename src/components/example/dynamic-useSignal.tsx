import { $, component$, useSignal } from "@builder.io/qwik"

interface PhoneNumber {
  id: number
  number: string
}

export default component$(() => {
  const phoneNumbers = useSignal<PhoneNumber[]>([{ id: 1, number: "" }])

  const addPhoneNumber = $(() => {
    const newPhoneNumbers = [
      ...phoneNumbers.value,
      { id: phoneNumbers.value.length + 1, number: "" },
    ]
    phoneNumbers.value = newPhoneNumbers
  })

  const removePhoneNumber = $((id: number) => {
    const newPhoneNumbers = phoneNumbers.value.filter(
      (phone) => phone.id !== id,
    )
    phoneNumbers.value = newPhoneNumbers
  })

  const handleChange = $((id: number, value: string) => {
    const newPhoneNumbers = phoneNumbers.value.map((phone) =>
      phone.id === id ? { ...phone, number: value } : phone,
    )
    phoneNumbers.value = newPhoneNumbers
  })

  return (
    <div>
      {phoneNumbers.value.map((phone) => (
        <div key={phone.id}>
          <input
            type="text"
            value={phone.number}
            onInput$={(_, el) => handleChange(phone.id, el.value)} //(state.name = el.value)}
          />
          <button onClick$={() => removePhoneNumber(phone.id)}>Remove</button>
        </div>
      ))}
      <button onClick$={addPhoneNumber}>Add Phone Number</button>
    </div>
  )
})
