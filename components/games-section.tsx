<section id="игры" className="py-20 bg-[#0F0A1E] relative overflow-hidden">
  {/* Градиенты и частицы */}
  <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-900/20 blur-3xl rounded-full" />
  <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-pink-900/10 blur-3xl rounded-full" />
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {[...Array(12)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-purple-500 opacity-10"
        style={{
          width: `${Math.random() * 8 + 4}px`,
          height: `${Math.random() * 8 + 4}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animation: `float ${Math.random() * 10 + 10}s linear infinite`,
          animationDelay: `${Math.random() * 5}s`,
        }}
      />
    ))}
  </div>

  <div className="container mx-auto px-4 relative z-10">
    <div className="inline-block mb-12">
      <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 text-sm font-medium border border-purple-500/30">
        Наши квесты
      </span>
    </div>

    <div className="space-y-12">
      {games.map((game, index) => (
        <Link
          key={game.title}
          href={game.link}
          className={`flex flex-col md:flex-row ${
            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          } items-center bg-[#1B1530] rounded-xl overflow-hidden transition-all hover:shadow-[0_0_20px_#a855f7] group border border-transparent hover:border-purple-500/40 min-h-[16rem]`}
        >
          {/* Картинка */}
          <div className="md:w-1/2 w-full h-64 relative">
            <Image
              src={game.image}
              alt={game.title}
              fill
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Текст */}
          <div className="md:w-1/2 w-full p-6 md:p-10 space-y-3">
            <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
              {game.title}
            </h3>
            <p className="text-zinc-300">{game.description}</p>
            <div className="text-sm text-purple-300">
              <span>{game.players}</span> &middot; <span>{game.duration}</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {game.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
</section>
