import React, { useState, useEffect } from "react";

interface Game {
  title: string;
  description: string;
  players: string;
  tags: string;
  image: string;
  link: string;
}

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

const initialGamesData: Game[] = [
  {
    title: "Коллекционер Игр",
    description: "Лондон, туман, ритуальные убийства и исчезнувшие артефакты. Вас ждёт расследование мистического дела в плену у древней игры.",
    players: "6-12 человек",
    tags: "Мистика, Детектив",
    image: "/uploads/ki1.jpg",
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
  // Добавь другие игры по аналогии
];

export default function GamesEditor() {
  const [gamesData, setGamesData] = useState<Game[]>([]);
  const [newGame, setNewGame] = useState<Game>({
    title: "",
    description: "",
    players: "",
    tags: "",
    image: "",
    link: "",
  });

  useEffect(() => {
    const savedGames = localStorage.getItem("savedGames");
    if (savedGames) {
      setGamesData(JSON.parse(savedGames));
    } else {
      setGamesData(initialGamesData);
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Game
  ) => {
    const { value } = e.target;
    setNewGame((prevGame) => ({
      ...prevGame,
      [field]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedImage = e.target.value;
    setNewGame((prevGame) => ({
      ...prevGame,
      image: selectedImage,
    }));
  };

  const handleSave = () => {
    const updatedGamesData = [...gamesData, newGame];
    setGamesData(updatedGamesData);
    localStorage.setItem("savedGames", JSON.stringify(updatedGamesData));
  };

  const handleGameSave = (gameIndex: number) => {
    const updatedGamesData = [...gamesData];
    updatedGamesData[gameIndex] = newGame;
    setGamesData(updatedGamesData);
    localStorage.setItem("savedGames", JSON.stringify(updatedGamesData));
  };

  const handleRemoveGame = (gameIndex: number) => {
    const updatedGamesData = gamesData.filter((_, index) => index !== gameIndex);
    setGamesData(updatedGamesData);
    localStorage.setItem("savedGames", JSON.stringify(updatedGamesData));
  };

  return (
    <div className="games-editor p-4">
      <h2 className="text-2xl font-bold mb-4">Редактировать игры</h2>
      <div className="games-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {gamesData.map((game, index) => (
          <div key={index} className="game-card bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{game.title}</h3>
            <div>
              <label>Название</label>
              <input
                type="text"
                value={newGame.title || game.title}
                onChange={(e) => handleInputChange(e, "title")}
                className="w-full p-2 border rounded mt-2"
              />
            </div>
            <div>
              <label>Описание</label>
              <textarea
                value={newGame.description || game.description}
                onChange={(e) => handleInputChange(e, "description")}
                className="w-full p-2 border rounded mt-2"
              />
            </div>
            <div>
              <label>Кол-во игроков</label>
              <input
                type="text"
                value={newGame.players || game.players}
                onChange={(e) => handleInputChange(e, "players")}
                className="w-full p-2 border rounded mt-2"
              />
            </div>
            <div>
              <label>Теги</label>
              <input
                type="text"
                value={newGame.tags || game.tags}
                onChange={(e) => handleInputChange(e, "tags")}
                className="w-full p-2 border rounded mt-2"
              />
            </div>
            <div>
              <label>Ссылка на игру</label>
              <input
                type="text"
                value={newGame.link || game.link}
                onChange={(e) => handleInputChange(e, "link")}
                className="w-full p-2 border rounded mt-2"
              />
            </div>
            <div>
              <label>Изображение</label>
              <select
                value={newGame.image || game.image}
                onChange={handleImageChange}
                className="w-full p-2 border rounded mt-2"
              >
                {availableImages.map((image, idx) => (
                  <option key={idx} value={image}>
                    {image.replace("/uploads/", "")}
                  </option>
                ))}
              </select>
              <img
                src={newGame.image || game.image}
                alt="game image"
                className="mt-2 w-32 h-32 object-cover rounded"
              />
            </div>
            <button
              onClick={() => handleGameSave(index)}
              className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
            >
              Сохранить игру
            </button>
            <button
              onClick={() => handleRemoveGame(index)}
              className="bg-red-600 text-white px-4 py-2 rounded mt-2"
            >
              Удалить игру
            </button>
          </div>
        ))}
      </div>

      <div className="new-game-form mt-8">
        <h3 className="text-xl font-semibold mb-4">Добавить новую игру</h3>
        <div>
          <label>Название</label>
          <input
            type="text"
            value={newGame.title}
            onChange={(e) => handleInputChange(e, "title")}
            className="w-full p-2 border rounded mt-2"
          />
        </div>
        <div>
          <label>Описание</label>
          <textarea
            value={newGame.description}
            onChange={(e) => handleInputChange(e, "description")}
            className="w-full p-2 border rounded mt-2"
          />
        </div>
        <div>
          <label>Кол-во игроков</label>
          <input
            type="text"
            value={newGame.players}
            onChange={(e) => handleInputChange(e, "players")}
            className="w-full p-2 border rounded mt-2"
          />
        </div>
        <div>
          <label>Теги</label>
          <input
            type="text"
            value={newGame.tags}
            onChange={(e) => handleInputChange(e, "tags")}
            className="w-full p-2 border rounded mt-2"
          />
        </div>
        <div>
          <label>Ссылка на игру</label>
          <input
            type="text"
            value={newGame.link}
            onChange={(e) => handleInputChange(e, "link")}
            className="w-full p-2 border rounded mt-2"
          />
        </div>
        <div>
          <label>Изображение</label>
          <select
            value={newGame.image}
            onChange={handleImageChange}
            className="w-full p-2 border rounded mt-2"
          >
            {availableImages.map((image, idx) => (
              <option key={idx} value={image}>
                {image.replace("/uploads/", "")}
              </option>
            ))}
          </select>
          <img
            src={newGame.image}
            alt="game image"
            className="mt-2 w-32 h-32 object-cover rounded"
          />
        </div>
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded mt-4"
        >
          Добавить игру
        </button>
      </div>
    </div>
  );
}
