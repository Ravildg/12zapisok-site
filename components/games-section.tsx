"use client"

import { useEffect, useState, useCallback } from "react"
import Cropper from "react-easy-crop"
import { Point, Area } from "react-easy-crop/types"

interface Game {
  title: string
  description: string
  players: string
  tags: string
  image: string
  link: string
  crop?: Point // Координаты обрезки (x, y)
  zoom?: number // Масштаб
  croppedAreaPixels?: Area // Область обрезки в пикселях
}

// Актуальные изображения из папки /public/uploads
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

const initialGamesData: Game[] = [
  {
    title: "Коллекционер Игр",
    description: "Мистический детектив в Лондоне, древняя игра и исчезнувшие артефакты.",
    players: "6-12 человек",
    tags: "Мистика, Детектив",
    image: "/uploads/ki2.jpg",
    link: "/game/collector",
    crop: { x: 0, y: 0 },
    zoom: 1,
  },
  {
    title: "Бермудский Треугольник",
    description: "Фантастическая комедия на таинственном острове.",
    players: "8-15 человек",
    tags: "Комедия, Фантастика",
    image: "/uploads/ki3.jpg",
    link: "/game/bermuda",
    crop: { x: 0, y: 0 },
    zoom: 1,
  },
  {
    title: "Кланы Нью-Йорка",
    description: "Гангстерская вечеринка с казино и интригами.",
    players: "10-20 человек",
    tags: "Гангстеры, Интриги",
    image: "/uploads/ki4.jpg",
    link: "/game/new-york-clans",
    crop: { x: 0, y: 0 },
    zoom: 1,
  },
  {
    title: "Петля Времени",
    description: "Путешествие во времени, алхимия и загадочная хижина.",
    players: "6-12 человек",
    tags: "Стимпанк, Головоломки",
    image: "/uploads/ki5.jpg",
    link: "/game/time-loop",
    crop: { x: 0, y: 0 },
    zoom: 1,
  },
  {
    title: "Яхта",
    description: "Исторический триллер на послевоенной яхте с шпионажем и драгоценностями.",
    players: "8-16 человек",
    tags: "Детектив, Интриги",
    image: "/uploads/ki6.jpg",
    link: "/game/yacht",
    crop: { x: 0, y: 0 },
    zoom: 1,
  },
]

export default function GamesEditor() {
  const [gamesData, setGamesData] = useState<Game[]>(initialGamesData)

  useEffect(() => {
    const saved = localStorage.getItem("savedGames")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setGamesData(parsed)
        }
      } catch (error) {
        console.warn("Ошибка загрузки savedGames:", error)
      }
    }
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    index: number,
    field: keyof Game
  ) => {
    const value = e.target.value
    const updated = [...gamesData]
    updated[index] = { ...updated[index], [field]: value }
    setGamesData(updated)
  }

  const onCropChange = (index: number, crop: Point) => {
    const updated = [...gamesData]
    updated[index] = { ...updated[index], crop }
    setGamesData(updated)
  }

  const onZoomChange = (index: number, zoom: number) => {
    const updated = [...gamesData]
    updated[index] = { ...updated[index], zoom }
    setGamesData(updated)
  }

  const onCropComplete = useCallback(
    (index: number, croppedArea: Area, croppedAreaPixels: Area) => {
      const updated = [...gamesData]
      updated[index] = { ...updated[index], croppedAreaPixels }
      setGamesData(updated)
    },
    [gamesData]
  )

  const handleSave = () => {
    localStorage.setItem("savedGames", JSON.stringify(gamesData))
    alert("Игры сохранены!")
    window.dispatchEvent(new Event("gamesDataUpdated"))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Редактирование игр</h2>

      {gamesData.map((game, index) => (
        <div key={index} className="p-4 border rounded-lg shadow bg-white space-y-4">
          <h3 className="text-lg font-bold">Игра {index + 1}</h3>

          <div>
            <label className="block mb-1 font-medium">Название</label>
            <input
              type="text"
              value={game.title}
              onChange={(e) => handleChange(e, index, "title")}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Описание</label>
            <textarea
              value={game.description}
              onChange={(e) => handleChange(e, index, "description")}
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Кол-во игроков</label>
            <input
              type="text"
              value={game.players}
              onChange={(e) => handleChange(e, index, "players")}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Теги</label>
            <input
              type="text"
              value={game.tags}
              onChange={(e) => handleChange(e, index, "tags")}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Ссылка</label>
            <input
              type="text"
              value={game.link}
              onChange={(e) => handleChange(e, index, "link")}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Изображение</label>
            <select
              value={game.image}
              onChange={(e) => handleChange(e, index, "image")}
              className="w-full p-2 border rounded"
            >
              {availableImages.map((src) => (
                <option key={src} value={src}>
                  {src.replace("/uploads/", "")}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Обрезка изображения</label>
            <div className="relative w-full h-64">
              <Cropper
                image={game.image}
                crop={game.crop || { x: 0, y: 0 }}
                zoom={game.zoom || 1}
                aspect={16 / 9} // Соотношение сторон можно настроить под нужный размер карточки
                onCropChange={(crop) => onCropChange(index, crop)}
                onZoomChange={(zoom) => onZoomChange(index, zoom)}
                onCropComplete={(croppedArea, croppedAreaPixels) =>
                  onCropComplete(index, croppedArea, croppedAreaPixels)
                }
              />
            </div>
            <div className="mt-2">
              <label className="block mb-1 font-medium">Масштаб</label>
              <input
                type="range"
                min="1"
                max="3"
                step="0.1"
                value={game.zoom || 1}
                onChange={(e) => onZoomChange(index, parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="mt-2">
              <label className="block mb-1 font-medium">Превью</label>
              <img
                src={game.image}
                alt="превью"
                className="w-40 h-32 object-cover rounded border"
                style={{
                  objectPosition: game.crop
                    ? `${game.crop.x}px ${game.crop.y}px`
                    : "center",
                }}
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={handleSave}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
      >
        Сохранить все игры
      </button>
    </div>
  )
}
