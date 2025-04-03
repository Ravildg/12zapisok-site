"use client"

import { useState, useEffect } from "react"

type FaqItem = {
  id: string
  question: string
  answer: string
}

const LOCAL_KEY = "faqData"

export default function FAQEditor() {
  const [faqs, setFaqs] = useState<FaqItem[]>([])
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY)
    if (saved) setFaqs(JSON.parse(saved))
  }, [])

  const handleAdd = () => {
    if (!question.trim() || !answer.trim()) return
    const newFaq: FaqItem = {
      id: Date.now().toString(),
      question,
      answer,
    }
    setFaqs((prev) => [...prev, newFaq])
    setQuestion("")
    setAnswer("")
  }

  const handleDelete = (id: string) => {
    setFaqs((prev) => prev.filter((item) => item.id !== id))
  }

  const handleSave = () => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(faqs))
    alert("FAQ сохранены!")
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Редактор вопросов и ответов</h2>

      <div className="grid gap-2">
        <input
          type="text"
          placeholder="Вопрос"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Ответ"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded w-fit"
        >
          ➕ Добавить
        </button>
      </div>

      <ul className="space-y-2">
        {faqs.map((item) => (
          <li
            key={item.id}
            className="border p-4 rounded shadow-sm relative bg-gray-50"
          >
            <strong className="block">{item.question}</strong>
            <p>{item.answer}</p>
            <button
              onClick={() => handleDelete(item.id)}
              className="absolute top-2 right-2 text-red-600 text-sm"
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        💾 Сохранить
      </button>
    </div>
  )
}
