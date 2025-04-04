"use client"

import { useEffect, useState } from "react"

interface HowItWorksData {
  title: string
  subtitle: string
  steps: string[]
  buttonText: string
  image: string
}

const availableImages = [
  "/uploads/btn1.jpg",
  "/uploads/btn2.jpg",
  "/uploads/btn3.jpg",
  "/uploads/ki2.jpg",
  "/uploads/bt5.jpg",
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
  image: "/uploads/btn1.jpg",
}

export default function HowItWorksEditor() {
  const [data, setData] = useState<HowItWorksData>(defaultData)

  useEffect(() => {
    const saved = localStorage.getItem("howItWorksData")
    if (saved) setData(JSON.parse(saved))
  }, [])

  const handleSave = () => {
    localStorage.setItem("howItWorksData", JSON.stringify(data))
    alert("Сохранено!")
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Редактор раздела "Как это работает"</h1>

      <label className="block">
        Заголовок:
        <input
          className="w-full p-2 rounded bg-gray-800 text-white mt-1"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
      </label>

      <label className="block">
        Подзаголовок:
        <input
          className="w-full p-2 rounded bg-gray-800 text-white mt-1"
          value={data.subtitle}
          onChange={(e) => setData({ ...data, subtitle: e.target.value })}
        />
      </label>

      <div>
        <h2 className="font-semibold mt-4 mb-2">Шаги:</h2>
        {data.steps.map((step, index) => (
          <input
            key={index}
            className="w-full p-2 mb-2 rounded bg-gray-800 text-white"
            value={step}
            onChange={(e) => {
              const updatedSteps = [...data.steps]
              updatedSteps[index] = e.target.value
              setData({ ...data, steps: updatedSteps })
            }}
          />
        ))}
      </div>

      <label className="block">
        Текст кнопки:
        <input
          className="w-full p-2 rounded bg-gray-800 text-white mt-1"
          value={data.buttonText}
          onChange={(e) => setData({ ...data, buttonText: e.target.value })}
        />
      </label>

      <div>
        <h2 className="font-semibold mt-4 mb-2">Изображение справа:</h2>
        <select
          className="p-2 rounded bg-gray-800 text-white"
          value={data.image}
          onChange={(e) => setData({ ...data, image: e.target.value })}
        >
          {availableImages.map((img) => (
            <option key={img} value={img}>
              {img}
            </option>
          ))}
        </select>
        <div className="mt-2">
          <img src={data.image} alt="preview" className="w-64 h-auto rounded" />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
      >
        💾 Сохранить
      </button>
    </div>
  )
}
