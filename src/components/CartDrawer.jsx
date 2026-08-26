import {
  useContext,
  useEffect,
} from "react";

import { Link } from "react-router-dom";

import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";

import { CartContext } from "../context/CartContext";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=900";

export default function CartDrawer({
  isOpen,
  onClose,
}) {
  const {
    cart,
    removeFromCart,
    increase,
    decrease,
    total,
    itemCount,
  } = useContext(CartContext);

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

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    function handleEscape(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.body.style.overflow = "";

      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div
        onClick={onClose}
        className={`
          fixed
          inset-0
          bg-black/50
          backdrop-blur-sm
          transition-all
          duration-300
          z-40

          ${
            isOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      />

      <aside
        className={`
          fixed
          top-0
          right-0
          h-dvh
          w-full
          sm:w-[430px]
          max-w-full
          bg-white
          shadow-2xl
          z-50
          flex
          flex-col
          transition-transform
          duration-300

          ${
            isOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        <div
          className="
            flex
            items-center
            justify-between
            px-4
            sm:px-6
            py-4
            sm:py-5
            border-b
          "
        >
          <div>
            <h2
              className="
                text-xl
                sm:text-2xl
                font-black
              "
            >
              Seu Carrinho
            </h2>

            <p
              className="
                text-xs
                sm:text-sm
                text-gray-500
                mt-1
              "
            >
              {itemCount === 0
                ? "Nenhum item"
                : `${itemCount} ${
                    itemCount === 1
                      ? "item"
                      : "itens"
                  }`}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              w-10
              h-10
              rounded-full
              flex
              items-center
              justify-center
              hover:bg-gray-100
            "
          >
            <X size={23} />
          </button>
        </div>

        <div
          className="
            flex-1
            overflow-y-auto
            px-4
            sm:px-6
            py-5
          "
        >
          {cart.length === 0 ? (
            <div
              className="
                min-h-[60vh]
                flex
                flex-col
                items-center
                justify-center
                text-center
              "
            >
              <ShoppingBag
                size={55}
                className="text-gray-300"
              />

              <h3
                className="
                  text-xl
                  sm:text-2xl
                  font-black
                  mt-6
                "
              >
                Seu carrinho está vazio
              </h3>

              <button
                type="button"
                onClick={onClose}
                className="
                  mt-7
                  bg-black
                  text-white
                  px-7
                  py-4
                  rounded-full
                  font-bold
                "
              >
                Continuar comprando
              </button>
            </div>
          ) : (
            cart.map((product) => (
              <div
                key={`${product.id}-${product.size}-${product.color}`}
                className="
                  flex
                  gap-3
                  sm:gap-4
                  pb-5
                  mb-5
                  border-b
                "
              >
                <img
                  src={
                    product.image ||
                    FALLBACK_IMAGE
                  }
                  alt={product.name}
                  onError={handleImageError}
                  className="
                    w-20
                    h-24
                    sm:w-24
                    sm:h-28
                    rounded-2xl
                    object-cover
                    bg-gray-100
                    flex-shrink-0
                  "
                />

                <div className="flex-1 min-w-0">
                  <h3
                    className="
                      font-bold
                      text-sm
                      sm:text-base
                      leading-tight
                    "
                  >
                    {product.name}
                  </h3>

                  <p
                    className="
                      mt-2
                      text-xs
                      sm:text-sm
                      text-gray-500
                    "
                  >
                    {product.color || "-"} •{" "}
                    {product.size || "-"}
                  </p>

                  <p
                    className="
                      mt-3
                      text-lg
                      sm:text-xl
                      font-black
                    "
                  >
                    {formatPrice(
                      product.price
                    )}
                  </p>

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      mt-4
                    "
                  >
                    <button
                      type="button"
                      onClick={() =>
                        decrease(
                          product.id,
                          product.size,
                          product.color
                        )
                      }
                      className="
                        w-9
                        h-9
                        rounded-full
                        border
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Minus size={15} />
                    </button>

                    <strong
                      className="
                        min-w-7
                        text-center
                      "
                    >
                      {product.quantity}
                    </strong>

                    <button
                      type="button"
                      onClick={() =>
                        increase(
                          product.id,
                          product.size,
                          product.color
                        )
                      }
                      className="
                        w-9
                        h-9
                        rounded-full
                        border
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Plus size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        removeFromCart(
                          product.id,
                          product.size,
                          product.color
                        )
                      }
                      className="
                        ml-auto
                        w-9
                        h-9
                        rounded-full
                        flex
                        items-center
                        justify-center
                        text-red-600
                      "
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div
            className="
              border-t
              bg-white
              px-4
              sm:px-6
              py-4
              sm:py-6
              pb-[max(1rem,env(safe-area-inset-bottom))]
            "
          >
            <div
              className="
                flex
                justify-between
                items-end
                gap-4
              "
            >
              <span
                className="
                  text-sm
                  text-gray-500
                "
              >
                Total
              </span>

              <strong
                className="
                  text-xl
                  sm:text-2xl
                  font-black
                "
              >
                {formatPrice(total)}
              </strong>
            </div>

            <Link
              to="/checkout"
              onClick={onClose}
              className="
                mt-5
                w-full
                bg-black
                text-white
                py-4
                rounded-2xl
                font-black
                flex
                items-center
                justify-center
              "
            >
              Finalizar Compra
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}