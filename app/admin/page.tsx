// app/admin/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import HeroEditor from "@/components/admin/hero-editor"
import GamesEditor from "@/components/admin/games-editor"
import OccasionsEditor from "@/components/admin/occasions-editor"
import HowItWorksEditor from "@/components/admin/how-it-works-editor"

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  // Проверка авторизации при загрузке
  useEffect(() => {
    const authStatus = localStorage.getItem("isAdmin") === "true"
    setIsAuthenticated(authStatus)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "admin123") {
      localStorage.setItem("isAdmin", "true")
      setIsAuthenticated(true)
    } else {
      alert("Неверный пароль")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("isAdmin")
    setIsAuthenticated(false)
    setPassword("")
  }

  // Если пользователь не авторизован, показываем форму логина
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto p-6 mt-20 bg-[#0F0A1E] min-h-screen flex items-center justify-center">
        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-6 text-white">Вход в админ-панель</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-zinc-300">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded bg-[#2A2344] text-white border-purple-500/30"
                placeholder="Введите пароль"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded hover:from-purple-700 hover:to-pink-700"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Если пользователь авторизован, показываем админ-панель
  return (
    <div className="min-h-screen bg-[#0F0A1E] p-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Админка сайта «12 записок»</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Выйти
          </button>
        </div>

        {/* Главная секция */}
        <section className="p-4 bg-[#1F1833] rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-purple-300">Главная секция</h2>
          <HeroEditor />
        </section>

        {/* Раздел Игры */}
        <section className="p-4 bg-[#1F1833] rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-purple-300">Игры</h2>
          <GamesEditor />
        </section>

        {/* Раздел Поводы */}
        <section className="p-4 bg-[#1F1833] rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-purple-300">Поводы</h2>
          <OccasionsEditor />
        </section>

        {/* Раздел Как это работает */}
        <section className="p-4 bg-[#1F1833] rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-purple-300">Как это работает</h2>
          <HowItWorksEditor />
        </section>
      </div>
    </div>
  )
}
