"use client"

import { useState, useEffect } from "react"

type PricingItem = {
  title: string
  price: string
  description: string
}

export default function PricingEditor() {
  const [pricingItems, setPricingItems] = useState<PricingItem[]>([])

  useEffect(() => {
    const savedData = localStorage.getItem("pricingData")
    if (savedData) {
      setPricingItems(JSON.parse(savedData))
    } else {
      // Данные по умолчанию
      setPricingItems([
        { title: "Базовый", price: "1000 ₽", description: "Для небольшой компании до 6 человек" },
        { title: "Расширенный", price: "1500 ₽", description: "До 10 человек, включено всё" },
        { title: "VIP", price: "2500 ₽", description: "Индивидуальный подход, максимум эмоций" },
      ])
    }
  }, [])

  const handleChange = (index: number, field: keyof PricingItem, value: string) => {
    const updated = [...pricingItems]
    updated[index][field] = value
    setPricingItems(updated)
  }

  const addItem = () => {
    setPricingItems([...pricingItems, { title: "", price: "", description: "" }])
  }

  const removeItem = (index: number) => {
    const updated = [...pricingItems]
    updated.splice(index, 1)
    setPricingItems(updated)
  }

  const handleSave = () => {
    localStorage.setItem("pricingData", JSON.stringify(pricingItems))
    alert("Тарифы сохранены!")
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Редактор тарифов</h2>
      {pricingItems.map((item, index) => (
        <div key={index} className="space-y-2 border p-4 rounded shadow-sm bg-white">
          <input
            type="text"
            placeholder="Название"
            value={item.title}
            onChange={(e) => handleChange(index, "title", e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Цена"
            value={item.price}
            onChange={(e) => handleChange(index, "price", e.target.value)}
            className="w-full border p-2 rounded"
          />
          <textarea
            placeholder="Описание"
            value={item.description}
            onChange={(e) => handleChange(index, "description", e.target.value)}
            className="w-full border p-2 rounded"
          />
          <button
            onClick={() => removeItem(index)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Удалить
          </button>
        </div>
      ))}
      <button onClick={addItem} className="bg-blue-500 text-white px-4 py-2 rounded">
        ➕ Добавить тариф
      </button>
      <button onClick={handleSave} className="bg-green-600 text-white px-6 py-2 rounded ml-2">
        💾 Сохранить
      </button>
    </div>
  )
}
