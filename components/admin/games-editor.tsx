// components/admin/games-editor.tsx
"use client"

import { useEffect, useState, useCallback } from "react"
import Cropper from "react-easy-crop"
import { Point, Area } from "react-easy-crop/types"
import Image from "next/image"

interface Game {
  title: string
  description: string
  players: string
  tags: string
  image: string
  link: string
  duration?: string
  crop?: Point
  zoom?: number
  croppedAreaPixels?: Area
  croppedImage?: string
}

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
    players: "6–12 человек",
    tags: "Мистика, Детектив",
    image: "/uploads/ki2.jpg",
    link: "/game/collector",
    duration: "2 часа",
    crop: { x: 0, y: 0 },
    zoom: 1,
  },
  {
    title: "Бермудский Треугольник",
    description: "Фантастическая комедия на таинственном острове.",
    players: "8–15 человек",
    tags: "Комедия, Фантастика",
    image: "/uploads/ki3.jpg",
    link: "/game/bermuda",
    duration: "1.5 часа",
    crop: { x: 0, y: 0 },
    zoom: 1,
  },
  {
    title: "Кланы Нью-Йорка",
    description: "Гангстерская вечеринка с казино и интригами.",
    players: "10–20 человек",
    tags: "Гангстеры, Интриги",
    image: "/uploads/ki4.jpg",
    link: "/game/new-york-clans",
    duration: "2 часа",
    crop: { x: 0, y: 0 },
    zoom: 1,
  },
]

const cropImage = async (
  imageSrc: string,
  crop: { x: number; y: number; width: number; height: number },
  zoom: number
) => {
  return new Promise<string>((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = imageSrc
    img.onload = () => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        reject(new Error("Не удалось получить контекст canvas"))
        return
      }

      // Устанавливаем размеры canvas с соотношением сторон 16:9
      const targetWidth = 384 // Примерное значение для w-1/3 на экране 1152px
      const targetHeight = 216 // 384 * (9/16) = 216px для соотношения 16:9
      canvas.width = targetWidth
      canvas.height = targetHeight

      // Масштабируем координаты обрезки с учётом zoom
      const scaledWidth = crop.width / zoom
      const scaledHeight = crop.height / zoom
      const scaledX = crop.x / zoom
      const scaledY = crop.y / zoom

      // Рисуем обрезанное изображение на canvas
      ctx.drawImage(
        img,
        scaledX,
        scaledY,
        scaledWidth,
        scaledHeight,
        0,
        0,
        targetWidth,
        targetHeight
      )

      resolve(canvas.toDataURL("image/jpeg", 0.9))
    }
    img.onerror = () => {
      console.error("Ошибка загрузки изображения:", imageSrc)
      reject(new Error("Не удалось загрузить изображение"))
    }
  })
}

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
    // Если изменили изображение, сбрасываем обрезку
    if (field === "image") {
      updated[index].croppedImage = undefined
      updated[index].crop = { x: 0, y: 0 }
      updated[index].zoom = 1
      updated[index].croppedAreaPixels = undefined
    }
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
    async (index: number, croppedArea: Area, croppedAreaPixels: Area) => {
      console.log("onCropComplete called:", { index, croppedArea, croppedAreaPixels }) // Отладка
      const updated = [...gamesData]
      updated[index] = { ...updated[index], croppedAreaPixels }

      try {
        if (croppedAreaPixels) {
          const croppedImage = await cropImage(
            gamesData[index].image,
            croppedAreaPixels,
            gamesData[index].zoom || 1
          )
          updated[index].croppedImage = croppedImage
          console.log("Изображение обрезано:", croppedImage) // Отладка
        }
      } catch (error) {
        console.error("Ошибка обрезки изображения:", error)
      }

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
      <h2 className="text-xl font-semibold mb-4 text-white">Редактирование игр</h2>

      {gamesData.map((game, index) => (
        <div key={index} className="p-6 border rounded-lg shadow bg-[#1F1833] space-y-4">
          <h3 className="text-lg font-bold text-white">Игра {index + 1}</h3>

          <div>
            <label className="block mb-1 font-medium text-zinc-300">Название</label>
            <input
              type="text"
              value={game.title}
              onChange={(e) => handleChange(e, index, "title")}
              className="w-full p-2 border rounded bg-[#2A2344] text-white border-purple-500/30"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-zinc-300">Описание</label>
            <textarea
              value={game.description}
              onChange={(e) => handleChange(e, index, "description")}
              className="w-full p-2 border rounded bg-[#2A2344] text-white border-purple-500/30"
              rows={3}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-zinc-300">Кол-во игроков</label>
            <input
              type="text"
              value={game.players}
              onChange={(e) => handleChange(e, index, "players")}
              className="w-full p-2 border rounded bg-[#2A2344] text-white border-purple-500/30"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-zinc-300">Длительность</label>
            <input
              type="text"
              value={game.duration || ""}
              onChange={(e) => handleChange(e, index, "duration")}
              className="w-full p-2 border rounded bg-[#2A2344] text-white border-purple-500/30"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-zinc-300">Теги</label>
            <input
              type="text"
              value={game.tags}
              onChange={(e) => handleChange(e, index, "tags")}
              className="w-full p-2 border rounded bg-[#2A2344] text-white border-purple-500/30"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-zinc-300">Ссылка</label>
            <input
              type="text"
              value={game.link}
              onChange={(e) => handleChange(e, index, "link")}
              className="w-full p-2 border rounded bg-[#2A2344] text-white border-purple-500/30"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-zinc-300">Изображение</label>
            <select
              value={game.image}
              onChange={(e) => handleChange(e, index, "image")}
              className="w-full p-2 border rounded bg-[#2A2344] text-white border-purple-500/30"
            >
              {availableImages.map((src) => (
                <option key={src} value={src}>
                  {src.replace("/uploads/", "")}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-zinc-300">Обрезка изображения</label>
            <div className="relative w-1/3 h-[216px]">
              <Cropper
                image={game.image}
                crop={game.crop || { x: 0, y: 0 }}
                zoom={game.zoom || 1}
                aspect={16 / 9}
                onCropChange={(crop) => onCropChange(index, crop)}
                onZoomChange={(zoom) => onZoomChange(index, zoom)}
                onCropComplete={(croppedArea, croppedAreaPixels) =>
                  onCropComplete(index, croppedArea, croppedAreaPixels)
                }
              />
            </div>
            <div className="mt-2">
              <label className="block mb-1 font-medium text-zinc-300">Масштаб</label>
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
              <label className="block mb-1 font-medium text-zinc-300">Превью</label>
              <div className="relative w-1/3 h-[216px]">
                {game.croppedImage ? (
                  <img
                    src={game.croppedImage}
                    alt="превью"
                    className="object-cover rounded border border-purple-500/30 w-full h-full"
                  />
                ) : (
                  <Image
                    src={game.image}
                    alt="превью"
                    fill
                    className="object-cover rounded border border-purple-500/30"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={handleSave}
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded hover:from-purple-700 hover:to-pink-700"
      >
        Сохранить все игры
      </button>
    </div>
  )
}
