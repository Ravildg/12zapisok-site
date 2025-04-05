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
      {/* Градиенты и частицы */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-900/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-pink-900/10 blur-3xl rounded-full" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-purple-500 opacity-10"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 8}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          Наши{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            квест-спектакли
          </span>
        </h2>

        <div className="space-y-16">
          {games.map((game, i) => (
            <div
              key={i}
              className={`
                flex flex-col md:flex-row items-center md:items-start gap-8 p-6 rounded-xl 
                transition-all duration-300 hover:shadow-[0_0_20px_2px_rgba(200,100,255,0.3)]
                border border-transparent hover:border-purple-500/30 
                group
                ${i % 2 === 1 ? "md:flex-row-reverse" : ""}
              `}
            >
              <div className="w-full md:w-1/2 overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={game.image}
                  alt={game.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="w-full md:w-1/2 space-y-4 text-zinc-300">
                <h3 className="text-2xl font-bold group-hover:text-purple-400 transition-colors">
                  {game.title}
                </h3>
                <p>{game.description}</p>
                <p className="text-sm text-purple-300">
                  👥 {game.players} • ⏳ {game.duration}
                </p>
                <div className="flex flex-wrap gap-2 text-sm">
                  {game.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded bg-purple-600/20 text-purple-300 border border-purple-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={game.link}>
                  <Button className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 transition-colors">
                    Подробнее
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
