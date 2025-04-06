"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

// Статические данные для галереи с добавленными новыми фото
const galleryImages = [
  "/uploads/bt.jpg",
  "/uploads/bt1.jpg",
  "/uploads/bt12.jpg",
  "/uploads/bt5.jpg",
  "/uploads/bt6.jpg",
  "/uploads/bt7.jpg",
  "/uploads/bt20.jpg", // Новое
  "/uploads/ki0.jpg",
  "/uploads/ki2.jpg",
  "/uploads/ki3.jpg",
  "/uploads/ki6.jpg",
  "/uploads/ki20.jpg", // Новое
  "/uploads/ki22.jpg", // Новое
  "/uploads/kn10.jpg",
  "/uploads/kn12.jpg",
  "/uploads/kn7.jpg",
  "/uploads/kn8.jpg",
  "/uploads/kn20.jpg", // Новое
  "/uploads/kn21.jpg", // Новое
  "/uploads/kn23.jpg", // Новое
  "/uploads/pv10.jpg",
  "/uploads/pv11.jpg",
  "/uploads/pv3.jpg",
  "/uploads/pv4.jpg",
  "/uploads/pv5.jpg",
  "/uploads/rn10.jpg",
  "/uploads/rn9.jpg",
  "/uploads/ya0.png",
];

export default function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{ x: number; y: number; size: number; speed: number }>>([]);
  const glitchRef = useRef(false);

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

  // Автопрокрутка галереи
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1));
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

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

  const prevSlide = () => {
    setIsAutoPlaying(false);
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? galleryImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    setIsAutoPlaying(false);
    const isLastSlide = currentIndex === galleryImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(slideIndex);
  };

  return (
    <section className="py-20 bg-[#0F0A1E] relative overflow-hidden">
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
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 mb-6">
            <Camera className="h-8 w-8 text-purple-400" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Живые кадры с{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              наших игр
            </span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative h-[300px] md:h-[500px] group">
            <div className="relative h-full w-full rounded-xl overflow-hidden border border-purple-900/30 shadow-[0_0_30px_rgba(138,43,226,0.2)]">
              {galleryImages.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
              {/* Убрал градиент для полной непрозрачности */}
            </div>

            {/* Left Arrow */}
            <div className="absolute top-1/2 -translate-y-1/2 left-5 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full bg-purple-900/50 hover:bg-purple-900/70 backdrop-blur-sm"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </div>

            {/* Right Arrow */}
            <div className="absolute top-1/2 -translate-y-1/2 right-5 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full bg-purple-900/50 hover:bg-purple-900/70 backdrop-blur-sm"
                onClick={nextSlide}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Dots/Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {galleryImages.map((_, slideIndex) => (
              <button
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  currentIndex === slideIndex
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 w-6"
                    : "bg-purple-900/50 hover:bg-purple-900/70"
                }`}
                aria-label={`Go to slide ${slideIndex + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
