"use client"

import { useEffect, useState } from "react"

type Game = {
  title: string
  description: string
  image: string
}

const DEFAULT_GAMES: Game[] = [
  {
    title: "Коллекционер Игр",
    description: "Мистический детектив в Лондоне, древняя игра и исчезнувшие артефакты.",
    image: "/uploads/kn1.jpg",
  },
  {
    title: "Бермудский Треугольник",
    description: "Фантастическая комедия на таинственном острове.",
    image: "/uploads/kn2.jpg",
  },
  {
    title: "Кланы Нью-Йорка",
    description: "Гангстерская вечеринка с казино и интригами.",
    image: "/uploads/kn3.png",
  },
  {
    title: "Петля Времени",
    description: "Путешествие во времени, алхимия и загадочная хижина.",
    image: "/uploads/ki3.jpg",
  },
  {
    title: "Яхта",
    description: "Исторический триллер на послевоенной яхте с шпионажем и драгоценностями.",
    image: "/uploads/ki4.jpg",
  },
]

const uploadedImages = [
  "/uploads/bt1.jpg",
  "/uploads/comanda.jpg",
  "/uploads/ki2.jpg",
  "/uploads/ki3.jpg",
  "/uploads/ki4.jpg",
  "/uploads/ki5.jpg",
  "/uploads/kn1.jpg",
  "/uploads/kn2.jpg",
  "/uploads/kn3.png",
  "/uploads/logo.png",
]

export default function GamesEditor() {
  const [games, setGames] = useState<Game[]>(DEFAULT_GAMES)

  useEffect(() => {
    const saved = localStorage.getItem("gamesData")
    if (saved) setGames(JSON.parse(saved))
  }, [])

  const handleChange = (index: number, field: keyof Game, value: string) => {
    const updated = [...games]
    updated[index][field] = value
    setGames(updated)
  }

  const handleSave = () => {
    localStorage.setItem("gamesData", JSON.stringify(games))
    alert("Игры сохранены!")
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Редактирование раздела «Игры»</h2>

      {games.map((game, index) => (
        <div key={index} className="p-4 border rounded shadow bg-white space-y-2">
          <h3 className="font-bold text-lg">Игра {index + 1}</h3>

          <input
            type="text"
            value={game.title}
            onChange={(e) => handleChange(index, "title", e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Название"
          />

          <textarea
            value={game.description}
            onChange={(e) => handleChange(index, "description", e.target.value)}
            className="w-full p-2 border rounded"
            rows={3}
            placeholder="Описание"
          />

          <div>
            <label className="block mb-1">Изображение</label>
            <select
              value={game.image}
              onChange={(e) => handleChange(index, "image", e.target.value)}
              className="w-full p-2 border rounded"
            >
              {uploadedImages.map((src) => (
                <option key={src} value={src}>
                  {src.replace("/uploads/", "")}
                </option>
              ))}
            </select>
            <img src={game.image} alt="game preview" className="mt-2 max-w-xs rounded border" />
          </div>
        </div>
      ))}

      <button
        onClick={handleSave}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
      >
        Сохранить
      </button>
    </div>
  )
}
