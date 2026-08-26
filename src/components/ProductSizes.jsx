import { useState } from "react";
import { Check, Ruler } from "lucide-react";

import SizeGuideModal from "./SizeGuideModal";

export default function ProductSizes({
  product,
  selectedSize,
  setSelectedSize,
}) {
  const [guideOpen, setGuideOpen] =
    useState(false);

  const sizes =
    product.sizes || [];

  if (sizes.length === 0) {
    return null;
  }

  return (
    <>
      <div className="space-y-4">
        <div
          className="
            flex
            items-end
            justify-between
            gap-4
          "
        >
          <div>
            <h3
              className="
                font-semibold
                text-base
                sm:text-lg
              "
            >
              Escolha o tamanho
            </h3>

            {selectedSize && (
              <p
                className="
                  text-sm
                  text-gray-500
                  mt-1
                "
              >
                Selecionado:{" "}
                <strong className="text-black">
                  {selectedSize}
                </strong>
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() =>
              setGuideOpen(true)
            }
            className="
              flex
              items-center
              gap-1.5
              text-xs
              sm:text-sm
              font-semibold
              text-gray-500
              hover:text-black
              underline
              underline-offset-4
            "
          >
            <Ruler size={15} />

            Guia de medidas
          </button>
        </div>

        <div
          className="
            flex
            gap-2
            sm:gap-3
            flex-wrap
          "
        >
          {sizes.map(
            (size) => {
              const selected =
                selectedSize ===
                size;

              return (
                <button
                  key={size}
                  type="button"
                  onClick={() =>
                    setSelectedSize(
                      size
                    )
                  }
                  aria-pressed={
                    selected
                  }
                  className={`
                    min-w-14
                    sm:min-w-16
                    min-h-12
                    sm:min-h-14
                    px-4
                    rounded-xl
                    border-2
                    font-bold
                    flex
                    items-center
                    justify-center
                    gap-1
                    transition-all
                    duration-200
                    active:scale-95

                    ${
                      selected
                        ? "bg-black text-white border-black shadow-md"
                        : "bg-white text-black border-gray-200 hover:border-black"
                    }
                  `}
                >
                  {selected && (
                    <Check
                      size={15}
                      className="
                        hidden
                        sm:block
                      "
                    />
                  )}

                  {size}
                </button>
              );
            }
          )}
        </div>

        {!selectedSize && (
          <p
            className="
              text-xs
              sm:text-sm
              text-gray-400
            "
          >
            Selecione um tamanho antes
            de adicionar ao carrinho.
          </p>
        )}
      </div>

      <SizeGuideModal
        isOpen={guideOpen}
        onClose={() =>
          setGuideOpen(false)
        }
      />
    </>
  );
}