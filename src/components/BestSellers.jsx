import products from "../data/products";
import ProductCard from "./ProductCard";

export default function BestSellers({
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

  const bestSellers =
    filteredProducts.slice(0, 4);

  if (bestSellers.length === 0) {
    return null;
  }

  return (
    <section
      className="
        bg-gray-50
        py-16
        md:py-24
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          lg:px-8
        "
      >
        <div className="mb-12">
          <p
            className="
              text-sm
              uppercase
              tracking-[3px]
              font-bold
              text-gray-400
            "
          >
            Seleção diDios
          </p>

          <h2
            className="
              text-3xl
              md:text-4xl
              font-black
              mt-2
            "
          >
            Mais Vendidos
          </h2>

          <p
            className="
              text-gray-500
              mt-3
            "
          >
            Os favoritos dos nossos clientes.
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
          {bestSellers.map(
            (product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}