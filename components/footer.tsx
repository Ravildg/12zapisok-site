import Link from "next/link"
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Sparkles } from "lucide-react"

export default function Footer() {
  return (
    <footer id="контакты" className="bg-[#0F0A1E] border-t border-purple-900/30 pt-12 pb-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-600/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              12 записок
              <Sparkles className="ml-2 h-4 w-4 text-purple-400" />
            </h3>

            <p className="text-zinc-400 mb-4">
              Квест-спектакли с живыми актёрами для взрослых. Погрузитесь в историю, которую будете вспоминать.
            </p>

            <div className="flex space-x-4">
              <Link
                href="#"
                className="w-8 h-8 rounded-full bg-[#1A1333] flex items-center justify-center text-purple-400 hover:bg-purple-500 hover:text-white transition-colors"
              >
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Link>

              <Link
                href="#"
                className="w-8 h-8 rounded-full bg-[#1A1333] flex items-center justify-center text-purple-400 hover:bg-purple-500 hover:text-white transition-colors"
              >
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Link>

              <Link
                href="#"
                className="w-8 h-8 rounded-full bg-[#1A1333] flex items-center justify-center text-purple-400 hover:bg-purple-500 hover:text-white transition-colors"
              >
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Навигация</h3>

            <ul className="space-y-2">
              {["Игры", "Поводы", "Как это работает", "Вопросы"].map((item, index) => (
                <li key={index}>
                  <Link
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-zinc-400 hover:text-purple-400 transition-colors flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Контакты</h3>

            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1A1333] flex items-center justify-center mr-3">
                  <Phone className="h-4 w-4 text-purple-400" />
                </div>
                <span className="text-zinc-400 hover:text-white transition-colors">+7 (999) 123-45-67</span>
              </li>

              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1A1333] flex items-center justify-center mr-3">
                  <Mail className="h-4 w-4 text-purple-400" />
                </div>
                <span className="text-zinc-400 hover:text-white transition-colors">info@12zapisok.ru</span>
              </li>

              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1A1333] flex items-center justify-center mr-3">
                  <MapPin className="h-4 w-4 text-purple-400" />
                </div>
                <span className="text-zinc-400 hover:text-white transition-colors">
                  г. Москва, ул. Примерная, д. 123
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Режим работы</h3>

            <div className="bg-[#1A1333] rounded-lg p-4 border border-purple-900/30">
              <p className="text-zinc-400 mb-2 flex items-center">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                Пн-Пт: 10:00 - 22:00
              </p>

              <p className="text-zinc-400 mb-4 flex items-center">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                Сб-Вс: 10:00 - 23:00
              </p>

              <p className="text-purple-300 text-sm">Запись на игру по предварительному бронированию</p>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-900/30 pt-6 text-center">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Квест-кафе "12 записок". Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}

