import products from "../data/products";
import ProductCard from "./ProductCard";

export default function FeaturedProducts({
  search = "",
  category = "Todos",
}) {
  const normalizedSearch = search
    .trim()
    .toLowerCase();

  const filteredProducts = products.filter(
    (product) => {
      const matchesSearch =
        !normalizedSearch ||
        product.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        product.category
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        product.description
          ?.toLowerCase()
          .includes(normalizedSearch);

      const matchesCategory =
        category === "Todos" ||
        product.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );

  /*
    Os quatro primeiros já aparecem
    em "Mais Vendidos".

    Por isso aqui mostramos os
    produtos seguintes.
  */
  const featuredProducts =
    filteredProducts.slice(4);

  /*
    Quando existe busca ou filtro
    e sobraram poucos produtos,
    mostramos todos para não deixar
    a seção vazia artificialmente.
  */
  const productsToShow =
    search || category !== "Todos"
      ? filteredProducts
      : featuredProducts;

  if (productsToShow.length === 0) {
    return (
      <section
        className="
          max-w-7xl
          mx-auto
          px-6
          py-20
          text-center
        "
      >
        <div
          className="
            max-w-lg
            mx-auto
            bg-gray-50
            rounded-3xl
            px-8
            py-14
          "
        >
          <h2
            className="
              text-3xl
              font-black
            "
          >
            Nenhum produto encontrado
          </h2>

          <p
            className="
              text-gray-500
              mt-4
            "
          >
            Tente buscar outro nome ou escolher
            uma categoria diferente.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="
        max-w-7xl
        mx-auto
        px-6
        lg:px-8
        py-16
        md:py-24
      "
    >
      <div
        className="
          mb-12
          text-center
        "
      >
        <p
          className="
            text-sm
            uppercase
            tracking-[3px]
            font-bold
            text-gray-400
          "
        >
          Coleção
        </p>

        <h2
          className="
            text-3xl
            md:text-4xl
            font-black
            mt-2
          "
        >
          {search
            ? "Resultados da Busca"
            : category !== "Todos"
            ? category
            : "Produtos em Destaque"}
        </h2>

        <p
          className="
            text-gray-500
            mt-3
          "
        >
          {search
            ? `${productsToShow.length} ${
                productsToShow.length === 1
                  ? "produto encontrado"
                  : "produtos encontrados"
              }.`
            : "Peças selecionadas para quem busca qualidade e estilo."}
        </p>
      </div>

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-8
        "
      >
        {productsToShow.map(
          (product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          )
        )}
      </div>
    </section>
  );
}