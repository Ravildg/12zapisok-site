"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

// Статические данные для галереи
const galleryImages = [
  "/uploads/bt.jpg",
  "/uploads/bt1.jpg",
  "/uploads/bt12.jpg",
  "/uploads/bt5.jpg",
  "/uploads/bt6.jpg",
  "/uploads/bt7.jpg",
  "/uploads/ki0.jpg",
  "/uploads/ki2.jpg",
  "/uploads/ki3.jpg",
  "/uploads/ki6.jpg",
  "/uploads/kn10.jpg",
  "/uploads/kn12.jpg",
  "/uploads/kn7.jpg",
  "/uploads/kn8.jpg",
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

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1));
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

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
    <section className="py-20 bg-[#1A1333] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl"></div>

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
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1333]/70 via-[#1A1333]/20 to-transparent"></div>
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
