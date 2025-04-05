// lib/games-data.ts
export interface Game {
  title: string
  description: string
  players: string
  tags: string[] // Обновим логику, чтобы tags всегда был массивом
  image: string
  link: string
  duration?: string
  crop?: { x: number; y: number }
  zoom?: number
  croppedAreaPixels?: { x: number; y: number; width: number; height: number }
  croppedImage?: string
}

export interface SectionData {
  games: Game[]
  sectionTitle: string
  sectionSubtitle: string
}

export const initialGames: Game[] = [
  {
    title: "Коллекционер Игр",
    description:
      "Лондон, туман, ритуальные убийства и исчезнувшие артефакты. Вас ждёт расследование мистического дела в плену у древней игры.",
    players: "6-12 человек",
    tags: ["Мистика", "Детектив"], // Преобразуем строку в массив
    image: "/uploads/ki2.jpg",
    link: "/game/collector",
    duration: "2 часа", // Добавляем duration, чтобы соответствовать текущей логике
    crop: { x: 0, y: 0 },
    zoom: 1,
  },
  {
    title: "Берму́дский Треугольник",
    description:
      "Остров, на котором всё не так. Странные события, весёлое безумие и комедия на грани фантастики.",
    players: "8-15 человек",
    tags: ["Комедия", "Фантастика"],
    image: "/uploads/ki2.jpg",
    link: "/game/bermuda",
    duration: "1.5 часа",
    crop: { x: 0, y: 0 },
    zoom: 1,
  },
  {
    title: "Кланы Нью-Йорка",
    description:
      "Сигары, виски и рулетка. Гангстерские интриги в атмосфере подпольного казино тридцатых.",
    players: "10-20 человек",
    tags: ["Гангстеры", "Казино"],
    image: "/uploads/ki3.jpg",
    link: "/game/new-york-clans",
    duration: "2 часа",
    crop: { x: 0, y: 0 },
    zoom: 1,
  },
  {
    title: "Петля Времени",
    description:
      "Механизмы, алхимия и свет во тьме. Вернитесь назад в будущее и раскройте тайну волшебной хижины.",
    players: "6-12 человек",
    tags: ["Стимпанк", "Головоломки"],
    image: "/uploads/ki4.jpg",
    link: "/game/time-loop",
    duration: "2 часа",
    crop: { x: 0, y: 0 },
    zoom: 1,
  },
  {
    title: "Яхта",
    description:
      "Послевоенный рейс — к новой надежде. Яхта, документы, драгоценности — и каждый пассажир не тот, за кого себя выдает.",
    players: "8-16 человек",
    tags: ["Детектив", "Интриги"],
    image: "/uploads/ki5.jpg",
    link: "/game/yacht",
    duration: "2 часа",
    crop: { x: 0, y: 0 },
    zoom: 1,
  },
]

export const defaultSectionData: SectionData = {
  games: initialGames,
  sectionTitle: "Наши квест-спектакли",
  sectionSubtitle: "Вступайте в игру, которая станет легендой вашей команды",
}
