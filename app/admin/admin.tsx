"use client"

import { useState } from "react"
import HeroEditor from "../components/admin/hero-editor"
import GalleryEditor from "../components/admin/gallery-editor"
// Импортируй другие редакторы по мере их создания

const sections = [
  { key: "hero", label: "Главная секция" },
  { key: "gallery", label: "Галерея" },
  // Добавь другие секции здесь
]

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState("hero")

  return (
    <div className="min-h-screen bg-gray-100 text-black p-4">
      <h1 className="text-3xl font-bold mb-6">Панель администратора</h1>
      <nav className="flex gap-2 mb-4">
        {sections.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveSection(key)}
            className={`px-4 py-2 rounded ${
              activeSection === key ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>
      <div className="bg-white p-6 rounded-lg shadow">
        {activeSection === "hero" && <HeroEditor />}
        {activeSection === "gallery" && <GalleryEditor />}
        {/* Добавь другие редакторы здесь */}
      </div>
    </div>
  )
}
