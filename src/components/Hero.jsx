export default function Hero() {
  return (
    <section className="relative bg-[#eeeae7] overflow-hidden">

      {/* Fundo */}

      <img
        src="/images/didios-capa.jpeg"
        alt="Coleção feminina diDios"
        className="block w-full h-auto lg:min-h-[680px] lg:max-h-[85vh] lg:object-cover lg:object-center"
      />
      <button
        onClick={() => document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute z-10 left-[7.5%] bottom-[5.5%] bg-black text-white px-6 py-3 sm:px-9 sm:py-4 rounded-full text-sm sm:text-base font-semibold tracking-wide shadow-xl hover:bg-neutral-800 hover:-translate-y-0.5 duration-300"
      >
        Comprar agora
      </button>

    </section>
  );
}
