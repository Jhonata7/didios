export default function Filters({
  category,
  setCategory,
  sort,
  setSort,
}) {
  return (
    <section className="max-w-7xl mx-auto px-6 mb-10">

      <div
        className="
          flex
          flex-col
          md:flex-row
          gap-4
          justify-between
          items-center
        "
      >

        {/* Categorias */}

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="
            border
            rounded-xl
            px-5
            py-3
            w-full
            md:w-72
            outline-none
            focus:border-black
          "
        >

          <option value="Todos">
            Todas as categorias
          </option>

          <option value="Camisetas">
            Camisetas
          </option>

          <option value="Calças">
            Calças
          </option>

          <option value="Jaquetas">
            Jaquetas
          </option>

          <option value="Bonés">
            Bonés
          </option>

          <option value="Acessórios">
            Acessórios
          </option>

        </select>

        {/* Ordenação */}

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="
            border
            rounded-xl
            px-5
            py-3
            w-full
            md:w-72
            outline-none
            focus:border-black
          "
        >

          <option value="recentes">
            Mais recentes
          </option>

          <option value="menor">
            Menor preço
          </option>

          <option value="maior">
            Maior preço
          </option>

          <option value="az">
            A → Z
          </option>

          <option value="za">
            Z → A
          </option>

        </select>

      </div>

    </section>
  );
}