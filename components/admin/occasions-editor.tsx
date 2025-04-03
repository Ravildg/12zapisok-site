"use client"

import { useState, useEffect } from "react"

type Occasion = {
  title: string
  description: string
  image: string
}

export default function OccasionsEditor() {
  const [occasions, setOccasions] = useState<Occasion[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("occasionsData")
    if (saved) {
      setOccasions(JSON.parse(saved))
    } else {
      setOccasions([
        {
          title: "День рождения",
          description: "Где вы — герои сюжета.",
          image: "/occasions/birthday.jpg",
        },
        {
          title: "Корпоратив",
          description: "Который объединит сильнее, чем тренинг.",
          image: "/occasions/corporate.jpg",
        },
        {
          title: "Вечер с друзьями",
          description: "Превращённый в приключение.",
          image: "/occasions/friends.jpg",
        },
      ])
    }
  }, [])

  const handleChange = (index: number, field: keyof Occasion, value: string) => {
    const updated = [...occasions]
    updated[index][field] = value
    setOccasions(updated)
  }

  const handleImageUpload = (index: number, file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const updated = [...occasions]
      updated[index].image = reader.result as string
      setOccasions(updated)
    }
    reader.readAsDataURL(file)
  }

  const addOccasion = () => {
    setOccasions([...occasions, { title: "", description: "", image: "" }])
  }

  const removeOccasion = (index: number) => {
    const updated = [...occasions]
    updated.splice(index, 1)
    setOccasions(updated)
  }

  const handleSave = () => {
    localStorage.setItem("occasionsData", JSON.stringify(occasions))
    alert("Поводы сохранены!")
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Редактор поводов</h2>
      {occasions.map((item, index) => (
        <div key={index} className="border p-4 rounded bg-white shadow space-y-2">
          <input
            type="text"
            placeholder="Заголовок"
            value={item.title}
            onChange={(e) => handleChange(index, "title", e.target.value)}
            className="w-full border p-2 rounded"
          />
          <textarea
            placeholder="Описание"
            value={item.description}
            onChange={(e) => handleChange(index, "description", e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleImageUpload(index, e.target.files[0])
              }
            }}
            className="w-full"
          />
          {item.image && (
            <img src={item.image} alt="Preview" className="w-48 h-auto mt-2 rounded shadow" />
          )}
          <button
            onClick={() => removeOccasion(index)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Удалить
          </button>
        </div>
      ))}
      <button onClick={addOccasion} className="bg-blue-500 text-white px-4 py-2 rounded">
        ➕ Добавить повод
      </button>
      <button onClick={handleSave} className="bg-green-600 text-white px-6 py-2 rounded ml-2">
        💾 Сохранить
      </button>
    </div>
  )
}
