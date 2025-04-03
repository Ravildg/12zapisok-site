"use client"

import { useEffect, useState } from "react"

type FooterInfo = {
  address: string
  phone: string
  email: string
  inn: string
  ogrn: string
  bank: string
  rs: string
  bik: string
}

const LOCAL_KEY = "footerInfoData"

export default function FooterInfoEditor() {
  const [info, setInfo] = useState<FooterInfo>({
    address: "",
    phone: "",
    email: "",
    inn: "",
    ogrn: "",
    bank: "",
    rs: "",
    bik: "",
  })

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY)
    if (saved) setInfo(JSON.parse(saved))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(info))
    alert("Контактные данные и реквизиты сохранены!")
  }

  return (
    <div className="space-y-4 max-w-2xl">
      <h2 className="text-2xl font-semibold">Редактор контактов и реквизитов</h2>

      <input
        type="text"
        name="address"
        placeholder="Адрес"
        value={info.address}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="phone"
        placeholder="Телефон"
        value={info.phone}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={info.email}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <hr className="my-4" />

      <input
        type="text"
        name="inn"
        placeholder="ИНН"
        value={info.inn}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="ogrn"
        placeholder="ОГРН"
        value={info.ogrn}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="bank"
        placeholder="Банк"
        value={info.bank}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="rs"
        placeholder="Расчётный счёт"
        value={info.rs}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="bik"
        placeholder="БИК"
        value={info.bik}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <button onClick={handleSave} className="bg-green-600 text-white px-6 py-2 rounded">
        💾 Сохранить
      </button>
    </div>
  )
}
