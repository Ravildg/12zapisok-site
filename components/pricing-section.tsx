"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Sparkles } from "lucide-react";

// Типизация для опций тарифа
type PricingOption = {
  id: number;
  title: string;
  description: string;
  price: string;
  features: string[];
  popular: boolean;
};

// Статические данные для тарифов
const pricingOptions: PricingOption[] = [
  {
    id: 1,
    title: "Стандарт",
    description: "Идеально для небольшой компании друзей",
    price: "от 19 500 ₽",
    features: [
      "До 10 участников",
      "2 актёра",
      "Базовый реквизит",
      "Продолжительность 2 часа",
      "Элементы костюма каждому игроку",
    ],
    popular: false,
  },
  {
    id: 2,
    title: "Премиум",
    description: "Оптимально для дня рождения или корпоратива",
    price: "от 26 400 ₽",
    features: [
      "До 12 участников",
      "3 актёра",
      "Расширенный набор реквизита и эффектов",
      "Продолжительность 2,5 часа",
      "Профессиональная фотосъёмка",
      "Элементы костюма каждому игроку",
      "Подарок на выбор",
    ],
    popular: true,
  },
  {
    id: 3,
    title: "ВИП",
    description: "Максимальное погружение для особых случаев",
    price: "от 40 000 ₽",
    features: [
      "До 25 участников",
      "4 актёра",
      "Премиум реквизит и декорации",
      "Продолжительность 2,5 часа",
      "Профессиональная фотосъёмка",
      "Фотозона",
      "Подарок на выбор",
      "Индивидуальная адаптация сценария",
      "Личный куратор",
    ],
    popular: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-[#1A1333] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-block mb-4">
            <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 text-sm font-medium border border-purple-500/30">
              Тарифы
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Выберите{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">формат</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingOptions.map((option) => (
            <Card
              key={option.id}
              className={`bg-[#0F0A1E] border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(138,43,226,0.2)] relative overflow-hidden ${
                option.popular ? "md:scale-105 md:-translate-y-2" : ""
              }`}
            >
              {option.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg shadow-lg">
                    Популярный
                  </div>
                </div>
              )}

              <CardHeader>
                <CardTitle className="text-2xl text-white">{option.title}</CardTitle>
                <CardDescription className="text-purple-300">{option.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="text-3xl font-bold mb-6 text-white">{option.price}</div>

                <ul className="space-y-3">
                  {option.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center mr-3 mt-0.5">
                        <Check className="h-3 w-3 text-purple-400" />
                      </div>
                      <span className="text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Link href="https://mrqz.me/5e8cd00044a4300055554495" target="_blank" rel="noopener noreferrer">
                  <Button
                    className={`w-full ${
                      option.popular
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-[0_0_15px_rgba(138,43,226,0.3)]"
                        : "bg-[#1A1333] hover:bg-[#251A45] border border-purple-500/30"
                    } text-white group`}
                  >
                    Оставить заявку
                    {option.popular && <Sparkles className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
