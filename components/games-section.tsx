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
  },
  {
    title: "Бермудский Треугольник",
    description: "Фантастическая комедия на таинственном острове.",
    players: "8–15 человек",
    tags: ["Комедия", "Фантастика"],
    image: "/uploads/ki3.jpg",
    link: "/game/bermuda",
    duration: "1.5 часа",
  },
  {
    title: "Кланы Нью-Йорка",
    description: "Гангстерская вечеринка с казино и интригами.",
    players: "10–20 человек",
    tags: ["Гангстеры", "Интриги"],
    image: "/uploads/ki4.jpg",
    link: "/game/new-york-clans",
    duration: "2 часа",
  },
]

export default function GamesSection() {
  const [games, setGames] = useState<Game[]>(fallbackGames)

  useEffect(() => {
    const saved = localStorage.getItem("savedGames")
    if (saved) {
      try {
        const parsed: Game[] = JSON.parse(saved)
        const enriched = parsed.map((g) => ({
          ...g,
          tags: Array.isArray(g.tags) ? g.tags : g.tags.split(",").map((t) => t.trim()),
          duration: g.duration || "2 часа",
        }))
        setGames(enriched)
      } catch (e) {
        console.warn("Ошибка загрузки savedGames:", e)
      }
    }
  }, [])

  return (
    <section id="игры" className="py-20 bg-[#0F0A1E] relative overflow-hidden">
      {/* Фоновые градиенты */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-900/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-pink-900/10 blur-3xl rounded-full" />

      {/* Анимации частиц */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
          <p className="text-purple-300 text-sm">Выберите игру по вкусу и настроению</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game, idx) => (
            <div
              key={idx}
              className="bg-[#1F1833] rounded-lg shadow-lg overflow-hidden hover:shadow-purple-700/30 transition-shadow"
            >
              <Image
                src={game.image}
                alt={game.title}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
              />

              <div className="p-6 space-y-3">
                <h3 className="text-xl font-semibold text-white">{game.title}</h3>
                <p className="text-zinc-400 text-sm">{game.description}</p>
                <div className="text-sm text-purple-300">{game.players} · {game.duration}</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {game.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs rounded bg-purple-700/20 text-purple-300 border border-purple-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="pt-4">
                  <Link href={game.link}>
                    <Button variant="secondary" className="w-full bg-purple-600/20 text-purple-300 hover:bg-purple-600/30">
                      Подробнее
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
