"use client"

import { useEffect, useState } from "react"

interface Occasion {
  title: string
  description: string
  image: string
}

// 🔁 Список загруженных изображений
const availableImages = [
  "/uploads/bt0.jpg",
  "/uploads/bt1.jpg",
  "/uploads/bt12.jpg",
  "/uploads/bt5.jpg",
  "/uploads/bt6.jpg",
  "/uploads/bt7.jpg",
  "/uploads/ki0.jpg",
  "/uploads/ki2.jpg",
  "/uploads/ki3.jpg",
  "/uploads/ki4.jpg",
  "/uploads/ki5.jpg",
  "/uploads/ki6.jpg",
  "/uploads/kn1.jpg",
  "/uploads/kn10.jpg",
  "/uploads/kn2.jpg",
  "/uploads/kn3.png",
  "/uploads/kn6.jpg",
  "/uploads/kn7.jpg",
  "/uploads/kn8.jpg",
  "/uploads/kn9.jpg",
  "/uploads/logo.png",
  "/uploads/pv10.jpg",
  "/uploads/pv11.jpg",
  "/uploads/pv3.jpg",
  "/uploads/pv4.jpg",
  "/uploads/pv5.jpg",
  "/uploads/pv6.jpg",
  "/uploads/rn10.jpg",
  "/uploads/rn9.jpg",
]

// 🎯 Исходные данные
const defaultOccasions: Occasion[] = [
  {
    title: "День рождения",
    description: "Праздник, где вы и ваши гости — главные герои интерактивной истории.",
    image: "/uploads/pv3.jpg",
  },
  {
    title: "Корпоратив",
    description: "Необычный формат тимбилдинга, который сближает сильнее, чем тренинг.",
    image: "/uploads/pv4.jpg",
  },
  {
    title: "Вечер с друзьями",
    description: "Вместо посиделок — захватывающее приключение с актёрами и сюжетом.",
    image: "/uploads/pv5.jpg",
  },
]

export default function OccasionsEditor() {
  const [occasions, setOccasions] = useState<Occasion[]>(defaultOccasions)

  useEffect(() => {
    const saved = localStorage.getItem("occasionsData")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setOccasions(parsed)
        }
      } catch (e) {
        console.warn("Ошибка чтения occasionsData:", e)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("occasionsData", JSON.stringify(occasions))
    window.dispatchEvent(new Event("occasionsUpdated"))
  }, [occasions])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    index: number,
    field: keyof Occasion
  ) => {
    const value = e.target.value
    const updated = [...occasions]
    updated[index] = { ...updated[index], [field]: value }
    setOccasions(updated)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Редактирование раздела «Поводы»</h2>

      {occasions.map((occasion, index) => (
        <div key={index} className="p-4 border rounded-lg shadow bg-white space-y-4">
          <h3 className="text-lg font-bold">Повод {index + 1}</h3>

          <div>
            <label className="block mb-1 font-medium">Заголовок</label>
            <input
              type="text"
              value={occasion.title}
              onChange={(e) => handleChange(e, index, "title")}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Описание</label>
            <textarea
              value={occasion.description}
              onChange={(e) => handleChange(e, index, "description")}
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Изображение</label>
            <select
              value={occasion.image}
              onChange={(e) => handleChange(e, index, "image")}
              className="w-full p-2 border rounded"
            >
              {availableImages.map((src) => (
                <option key={src} value={src}>
                  {src.replace("/uploads/", "")}
                </option>
              ))}
            </select>
            <div className="mt-2">
              <img
                src={occasion.image}
                alt="Превью"
                className="w-40 h-32 object-cover rounded border"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
