"use client"

import { useEffect, useState } from "react"

interface HowItWorksData {
  title: string
  subtitle: string
  steps: string[]
  buttonText: string
  image: string
}

// 💾 Актуальный список изображений
const availableImages = [
  "/uploads/bt1.jpg",
  "/uploads/comanda.jpg",
  "/uploads/ki2.jpg",
  "/uploads/ki3.jpg",
  "/uploads/ki4.jpg",
  "/uploads/ki5.jpg",
  "/uploads/kn1.jpg",
  "/uploads/kn2.jpg",
  "/uploads/kn3.png",
  "/uploads/logo.png",
  "/uploads/pv1.jpg",
  "/uploads/яхта.jpg",
  "/uploads/povod1.png",
]

const defaultData: HowItWorksData = {
  title: "Организуем под ключ — ярко, чётко, без хлопот",
  subtitle: "",
  steps: [
    "Выберите сюжет",
    "Мы подготовим всё необходимое",
    "Погрузитесь в приключение",
  ],
  buttonText: "Оставить заявку",
  image: "/uploads/bt1.jpg",
}

export default function HowItWorksEditor() {
  const [data, setData] = useState<HowItWorksData>(defaultData)

  useEffect(() => {
    const saved = localStorage.getItem("howItWorksData")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed && typeof parsed === "object" && parsed.steps?.length) {
          setData(parsed)
        }
      } catch (e) {
        console.error("Ошибка парсинга данных:", e)
      }
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem("howItWorksData", JSON.stringify(data))
    alert("Раздел сохранён!")
  }

  const addStep = () => {
    setData({ ...data, steps: [...data.steps, ""] })
  }

  const removeStep = (index: number) => {
    const updatedSteps = [...data.steps]
    updatedSteps.splice(index, 1)
    setData({ ...data, steps: updatedSteps })
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold mb-4">Редактор "Как это работает"</h1>

      <label className="block">
        Заголовок:
        <input
          className="w-full p-2 rounded bg-zinc-800 text-white mt-1"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
      </label>

      <label className="block">
        Подзаголовок:
        <input
          className="w-full p-2 rounded bg-zinc-800 text-white mt-1"
          value={data.subtitle}
          onChange={(e) => setData({ ...data, subtitle: e.target.value })}
        />
      </label>

      <div>
        <h2 className="font-semibold mt-4 mb-2">Шаги:</h2>
        {data.steps.map((step, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              className="flex-1 p-2 rounded bg-zinc-800 text-white"
              value={step}
              onChange={(e) => {
                const updated = [...data.steps]
                updated[index] = e.target.value
                setData({ ...data, steps: updated })
              }}
            />
            <button
              onClick={() => removeStep(index)}
              className="text-red-400 hover:text-red-600"
              title="Удалить шаг"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          onClick={addStep}
          className="px-3 py-1 mt-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          ➕ Добавить шаг
        </button>
      </div>

      <label className="block">
        Текст кнопки:
        <input
          className="w-full p-2 rounded bg-zinc-800 text-white mt-1"
          value={data.buttonText}
          onChange={(e) => setData({ ...data, buttonText: e.target.value })}
        />
      </label>

      <div className="mt-4">
        <label className="block mb-1 font-semibold">Изображение:</label>
        <select
          value={data.image}
          onChange={(e) => setData({ ...data, image: e.target.value })}
          className="w-full p-2 bg-zinc-800 text-white rounded"
        >
          {availableImages.map((src) => (
            <option key={src} value={src}>
              {src.replace("/uploads/", "")}
            </option>
          ))}
        </select>
        <img
          src={data.image}
          alt="preview"
          className="mt-2 w-64 h-auto rounded border"
        />
      </div>

      <button
        onClick={handleSave}
        className="mt-6 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        💾 Сохранить изменения
      </button>
    </div>
  )
}
