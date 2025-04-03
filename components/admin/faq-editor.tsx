"use client"

import { useEffect, useState } from "react"

type FaqItem = {
  id: string
  question: string
  answer: string
}

const LOCAL_KEY = "faqData"

export default function FAQEditor() {
  const [faqList, setFaqList] = useState<FaqItem[]>([])
  const [newItem, setNewItem] = useState<FaqItem>({
    id: "",
    question: "",
    answer: "",
  })

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY)
    if (saved) setFaqList(JSON.parse(saved))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewItem((prev) => ({ ...prev, [name]: value }))
  }

  const addItem = () => {
    if (!newItem.question || !newItem.answer) {
      alert("Заполни вопрос и ответ")
      return
    }
    const item: FaqItem = {
      ...newItem,
      id: Date.now().toString(),
    }
    setFaqList((prev) => [...prev, item])
    setNewItem({ id: "", question: "", answer: "" })
  }

  const deleteItem = (id: string) => {
    setFaqList((prev) => prev.filter((item) => item.id !== id))
  }

  const handleSave = () => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(faqList))
    alert("Вопросы сохранены!")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-2">Добавить вопрос</h2>
        <input
          type="text"
          name="question"
          value={newItem.question}
          onChange={handleChange}
          placeholder="Вопрос"
          className="w-full p-2 mb-2 border rounded"
        />
        <textarea
          name="answer"
          value={newItem.answer}
          onChange={handleChange}
          placeholder="Ответ"
          className="w-full p-2 mb-2 border rounded"
        />
        <button onClick={addItem} className="bg-green-600 text-white px-4 py-2 rounded">
          ➕ Добавить
        </button>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Список вопросов</h2>
        <ul className="space-y-3">
          {faqList.map((item) => (
            <li key={item.id} className="p-4 border rounded bg-gray-50 relative">
              <strong>{item.question}</strong>
              <p className="mt-1">{item.answer}</p>
              <button
                onClick={() => deleteItem(item.id)}
                className="absolute top-2 right-2 text-red-500 text-sm"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">
        💾 Сохранить все вопросы
      </button>
    </div>
  )
}
