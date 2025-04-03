import React, { useState, useEffect } from "react";

// Структура игры
interface Game {
  title: string;
  description: string;
  players: string;
  tags: string;
  image: string;
  link: string;
}

// Список доступных изображений
const availableImages = [
  "/uploads/bt1.jpg",
  "/uploads/bt2.jpg",
  "/uploads/comanda.jpg",
  "/uploads/ki1.jpg",
  "/uploads/ki2.jpg",
  "/uploads/ki3.jpg",
  "/uploads/ki4.jpg",
  "/uploads/ki5.jpg",
  "/uploads/ki6.jpg",
  "/uploads/ki7.jpg",
  "/uploads/ki8.jpg",
  "/uploads/ki9.jpg",
  "/uploads/ki10.jpg",
  "/uploads/ki11.jpg",
  "/uploads/ki12.jpg",
  "/uploads/kn1.jpg",
  "/uploads/kn2.jpg",
  "/uploads/kn3.png",
  "/uploads/logo.png",
  "/uploads/m1.jpg",
  "/uploads/m2.jpg",
  "/uploads/p1.jpg",
  "/uploads/p2.jpg",
  "/uploads/p3.jpg",
  "/uploads/p4.jpg",
  "/uploads/p5.jpg",
  "/uploads/p6.jpg",
  "/uploads/p7.jpg",
  "/uploads/p8.jpg",
  "/uploads/p9.jpg",
  "/uploads/p10.jpg",
];

// Начальные данные
const initialGamesData: Game[] = [
  {
    title: "Коллекционер Игр",
    description: "Лондон, туман, ритуальные убийства и исчезнувшие артефакты. Вас ждёт расследование мистического дела в плену у древней игры.",
    players: "6-12 человек",
    tags: "Мистика, Детектив",
    image: "/uploads/ki2.jpg",
    link: "/game/collector",
  },
  {
    title: "Берму́дский Треугольник",
    description: "Остров, на котором всё не так. Странные события, весёлое безумие и комедия на грани фантастики.",
    players: "8-15 человек",
    tags: "Комедия, Фантастика",
    image: "/uploads/ki2.jpg",
    link: "/game/bermuda",
  },
  {
    title: "Кланы Нью-Йорка",
    description: "Сигары, виски и рулетка. Гангстерские интриги в атмосфере подпольного казино тридцатых.",
    players: "10-20 человек",
    tags: "Гангстеры, Казино",
    image: "/uploads/ki3.jpg",
    link: "/game/new-york-clans",
  },
  {
    title: "Петля Времени",
    description: "Механизмы, алхимия и свет во тьме. Вернитесь назад в будущее и раскройте тайну волшебной хижины.",
    players: "6-12 человек",
    tags: "Стимпанк, Головоломки",
    image: "/uploads/ki4.jpg",
    link: "/game/time-loop",
  },
  {
    title: "Яхта",
    description: "Послевоенный рейс — к новой надежде. Яхта, документы, драгоценности — и каждый пассажир не тот, за кого себя выдает.",
    players: "8-16 человек",
    tags: "Детектив, Интриги",
    image: "/uploads/ki5.jpg",
    link: "/game/yacht",
  },
];

export default function GamesEditor() {
  const [gamesData, setGamesData] = useState<Game[]>(initialGamesData);

  // Загрузка из localStorage при старте
  useEffect(() => {
    const saved = localStorage.getItem("savedGames");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setGamesData(parsed);
        }
      } catch (e) {
        console.error("Ошибка при чтении savedGames:", e);
      }
    }
  }, []);

  // Автосохранение при изменениях
  useEffect(() => {
    localStorage.setItem("savedGames", JSON.stringify(gamesData));
    window.dispatchEvent(new Event("gamesDataUpdated"));
  }, [gamesData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Game,
    index: number
  ) => {
    const value = e.target.value;
    setGamesData((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const value = e.target.value;
    setGamesData((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], image: value };
      return updated;
    });
  };

  const handleSave = (index: number) => {
    alert(`Игра "${gamesData[index].title}" сохранена!`);
  };

  return (
    <div className="games-editor p-4">
      <h2 className="text-2xl font-bold mb-4">Редактировать игры</h2>

      <div className="grid grid-cols-1 gap-6">
        {gamesData.map((game, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{game.title}</h3>

            <div className="mb-3">
              <label className="block mb-1">Название</label>
              <input
                type="text"
                value={game.title}
                onChange={(e) => handleInputChange(e, "title", index)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Описание</label>
              <textarea
                value={game.description}
                onChange={(e) => handleInputChange(e, "description", index)}
                className="w-full p-2 border rounded"
                rows={3}
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Кол-во игроков</label>
              <input
                type="text"
                value={game.players}
                onChange={(e) => handleInputChange(e, "players", index)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Теги</label>
              <input
                type="text"
                value={game.tags}
                onChange={(e) => handleInputChange(e, "tags", index)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Ссылка</label>
              <input
                type="text"
                value={game.link}
                onChange={(e) => handleInputChange(e, "link", index)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Изображение</label>
              <select
                value={game.image}
                onChange={(e) => handleImageChange(e, index)}
                className="w-full p-2 border rounded mb-2"
              >
                {availableImages.map((img) => (
                  <option key={img} value={img}>
                    {img.replace("/uploads/", "")}
                  </option>
                ))}
              </select>
              <img
                src={game.image}
                alt={game.title}
                className="mt-2 w-32 h-32 object-cover rounded border"
              />
            </div>

            <button
              onClick={() => handleSave(index)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Сохранить игру
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
