"use client"

import HeroEditor from "@/components/admin/hero-editor"
import GamesEditor from "@/components/admin/games-editor"
import OccasionsEditor from "@/components/admin/occasions-editor"


export default function AdminPage() {
  return (
    <main className="p-8 space-y-16 max-w-4xl mx-auto">
      <section>
        <h1 className="text-3xl font-bold mb-4">Админка сайта «12 записок»</h1>
        <p className="text-gray-500">Редактируй содержимое сайта прямо здесь. Все данные сохраняются в localStorage.</p>
      </section>

      <section id="hero">
        <HeroEditor />
      </section>

      <section id="games">
        <GamesEditor />
      </section>

      <section id="occasions">
        <OccasionsEditor />
      </section>
    </main>
  )
}
