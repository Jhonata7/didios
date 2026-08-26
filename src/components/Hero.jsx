export default function Hero() {
  return (
    <section className="relative h-[85vh] bg-gradient-to-r from-black via-gray-900 to-black overflow-hidden">

      {/* Fundo */}

      <div className="absolute inset-0 bg-black/40"></div>

      {/* Conteúdo */}

      <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-8">

        <div className="max-w-2xl text-white">

          <p className="uppercase tracking-[8px] text-gray-300 mb-5">

            Nova Coleção 2026

          </p>

          <h1 className="text-6xl lg:text-7xl font-black leading-tight">

            Vista sua essência.

          </h1>

          <p className="mt-8 text-xl text-gray-300 leading-8">

            Camisetas premium desenvolvidas para quem busca conforto,
            qualidade e um estilo que chama atenção sem exageros.

          </p>

          <div className="mt-12 flex gap-5">

            <button
              className="
                bg-white
                text-black
                px-10
                py-4
                rounded-full
                font-bold
                hover:scale-105
                duration-300
              "
            >
              Comprar Agora
            </button>

            <button
              className="
                border
                border-white
                px-10
                py-4
                rounded-full
                hover:bg-white
                hover:text-black
                duration-300
              "
            >
              Conhecer a Marca
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}