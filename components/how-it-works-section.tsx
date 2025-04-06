"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Типизация для данных секции
interface HowItWorksData {
  title: string;
  subtitle: string;
  steps: string[];
  buttonText: string;
  image: string;
}

// Статические данные по умолчанию
const fallbackData: HowItWorksData = {
  title: "Организуем под ключ — ярко, чётко, без хлопот",
  subtitle: "",
  steps: [
    "Выберите сюжет",
    "Мы подготовим всё необходимое",
    "Погрузитесь в приключение",
  ],
  buttonText: "Оставить заявку",
  image: "/uploads/logo.png",
};

export default function HowItWorksSection() {
  const [data, setData] = useState<HowItWorksData>(fallbackData);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{ x: number; y: number; size: number; speed: number }>>([]);
  const glitchRef = useRef(false);

  // Загрузка данных из localStorage
  useEffect(() => {
    const saved = localStorage.getItem("howItWorksData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object" && parsed.steps?.length) {
          setData(parsed);
        }
      } catch (e) {
        console.warn("Ошибка загрузки блока 'Как это работает':", e);
      }
    }
  }, []);

  // Эффект glitch
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

  // Анимация частиц на канвасе
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
    <section id="как-это-работает" className="py-20 bg-[#0F0A1E] relative overflow-hidden">
      {/* Фоновые элементы с glitch */}
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

      {/* Канвас с частицами */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Левая колонка — текст */}
          <div>
            <div className="inline-block mb-4">
              <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 text-sm font-medium border border-purple-500/30">
                Процесс
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {data.title.split("—")[0]} —{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                {data.title.split("—")[1] || ""}
              </span>
            </h2>

            <div className="space-y-6 mb-8">
              {data.steps.map((step, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center text-purple-400 font-bold group-hover:scale-110 transition-transform">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                      {step}
                    </h3>
                    <p className="text-zinc-300">
                      {/* Описание можно добавить в будущем */}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button asChild>
              <Link href="https://mrqz.me/5e8cd00044a4300055554495" target="_blank" rel="noopener noreferrer">
                {data.buttonText}
              </Link>
            </Button>
          </div>

          {/* Правая колонка — изображение */}
          <div className="relative rounded-xl overflow-hidden shadow-lg border border-purple-800/20">
            <Image
              src={data.image}
              alt="Как это работает"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
