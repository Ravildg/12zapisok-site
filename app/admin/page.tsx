"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

type SectionKey =
  | "hero"
  | "games"
  | "occasions"
  | "howItWorks"
  | "faq"
  | "gallery"
  | "reviews"
  | "pricing"

const sections: { key: SectionKey; label: string }[] = [
  { key: "hero", label: "Главная" },
  { key: "games", label: "Игры" },
  { key: "occasions", label: "Поводы" },
  { key: "howItWorks", label: "Как это работает" },
  { key: "faq", label: "Вопросы и ответы" },
  { key: "gallery", label: "Галерея" },
  { key: "reviews", label: "Отзывы" },
  { key: "pricing", label: "Тарифы" },
]

type SectionData = {
  title: string
  subtitle: string
  description: string
  image: string
}

export default function AdminPage() {
  const [active, setActive] = useState<SectionKey>("hero")
  const [data, setData] = useState<Record<SectionKey, SectionData>>({
    hero: defaultData("Главная секция"),
    games: defaultData("Игры"),
    occasions: defaultData("Поводы"),
    howItWorks: defaultData("Как это работает"),
    faq: defaultData("FAQ"),
    gallery: defaultData("Галерея"),
    reviews: defaultData("Отзывы"),
    pricing: defaultData("Тарифы"),
  })

  function defaultData(title: string): SectionData {
    return {
      title,
      subtitle: "",
      description: "",
      image: "",
    }
  }

  useEffect(() => {
    const saved = localStorage.getItem("adminData")
    if (saved) {
      setData(JSON.parse(saved))
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [active]: {
        ...prev[active],
        [name]: value,
      },
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setData((prev) => ({
        ...prev,
        [active]: {
          ...prev[active],
          image: reader.result as string,
        },
      }))
    }
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    localStorage.setItem("adminData", JSON.stringify(data))
    alert("Сохранено!")
  }

  const current = data[active]

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Админка сайта</h1>

      <div className="flex gap-2 flex-wrap mb-6">
        {sections.map((s) => (
          <button
            key={s.key}
            onClick={() => setActive(s.key)}
            className={`px-4 py-2 rounded ${
              active === s.key ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium">Заголовок</label>
          <input
            type="text"
            name="title"
            value={current.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Подзаголовок</label>
          <input
            type="text"
            name="subtitle"
            value={current.subtitle}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Описание</label>
          <textarea
            name="description"
            value={current.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Изображение</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {current.image && (
            <Image
              src={current.image}
              alt="Предпросмотр"
              width={400}
              height={200}
              className="mt-2 object-cover rounded shadow"
            />
          )}
        </div>

        <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">
          💾 Сохранить
        </button>
      </div>
    </div>
  )
}
