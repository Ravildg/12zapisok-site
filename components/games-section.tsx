"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Статические данные для секции игр
const sectionData = {
  sectionTitle: "Наши квест-спектакли",
  sectionSubtitle: "Вступайте в игру, которая станет легендой вашей команды",
  games: [
    {
      title: "Коллекционер Игр",
      description: "Лондон, туман, ритуальные убийства и исчезнувшие артефакты. Вас ждёт расследование мистического дела в плену у древней игры.",
      players: "4-12 человек",
      tags: ["Мистика", "Детектив", "Предатель среди нас", "Ролевой квест", "Поиск подсказок", "Магический Египет", "Расследование", "Проклятая настольная игра", "Открытая концовка"],
      image: "/uploads/ki0.jpg",
      link: "https://xn--12-8kc1agm1agt.xn--p1ai/performance",
      duration: "1,5 часа"
    },
    {
      title: "Берму́дский Треугольник",
      description: "Остров, на котором всё не так. Странные события, весёлое безумие и комедия на грани фантастики.",
      players: "8-25 человек",
      tags: ["Комедия", "Фантастика", "Исследование", "Крафтинг", "Состязание команд", "Ролевой квест", "Зоны активностей", "Неожиданные персонажи", "Элементы костюма каждому", "Открытая концовка"],
      image: "/uploads/bt7.jpg",
      link: "https://xn--12-8kc1agm1agt.xn--p1ai/bermudski_treugolnik",
      duration: "2 часа"
    },
    {
      title: "Кланы Нью-Йорка",
      description: "Сигары, покер и рулетка. Гангстерские интриги в атмосфере подпольного казино тридцатых.",
      players: "10-25 человек",
      tags: ["Гангстеры", "Казино", "Интриги", "Охота на сейфы", "Тир", "Аукцион", "Борьба за фишки", "Фотозона с пулеметом томпсона", "Элементы костюма каждому", "Открытая концовка"],
      image: "/uploads/kn6.jpg",
      link: "https://xn--12-8kc1agm1agt.xn--p1ai/klaniny",
      duration: "2 часа"
    },
    {
      title: "Петля Времени",
      description: "Механизмы, алхимия и свет во тьме. Вернитесь назад в будущее и раскройте тайну волшебной хижины.",
      players: "6-12 человек",
      tags: ["Стимпанк", "Головоломки", "Выйти из комнаты", "Мистическое средневековье", "Эффектные декорации", "Механические загадки", "Удивительные тайники", "4 тайные комнаты"],
      image: "/uploads/pv10.jpg",
      link: "https://xn--12-8kc1agm1agt.xn--p1ai/petlya_vremeni",
      duration: "2 часа"
    },
    {
      title: "Яхта",
      description: "Послевоенный рейс — к новой надежде. Яхта, документы, драгоценности — и каждый пассажир не тот, за кого себя выдает.",
      players: "10-15 человек",
      tags: ["Детектив", "Интриги", "Характерный отыгрыш", "1945 год", "Шпионские игры", "Открытая концовка"],
      image: "/uploads/ya0.png",
      link: "https://xn--12-8kc1agm1agt.xn--p1ai/petlya_vremeni",
      duration: "2 часа"
    }
  ]
};

export const dynamic = "force-dynamic";

export default function GamesSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{ x: number; y: number; size: number; speed: number }>>([]);
  const glitchRef = useRef(false); // Используем ref вместо state для glitch

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Glitch effect triggered:", new Date().toISOString());
      glitchRef.current = true;
      setTimeout(() => {
        glitchRef.current = false;
        console.log("Glitch effect ended:", new Date().toISOString());
      }, 1500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particleCount = 12;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 8 + 4,
      speed: Math.random() * 0.5 + 0.2,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        particle.y -= particle.speed;
        if (particle.y < 0) {
          particle.y = canvas.height;
          particle.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(147, 51, 234, 0.5)";
        ctx.fill();
      });

      ctx.strokeStyle = "rgba(147, 51, 234, 0.3)";
      ctx.lineWidth = 1;
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
          if (distance < 200) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <section id="игры" className="py-20 bg-[#0F0A1E] relative overflow-hidden">
      <div
        className={`absolute top-0 right-0 w-1/3 h-1/3 bg-purple-900/30 blur-3xl rounded-full transition-all duration-200 ${
          glitchRef.current ? "animate-glitch-bg" : ""
        }`}
      />
      <div
        className={`absolute bottom-0 left-0 w-1/4 h-1/4 bg-pink-900/20 blur-3xl rounded-full transition-all duration-200 ${
          glitchRef.current ? "animate-glitch-bg" : ""
        }`}
      />

      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {sectionData.sectionTitle.split(" ").map((word, i) =>
              i === 1 ? (
                <span
                  key={i}
                  className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                >
                  {word}{" "}
                </span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h2>
          <p className="text-white text-base md:text-lg">{sectionData.sectionSubtitle}</p>
        </div>

        <div className="space-y-12 max-w-5xl mx-auto">
          {sectionData.games.map((game, index) => (
            <Link
              key={game.title}
              href={game.link}
              className={`flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center bg-[#1F1833] rounded-xl overflow-hidden transition-all group border border-purple-500/20 hover:border-purple-500/60 min-h-[12rem] hover:shadow-[0_0_30px_rgba(147,51,234,0.8)] duration-300 hover:scale-105`}
            >
              <div className="md:w-1/3 w-full h-[180px] relative aspect-[16/9]">
                <Image
                  src={game.image}
                  alt={game.title}
                  fill
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 rounded-t-xl md:rounded-t-none md:rounded-l-xl"
                />
              </div>
              <div className="md:w-2/3 w-full p-6 md:p-8 space-y-3 flex flex-col justify-between">
                <div>
                  <h3
                    className={`text-xl font-bold text-white transition-all duration-200 ${
                      glitchRef.current ? "animate-matrix-glitch" : ""
                    }`}
                  >
                    {game.title}
                  </h3>
                  <p
                    className={`text-zinc-300 text-sm mt-1 transition-all duration-200 ${
                      glitchRef.current ? "animate-matrix-glitch" : ""
                    }`}
                  >
                    {game.description}
                  </p>
                  <div
                    className={`text-xs text-purple-300 mt-1 transition-all duration-200 ${
                      glitchRef.current ? "animate-matrix-glitch" : ""
                    }`}
                  >
                    <span>{game.players}</span> · <span>{game.duration}</span>
                  </div>
                  <div className="flex gap-2 flex-wrap mt-2">
                    {game.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-1 text-xs rounded-full bg-purple-700/20 text-purple-300 border border-purple-500/30 transition-all duration-200 ${
                          glitchRef.current ? "animate-matrix-glitch" : ""
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-3">
                  <Button
                    asChild
                    className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 text-sm py-2 px-4"
                  >
                    <Link href={game.link}>Подробнее</Link>
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
