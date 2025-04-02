import { Sparkles } from "lucide-react"

export default function OccasionsSection() {
  return (
    <section id="поводы" className="py-20 bg-[#0F0A1E] relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block mb-4">
            <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 text-sm font-medium border border-purple-500/30">
              Особые моменты
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Когда хочется{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">большего</span>
            , чем просто встреча
          </h2>

          <p className="text-lg text-zinc-300">
            Погрузитесь в историю, которую будете вспоминать всей командой. Квест-спектакль легко впишется в любой повод
            и сделает его особенным.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#1A1333] p-8 rounded-xl border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(138,43,226,0.2)] group">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Sparkles className="h-6 w-6 text-purple-400" />
            </div>

            <h3 className="text-xl font-semibold mb-4 group-hover:text-purple-400 transition-colors">
              День рождения или юбилей
            </h3>

            <p className="text-zinc-400">
              Станьте героями сюжета в свой особенный день. Необычный формат праздника, который запомнится надолго.
            </p>
          </div>

          <div className="bg-[#1A1333] p-8 rounded-xl border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(138,43,226,0.2)] group">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Sparkles className="h-6 w-6 text-purple-400" />
            </div>

            <h3 className="text-xl font-semibold mb-4 group-hover:text-purple-400 transition-colors">Корпоратив</h3>

            <p className="text-zinc-400">
              Объединит команду сильнее, чем любой тренинг. Совместное приключение раскрывает коллег с новой стороны.
            </p>
          </div>

          <div className="bg-[#1A1333] p-8 rounded-xl border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(138,43,226,0.2)] group">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Sparkles className="h-6 w-6 text-purple-400" />
            </div>

            <h3 className="text-xl font-semibold mb-4 group-hover:text-purple-400 transition-colors">
              Вечер с друзьями
            </h3>

            <p className="text-zinc-400">
              Превратите обычную встречу в незабываемое приключение. Новый формат досуга для тех, кто ценит яркие
              впечатления.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

