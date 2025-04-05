"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Это спектакль или квест?",
    answer:
      "И то, и другое. Это сюжетная игра с актёрами, в которую вы погружаетесь как участники. Вы не просто наблюдаете за происходящим, а активно влияете на развитие сюжета. Становитесь персонажем истории и действуете в предлагаемых обстоятельствах на актёрской импровизации.",
  },
  {
    question: "Сколько человек может участвовать?",
    answer:
      "От 6 до 20, в зависимости от сюжета. Для каждой игры есть оптимальное количество участников, которое мы рекомендуем для максимального погружения.",
  },
  {
    question: "Где проходит игра?",
    answer:
      "В нашем пространстве в центре Нижнего Новгорода на Белинского 45 или на выезде, под запрос. Мы можем организовать квест-спектакль в удобном для вас месте, адаптировав сценарий под локацию.",
  },
  {
    question: "Нужно ли что-то готовить заранее?",
    answer:
      "Нет, всё основное подготовим мы. Ваша задача — прийти в хорошем настроении и сыграть. Мы обеспечиваем полное погружение в атмосферу выбранного сюжета.",
  },
  {
    question: "Можно ли в квест-кафе организовать угощение?",
    answer:
      "Да, всё обговаривается. После игры мы сможем организовать столы и стулья в необходимом количестве. Некоторые игры допускают лёгкие закуски во время действа. У нас есть кулер с горячей и холодной водой, холодильник и микроволновка. Вы можете принести еду с собой или воспользоваться любой доставкой. Наш партнёр 'Додо Пицца' предоставляет скидку 15% для наших гостей по промокоду.",
  },
  {
    question: "Это точно подойдёт взрослым?",
    answer:
      "Да! Сценарии написаны с учётом взрослой аудитории: юмор, интрига, вовлечение, но без пошлости. Наши квест-спектакли созданы специально для взрослых, учитывая их интересы и предпочтения.",
  },
];

export default function FAQSection() {
  return (
    <section id="вопросы" className="py-20 bg-[#0F0A1E] relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 mb-6">
            <HelpCircle className="h-8 w-8 text-purple-400" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Вопросы, которые задают{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              чаще всего
            </span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-purple-900/30 overflow-hidden mb-4 rounded-lg bg-[#1A1333] hover:border-purple-500/50 transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-lg font-medium hover:text-purple-400 py-6 px-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-300 text-base pb-6 px-6 bg-[#1A1333]/50">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
