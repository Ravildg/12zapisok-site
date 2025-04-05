"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0F0A1E]/90 backdrop-blur-md shadow-[0_0_15px_rgba(138,43,226,0.3)]" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white flex items-center group">
            <span className="relative">
              <span className="group-hover:text-purple-400 transition-colors duration-300">12 записок</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </span>
            <Sparkles className="ml-2 h-5 w-5 text-purple-400 animate-pulse" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {["Игры", "Поводы", "Как это работает", "Вопросы", "Контакты"].map((item, index) => (
              <Link
                key={index}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-zinc-300 hover:text-purple-400 transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Button with Link */}
          <Link href="https://mrqz.me/5e8cd00044a4300055554495" target="_blank" rel="noopener noreferrer">
            <Button className="hidden md:flex items-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-[0_0_15px_rgba(138,43,226,0.5)] hover:shadow-[0_0_20px_rgba(138,43,226,0.7)] transition-all duration-300">
              <Sparkles className="mr-2 h-4 w-4" />
              Оставить заявку
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-6 space-y-4 animate-in slide-in-from-top duration-300">
            <nav className="flex flex-col space-y-4">
              {["Игры", "Поводы", "Как это работает", "Вопросы", "Контакты"].map((item, index) => (
                <Link
                  key={index}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-zinc-300 hover:text-purple-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </nav>
            {/* Mobile Button with Link */}
            <Link href="https://mrqz.me/5e8cd00044a4300055554495" target="_blank" rel="noopener noreferrer">
              <Button className="w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                <Sparkles className="mr-2 h-4 w-4" />
                Оставить заявку
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
