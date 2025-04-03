"use client"

import { useState, useEffect } from "react"
import HeroEditor from "@/components/admin/hero-editor"
import GalleryEditor from "@/components/admin/gallery-editor"
import FaqEditor from "@/components/admin/faq-editor"
import GamesEditor from "@/components/admin/games-editor"
import PricingEditor from "@/components/admin/pricing-editor"
import ReviewsEditor from "@/components/admin/reviews-editor"
import HowItWorksEditor from "@/components/admin/how-it-works-editor"
import OccasionsEditor from "@/components/admin/occasions-editor"

const SECTIONS = [
  { key: "hero", label: "Главная секция", Component: HeroEditor },
  { key: "gallery", label: "Галерея", Component: GalleryEditor },
  { key: "faq", label: "Вопросы и ответы", Component: FaqEditor },
  { key: "games", label: "Игры", Component: GamesEditor },
  { key: "pricing", label: "Тарифы", Component: PricingEditor },
  { key: "reviews", label: "Отзывы", Component: ReviewsEditor },
  { key: "how", label: "Как это работает", Component: HowItWorksEditor },
  { key: "occasions", label: "Поводы", Component: OccasionsEditor },
]

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState("hero")
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    const pass = prompt("Введите пароль администратора")
    if (pass === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAuthorized(true)
    } else {
      alert("Неверный пароль")
    }
  }, [])

  if (!authorized) return null

  const { Component } = SECTIONS.find((s) => s.key === activeSection) || {}

  return (
    <div className="min-h-screen bg-gray-100 text-black p-4">
      <h1 className="text-3xl font-bold mb-6">Панель администратора</h1>
      <nav className="flex gap-2 mb-4 flex-wrap">
        {SECTIONS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveSection(key)}
            className={`px-4 py-2 rounded text-sm font-semibold ${
              activeSection === key
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="bg-white p-6 rounded-lg shadow">
        {Component ? <Component /> : <p>Секция не найдена</p>}
      </div>
    </div>
  )
}
