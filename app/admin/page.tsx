"use client"

import { useState, useEffect } from "react"
import HeroEditor from "@/components/admin/hero-editor"
import GalleryEditor from "@/components/admin/gallery-editor"
import FAQEditor from "@/components/admin/faq-editor"
import ReviewsEditor from "@/components/admin/reviews-editor"
import PricingEditor from "@/components/admin/pricing-editor"

const sections = [
  { key: "hero", label: "Главная" },
  { key: "gallery", label: "Галерея" },
  { key: "faq", label: "Вопросы" },
  { key: "reviews", label: "Отзывы" },
  { key: "pricing", label: "Тарифы" },
]

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [passwordInput, setPasswordInput] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("admin_pass")
      const realPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD
      if (stored === realPass) setIsAuthorized(true)
    }
  }, [])

  const handleLogin = () => {
    const realPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    if (passwordInput === realPass) {
      localStorage.setItem("admin_pass", passwordInput)
      setIsAuthorized(true)
    } else {
      alert("Неверный пароль")
    }
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold mb-4">Авторизация</h1>
        <input
          type="password"
          placeholder="Введите пароль"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          className="p-2 border rounded w-full max-w-xs mb-4"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Войти
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 text-black p-6">
      <h1 className="text-3xl font-bold mb-6">Панель администратора</h1>

      <div className="flex gap-2 flex-wrap mb-6">
        {sections.map((section) => (
          <button
            key={section.key}
            onClick={() => setActiveSection(section.key)}
            className={`px-4 py-2 rounded ${
              activeSection === section.key
                ? "bg-blue-600 text-white"
                : "bg-gray-300"
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow max-w-3xl">
        {activeSection === "hero" && <HeroEditor />}
        {activeSection === "gallery" && <GalleryEditor />}
        {activeSection === "faq" && <FAQEditor />}
        {activeSection === "reviews" && <ReviewsEditor />}
        {activeSection === "pricing" && <PricingEditor />}
      </div>
    </div>
  )
}
