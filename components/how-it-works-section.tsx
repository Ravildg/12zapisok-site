import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Sparkles } from "lucide-react"

export default function HowItWorksSection() {
  return (
    <section id="как-это-работает" className="py-20 bg-[#1A1333] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-900/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-pink-900/10 blur-3xl rounded-full"></div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-purple-500 opacity-10"
            style={{
              width: `${Math.random() * 8 + 3}px`,
              height: `${Math.random() * 8 + 3}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-4">
              <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 text-sm font-medium border border-purple-500/30">
                Процесс
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Организуем под ключ —{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                ярко, чётко, без хлопот
              </span>
            </h2>

            <div className="space-y-6 mb-8">
              <div className="flex gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center text-purple-400 font-bold group-hover:scale-110 transition-transform">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                    Выберите сюжет
                  </h3>
                  <p className="text-zinc-300">
                    Определитесь с историей, которая больше всего подходит вашей компании и поводу.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center text-purple-400 font-bold group-hover:scale-110 transition-transform">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                    Мы подготовим всё необходимое
                  </h3>
                  <p className="text-zinc-300">
                    Подберём актёров, адаптируем сценарий под количество участников и проведём игру в нужном формате.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center text-purple-400 font-bold group-hover:scale-110 transition-transform">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                    Погрузитесь в приключение
                  </h3>
                  <p className="text-zinc-300">
                    Для компании друзей, семьи или всего офиса — каждый найдёт свою роль в этой истории.
                  </p>
                </div>
              </div>
            </div>

            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-[0_0_15px_rgba(138,43,226,0.3)] hover:shadow-[0_0_20px_rgba(138,43,226,0.5)] transition-all duration-300 group">
              Оставить заявку
              <Sparkles className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            </Button>
          </div>

          <div className="relative h-[400px] rounded-xl overflow-hidden border border-purple-900/30 shadow-[0_0_30px_rgba(138,43,226,0.2)]">
            <Image
              src="/placeholder.svg?height=800&width=600"
              alt="Как проходит квест-спектакль"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1333]/90 via-[#1A1333]/30 to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

