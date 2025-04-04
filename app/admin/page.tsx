"use client"

import HeroEditor from "@/components/admin/hero-editor"
import GamesEditor from "@/components/admin/games-editor"
import OccasionsEditor from "@/components/admin/occasions-editor"
import HowItWorksEditor from "@/components/admin/how-it-works-editor"
// импортируй остальные редакторы, если нужно

export default function AdminPage() {
  return (
    <div className="p-6 space-y-12">
      <h1 className="text-2xl font-bold mb-6">Админка сайта «12 записок»</h1>

      {/* Главная секция */}
      <section className="p-4 bg-zinc-900 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-purple-300">Главная секция</h2>
        <HeroEditor />
      </section>

      {/* Раздел Игры */}
      <section className="p-4 bg-zinc-900 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-purple-300">Игры</h2>
        <GamesEditor />
      </section>

      {/* Раздел Поводы */}
      <section className="p-4 bg-zinc-900 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-purple-300">Поводы</h2>
        <OccasionsEditor />
      </section>

      {/* Раздел Как это работает */}
      <section className="p-4 bg-zinc-900 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-purple-300">Как это работает</h2>
        <HowItWorksEditor />
      </section>

      {/* Добавь другие секции, если они есть */}
    </div>
  )
}
