"use client"

import { useState, useEffect } from "react"

export default function HeroEditor() {
  const [heroData, setHeroData] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: "",
  })

  useEffect(() => {
    const savedData = localStorage.getItem("heroData")
    if (savedData) {
      setHeroData(JSON.parse(savedData))
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setHeroData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setHeroData((prevData) => ({ ...prevData, image: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    localStorage.setItem("heroData", JSON.stringify(heroData))
    alert("Данные сохранены!")
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Заголовок</label>
        <input
          type="text"
          name="title"
          value={heroData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Подзаголовок</label>
        <input
          type="text"
          name="subtitle"
          value={heroData.subtitle}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Описание</label>
        <textarea
          name="description"
          value={heroData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Изображение</label>
        <input type="file" onChange={handleImageUpload} className="w-full p-2 border rounded" />
        {heroData.image && (
          <img src={heroData.image} alt="Предпросмотр" className="mt-2 h-48 object-cover" />
        )}
      </div>
      <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
        Сохранить
      </button>
    </div>
  )
}
