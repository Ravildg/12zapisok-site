"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface HowItWorksData {
  title: string
  subtitle: string
  steps: string[]
  buttonText: string
  image: string
}

const fallbackData: HowItWorksData = {
  title: "Организуем под ключ — ярко, чётко, без хлопот",
  subtitle: "",
  steps: [
    "Выберите сюжет",
    "Мы подготовим всё необходимое",
    "Погрузитесь в приключение",
  ],
  buttonText: "Оставить заявку",
  image: "/uploads/bt1.jpg",
}

export default function HowItWorksSection() {
  const [data, setData] = useState<HowItWorksData>(fallbackData)

  useEffect(() => {
    const saved = localStorage.getItem("howItWorksData")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed && typeof parsed === "object" && parsed.steps?.length) {
          setData(parsed)
        }
      } catch (e) {
        console.warn("Ошибка загрузки блока 'Как это работает':", e)
      }
    }
  }, [])

  return (
    <section id="как-это-работает" className="py-20 bg-[#1A1333] relative overflow-hidden">
      {/* Фоновые элементы */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-900/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-pink-900/10 blur-3xl rounded-full"></div>

      {/* Анимация частиц */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
          {/* Левая колонка — текст */}
          <div>
            <div className="inline-block mb-4">
              <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 text-sm font-medium border border-purple-500/30">
                Процесс
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {data.title.split("—")[0]} —{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                {data.title.split("—")[1] || ""}
              </span>
            </h2>

            <div className="space-y-6 mb-8">
              {data.steps.map((step, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center text-purple-400 font-bold group-hover:scale-110 transition-transform">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                      {step}
                    </h3>
                    <p className="text-zinc-300">
                      {/* Можно добавить описание по индексу или в будущем поддерживать массив описаний */}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button>{data.buttonText}</Button>
          </div>

          {/* Правая колонка — изображение */}
          <div className="relative rounded-xl overflow-hidden shadow-lg border border-purple-800/20">
            <Image
              src={data.image}
              alt="Как это работает"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
