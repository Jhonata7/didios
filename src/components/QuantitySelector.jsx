import {
  Minus,
  Plus,
} from "lucide-react";

export default function QuantitySelector({
  quantity,
  setQuantity,
  max,
}) {
  const maxQuantity =
    Number(max) > 0
      ? Number(max)
      : Infinity;

  const atMinimum =
    quantity <= 1;

  const atMaximum =
    quantity >= maxQuantity;

  function increase() {
    if (atMaximum) {
      return;
    }

    setQuantity(
      quantity + 1
    );
  }

  function decrease() {
    if (atMinimum) {
      return;
    }

    setQuantity(
      quantity - 1
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3
          className="
            font-semibold
            text-base
            sm:text-lg
          "
        >
          Quantidade
        </h3>

        {Number.isFinite(
          maxQuantity
        ) && (
          <p
            className="
              text-xs
              sm:text-sm
              text-gray-500
              mt-1
            "
          >
            Máximo de{" "}
            {maxQuantity}{" "}
            {maxQuantity === 1
              ? "unidade"
              : "unidades"}
          </p>
        )}
      </div>

      <div
        className="
          inline-flex
          items-center
          gap-2
          sm:gap-3
          bg-gray-50
          border
          rounded-full
          p-1.5
        "
      >
        <button
          type="button"
          onClick={decrease}
          disabled={atMinimum}
          aria-label="Diminuir quantidade"
          className="
            w-11
            h-11
            sm:w-12
            sm:h-12
            rounded-full
            bg-white
            border
            flex
            items-center
            justify-center
            hover:bg-gray-100
            active:scale-95
            duration-200
            disabled:opacity-30
            disabled:cursor-not-allowed
          "
        >
          <Minus size={18} />
        </button>

        <span
          className="
            min-w-12
            text-center
            text-xl
            sm:text-2xl
            font-black
          "
        >
          {quantity}
        </span>

        <button
          type="button"
          onClick={increase}
          disabled={atMaximum}
          aria-label="Aumentar quantidade"
          className="
            w-11
            h-11
            sm:w-12
            sm:h-12
            rounded-full
            bg-black
            text-white
            flex
            items-center
            justify-center
            hover:bg-gray-800
            active:scale-95
            duration-200
            disabled:bg-gray-300
            disabled:text-gray-500
            disabled:cursor-not-allowed
          "
        >
          <Plus size={18} />
        </button>
      </div>

      {atMaximum &&
        Number.isFinite(
          maxQuantity
        ) && (
          <p
            className="
              text-sm
              text-orange-600
              font-semibold
            "
          >
            Quantidade máxima
            disponível atingida.
          </p>
        )}
    </div>
  );
}