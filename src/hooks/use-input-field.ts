import { useState, ChangeEvent } from 'react'

type ReturnType = [
  value: string,
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
  reset: () => void
]

export const useInputField = (): ReturnType => {
  const [value, setValue] = useState<string>('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setValue(e.target.value)

  const reset = (): void => setValue('')

  return [value, handleChange, reset]
}
