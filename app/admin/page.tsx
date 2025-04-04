"use client"

import HeroEditor from "@/components/admin/hero-editor"
import GamesEditor from "@/components/admin/games-editor"
import OccasionsEditor from "@/components/admin/occasions-editor"
import HowItWorksEditor from "@/components/admin/how-it-works-editor"
import FAQEditor from "@/components/admin/faq-editor"
import GalleryEditor from "@/components/admin/gallery-editor"
import ReviewsEditor from "@/components/admin/reviews-editor"
import PricingEditor from "@/components/admin/pricing-editor"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#0F0A1E] text-white px-6 py-8 space-y-12">
      <h1 className="text-3xl font-bold text-center mb-8">Панель администратора</h1>

      <section id="hero" className="border border-pink-400 rounded-xl p-4">
        <h2 className="text-2xl font-semibold mb-4">Главная секция (Hero)</h2>
        <HeroEditor />
      </section>

      <section id="games" className="border border-pink-400 rounded-xl p-4">
        <h2 className="text-2xl font-semibold mb-4">Игры</h2>
        <GamesEditor />
      </section>

      <section id="occasions" className="border border-pink-400 rounded-xl p-4">
        <h2 className="text-2xl font-semibold mb-4">Поводы</h2>
        <OccasionsEditor />
      </section>

      <section id="how-it-works" className="border border-pink-400 rounded-xl p-4">
        <h2 className="text-2xl font-semibold mb-4">Как это работает</h2>
        <HowItWorksEditor />
      </section>

      <section id="faq" className="border border-pink-400 rounded-xl p-4">
        <h2 className="text-2xl font-semibold mb-4">Вопросы и ответы</h2>
        <FAQEditor />
      </section>

      <section id="gallery" className="border border-pink-400 rounded-xl p-4">
        <h2 className="text-2xl font-semibold mb-4">Галерея</h2>
        <GalleryEditor />
      </section>

      <section id="reviews" className="border border-pink-400 rounded-xl p-4">
        <h2 className="text-2xl font-semibold mb-4">Отзывы</h2>
        <ReviewsEditor />
      </section>

      <section id="pricing" className="border border-pink-400 rounded-xl p-4">
        <h2 className="text-2xl font-semibold mb-4">Тарифы</h2>
        <PricingEditor />
      </section>
    </div>
  )
}
