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
    const savedData = localStorage.getItem("heroData")
    if (savedData) {
      setHeroData(JSON.parse(savedData))
    }
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setHeroData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setHeroData((prevData) => ({ ...prevData, image: result }))
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
        <label className="block mb-1 font-semibold">Заголовок</label>
        <input
          type="text"
          name="title"
          value={heroData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Подзаголовок</label>
        <input
          type="text"
          name="subtitle"
          value={heroData.subtitle}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Описание</label>
        <textarea
          name="description"
          value={heroData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={4}
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Изображение</label>
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
        Сохранить
      </button>
    </div>
  )
}
