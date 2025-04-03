import React, { useState, useEffect } from "react";

// Структура для игры
interface Game {
  title: string;
  description: string;
  players: string; // Оставляем как строку, так как формат "6-12 человек"
  tags: string;
  image: string;
  link: string;
}

// Список доступных изображений для выбора
const availableImages = [
  "/uploads/bt1.jpg",
  "/uploads/comanda.jpg",
  "/uploads/ki2.jpg",
  "/uploads/ki3.jpg",
  "/uploads/ki4.jpg",
  "/uploads/ki5.jpg",
  "/uploads/kn1.jpg",
  "/uploads/kn2.jpg",
  "/uploads/kn3.png",
  "/uploads/logo.png",
];

// Начальные данные для игр
const initialGamesData: Game[] = [
  {
    title: "Коллекционер Игр",
    description:
      "Лондон, туман, ритуальные убийства и исчезнувшие артефакты. Вас ждёт расследование мистического дела в плену у древней игры.",
    players: "6-12 человек",
    tags: "Мистика, Детектив",
    image: "/uploads/ki2.jpg", // Заменяем на существующее изображение
    link: "/game/collector",
  },
  {
    title: "Берму́дский Треугольник",
    description:
      "Остров, на котором всё не так. Странные события, весёлое безумие и комедия на грани фантастики.",
    players: "8-15 человек",
    tags: "Комедия, Фантастика",
    image: "/uploads/ki2.jpg",
    link: "/game/bermuda",
  },
  {
    title: "Кланы Нью-Йорка",
    description:
      "Сигары, виски и рулетка. Гангстерские интриги в атмосфере подпольного казино тридцатых.",
    players: "10-20 человек",
    tags: "Гангстеры, Казино",
    image: "/uploads/ki3.jpg",
    link: "/game/new-york-clans",
  },
  {
    title: "Петля Времени",
    description:
      "Механизмы, алхимия и свет во тьме. Вернитесь назад в будущее и раскройте тайну волшебной хижины.",
    players: "6-12 человек",
    tags: "Стимпанк, Головоломки",
    image: "/uploads/ki4.jpg",
    link: "/game/time-loop",
  },
  {
    title: "Яхта",
    description:
      "Послевоенный рейс — к новой надежде. Яхта, документы, драгоценности — и каждый пассажир не тот, за кого себя выдает.",
    players: "8-16 человек",
    tags: "Детектив, Интриги",
    image: "/uploads/ki5.jpg",
    link: "/game/yacht",
  },
];

export default function GamesEditor() {
  const [gamesData, setGamesData] = useState<Game[]>(initialGamesData);

  // Проверяем, что мы находимся в браузере, чтобы избежать ошибок с localStorage при SSR
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedGames = localStorage.getItem("savedGames");
      if (savedGames) {
        setGamesData(JSON.parse(savedGames));
      }
    }
  }, []);

  // Обработчик изменения текстовых полей
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Game,
    index: number
  ) => {
    const { value } = e.target;
    setGamesData((prevGames) => {
      const updatedGames = [...prevGames];
      updatedGames[index] = {
        ...updatedGames[index],
        [field]: value,
      };
      return updatedGames;
    });
  };

  // Обработчик изменения изображения
  const handleImageChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const selectedImage = e.target.value;
    setGamesData((prevGames) => {
      const updatedGames = [...prevGames];
      updatedGames[index] = {
        ...updatedGames[index],
        image: selectedImage,
      };
      return updatedGames;
    });
  };

  // Обработчик сохранения
  const handleSave = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("savedGames", JSON.stringify(gamesData));
      alert("Изменения успешно сохранены!");
    }
  };

  return (
    <div className="games-editor p-4">
      <h2 className="text-2xl font-bold mb-4">Редактировать игры</h2>

      {/* Список игр с формами для редактирования */}
      <div className="games-list grid grid-cols-1 gap-6">
        {gamesData.map((game, index) => (
          <div
            key={index}
            className="game-card bg-white p-4 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-2">{game.title}</h3>

            <div className="mb-4">
              <label className="block mb-1">Название</label>
              <input
                type="text"
                value={game.title}
                onChange={(e) => handleInputChange(e, "title", index)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Описание</label>
              <textarea
                value={game.description}
                onChange={(e) => handleInputChange(e, "description", index)}
                className="w-full p-2 border rounded"
                rows={3}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Кол-во игроков</label>
              <input
                type="text" // Меняем на text, так как это строка
                value={game.players}
                onChange={(e) => handleInputChange(e, "players", index)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Теги</label>
              <input
                type="text"
                value={game.tags}
                onChange={(e) => handleInputChange(e, "tags", index)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Ссылка на игру</label>
              <input
                type="text"
                value={game.link}
                onChange={(e) => handleInputChange(e, "link", index)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Изображение</label>
              <select
                value={game.image}
                onChange={(e) => handleImageChange(e, index)}
                className="w-full p-2 border rounded mb-2"
              >
                {availableImages.map((image, idx) => (
                  <option key={idx} value={image}>
                    {image.replace("/uploads/", "")}
                  </option>
                ))}
              </select>
              <img
                src={game.image}
                alt={game.title}
                className="mt-2 w-32 h-32 object-cover rounded"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Единая кнопка сохранения для всех изменений */}
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-6 py-2 rounded mt-6 hover:bg-blue-700"
      >
        Сохранить все изменения
      </button>
    </div>
  );
}
