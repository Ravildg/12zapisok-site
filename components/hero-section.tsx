"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronRight, Sparkles } from "lucide-react"

type HeroData = {
  title: string
  subtitle: string
  description: string
  image: string
}

const fallbackData: HeroData = {
  title: 'Квест-кафе "12 записок"',
  subtitle: "Погрузи команду в игру",
  description:
    "Квест-спектакли с живыми актёрами для взрослых. Каждый сюжет — как фильм, в котором вы главные герои. Проведите встречу, которую будут вспоминать.",
  image: "/placeholder.svg",
}

export default function HeroSection() {
  const [heroData, setHeroData] = useState<HeroData>(fallbackData)

  useEffect(() => {
    try {
      const saved = localStorage.getItem("heroData")
      if (saved) {
        const parsed = JSON.parse(saved)
        // подстраховка на случай битых данных
        setHeroData({
          title: parsed.title || fallbackData.title,
          subtitle: parsed.subtitle || fallbackData.subtitle,
          description: parsed.description || fallbackData.description,
          image: parsed.image || fallbackData.image,
        })
      }
    } catch (err) {
      console.error("Ошибка загрузки heroData:", err)
      setHeroData(fallbackData)
    }
  }, [])

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${heroData.image}')`,
          filter: "brightness(0.4)",
        }}
      />

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-purple-500 opacity-20"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0A1E]/70 via-[#0F0A1E]/40 to-[#0F0A1E]" />

      <div className="container relative mx-auto px-4 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block mb-4">
            <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 text-sm font-medium border border-purple-500/30 animate-pulse">
              Новая реальность ждёт тебя
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {heroData.title.includes("12 записок") ? (
              <>
                Квест-кафе{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                  "12 записок"
                </span>
              </>
            ) : (
              heroData.title
            )}
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-purple-300">
            {heroData.subtitle}
          </h2>

          <p className="text-lg md:text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
            {heroData.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#games">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-6 h-auto shadow-[0_0_15px_rgba(138,43,226,0.5)] hover:shadow-[0_0_20px_rgba(138,43,226,0.7)] transition-all duration-300 group">
                Выбрать игру
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="#how-it-works">
              <Button
                variant="outline"
                className="border-purple-500 text-purple-300 hover:bg-purple-500/20 text-lg px-8 py-6 h-auto group"
              >
                Как это работает
                <Sparkles className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0F0A1E] to-transparent" />
    </section>
  )
}
