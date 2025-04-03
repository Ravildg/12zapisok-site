"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Game {
  title: string
  description: string
  players: string
  tags: string | string[]
  image: string
  link: string
  duration?: string
}

// Запасной список на случай пустого localStorage
const fallbackGames: Game[] = [
  {
    title: "Коллекционер Игр",
    description: "Мистический детектив в Лондоне, древняя игра и исчезнувшие артефакты.",
    players: "6-12 человек",
    tags: ["Мистика", "Детектив"],
    image: "/uploads/ki2.jpg",
    link: "/game/collector",
    duration: "2 часа",
  },
  {
    title: "Бермудский Треугольник",
    description: "Фантастическая комедия на таинственном острове.",
    players: "8-15 человек",
    tags: ["Комедия", "Фантастика"],
    image: "/uploads/ki3.jpg",
    link: "/game/bermuda",
    duration: "1.5 часа",
  },
  {
    title: "Кланы Нью-Йорка",
    description: "Гангстерская вечеринка с казино и интригами.",
    players: "10-20 человек",
    tags: ["Гангстеры", "Интриги"],
    image: "/uploads/ki4.jpg",
    link: "/game/new-york-clans",
    duration: "2 часа",
  },
]

export default function GamesSection() {
  const [games, setGames] = useState<Game[]>(fallbackGames)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("savedGames")
      if (saved) {
        try {
          const parsed: Game[] = JSON.parse(saved)
          const enriched = parsed.map((g, i) => ({
            ...g,
            tags: Array.isArray(g.tags) ? g.tags : g.tags.split(",").map((t) => t.trim()),
            duration: g.duration || "2 часа",
          }))
          setGames(enriched)
        } catch (e) {
          console.warn("Ошибка при загрузке savedGames:", e)
        }
      }
    }
  }, [])

  return (
    <section id="игры" className="py-20 bg-[#0F0A1E] relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">
            Наши{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              квест-спектакли
            </span>
          </h2>

          <div className="flex items-center space-x-2 text-purple-300">
            <span className="text-sm">Выбери свою историю</span>
            <div className="w-12 h-px bg-gradient-to-r from-purple-500 to-pink-500" />
          </div>
        </div>

        <div className="space-y-8">
          {games.map((game, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row bg-[#1A1333] rounded-xl overflow-hidden border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(138,43,226,0.2)]"
            >
              <div className="relative md:w-1/3 h-60 md:h-auto">
                <Image
                  src={game.image || "/placeholder.svg"}
                  alt={game.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A1333]/70 to-transparent md:bg-gradient-to-l" />
              </div>

              <div className="p-6 md:w-2/3 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {(game.tags as string[]).map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs rounded-full bg-purple-900/30 text-purple-300 border border-purple-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl font-bold mb-2 text-white">{game.title}</h3>
                  <p className="text-zinc-300 mb-4">{game.description}</p>

                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center text-purple-300">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm">{game.duration}</span>
                    </div>
                    <div className="flex items-center text-purple-300">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="text-sm">{game.players}</span>
                    </div>
                  </div>
                </div>

                {game.link ? (
                  <Link href={game.link}>
                    <Button
                      variant="outline"
                      className="self-start border-purple-500 text-purple-300 hover:bg-purple-500/20 group"
                    >
                      Подробнее
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="outline"
                    disabled
                    className="self-start border-purple-500 text-purple-300 opacity-50"
                  >
                    Ссылка не указана
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
