// components/admin/games-editor.tsx
"use client"

import { useEffect, useState, useCallback } from "react"
import Cropper from "react-easy-crop"
import { Point, Area } from "react-easy-crop/types"
import Image from "next/image"
import { Game, SectionData, defaultSectionData } from "@/lib/games-data"

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

const cropImage = async (
  imageSrc: string,
  crop: { x: number; y: number; width: number; height: number },
  zoom: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = imageSrc

    img.onload = () => {
      console.log("Изображение загружено:", imageSrc)
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        console.error("Не удалось получить контекст canvas")
        reject(new Error("Не удалось получить контекст canvas"))
        return
      }

      const targetWidth = 384
      const targetHeight = 180
      canvas.width = targetWidth
      canvas.height = targetHeight

      const scaledWidth = crop.width / zoom
      const scaledHeight = crop.height / zoom
      const scaledX = crop.x / zoom
      const scaledY = crop.y / zoom

      console.log("Параметры обрезки:", { scaledX, scaledY, scaledWidth, scaledHeight, zoom })

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

      const croppedImage = canvas.toDataURL("image/jpeg", 0.9)
      console.log("Обрезанное изображение создано:", croppedImage)
      resolve(croppedImage)
    }

    img.onerror = () => {
      console.error("Ошибка загрузки изображения:", imageSrc)
      reject(new Error("Не удалось загрузить изображение"))
    }
  })
}

