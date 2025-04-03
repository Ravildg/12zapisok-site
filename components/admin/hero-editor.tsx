"use client"

import { useEffect, useState } from "react"

const DEFAULT_DATA = {
  badge: "Новая реальность ждёт тебя",
  title: 'Квест-кафе "12 записок"',
  subtitle: "Погрузи команду в игру",
  description:
    "Квест-спектакли с живыми актёрами для взрослых. Каждый сюжет — как фильм, в котором вы главные герои. Проведите встречу, которую будут вспоминать.",
  image: "/uploads/bt1.jpg",
}

export default function HeroEditor() {
  const [heroData, setHeroData] = useState(DEFAULT_DATA)

  useEffect(() => {
    const saved = localStorage.getItem("heroData")
    if (saved) setHeroData(JSON.parse(saved))
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setHeroData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setHeroData((prev) => ({ ...prev, image: value }))
  }

  const handleSave = () => {
    localStorage.setItem("heroData", JSON.stringify(heroData))
    alert("Главная секция сохранена!")
  }

  // список файлов, загруженных в /public/uploads (ручной список из скриншота)
  const availableImages = [
  "/uploads/bt1.jpg",
  "/uploads/bt2.jpg",
  "/uploads/comanda.jpg",
  "/uploads/ki1.jpg",
  "/uploads/ki2.jpg",
  "/uploads/ki3.jpg",
  "/uploads/ki4.jpg",
  "/uploads/ki5.jpg",
  "/uploads/ki6.jpg",
  "/uploads/ki7.jpg",
  "/uploads/ki8.jpg",
  "/uploads/ki9.jpg",
  "/uploads/ki10.jpg",
  "/uploads/ki11.jpg",
  "/uploads/ki12.jpg",
  "/uploads/kn1.jpg",
  "/uploads/kn2.jpg",
  "/uploads/kn3.png",
  "/uploads/logo.png",
  "/uploads/m1.jpg",
  "/uploads/m2.jpg",
  "/uploads/p1.jpg",
  "/uploads/p2.jpg",
  "/uploads/p3.jpg",
  "/uploads/p4.jpg",
  "/uploads/p5.jpg",
  "/uploads/p6.jpg",
  "/uploads/p7.jpg",
  "/uploads/p8.jpg",
  "/uploads/p9.jpg",
  "/uploads/p10.jpg",
]


  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">Редактирование главной секции</h2>

      <div>
        <label className="block font-medium mb-1">Бейдж (маленький текст над заголовком)</label>
        <input
          type="text"
          name="badge"
          value={heroData.badge}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Заголовок</label>
        <input
          type="text"
          name="title"
          value={heroData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Подзаголовок</label>
        <input
          type="text"
          name="subtitle"
          value={heroData.subtitle}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Описание</label>
        <textarea
          name="description"
          value={heroData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={4}
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Изображение</label>
        <select
          name="image"
          value={heroData.image}
          onChange={handleImageSelect}
          className="w-full p-2 border rounded"
        >
          {uploadedImages.map((src) => (
            <option key={src} value={src}>
              {src.replace("/uploads/", "")}
            </option>
          ))}
        </select>
        <div className="mt-2">
          <img
            src={heroData.image}
            alt="Предпросмотр"
            className="max-w-xs border rounded shadow"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Сохранить
      </button>
    </div>
  )
}
