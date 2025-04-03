"use client"

import { useEffect, useState } from "react"

type HeroData = {
  title: string
  subtitle: string
  description: string
  image: string
}

// Список загруженных файлов — названия должны совпадать с тем, что в /public/uploads/
const availableImages = [
  "hero1.jpg",
  "hero2.jpg",
  "hero3.jpg",
  "hero4.jpg",
]

const fallbackData: HeroData = {
  title: 'Квест-кафе "12 записок"',
  subtitle: "Погрузи команду в игру",
  description:
    "Квест-спектакли с живыми актёрами для взрослых. Каждый сюжет — как фильм, в котором вы главные герои. Проведите встречу, которую будут вспоминать.",
  image: "/uploads/hero1.jpg",
}

export default function HeroEditor() {
  const [heroData, setHeroData] = useState<HeroData>(fallbackData)

  useEffect(() => {
    try {
      const saved = localStorage.getItem("heroData")
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed && parsed.title && parsed.subtitle && parsed.description) {
          setHeroData(parsed)
        }
      }
    } catch (err) {
      console.warn("Ошибка загрузки heroData:", err)
    }
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setHeroData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageSelect = (fileName: string) => {
    setHeroData((prev) => ({ ...prev, image: `/uploads/${fileName}` }))
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
        <div className="flex gap-4 flex-wrap">
          {availableImages.map((file) => (
            <div
              key={file}
              className={`cursor-pointer border-2 rounded p-1 ${
                heroData.image === `/uploads/${file}`
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
              onClick={() => handleImageSelect(file)}
            >
              <img
                src={`/uploads/${file}`}
                alt={file}
                className="w-32 h-20 object-cover rounded"
              />
            </div>
          ))}
        </div>
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
