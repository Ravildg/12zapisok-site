"use client"

import { useState, useEffect } from "react"

type Game = {
  id: number
  title: string
  description: string
  image: string
  players: string
  tags: string
  link: string
}

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
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    const savedGames = localStorage.getItem("gamesData")
    console.log("savedGames:", savedGames)  // Отладка
    if (savedGames) {
      setGames(JSON.parse(savedGames))
    } else {
      console.log("No saved data, using default games.")  // Отладка
      setGames([
        {
          id: 1,
          title: "Коллекционер Игр",
          description: "Мистический детектив в Лондоне, древняя игра и исчезнувшие артефакты.",
          image: "/uploads/kn1.jpg",
          players: "2–6 игроков",
          tags: "детектив, мистика",
          link: "https://12zapisok.ru/games/collector",
        },
        {
          id: 2,
          title: "Бермудский Треугольник",
          description: "Фантастическая комедия на таинственном острове.",
          image: "/uploads/kn2.jpg",
          players: "3–8 игроков",
          tags: "комедия, приключения",
          link: "https://12zapisok.ru/games/bermuda",
        },
        // Add more default games if necessary
      ])
    }
  }, [])

  const handleChange = (
    index: number,
    field: keyof Game,
    value: string | number
  ) => {
    const updatedGames = [...games]
    updatedGames[index][field] = value
    setGames(updatedGames)
    console.log("Updated games:", updatedGames)  // Отладка
  }

  const handleImageSelect = (index: number, value: string) => {
    const updatedGames = [...games]
    updatedGames[index].image = value
    setGames(updatedGames)
    console.log("Image updated:", value)  // Отладка
  }

  const handleSave = () => {
    localStorage.setItem("gamesData", JSON.stringify(games))
    alert("Игры сохранены!")
    console.log("Games saved:", games)  // Отладка
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Редактирование раздела «Игры»</h2>

      {games.map((game, index) => (
        <div key={game.id} className="p-4 border rounded shadow bg-white space-y-2">
          <h3 className="font-bold text-lg">Игра: {game.title}</h3>

          <input
            type="text"
            value={game.title}
            onChange={(e) => handleChange(index, "title", e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Название игры"
          />

          <textarea
            value={game.description}
            onChange={(e) => handleChange(index, "description", e.target.value)}
            className="w-full p-2 border rounded"
            rows={3}
            placeholder="Описание игры"
          />

          <input
            type="text"
            value={game.players}
            onChange={(e) => handleChange(index, "players", e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Количество игроков"
          />

          <input
            type="text"
            value={game.tags}
            onChange={(e) => handleChange(index, "tags", e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Теги"
          />

          <input
            type="text"
            value={game.link}
            onChange={(e) => handleChange(index, "link", e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Ссылка на подробности"
          />

          <div>
            <label className="block mb-1">Изображение</label>
            <select
              value={game.image}
              onChange={(e) => handleImageSelect(index, e.target.value)}
              className="w-full p-2 border rounded"
            >
              {uploadedImages.map((src) => (
                <option key={src} value={src}>
                  {src.replace("/uploads/", "")}
                </option>
              ))}
            </select>
            <img
              src={game.image}
              alt="Game preview"
              className="mt-2 w-48 h-32 object-cover rounded"
            />
          </div>
        </div>
      ))}

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Сохранить
      </button>
    </div>
  )
}
