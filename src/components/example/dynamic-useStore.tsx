import { $, component$, useStore } from "@builder.io/qwik"

interface PhoneNumber {
  list: { id: number; number: string }[]
}

export default component$(() => {
  const phoneNumbers = useStore<PhoneNumber>({
    list: [{ id: 1, number: "" }],
  })

  const addPhoneNumber = $(() => {
    const newPhoneNumbers = [
      ...phoneNumbers.list,
      { id: phoneNumbers.list.length + 1, number: "" },
    ]
    phoneNumbers.list = newPhoneNumbers
  })

  const removePhoneNumber = $((id: number) => {
    const newPhoneNumbers = phoneNumbers.list.filter((phone) => phone.id !== id)
    phoneNumbers.list = newPhoneNumbers
  })

  const handleChange = $((id: number, value: string) => {
    const newPhoneNumbers = phoneNumbers.list.map((phone) =>
      phone.id === id ? { ...phone, number: value } : phone,
    )
    phoneNumbers.list = newPhoneNumbers
  })

  return (
    <div>
      {phoneNumbers.list.map((phone) => (
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
