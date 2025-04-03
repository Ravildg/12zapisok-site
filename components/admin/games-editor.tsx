"use client"

import { useState, useEffect } from "react"

type Game = {
  title: string
  description: string
  image: string
}

export default function GamesEditor() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("gamesData")
    if (saved) {
      setGames(JSON.parse(saved))
    } else {
      // Данные по умолчанию
      setGames([
        {
          title: "Коллекционер Игр",
          description: "Мистический детектив в Лондоне. Древняя игра и исчезнувшие артефакты.",
          image: "/games/collector.jpg",
        },
        {
          title: "Кланы Нью-Йорка",
          description: "Гангстерская вечеринка с казино и интригами.",
          image: "/games/clans.jpg",
        },
      ])
    }
  }, [])

  const handleChange = (index: number, field: keyof Game, value: string) => {
    const updated = [...games]
    updated[index][field] = value
    setGames(updated)
  }

  const handleImageUpload = (index: number, file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const updated = [...games]
      updated[index].image = reader.result as string
      setGames(updated)
    }
    reader.readAsDataURL(file)
  }

  const addGame = () => {
    setGames([...games, { title: "", description: "", image: "" }])
  }

  const removeGame = (index: number) => {
    const updated = [...games]
    updated.splice(index, 1)
    setGames(updated)
  }

  const handleSave = () => {
    localStorage.setItem("gamesData", JSON.stringify(games))
    alert("Игры сохранены!")
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Редактор игр</h2>
      {games.map((game, index) => (
        <div key={index} className="border p-4 rounded bg-white shadow-sm space-y-2">
          <input
            type="text"
            placeholder="Название"
            value={game.title}
            onChange={(e) => handleChange(index, "title", e.target.value)}
            className="w-full border p-2 rounded"
          />
          <textarea
            placeholder="Описание"
            value={game.description}
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
          {game.image && (
            <img src={game.image} alt="Preview" className="w-48 h-auto mt-2 rounded shadow" />
          )}
          <button
            onClick={() => removeGame(index)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Удалить
          </button>
        </div>
      ))}
      <button onClick={addGame} className="bg-blue-500 text-white px-4 py-2 rounded">
        ➕ Добавить игру
      </button>
      <button onClick={handleSave} className="bg-green-600 text-white px-6 py-2 rounded ml-2">
        💾 Сохранить
      </button>
    </div>
  )
}
