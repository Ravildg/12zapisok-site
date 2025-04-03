"use client"

import { useEffect, useState } from "react"

interface Occasion {
  title: string
  description: string
  image: string
}

export default function OccasionsSection() {
  const [occasions, setOccasions] = useState<Occasion[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("occasionsData")
    if (saved) {
      try {
        setOccasions(JSON.parse(saved))
      } catch (e) {
        console.warn("Ошибка чтения occasionsData:", e)
      }
    }
  }, [])

  return (
    <section id="occasions" className="py-20 bg-[#0F0A1E] relative">
      <div className="container mx-auto px-4 text-center mb-12">
        <span className="inline-block px-4 py-1 text-sm rounded-full bg-purple-800/40 text-purple-300 mb-2">
          Особые моменты
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Когда хочется <span className="text-pink-400">большего</span>, чем просто встреча
        </h2>
        <p className="text-zinc-300 max-w-2xl mx-auto">
          Погрузитесь в историю, которую будете вспоминать всей командой. Квест-спектакль легко впишется в любой повод и сделает его особенным.
        </p>
      </div>

      <div className="container mx-auto px-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {occasions.map((item, index) => (
          <div
            key={index}
            className="bg-[#1A1333] rounded-xl p-6 text-left text-white border border-purple-700/30 hover:border-purple-500 transition"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover rounded mb-4 border border-purple-900/30"
            />
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-zinc-300">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
