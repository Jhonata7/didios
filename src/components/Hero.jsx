export default function Hero() {
  return (
    <section className="relative min-h-[72vh] lg:h-[85vh] bg-black overflow-hidden">

      {/* Fundo */}

      <img
        src="/images/didios-capa.jpeg"
        alt="Coleção feminina diDios"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent lg:from-black/45 lg:via-transparent"></div>

      {/* Conteúdo */}

      <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-8">

        <div className="max-w-xl text-white pt-80 sm:pt-72 lg:pt-0">

          <p className="uppercase tracking-[8px] text-gray-300 mb-5">

            Coleção Feminina 2026

          </p>

          <h1 className="text-6xl lg:text-7xl font-black leading-tight">

            Elegância que valoriza você.

          </h1>

          <p className="mt-8 text-xl text-gray-300 leading-8">

            Modelos casuais de alto padrão, com conforto, versatilidade
            e sofisticação em cada detalhe.

          </p>

          <div className="mt-12 flex gap-5">

            <button
              onClick={() => document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" })}
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
              Conhecer a coleção
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}
