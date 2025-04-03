"use client"

import { useEffect, useState } from "react"

type Step = {
  title: string
  description: string
}

export default function HowItWorksEditor() {
  const [steps, setSteps] = useState<Step[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("howItWorksData")
    if (saved) {
      setSteps(JSON.parse(saved))
    } else {
      setSteps([
        {
          title: "Вы выбираете сюжет",
          description: "Из восьми ярких историй с актёрами.",
        },
        {
          title: "Мы адаптируем сценарий",
          description: "Под возраст, интересы и площадку.",
        },
        {
          title: "Играем!",
          description: "Вы — герои, а мы ведём за кулисами.",
        },
      ])
    }
  }, [])

  const handleChange = (index: number, field: keyof Step, value: string) => {
    const updated = [...steps]
    updated[index][field] = value
    setSteps(updated)
  }

  const addStep = () => {
    setSteps([...steps, { title: "", description: "" }])
  }

  const removeStep = (index: number) => {
    const updated = [...steps]
    updated.splice(index, 1)
    setSteps(updated)
  }

  const handleSave = () => {
    localStorage.setItem("howItWorksData", JSON.stringify(steps))
    alert("Раздел «Как это работает» сохранён!")
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Редактор: Как это работает</h2>
      {steps.map((step, index) => (
        <div key={index} className="border p-4 rounded bg-white shadow space-y-2">
          <input
            type="text"
            placeholder="Заголовок шага"
            value={step.title}
            onChange={(e) => handleChange(index, "title", e.target.value)}
            className="w-full border p-2 rounded"
          />
          <textarea
            placeholder="Описание шага"
            value={step.description}
            onChange={(e) => handleChange(index, "description", e.target.value)}
            className="w-full border p-2 rounded"
          />
          <button
            onClick={() => removeStep(index)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Удалить шаг
          </button>
        </div>
      ))}
      <button onClick={addStep} className="bg-blue-500 text-white px-4 py-2 rounded">
        ➕ Добавить шаг
      </button>
      <button onClick={handleSave} className="bg-green-600 text-white px-6 py-2 rounded ml-2">
        💾 Сохранить
      </button>
    </div>
  )
}
