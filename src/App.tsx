import { useState, FormEvent } from 'react'
import { useCollection } from './hooks/use-collection'
import { useDocument } from './hooks/use-document'
import { useInputField } from './hooks/use-input-field'
import { MessageDTO } from './types'

export const App: React.FC = () => {
  const { data: messages } = useCollection<MessageDTO[]>('messages')
  const { add, update, remove, loading } = useDocument<MessageDTO>('messages')
  const [name, handleName, resetName] = useInputField()
  const [text, handleText, resetText] = useInputField()
  // state for updates
  const [idToUpdate, setIdToUpdate] = useState<string>('')
  const [newName, handleNewName, resetNewName] = useInputField()
  const [newText, handleNewText, resetNewText] = useInputField()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    // don't do anything if name or text is empty
    if (!name || !text) return

    await add({ name, text })

    // reset form values after submission
    resetName()
    resetText()
  }

  // reset new values and
  const onToggleUpdate = (id: string): void => {
    resetNewName()
    resetNewText()
    setIdToUpdate(idToUpdate ? '' : id)
  }

  return (
    <div className="max-w-screen-sm h-screen bg-gray-50 mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-500 p-4 flex justify-between"
      >
        <div className="space-x-2">
          <input
            value={name}
            onChange={handleName}
            placeholder="Enter name..."
            className="p-2"
          />
          <input
            value={text}
            onChange={handleText}
            placeholder="Enter message text..."
            className="p-2"
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="border border-black p-2 bg-white"
        >
          Add message
        </button>
      </form>

      {messages && messages.length > 0 ? (
        <div
          className="space-y-6 py-4 flex flex-col mx-auto"
          style={{ maxWidth: 320 }}
        >
          {messages.map(({ id, name, text }) => (
            <div key={id} className="p-2 bg-green-100 rounded-lg">
              <div className="flex justify-between">
                <p className="font-semibold">{name} says:</p>
                <div className="space-x-4">
                  <button onClick={() => onToggleUpdate(id)}>update</button>
                  <button onClick={() => remove(id)}>delete</button>
                </div>
              </div>
              <p>{text}</p>

              {idToUpdate === id && (
                <div className="mt-6 flex flex-col space-y-2">
                  <input
                    value={newName}
                    onChange={handleNewName}
                    placeholder="New name..."
                    className="p-2 border border-black"
                  />
                  <input
                    value={newText}
                    onChange={handleNewText}
                    placeholder="New text..."
                    className="p-2 border border-black"
                  />
                  <button
                    onClick={async () => {
                      await update(idToUpdate, { name: newName, text: newText })
                      setIdToUpdate('')
                    }}
                  >
                    Update
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">(No messages to show)</p>
      )}
    </div>
  )
}

export default App
