import Link from "next/link";
import { Mail, MapPin, Phone, Sparkles } from "lucide-react";

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
                href="https://vk.com/12zapisoknn"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#1A1333] flex items-center justify-center text-purple-400 hover:bg-purple-500 hover:text-white transition-colors"
              >
                {/* Кастомная иконка ВКонтакте */}
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.5 4.5C22.5 2.57 20.93 1 19 1H5C3.07 1 1.5 2.57 1.5 4.5V19.5C1.5 21.43 3.07 23 5 23H19C20.93 23 22.5 21.43 22.5 19.5V4.5ZM18.85 17.25H16.77C16.27 17.25 15.93 16.91 15.75 16.5C15.62 16.17 15.56 15.83 15.56 15.5H17.25C17.66 15.5 18 15.16 18 14.75V14.25C18 13.84 17.66 13.5 17.25 13.5H15.56C15.56 12.67 15.75 11.83 16.13 11C16.5 10.17 17.06 9.5 17.81 9.5H18.85C19.26 9.5 19.6 9.84 19.6 10.25V11.75C19.6 12.16 19.26 12.5 18.85 12.5H18C17.59 12.5 17.25 12.84 17.25 13.25V13.75C17.25 14.16 17.59 14.5 18 14.5H18.85C19.26 14.5 19.6 14.84 19.6 15.25V16.75C19.6 17.16 19.26 17.5 18.85 17.5V17.25ZM13.5 17.25H11.75C11.34 17.25 11 16.91 11 16.5V10.25C11 9.84 11.34 9.5 11.75 9.5H13.5C13.91 9.5 14.25 9.84 14.25 10.25V16.5C14.25 16.91 13.91 17.25 13.5 17.25ZM9.25 17.25H8C7.59 17.25 7.25 16.91 7.25 16.5V13.5H5.5C5.09 13.5 4.75 13.16 4.75 12.75V11.25C4.75 10.84 5.09 10.5 5.5 10.5H7.25V9.5C7.25 9.09 7.59 8.75 8 8.75H9.25C9.66 8.75 10 9.09 10 9.5V16.5C10 16.91 9.66 17.25 9.25 17.25Z" />
                </svg>
                <span className="sr-only">ВКонтакте</span>
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
                <span className="text-zinc-400 hover:text-white transition-colors">+7 (930) 283-83-68</span>
              </li>

              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1A1333] flex items-center justify-center mr-3">
                  <Mail className="h-4 w-4 text-purple-400" />
                </div>
                <span className="text-zinc-400 hover:text-white transition-colors">12zapisok.nn@gmail.com</span>
              </li>

              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1A1333] flex items-center justify-center mr-3">
                  <MapPin className="h-4 w-4 text-purple-400" />
                </div>
                <span className="text-zinc-400 hover:text-white transition-colors">
                  г. Нижний Новгород, ул. Белинского, д. 45
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
  );
}
