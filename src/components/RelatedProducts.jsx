import ProductCard from "./ProductCard";

export default function RelatedProducts({
  currentProduct,
  products,
}) {

  const relatedProducts = products
    .filter(
      (item) =>
        item.category === currentProduct.category &&
        item.id !== currentProduct.id
    )
    .slice(0, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section
      className="
        mt-24
      "
    >
      <h2
        className="
          text-4xl
          font-black
          mb-10
        "
      >
        Você também pode gostar
      </h2>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-8
        "
      >
        {relatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}