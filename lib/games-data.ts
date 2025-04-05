// lib/games-data.ts
export interface Game {
  title: string
  description: string
  players: string
  tags: string | string[]
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
    description: "Мистический детектив в Лондоне, древняя игра и исчезнувшие артефакты.",
    players: "6–12 человек",
    tags: "Мистика, Детектив",
    image: "/uploads/ki2.jpg",
    link: "/game/collector",
    duration: "2 часа",
    crop: { x: 0, y: 0 },
    zoom: 1,
  },
  {
    title: "Бермудский Треугольник",
    description: "Фантастическая комедия на таинственном острове.",
    players: "8–15 человек",
    tags: "Комедия, Фантастика",
    image: "/uploads/ki3.jpg",
    link: "/game/bermuda",
    duration: "1.5 часа",
    crop: { x: 0, y: 0 },
    zoom: 1,
  },
  {
    title: "Кланы Нью-Йорка",
    description: "Гангстерская вечеринка с казино и интригами.",
    players: "10–20 человек",
    tags: "Гангстеры, Интриги",
    image: "/uploads/ki4.jpg",
    link: "/game/new-york-clans",
    duration: "2 часа",
    crop: { x: 0, y: 0 },
    zoom: 1,
  },
]

export const defaultSectionData: SectionData = {
  games: initialGames,
  sectionTitle: "Наши квест-спектакли",
  sectionSubtitle: "Погрузитесь в историю, которую будете вспоминать всегда",
}
