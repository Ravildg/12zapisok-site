"use client"

import { useState, useEffect } from "react"

type GameData = {
  image: string
  players: string
  tags: string
  description: string
  link: string
}

export default function GamesEditor() {
  const [gamesData, setGamesData] = useState<GameData>({
    image: "/uploads/ki2.jpg",
    players: "2–6 игроков",
    tags: "детектив, мистика",
    description: "Мистическая история с загадками и тайнами. Подходит для команды, которая любит разгадывать сюжеты.",
    link: "https://12zapisok.ru/games/detail", // Пример ссылки
  })

  useEffect(() => {
    const saved = localStorage.getItem("gamesData")
    if (saved) {
      setGamesData(JSON.parse(saved))
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setGamesData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imagePath = `/uploads/${file.name}`
      setGamesData((prev) => ({ ...prev, image: imagePath }))
    }
  }

  const handleSave = () => {
    localStorage.setItem("gamesData", JSON.stringify(gamesData))
    alert("Раздел 'Игры' успешно обновлён.")
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Редактор раздела "Игры"</h2>

      <div>
        <label className="block font-medium mb-1">Изображение (путь: /public/uploads/...)</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {gamesData.image && (
          <div className="mt-2">
            <img src={gamesData.image} alt="Превью" className="h-32 rounded shadow" />
            <p className="text-sm text-gray-500">{gamesData.image}</p>
          </div>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Количество игроков</label>
        <input
          type="text"
          name="players"
          value={gamesData.players}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Теги</label>
        <input
          type="text"
          name="tags"
          value={gamesData.tags}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Описание</label>
        <textarea
          name="description"
          value={gamesData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={3}
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Ссылка на подробности</label>
        <input
          type="text"
          name="link"
          value={gamesData.link}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Сохранить
      </button>
    </div>
  )
}
