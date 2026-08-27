export default function Newsletter() {
  return (
    <section className="bg-black text-white py-24">

      <div className="max-w-4xl mx-auto text-center px-8">

        <h2 className="text-5xl font-black mb-6">

          Faça parte da Ddios

        </h2>

        <p className="text-gray-300 text-lg mb-10">

          Receba novidades, lançamentos e promoções exclusivas diretamente no seu e-mail.

        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">

          <input
            type="email"
            placeholder="Digite seu melhor e-mail"
            className="
              flex-1
              px-6
              py-4
              rounded-full
              text-black
              outline-none
            "
          />

          <button
            className="
              bg-white
              text-black
              px-10
              py-4
              rounded-full
              font-bold
              hover:bg-gray-200
              duration-300
            "
          >

            Inscrever-se

          </button>

        </div>

      </div>

    </section>
  );
}