export default function GamesEditor() {
  const [sectionData, setSectionData] = useState<SectionData>(defaultSectionData)

  useEffect(() => {
    const saved = localStorage.getItem("sectionData")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        console.log("Загружены данные из localStorage в GamesEditor:", parsed)
        setSectionData(parsed)
      } catch (error) {
        console.warn("Ошибка загрузки sectionData:", error)
        setSectionData(defaultSectionData)
      }
    } else {
      console.log("Данные из localStorage отсутствуют, используются начальные данные:", defaultSectionData)
      setSectionData(defaultSectionData)
    }
  }, [])

  const handleSectionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "sectionTitle" | "sectionSubtitle"
  ) => {
    const value = e.target.value
    console.log(`Изменение ${field}:`, value)
    setSectionData((prev) => ({ ...prev, [field]: value }))
  }

  const handleGameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    index: number,
    field: keyof Game
  ) => {
    const value = e.target.value
    console.log(`Изменение поля ${field} для игры ${index}:`, value)
    const updatedGames = [...sectionData.games]
    updatedGames[index] = { ...updatedGames[index], [field]: value }
    if (field === "image") {
      console.log("Сброс параметров обрезки для игры", index)
      updatedGames[index].croppedImage = undefined
      updatedGames[index].crop = { x: 0, y: 0 }
      updatedGames[index].zoom = 1
      updatedGames[index].croppedAreaPixels = undefined
    }
    setSectionData((prev) => ({ ...prev, games: updatedGames }))
  }

  const onCropChange = (index: number, crop: Point) => {
    console.log("onCropChange:", { index, crop })
    const updatedGames = [...sectionData.games]
    updatedGames[index] = { ...updatedGames[index], crop }
    setSectionData((prev) => ({ ...prev, games: updatedGames }))
  }

  const onZoomChange = (index: number, zoom: number) => {
    console.log("onZoomChange:", { index, zoom })
    const updatedGames = [...sectionData.games]
    updatedGames[index] = { ...updatedGames[index], zoom }
    setSectionData((prev) => ({ ...prev, games: updatedGames }))
  }

  const onCropComplete = useCallback(
    async (index: number, croppedArea: Area, croppedAreaPixels: Area) => {
      console.log("onCropComplete called:", { index, croppedArea, croppedAreaPixels })
      const updatedGames = [...sectionData.games]
      updatedGames[index] = { ...updatedGames[index], croppedAreaPixels }

      try {
        if (croppedAreaPixels) {
          const croppedImage = await cropImage(
            sectionData.games[index].image,
            croppedAreaPixels,
            sectionData.games[index].zoom || 1
          )
          updatedGames[index].croppedImage = croppedImage
          console.log("Состояние после обрезки:", updatedGames[index])
        }
      } catch (error) {
        console.error("Ошибка обрезки изображения:", error)
      }

      setSectionData((prev) => ({ ...prev, games: updatedGames }))
    },
    [sectionData]
  )

  const handleSave = () => {
    console.log("Сохранение данных:", sectionData)
    try {
      localStorage.setItem("sectionData", JSON.stringify(sectionData))
      localStorage.setItem("savedGames", JSON.stringify(sectionData.games))
      console.log("Данные успешно сохранены в localStorage")
      alert("Данные сохранены!")
      window.dispatchEvent(new Event("gamesDataUpdated"))
      console.log("Событие gamesDataUpdated отправлено")
    } catch (error) {
      console.error("Ошибка сохранения данных в localStorage:", error)
      alert("Ошибка при сохранении данных. Проверьте консоль для подробностей.")
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4 text-white">Редактирование раздела игр</h2>

      {/* Редактирование заголовка и подзаголовка */}
      <div className="p-6 border rounded-lg shadow bg-[#1F1833] space-y-4">
        <h3 className="text-lg font-bold text-white">Заголовок и подзаголовок раздела</h3>
        <div>
          <label className="block mb-1 font-medium text-zinc-300">Заголовок</label>
          <input
            type="text"
            value={sectionData.sectionTitle}
            onChange={(e) => handleSectionChange(e, "sectionTitle")}
            className="w-full p-2 border rounded bg-[#2A2344] text-white border-purple-500/30"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-zinc-300">Подзаголовок</label>
          <textarea
            value={sectionData.sectionSubtitle}
            onChange={(e) => handleSectionChange(e, "sectionSubtitle")}
            className="w-full p-2 border rounded bg-[#2A2344] text-white border-purple-500/30"
            rows={2}
          />
        </div>
      </div>

      {/* Редактирование игр */}
      {sectionData.games.map((game, index) => (
        <div key={index} className="p-6 border rounded-lg shadow bg-[#1F1833] space-y-4">
          <h3 className="text-lg font-bold text-white">Игра {index + 1}</h3>

          <div>
            <label className="block mb-1 font-medium text-zinc-300">Название</label>
            <input
              type="text"
              value={game.title}
              onChange={(e) => handleGameChange(e, index, "title")}
              className="w-full p-2 border rounded bg-[#2A2344] text-white border-purple-500/30"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-zinc-300">Описание</label>
            <textarea
              value={game.description}
              onChange={(e) => handleGameChange(e, index, "description")}
              className="w-full p-2 border rounded bg-[#2A2344] text-white border-purple-500/30"
              rows={3}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-zinc-300">Кол-во игроков</label>
            <input
              type="text"
              value={game.players}
              onChange={(e) => handleGameChange(e, index, "players")}
              className="w-full p-2 border rounded bg-[#2A2344] text-white border-purple-500/30"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-zinc-300">Длительность</label>
            <input
              type="text"
              value={game.duration || ""}
              onChange={(e) => handleGameChange(e, index, "duration")}
              className="w-full p-2 border rounded bg-[#2A2344] text-white border-purple-500/30"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-zinc-300">Теги</label>
            <input
              type="text"
              value={game.tags}
              onChange={(e) => handleGameChange(e, index, "tags")}
              className="w-full p-2 border rounded bg-[#2A2344] text-white border-purple-500/30"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-zinc-300">Ссылка</label>
            <input
              type="text"
              value={game.link}
              onChange={(e) => handleGameChange(e, index, "link")}
              className="w-full p-2 border rounded bg-[#2A2344] text-white border-purple-500/30"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-zinc-300">Изображение</label>
            <select
              value={game.image}
              onChange={(e) => handleGameChange(e, index, "image")}
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
            <div className="relative w-1/3 h-[180px] bg-gray-800">
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
                restrictPosition={false}
                showGrid={true}
                cropSize={{ width: 384, height: 180 }}
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
              <div className="relative w-1/3 h-[180px]">
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
        Сохранить все данные
      </button>
    </div>
  )
}
