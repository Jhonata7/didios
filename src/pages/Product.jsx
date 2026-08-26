import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import products from "../data/products";

import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import ProductColors from "../components/ProductColors";
import ProductSizes from "../components/ProductSizes";
import QuantitySelector from "../components/QuantitySelector";
import FreightCalculator from "../components/FreightCalculator";
import RelatedProducts from "../components/RelatedProducts";

export default function Product() {
  const { id } = useParams();

  const product = products.find(
    (item) =>
      item.id === Number(id)
  );

  const [selectedColor, setSelectedColor] =
    useState("");

  const [selectedSize, setSelectedSize] =
    useState("");

  const [quantity, setQuantity] =
    useState(1);

  useEffect(() => {
    if (!product) {
      return;
    }

    setSelectedColor(
      product.colors?.[0] || ""
    );

    setSelectedSize("");

    setQuantity(1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [product]);

  if (!product) {
    return (
      <main
        className="
          max-w-7xl
          mx-auto
          px-5
          sm:px-6
          py-20
          text-center
        "
      >
        <h1
          className="
            text-3xl
            sm:text-4xl
            font-black
          "
        >
          Produto não encontrado
        </h1>

        <p
          className="
            text-gray-500
            mt-4
          "
        >
          Esse produto não está
          disponível no momento.
        </p>

        <Link
          to="/"
          className="
            inline-flex
            mt-8
            bg-black
            text-white
            px-8
            py-4
            rounded-full
            font-bold
          "
        >
          Voltar para a loja
        </Link>
      </main>
    );
  }

  const galleryImages =
    product.images?.length > 0
      ? product.images
      : [product.image];

  return (
    <main
      className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        py-8
        sm:py-10
        lg:py-16
      "
    >
      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-8
          sm:gap-10
          lg:gap-16
          items-start
        "
      >
        {/* GALERIA */}

        <section
          className="
            min-w-0
          "
        >
          <ProductGallery
            images={galleryImages}
          />
        </section>

        {/* INFORMAÇÕES */}

        <section
          className="
            min-w-0
            space-y-7
            sm:space-y-8
            lg:sticky
            lg:top-28
          "
        >
          <ProductInfo
            product={product}
            quantity={quantity}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
          />

          {product.colors?.length > 0 && (
            <ProductColors
              product={product}
              selectedColor={
                selectedColor
              }
              setSelectedColor={
                setSelectedColor
              }
            />
          )}

          {product.sizes?.length > 0 && (
            <ProductSizes
              product={product}
              selectedSize={
                selectedSize
              }
              setSelectedSize={
                setSelectedSize
              }
            />
          )}

          <QuantitySelector
            quantity={quantity}
            setQuantity={
              setQuantity
            }
            max={product.stock}
          />

          <FreightCalculator />
        </section>
      </div>

      {/* RELACIONADOS */}

      <div
        className="
          mt-16
          sm:mt-20
          lg:mt-24
        "
      >
        <RelatedProducts
          currentProduct={product}
          products={products}
        />
      </div>
    </main>
  );
}