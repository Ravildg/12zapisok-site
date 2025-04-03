"use client"

import { useEffect, useState } from "react"

type Review = {
  id: string
  name: string
  text: string
  rating: number
}

const LOCAL_KEY = "reviewsData"

export default function ReviewsEditor() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [newReview, setNewReview] = useState<Review>({
    id: "",
    name: "",
    text: "",
    rating: 5,
  })

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY)
    if (saved) setReviews(JSON.parse(saved))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewReview((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }))
  }

  const addReview = () => {
    if (!newReview.name || !newReview.text) {
      alert("Заполни имя и отзыв")
      return
    }
    const review: Review = {
      ...newReview,
      id: Date.now().toString(),
    }
    setReviews((prev) => [...prev, review])
    setNewReview({ id: "", name: "", text: "", rating: 5 })
  }

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id))
  }

  const handleSave = () => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(reviews))
    alert("Отзывы сохранены!")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-2">Добавить отзыв</h2>
        <input
          type="text"
          name="name"
          value={newReview.name}
          onChange={handleChange}
          placeholder="Имя"
          className="w-full p-2 mb-2 border rounded"
        />
        <textarea
          name="text"
          value={newReview.text}
          onChange={handleChange}
          placeholder="Текст отзыва"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="number"
          name="rating"
          value={newReview.rating}
          onChange={handleChange}
          min={1}
          max={5}
          className="w-full p-2 mb-2 border rounded"
        />
        <button onClick={addReview} className="bg-green-600 text-white px-4 py-2 rounded">
          ➕ Добавить отзыв
        </button>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Список отзывов</h2>
        <ul className="space-y-3">
          {reviews.map((r) => (
            <li key={r.id} className="p-4 border rounded bg-gray-50 relative">
              <strong>{r.name}</strong> — {r.rating}★<br />
              <p className="mt-1">{r.text}</p>
              <button
                onClick={() => deleteReview(r.id)}
                className="absolute top-2 right-2 text-red-500 text-sm"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">
        💾 Сохранить все отзывы
      </button>
    </div>
  )
}
