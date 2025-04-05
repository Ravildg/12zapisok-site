"use client"

import { useEffect, useState } from "react"

interface HowItWorksData {
  title: string
  subtitle: string
  steps: string[]
  buttonText: string
  image: string
}

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

export default function HowItWorksSection() {
  const [data, setData] = useState<HowItWorksData>(defaultData)

  useEffect(() => {
    const saved = localStorage.getItem("howItWorksData")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed && typeof parsed === "object") {
          setData(parsed)
        }
      } catch (e) {
        console.error("Ошибка чтения данных:", e)
      }
    }
  }, [])

  return (
    <section className="p-6 text-center">
      <h2 className="text-3xl font-bold mb-2">{data.title}</h2>
      {data.subtitle && <p className="text-lg mb-4">{data.subtitle}</p>}
      <div className="flex justify-center gap-6 mb-6">
        {data.steps.map((step, i) => (
          <div key={i} className="bg-zinc-800 p-4 rounded shadow w-1/4">
            {step}
          </div>
        ))}
      </div>
      <div className="mb-4">
        <img src={data.image} alt="Картинка раздела" className="mx-auto max-h-64 object-contain" />
      </div>
      <button className="bg-green-600 text-white px-4 py-2 rounded">
        {data.buttonText}
      </button>
    </section>
  )
}
