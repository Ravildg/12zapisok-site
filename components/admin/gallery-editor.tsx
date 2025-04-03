"use client"

import { useEffect, useState } from "react"

type GalleryItem = {
  id: string
  image: string
}

type GalleryData = {
  title: string
  description: string
  images: GalleryItem[]
}

const LOCAL_KEY = "galleryData"

export default function GalleryEditor() {
  const [data, setData] = useState<GalleryData>({
    title: "Галерея",
    description: "Кадры с прошедших игр — эмоции, атмосфера, переживания гостей.",
    images: [],
  })

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY)
    if (saved) setData(JSON.parse(saved))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      const newImage: GalleryItem = {
        id: Date.now().toString(),
        image: reader.result as string,
      }
      setData((prev) => ({
        ...prev,
        images: [...prev.images, newImage],
      }))
    }
    reader.readAsDataURL(file)
  }

  const handleDeleteImage = (id: string) => {
    setData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== id),
    }))
  }

  const handleSave = () => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(data))
    alert("Галерея сохранена!")
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-semibold mb-1">Заголовок</label>
        <input
          type="text"
          name="title"
          value={data.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Описание</label>
        <textarea
          name="description"
          value={data.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Добавить изображение</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {data.images.map((img) => (
            <div key={img.id} className="relative">
              <img src={img.image} alt="Preview" className="rounded shadow" />
              <button
                onClick={() => handleDeleteImage(img.id)}
                className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">
        💾 Сохранить
      </button>
    </div>
  )
}
