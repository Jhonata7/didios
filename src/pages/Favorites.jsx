import { useContext } from "react";
import { Link } from "react-router-dom";

import {
  Heart,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import {
  FavoritesContext,
} from "../context/FavoritesContext";

export default function Favorites() {
  const {
    favorites,
    toggleFavorite,
  } = useContext(
    FavoritesContext
  );

  function formatPrice(value) {
    return Number(
      value || 0
    ).toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    );
  }

  if (favorites.length === 0) {
    return (
      <main
        className="
          max-w-7xl
          mx-auto
          py-20
          md:py-28
          px-6
        "
      >
        <div
          className="
            max-w-xl
            mx-auto
            text-center
          "
        >
          <div
            className="
              w-24
              h-24
              rounded-full
              bg-gray-100
              flex
              items-center
              justify-center
              mx-auto
            "
          >
            <Heart
              size={42}
              className="text-gray-400"
            />
          </div>

          <h1
            className="
              text-4xl
              md:text-5xl
              font-black
              mt-8
            "
          >
            Seus favoritos
          </h1>

          <p
            className="
              text-gray-500
              text-lg
              mt-4
            "
          >
            Você ainda não adicionou
            nenhum produto aos favoritos.
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
              hover:bg-gray-800
              duration-300
            "
          >
            Ver produtos
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      className="
        max-w-7xl
        mx-auto
        py-14
        md:py-20
        px-6
      "
    >
      <div className="mb-12">
        <h1
          className="
            text-4xl
            md:text-5xl
            font-black
          "
        >
          Meus Favoritos
        </h1>

        <p
          className="
            text-gray-500
            mt-3
          "
        >
          {favorites.length}{" "}
          {favorites.length === 1
            ? "produto salvo"
            : "produtos salvos"}
        </p>
      </div>

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-8
        "
      >
        {favorites.map(
          (product) => (
            <article
              key={product.id}
              className="
                group
                bg-white
                rounded-3xl
                shadow-sm
                hover:shadow-xl
                overflow-hidden
                duration-300
              "
            >
              <div className="relative">
                <Link
                  to={`/produto/${product.id}`}
                >
                  <img
                    src={
                      product.image
                    }
                    alt={
                      product.name
                    }
                    className="
                      h-80
                      w-full
                      object-cover
                      group-hover:scale-105
                      duration-500
                    "
                  />
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    toggleFavorite(
                      product
                    )
                  }
                  aria-label="Remover dos favoritos"
                  className="
                    absolute
                    top-5
                    right-5
                    w-11
                    h-11
                    rounded-full
                    bg-white
                    shadow-md
                    flex
                    items-center
                    justify-center
                    text-red-500
                    hover:scale-110
                    duration-200
                  "
                >
                  <Trash2
                    size={19}
                  />
                </button>
              </div>

              <div className="p-6">
                <Link
                  to={`/produto/${product.id}`}
                >
                  <h2
                    className="
                      text-xl
                      font-black
                      hover:text-gray-600
                      duration-200
                    "
                  >
                    {product.name}
                  </h2>
                </Link>

                {product.category && (
                  <p
                    className="
                      text-gray-500
                      mt-2
                    "
                  >
                    {
                      product.category
                    }
                  </p>
                )}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    mt-4
                  "
                >
                  {product.oldPrice && (
                    <span
                      className="
                        text-gray-400
                        line-through
                      "
                    >
                      {formatPrice(
                        product.oldPrice
                      )}
                    </span>
                  )}

                  <p
                    className="
                      text-2xl
                      font-black
                    "
                  >
                    {formatPrice(
                      product.price
                    )}
                  </p>
                </div>

                <Link
                  to={`/produto/${product.id}`}
                  className="
                    mt-6
                    w-full
                    bg-black
                    text-white
                    py-4
                    rounded-full
                    font-bold
                    flex
                    items-center
                    justify-center
                    gap-2
                    hover:bg-gray-800
                    duration-300
                  "
                >
                  <ShoppingBag
                    size={18}
                  />

                  Escolher opções
                </Link>
              </div>
            </article>
          )
        )}
      </div>
    </main>
  );
}