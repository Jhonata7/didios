import {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  Check,
  ShieldCheck,
  ShoppingBag,
  Truck,
  RefreshCw,
} from "lucide-react";

import {
  CartContext,
} from "../context/CartContext";

export default function ProductInfo({
  product,
  quantity,
  selectedSize,
  selectedColor,
}) {
  const {
    addToCart,
  } = useContext(
    CartContext
  );

  const [added, setAdded] =
    useState(false);

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

  useEffect(() => {
    if (!added) {
      return;
    }

    const timer = setTimeout(
      () => {
        setAdded(false);
      },
      2200
    );

    return () =>
      clearTimeout(timer);
  }, [added]);

  function handleAddToCart() {
    if (!selectedSize) {
      alert(
        "Escolha um tamanho."
      );

      return;
    }

    if (!selectedColor) {
      alert(
        "Escolha uma cor."
      );

      return;
    }

    if (
      !quantity ||
      quantity < 1
    ) {
      alert(
        "Escolha uma quantidade válida."
      );

      return;
    }

    if (
      product.stock !== undefined &&
      quantity > product.stock
    ) {
      alert(
        `Temos apenas ${product.stock} unidades disponíveis.`
      );

      return;
    }

    addToCart(
      product,
      quantity,
      selectedSize,
      selectedColor
    );

    setAdded(true);
  }

  const hasDiscount =
    product.oldPrice &&
    Number(product.oldPrice) >
      Number(product.price);

  const discountPercentage =
    hasDiscount
      ? Math.round(
          (1 -
            Number(product.price) /
              Number(product.oldPrice)) *
            100
        )
      : 0;

  const outOfStock =
    Number(product.stock) === 0;

  return (
    <div
      className="
        space-y-5
        sm:space-y-6
      "
    >
      {/* BADGE */}

      <div
        className="
          flex
          flex-wrap
          items-center
          gap-3
        "
      >
        {product.badge && (
          <span
            className="
              inline-flex
              bg-black
              text-white
              px-4
              py-2
              rounded-full
              text-xs
              sm:text-sm
              font-semibold
            "
          >
            {product.badge}
          </span>
        )}

        {hasDiscount && (
          <span
            className="
              inline-flex
              bg-green-100
              text-green-700
              px-4
              py-2
              rounded-full
              text-xs
              sm:text-sm
              font-bold
            "
          >
            {discountPercentage}% OFF
          </span>
        )}
      </div>

      {/* NOME */}

      <div>
        <h1
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            font-black
            leading-[1.05]
            tracking-tight
          "
        >
          {product.name}
        </h1>

        {product.description && (
          <p
            className="
              text-sm
              sm:text-base
              text-gray-600
              leading-7
              mt-4
              sm:mt-5
            "
          >
            {product.description}
          </p>
        )}
      </div>

      {/* PREÇO */}

      <div
        className="
          space-y-2
          border-y
          py-5
        "
      >
        {hasDiscount && (
          <p
            className="
              text-gray-400
              line-through
              text-base
              sm:text-xl
            "
          >
            {formatPrice(
              product.oldPrice
            )}
          </p>
        )}

        <h2
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            font-black
            leading-none
          "
        >
          {formatPrice(
            product.price
          )}
        </h2>

        {product.installments && (
          <p
            className="
              text-green-700
              text-sm
              sm:text-base
              font-medium
            "
          >
            Em até{" "}
            {product.installments}x
            sem juros
          </p>
        )}
      </div>

      {/* ESTOQUE */}

      {product.stock !== undefined && (
        <div
          className={`
            rounded-2xl
            p-4
            sm:p-5

            ${
              outOfStock
                ? "bg-red-50"
                : product.stock <= 5
                ? "bg-orange-50"
                : "bg-gray-100"
            }
          `}
        >
          {outOfStock ? (
            <p
              className="
                font-bold
                text-red-600
              "
            >
              Produto esgotado
            </p>
          ) : (
            <>
              <p>
                <strong>
                  Estoque:
                </strong>{" "}
                {product.stock}{" "}
                {product.stock === 1
                  ? "unidade"
                  : "unidades"}
              </p>

              {product.stock <= 5 && (
                <p
                  className="
                    text-sm
                    text-orange-700
                    font-semibold
                    mt-2
                  "
                >
                  Últimas unidades
                  disponíveis.
                </p>
              )}
            </>
          )}
        </div>
      )}

      {/* BOTÃO */}

      <button
        type="button"
        onClick={
          handleAddToCart
        }
        disabled={outOfStock}
        className={`
          w-full
          min-h-14
          sm:min-h-16
          px-4
          py-4
          sm:py-5
          rounded-2xl
          font-black
          text-base
          sm:text-lg
          flex
          justify-center
          items-center
          gap-3
          transition-all
          duration-300

          ${
            outOfStock
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : added
              ? "bg-green-600 text-white"
              : "bg-black text-white hover:bg-gray-800 active:scale-[0.98]"
          }
        `}
      >
        {outOfStock ? (
          "Produto indisponível"
        ) : added ? (
          <>
            <Check size={22} />

            Produto adicionado!
          </>
        ) : (
          <>
            <ShoppingBag
              size={22}
            />

            Adicionar ao Carrinho
          </>
        )}
      </button>

      {/* BENEFÍCIOS */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-3
          gap-3
          pt-1
        "
      >
        <div
          className="
            bg-gray-50
            rounded-2xl
            p-4
            flex
            sm:flex-col
            items-center
            sm:justify-center
            gap-3
            sm:gap-2
            text-left
            sm:text-center
          "
        >
          <ShieldCheck
            size={22}
            className="flex-shrink-0"
          />

          <div>
            <strong
              className="
                block
                text-black
                text-sm
              "
            >
              Compra segura
            </strong>

            <span
              className="
                text-xs
                text-gray-500
              "
            >
              Ambiente protegido
            </span>
          </div>
        </div>

        <div
          className="
            bg-gray-50
            rounded-2xl
            p-4
            flex
            sm:flex-col
            items-center
            sm:justify-center
            gap-3
            sm:gap-2
            text-left
            sm:text-center
          "
        >
          <RefreshCw
            size={22}
            className="flex-shrink-0"
          />

          <div>
            <strong
              className="
                block
                text-black
                text-sm
              "
            >
              Troca fácil
            </strong>

            <span
              className="
                text-xs
                text-gray-500
              "
            >
              Compra tranquila
            </span>
          </div>
        </div>

        <div
          className="
            bg-gray-50
            rounded-2xl
            p-4
            flex
            sm:flex-col
            items-center
            sm:justify-center
            gap-3
            sm:gap-2
            text-left
            sm:text-center
          "
        >
          <Truck
            size={22}
            className="flex-shrink-0"
          />

          <div>
            <strong
              className="
                block
                text-black
                text-sm
              "
            >
              Envio rápido
            </strong>

            <span
              className="
                text-xs
                text-gray-500
              "
            >
              Para todo Brasil
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}