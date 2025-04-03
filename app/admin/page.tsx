"use client"

import { useState } from "react"
import HeroEditor from "@/components/admin/hero-editor"
import GalleryEditor from "@/components/admin/gallery-editor"
import FaqEditor from "@/components/admin/faq-editor"
import ReviewsEditor from "@/components/admin/reviews-editor"
import PricingEditor from "@/components/admin/pricing-editor"
import GamesEditor from "@/components/admin/games-editor"
import OccasionsEditor from "@/components/admin/occasions-editor"
import HowItWorksEditor from "@/components/admin/how-it-works-editor"
import FooterInfoEditor from "@/components/admin/footer-info-editor"

const ADMIN_PASSWORD = "1234" // 🛡️ Замени на свой безопасный пароль

const sections = [
  { key: "hero", label: "Главная секция", Component: HeroEditor },
  { key: "gallery", label: "Галерея", Component: GalleryEditor },
  { key: "faq", label: "Вопросы", Component: FaqEditor },
  { key: "reviews", label: "Отзывы", Component: ReviewsEditor },
  { key: "pricing", label: "Тарифы", Component: PricingEditor },
  { key: "games", label: "Игры", Component: GamesEditor },
  { key: "occasions", label: "Поводы", Component: OccasionsEditor },
  { key: "how", label: "Как это работает", Component: HowItWorksEditor },
  { key: "footer", label: "Контакты и реквизиты", Component: FooterInfoEditor },
]

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
    } else {
      alert("Неверный пароль")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white p-6 rounded shadow max-w-sm w-full space-y-4">
          <h2 className="text-xl font-bold">🔐 Вход в админку</h2>
          <input
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded"
          >
            Войти
          </button>
        </div>
      </div>
    )
  }

  const ActiveComponent = sections.find((s) => s.key === activeSection)?.Component

  return (
    <div className="min-h-screen bg-gray-100 text-black p-6">
      <h1 className="text-3xl font-bold mb-6">Панель администратора</h1>
      <nav className="flex gap-2 flex-wrap mb-4">
        {sections.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveSection(key)}
            className={`px-4 py-2 rounded ${
              activeSection === key ? "bg-blue-600 text-white" : "bg-gray-300"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>
      <div className="bg-white p-6 rounded-lg shadow">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  )
}
