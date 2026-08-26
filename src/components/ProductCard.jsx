import { useContext } from "react";
import { Link } from "react-router-dom";

import {
  Heart,
  ShoppingBag,
} from "lucide-react";

import {
  FavoritesContext,
} from "../context/FavoritesContext";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=900";

export default function ProductCard({
  product,
}) {
  const {
    toggleFavorite,
    isFavorite,
  } = useContext(FavoritesContext);

  const favorite = isFavorite(product.id);

  function formatPrice(value) {
    return Number(value || 0).toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    );
  }

  function handleImageError(event) {
    event.currentTarget.src =
      FALLBACK_IMAGE;
  }

  function handleFavorite(event) {
    event.preventDefault();
    event.stopPropagation();

    toggleFavorite(product);
  }

  return (
    <div
      className="
        group
        bg-white
        rounded-2xl
        sm:rounded-3xl
        overflow-hidden
        shadow-sm
        hover:shadow-2xl
        transition-all
        duration-500
      "
    >
      <div
        className="
          relative
          overflow-hidden
          bg-gray-100
        "
      >
        <Link
          to={`/produto/${product.id}`}
          className="block"
        >
          <img
            src={
              product.image ||
              FALLBACK_IMAGE
            }
            alt={product.name}
            onError={handleImageError}
            loading="lazy"
            className="
              block
              w-full
              h-72
              sm:h-80
              md:h-96
              object-cover
              group-hover:scale-105
              md:group-hover:scale-110
              transition-transform
              duration-700
            "
          />
        </Link>

        {product.badge && (
          <span
            className="
              absolute
              top-3
              left-3
              sm:top-5
              sm:left-5
              bg-black
              text-white
              text-[10px]
              sm:text-xs
              font-semibold
              px-3
              sm:px-4
              py-2
              rounded-full
            "
          >
            {product.badge}
          </span>
        )}

        <button
          type="button"
          onClick={handleFavorite}
          className="
            absolute
            top-3
            right-3
            sm:top-5
            sm:right-5
            w-10
            h-10
            sm:w-11
            sm:h-11
            bg-white
            rounded-full
            shadow-md
            flex
            items-center
            justify-center
          "
        >
          <Heart
            size={19}
            fill={
              favorite
                ? "currentColor"
                : "none"
            }
            className={
              favorite
                ? "text-red-500"
                : "text-black"
            }
          />
        </button>

        <Link
          to={`/produto/${product.id}`}
          className="
            absolute
            bottom-5
            left-5
            right-5
            bg-black
            text-white
            py-3
            rounded-full
            items-center
            justify-center
            gap-2
            font-bold
            hidden
            md:flex
            md:opacity-0
            md:group-hover:opacity-100
            transition
          "
        >
          <ShoppingBag size={18} />
          Comprar
        </Link>
      </div>

      <div
        className="
          p-4
          sm:p-6
        "
      >
        <Link
          to={`/produto/${product.id}`}
        >
          <h3
            className="
              text-base
              sm:text-lg
              font-bold
              leading-tight
            "
          >
            {product.name}
          </h3>
        </Link>

        {product.category && (
          <p
            className="
              text-xs
              sm:text-sm
              text-gray-500
              mt-2
            "
          >
            {product.category}
          </p>
        )}

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-2
            sm:gap-3
            mt-4
          "
        >
          {product.oldPrice &&
            Number(product.oldPrice) >
              Number(product.price) && (
              <span
                className="
                  text-xs
                  sm:text-sm
                  text-gray-400
                  line-through
                "
              >
                {formatPrice(
                  product.oldPrice
                )}
              </span>
            )}

          <span
            className="
              text-xl
              sm:text-2xl
              font-black
            "
          >
            {formatPrice(product.price)}
          </span>
        </div>

        {product.installments && (
          <p
            className="
              text-green-700
              text-xs
              sm:text-sm
              mt-3
            "
          >
            ✓ {product.installments}x sem juros
          </p>
        )}

        <Link
          to={`/produto/${product.id}`}
          className="
            mt-5
            sm:mt-6
            w-full
            bg-black
            text-white
            py-3
            sm:py-4
            px-3
            rounded-full
            font-semibold
            text-sm
            sm:text-base
            flex
            items-center
            justify-center
            gap-2
          "
        >
          <ShoppingBag size={17} />

          Escolher opções
        </Link>
      </div>
    </div>
  );
}