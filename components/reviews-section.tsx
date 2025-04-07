import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const reviews = [
  {
    id: 1,
    name: "Анна К.",
    company: "HR",
    text: "Выбрались с командой на гангстерскую вечеринку, т.к. хотелось чего-то нового. Было весело, спасибо! Все получили задания, те, кто не очень-то хотел интриг, нашли чем заняться в импровизированном казино. Получилось атмосферно, внимательные ведущие, фото - 🔥 Так что придем ещё) ",
    rating: 5,
    avatar: "/uploads/1.png", // Обновлено
  },
  {
    id: 2,
    name: "Дмитрий С.",
    company: "День рождения",
    text: "Волшебное место! Праздновал в свое день рождение с друзьями. Т.к. как были с детьми, то выбрали квест «Петля Времени». Все было сказачно и таинственно, в меру сложно,но интересно. Каждое действие команды с предметами вызвало ответную реакцию. Отличный сюжет. Очень классные и позитивные аниматоры. Детям и взрослым все очень понравилось! ",
    rating: 5,
    avatar: "/uploads/2.jpg", // Обновлено
  },
  {
    id: 3,
    name: "Елена В.",
    company: "Встреча друзей",
    text: "Выбрали игру «Бермудский треугольник». Давно так не смеялись! Всем было чем занятся, сюжет интересный, ведущему особый респект за то что не оставил в трудную минту).Обязательно придём ещё раз на другую программу.",
    rating: 5,
    avatar: "/uploads/3.png", // Обновлено
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-20 bg-[#0F0A1E] relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 mb-6">
            <Quote className="h-8 w-8 text-purple-400" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Нам доверяют{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              впечатления
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <Card
              key={review.id}
              className="bg-[#1A1333] border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(138,43,226,0.2)] overflow-hidden group"
            >
              <CardContent className="p-6 relative">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-bl-3xl -mr-6 -mt-6 group-hover:scale-110 transition-transform duration-500"></div>

                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-zinc-600"}`}
                    />
                  ))}
                </div>

                <p className="text-zinc-300 mb-6 italic relative">
                  <Quote className="absolute -top-2 -left-2 h-6 w-6 text-purple-500/20" />"{review.text}"
                </p>

                <div className="flex items-center">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-purple-500/30">
                    <Image src={review.avatar || "/placeholder.svg"} alt={review.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{review.name}</p>
                    <p className="text-purple-300 text-sm">{review.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
