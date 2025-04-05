// components/games-section.tsx
"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SectionData, defaultSectionData } from "@/lib/games-data"

export const dynamic = "force-dynamic"

export default function GamesSection() {
  const [sectionData, setSectionData] = useState<SectionData>(defaultSectionData)
  const [glitch, setGlitch] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Array<{ x: number; y: number; size: number; speed: number }>>([])

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
        console.log("Загружены данные в GamesSection:", parsed)
        console.log("Количество игр в parsed.games:", parsed.games.length)
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

    const savedGames = localStorage.getItem("savedGames")
    if (savedGames) {
      try {
        const parsed: Game[] = JSON.parse(savedGames)
        const enrichedGames = parsed.map((g) => ({
          ...g,
          tags: Array.isArray(g.tags) ? g.tags : g.tags.split(",").map((t: string) => t.trim()),
          duration: g.duration || "2 часа",
        }))
        console.log("Загружены игры в GamesSection:", enrichedGames)
        console.log("Количество игр в savedGames:", parsed.length)
        setSectionData((prev) => ({
          ...prev,
          games: enrichedGames,
        }))
      } catch (e) {
        console.warn("Ошибка загрузки savedGames:", e)
      }
    }

    // Если ничего не загрузилось, используем defaultSectionData
    console.log("Используются начальные данные:", defaultSectionData)
    console.log("Количество игр в defaultSectionData:", defaultSectionData.games.length)
    setSectionData(defaultSectionData)
  }

  useEffect(() => {
    loadSectionData()

    const handleGamesDataUpdated = () => {
      console.log("Событие gamesDataUpdated получено")
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

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const particleCount = 12
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 8 + 4,
      speed: Math.random() * 0.5 + 0.2,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        particle.y -= particle.speed
        if (particle.y < 0) {
          particle.y = canvas.height
          particle.x = Math.random() * canvas.width
        }

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size / 2, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(147, 51, 234, 0.5)"
        ctx.fill()
      })

      ctx.strokeStyle = "rgba(147, 51, 234, 0.3)"
      ctx.lineWidth = 1
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i]
          const p2 = particlesRef.current[j]
          const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
          if (distance < 200) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  console.log("Окончательное количество игр в sectionData.games:", sectionData.games.length)

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

      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

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
                    {(Array.isArray(game.tags) ? game.tags : []).map((tag) => (
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
