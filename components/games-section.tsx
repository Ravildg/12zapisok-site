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

export default function GamesSection() {
  const [games, setGames] = useState<Game[]>(fallbackGames)
  const [glitch, setGlitch] = useState(false)

  // Эффект ряби текста каждые 5 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 500) // Длительность эффекта ряби
    }, 5000) // Каждые 5 секунд

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem("savedGames")
    if (saved) {
      try {
        const parsed: Game[] = JSON.parse(saved)
        const enriched = parsed.map((g) => ({
          ...g,
          tags: Array.isArray(g.tags) ? g.tags : g.tags.split(",").map((t: string) => t.trim()),
          duration: g.duration || "2 часа",
        }))
        setGames(enriched)
      } catch (e) {
        console.warn("Ошибка загрузки savedGames:", e)
      }
    }

    const handleGamesDataUpdated = () => {
      const updated = localStorage.getItem("savedGames")
      if (updated) {
        try {
          const parsed: Game[] = JSON.parse(updated)
          const enriched = parsed.map((g) => ({
            ...g,
            tags: Array.isArray(g.tags) ? g.tags : g.tags.split(",").map((t: string) => t.trim()),
            duration: g.duration || "2 часа",
          }))
          setGames(enriched)
        } catch (e) {
          console.warn("Ошибка загрузки updatedGames:", e)
        }
      }
    }

    window.addEventListener("gamesDataUpdated", handleGamesDataUpdated)
    return () => {
      window.removeEventListener("gamesDataUpdated", handleGamesDataUpdated)
    }
  }, [])

  return (
    <section id="игры" className="py-20 bg-[#0F0A1E] relative overflow-hidden">
      {/* Фоновые градиенты */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-900/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-pink-900/10 blur-3xl rounded-full" />

      {/* Анимации частиц */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-pink-500 opacity-10"
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
            Наши{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              квест-спектакли
            </span>
          </h2>
          <p className="text-white text-base md:text-lg">
            Погрузитесь в историю, которую будете вспоминать всегда
          </p>
        </div>

        <div className="space-y-12">
          {games.map((game, index) => (
            <Link
              key={game.title}
              href={game.link}
              className={`flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center bg-[#1F1833] rounded-xl overflow-hidden transition-all group border border-purple-500/20 hover:border-purple-500/40 min-h-[16rem] hover:shadow-[0_0_20px_#2A1B3D] duration-300 hover:scale-105`}
            >
              <div className="md:w-1/3 w-full h-64 relative">
                <Image
                  src={game.image}
                  alt={game.title}
                  fill
                  className="w-full h-full transition-transform duration-300 group-hover:scale-110 rounded-t-xl md:rounded-t-none md:rounded-l-xl"
                  style={{
                    objectFit: "cover",
                    objectPosition: game.crop
                      ? `${game.crop.x}px ${game.crop.y}px`
                      : "center",
                    transform: game.zoom ? `scale(${game.zoom})` : "scale(1)",
                  }}
                />
              </div>
              <div className="md:w-2/3 w-full p-8 md:p-12 space-y-4 flex flex-col justify-between">
                <div>
                  <h3
                    className={`text-2xl font-bold text-white transition-all duration-200 ${
                      glitch ? "animate-glitch" : ""
                    }`}
                  >
                    {game.title}
                  </h3>
                  <p
                    className={`text-zinc-300 mt-2 transition-all duration-200 ${
                      glitch ? "animate-glitch" : ""
                    }`}
                  >
                    {game.description}
                  </p>
                  <div
                    className={`text-sm text-purple-300 mt-2 transition-all duration-200 ${
                      glitch ? "animate-glitch" : ""
                    }`}
                  >
                    <span>{game.players}</span> · <span>{game.duration}</span>
                  </div>
                  <div className="flex gap-2 flex-wrap mt-3">
                    {game.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-1 text-xs rounded-full bg-purple-700/20 text-purple-300 border border-purple-500/30 transition-all duration-200 ${
                          glitch ? "animate-glitch" : ""
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-4">
                  <Button
                    asChild
                    className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                  >
                    <Link href={game.link}>Подробнее</Link>
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CSS для эффекта ряби с белым шумом и искажением */}
      <style jsx>{`
        @keyframes glitch {
          0% {
            transform: translate(0);
            text-shadow: 0.05em 0 0 rgba(255, 255, 255, 0.3), -0.05em 0 0 rgba(255, 255, 255, 0.3);
            opacity: 1;
          }
          20% {
            transform: translate(-2px, 0);
            text-shadow: 0.05em 0 0 rgba(255, 255, 255, 0.5), -0.05em 0 0 rgba(255, 255, 255, 0.5);
            opacity: 0.8;
          }
          40% {
            transform: translate(2px, 0);
            text-shadow: -0.05em 0 0 rgba(255, 255, 255, 0.3), 0.05em 0 0 rgba(255, 255, 255, 0.3);
            opacity: 0.9;
          }
          60% {
            transform: translate(-1px, 0);
            text-shadow: 0.05em 0 0 rgba(255, 255, 255, 0.5), -0.05em 0 0 rgba(255, 255, 255, 0.5);
            opacity: 0.7;
          }
          80% {
            transform: translate(1px, 0);
            text-shadow: -0.05em 0 0 rgba(255, 255, 255, 0.3), 0.05em 0 0 rgba(255, 255, 255, 0.3);
            opacity: 0.9;
          }
          100% {
            transform: translate(0);
            text-shadow: 0.05em 0 0 rgba(255, 255, 255, 0.3), -0.05em 0 0 rgba(255, 255, 255, 0.3);
            opacity: 1;
          }
        }

        .animate-glitch {
          animation: glitch 0.5s linear infinite;
        }
      `}</style>
    </section>
  )
}
