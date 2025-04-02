import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ArrowRight, Clock, Users } from "lucide-react"

const games = [
  {
    id: 1,
    title: "Коллекционер Игр",
    description:
      "Лондон, туман, ритуальные убийства и исчезнувшие артефакты. Вас ждёт расследование мистического дела в плену у древней игры.",
    image: "/placeholder.svg?height=400&width=600",
    duration: "2 часа",
    players: "6-12 человек",
    tags: ["Мистика", "Детектив"],
  },
  {
    id: 2,
    title: "Бермудский Треугольник",
    description: "Остров, на котором всё не так. Странные события, весёлое безумие и комедия на грани фантастики.",
    image: "/placeholder.svg?height=400&width=600",
    duration: "1.5 часа",
    players: "8-15 человек",
    tags: ["Комедия", "Фантастика"],
  },
  {
    id: 3,
    title: "Кланы Нью-Йорка",
    description: "Сигары, виски и рулетка. Гангстерские интриги в атмосфере подпольного казино тридцатых.",
    image: "/placeholder.svg?height=400&width=600",
    duration: "2 часа",
    players: "10-20 человек",
    tags: ["Гангстеры", "Интриги"],
  },
  {
    id: 4,
    title: "Петля Времени",
    description: "Механизмы, алхимия и свет во тьме. Вернитесь назад в будущее и раскройте тайну волшебной хижины.",
    image: "/placeholder.svg?height=400&width=600",
    duration: "2 часа",
    players: "6-12 человек",
    tags: ["Стимпанк", "Головоломки"],
  },
  {
    id: 5,
    title: "Яхта",
    description:
      "Послевоенный рейс — к новой надежде. Яхта, документы, драгоценности — и каждый пассажир не тот, за кого себя выдаёт.",
    image: "/placeholder.svg?height=400&width=600",
    duration: "2.5 часа",
    players: "8-16 человек",
    tags: ["Детектив", "Интриги"],
  },
]

export default function GamesSection() {
  return (
    <section id="игры" className="py-20 bg-[#0F0A1E] relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>

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
            <div className="w-12 h-px bg-gradient-to-r from-purple-500 to-pink-500"></div>
          </div>
        </div>

        <div className="space-y-8">
          {games.map((game) => (
            <div
              key={game.id}
              className="flex flex-col md:flex-row bg-[#1A1333] rounded-xl overflow-hidden border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(138,43,226,0.2)]"
            >
              <div className="relative md:w-1/3 h-60 md:h-auto">
                <Image src={game.image || "/placeholder.svg"} alt={game.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A1333]/70 to-transparent md:bg-gradient-to-l"></div>
              </div>

              <div className="p-6 md:w-2/3 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {game.tags.map((tag, index) => (
                      <span
                        key={index}
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

                <Button
                  variant="outline"
                  className="self-start border-purple-500 text-purple-300 hover:bg-purple-500/20 group"
                >
                  Подробнее
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

