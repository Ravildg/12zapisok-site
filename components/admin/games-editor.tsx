import React, { useState, useEffect } from "react";

interface Game {
  title: string;
  description: string;
  players: string;
  tags: string;
  image: string;
  link: string;
}

const initialGamesData: Game[] = [
  {
    title: "Коллекционер Игр",
    description: "Мистический детектив в Лондоне, древняя игра и исчезнувшие артефакты.",
    players: "2-4",
    tags: "мистика, детектив",
    image: "/uploads/kids.jpg",
    link: "/game/collector",
  },
  {
    title: "Петля времени",
    description: "Путешествие во времени, алхимия и загадочная хижина.",
    players: "2-4",
    tags: "путешествия, фантастика",
    image: "/uploads/bt1.jpg",
    link: "/game/time-loop",
  },
  // Дополните это данные для других игр.
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
    // Получаем данные из localStorage, если они есть
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewGame((prevGame) => ({
          ...prevGame,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
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

  return (
    <div className="games-editor">
      <h2>Редактировать игры</h2>
      {gamesData.map((game, index) => (
        <div key={index} className="game-card">
          <h3>Игра: {game.title}</h3>
          <div>
            <label>Название</label>
            <input
              type="text"
              value={newGame.title || game.title}
              onChange={(e) => handleInputChange(e, "title")}
            />
          </div>
          <div>
            <label>Описание</label>
            <textarea
              value={newGame.description || game.description}
              onChange={(e) => handleInputChange(e, "description")}
            />
          </div>
          <div>
            <label>Кол-во игроков</label>
            <input
              type="text"
              value={newGame.players || game.players}
              onChange={(e) => handleInputChange(e, "players")}
            />
          </div>
          <div>
            <label>Теги</label>
            <input
              type="text"
              value={newGame.tags || game.tags}
              onChange={(e) => handleInputChange(e, "tags")}
            />
          </div>
          <div>
            <label>Ссылка на игру</label>
            <input
              type="text"
              value={newGame.link || game.link}
              onChange={(e) => handleInputChange(e, "link")}
            />
          </div>
          <div>
            <label>Изображение</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <img src={newGame.image || game.image} alt="game image" />
          </div>
          <button onClick={() => handleGameSave(index)}>Сохранить игру</button>
        </div>
      ))}

      <div>
        <h3>Добавить новую игру</h3>
        <div>
          <label>Название</label>
          <input
            type="text"
            value={newGame.title}
            onChange={(e) => handleInputChange(e, "title")}
          />
        </div>
        <div>
          <label>Описание</label>
          <textarea
            value={newGame.description}
            onChange={(e) => handleInputChange(e, "description")}
          />
        </div>
        <div>
          <label>Кол-во игроков</label>
          <input
            type="text"
            value={newGame.players}
            onChange={(e) => handleInputChange(e, "players")}
          />
        </div>
        <div>
          <label>Теги</label>
          <input
            type="text"
            value={newGame.tags}
            onChange={(e) => handleInputChange(e, "tags")}
          />
        </div>
        <div>
          <label>Ссылка на игру</label>
          <input
            type="text"
            value={newGame.link}
            onChange={(e) => handleInputChange(e, "link")}
          />
        </div>
        <div>
          <label>Изображение</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <img src={newGame.image} alt="game image" />
        </div>
        <button onClick={handleSave}>Добавить игру</button>
      </div>
    </div>
  );
}
