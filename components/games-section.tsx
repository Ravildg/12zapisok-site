// components/games-section.tsx
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface Game {
  title: string
  description: string
  players: string
  tags: string[]
  image: string
  link: string
  duration?: string
  crop?: { x: number; y: number }
  zoom?: number
  croppedAreaPixels?: { x: number; y: number; width: number; height: number }
  croppedImage?: string
}

interface SectionData {
  games: Game[]
  sectionTitle: string
  sectionSubtitle: string
}

const fallbackGames: Game[] = [
  {
    title: "Коллекционер Игр",
    description: "Мистический детектив в Лондоне, древняя игра и исчезнувшие артефакты.",
    players: "6–12 человек",
    tags: ["Мистика", "Детектив"],
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
    tags: ["Комедия", "Фантастика"],
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
    tags: ["Гангстеры", "Интриги"],
    image: "/uploads/ki4.jpg",
    link: "/game/new-york-clans",
    duration: "2 часа",
    crop: { x: 0, y: 0 },
    zoom: 1,
  },
]

const defaultSectionData: SectionData = {
  games: fallbackGames,
  sectionTitle: "Наши квест-спектакли",
  sectionSubtitle: "Погрузитесь в историю, которую будете вспоминать всегда",
}

export default function GamesSection() {
  const [sectionData, setSectionData] = useState<SectionData>(defaultSectionData)
  const [glitch, setGlitch] = useState(false)

  const loadSectionData = () => {
    const savedSection = localStorage.getItem("sectionData")
    if (savedSection) {
      try {
        const parsed: SectionData = JSON.parse(savedSection)
        const enrichedGames = parsed.games.map((g) => ({
          ...g,
          tags: Array.isArray(g.tags) ? g.tags : g.tags.split(",").map((t: string) => t.trim()),
          duration: g.duration || "2 часа",
        }))
        console.log("Загружены данные в GamesSection:", parsed) // Отладка
        setSectionData({
          games: enrichedGames,
          sectionTitle: parsed.sectionTitle || defaultSectionData.sectionTitle,
          sectionSubtitle: parsed.sectionSubtitle || defaultSectionData.sectionSubtitle,
        })
        return
      } catch (e) {
        console.warn("Ошибка загрузки sectionData:", e)
      }
    }

    // Совместимость с предыдущей версией: загружаем только игры
    const savedGames = localStorage.getItem("savedGames")
    if (savedGames) {
      try {
        const parsed: Game[] = JSON.parse(savedGames)
        const enrichedGames = parsed.map((g) => ({
          ...g,
          tags: Array.isArray(g.tags) ? g.tags : g.tags.split(",").map((t: string) => t.trim()),
          duration: g.duration || "2 часа",
        }))
        console.log("Загружены игры в GamesSection:", enrichedGames) // Отладка
        setSectionData((prev) => ({
          ...prev,
          games: enrichedGames,
        }))
      } catch (e) {
        console.warn("Ошибка загрузки savedGames:", e)
      }
    }
  }

  useEffect(() => {
    // Загружаем данные при монтировании
    loadSectionData()

    // Обработчик события gamesDataUpdated
    const handleGamesDataUpdated = () => {
      console.log("Событие gamesDataUpdated получено") // Отладка
      loadSectionData()
    }

    window.addEventListener("gamesDataUpdated", handleGamesDataUpdated)
    return () => {
      window.removeEventListener("gamesDataUpdated", handleGamesDataUpdated)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Glitch effect triggered:", new Date().toISOString())
      setGlitch(true)
      setTimeout(() => {
        setGlitch(false)
        console.log("Glitch effect ended:", new Date().toISOString())
      }, 1500)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="игры" className="py-20 bg-[#0F0A1E] relative overflow-hidden">
      <div
        className={`absolute top-0 right-0 w-1/3 h-1/3 bg-purple-900/30 blur-3xl rounded-full transition-all duration-200 ${
          glitch ? "animate-glitch-bg" : ""
        }`}
      />
      <div
        className={`absolute bottom-0 left-0 w-1/4 h-1/4 bg-pink-900/20 blur-3xl rounded-full transition-all duration-200 ${
          glitch ? "animate-glitch-bg" : ""
        }`}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-purple-500 particle transition-all duration-200 ${
              glitch ? "animate-glitch-bg" : ""
            }`}
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 12 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {sectionData.sectionTitle.split(" ").map((word, i) =>
              i === 1 ? (
                <span
                  key={i}
                  className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                >
                  {word}{" "}
                </span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h2>
          <p className="text-white text-base md:text-lg">{sectionData.sectionSubtitle}</p>
        </div>

        <div className="space-y-12 max-w-5xl mx-auto">
          {sectionData.games.map((game, index) => (
            <Link
              key={game.title}
              href={game.link}
              className={`flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center bg-[#1F1833] rounded-xl overflow-hidden transition-all group border border-purple-500/20 hover:border-purple-500/60 min-h-[12rem] hover:shadow-[0_0_30px_rgba(147,51,234,0.8)] duration-300 hover:scale-105`}
            >
              <div className="md:w-1/3 w-full h-[180px] relative aspect-[16/9]">
                {game.croppedImage ? (
                  <img
                    src={game.croppedImage}
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 rounded-t-xl md:rounded-t-none md:rounded-l-xl"
                  />
                ) : (
                  <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 rounded-t-xl md:rounded-t-none md:rounded-l-xl"
                  />
                )}
              </div>
              <div className="md:w-2/3 w-full p-6 md:p-8 space-y-3 flex flex-col justify-between">
                <div>
                  <h3
                    className={`text-xl font-bold text-white transition-all duration-200 ${
                      glitch ? "animate-matrix-glitch" : ""
                    }`}
                  >
                    {game.title}
                  </h3>
                  <p
                    className={`text-zinc-300 text-sm mt-1 transition-all duration-200 ${
                      glitch ? "animate-matrix-glitch" : ""
                    }`}
                  >
                    {game.description}
                  </p>
                  <div
                    className={`text-xs text-purple-300 mt-1 transition-all duration-200 ${
                      glitch ? "animate-matrix-glitch" : ""
                    }`}
                  >
                    <span>{game.players}</span> · <span>{game.duration}</span>
                  </div>
                  <div className="flex gap-2 flex-wrap mt-2">
                    {game.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-1 text-xs rounded-full bg-purple-700/20 text-purple-300 border border-purple-500/30 transition-all duration-200 ${
                          glitch ? "animate-matrix-glitch" : ""
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-3">
                  <Button
                    asChild
                    className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 text-sm py-2 px-4"
                  >
                    <Link href={game.link}>Подробнее</Link>
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
