"use client"

import { useState, useEffect } from "react"

type HeroData = {
  title: string
  subtitle: string
  description: string
  image: string
}

const fallbackData: HeroData = {
  title: 'Квест-кафе "12 записок"',
  subtitle: "Погрузи команду в игру",
  description:
    "Квест-спектакли с живыми актёрами для взрослых. Каждый сюжет — как фильм, в котором вы главные герои. Проведите встречу, которую будут вспоминать.",
  image: "/placeholder.svg",
}

export default function HeroEditor() {
  const [heroData, setHeroData] = useState<HeroData>(fallbackData)

  useEffect(() => {
    try {
      const saved = localStorage.getItem("heroData")
      if (saved) {
        const parsed = JSON.parse(saved)
        if (
          parsed &&
          typeof parsed === "object" &&
          parsed.title &&
          parsed.subtitle &&
          parsed.description
        ) {
          setHeroData(parsed)
        }
      }
    } catch (error) {
      console.warn("Ошибка при загрузке heroData:", error)
    }
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setHeroData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setHeroData((prev) => ({ ...prev, image: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    localStorage.setItem("heroData", JSON.stringify(heroData))
    alert("Главная секция сохранена!")
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-semibold mb-1">Заголовок</label>
        <input
          type="text"
          name="title"
          value={heroData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Подзаголовок</label>
        <input
          type="text"
          name="subtitle"
          value={heroData.subtitle}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Описание</label>
        <textarea
          name="description"
          value={heroData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={4}
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Изображение</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {heroData.image && (
          <img
            src={heroData.image}
            alt="Превью изображения"
            className="mt-2 w-64 rounded shadow"
          />
        )}
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        💾 Сохранить
      </button>
    </div>
  )
}
