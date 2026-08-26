import {
  Check,
} from "lucide-react";

export default function ProductColors({
  product,
  selectedColor,
  setSelectedColor,
}) {
  const colors =
    product.colors || [];

  if (colors.length === 0) {
    return null;
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
          Escolha a cor
        </h3>

        {selectedColor && (
          <p
            className="
              text-sm
              text-gray-500
              mt-1
            "
          >
            Selecionada:{" "}
            <strong className="text-black">
              {selectedColor}
            </strong>
          </p>
        )}
      </div>

      <div
        className="
          flex
          gap-2
          sm:gap-3
          flex-wrap
        "
      >
        {colors.map(
          (color) => {
            const selected =
              selectedColor ===
              color;

            return (
              <button
                key={color}
                type="button"
                onClick={() =>
                  setSelectedColor(
                    color
                  )
                }
                aria-pressed={
                  selected
                }
                className={`
                  min-h-12
                  px-4
                  sm:px-5
                  py-3
                  rounded-xl
                  sm:rounded-2xl
                  border-2
                  font-semibold
                  text-sm
                  sm:text-base
                  flex
                  items-center
                  justify-center
                  gap-2
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
                    size={16}
                  />
                )}

                {color}
              </button>
            );
          }
        )}
      </div>
    </div>
  );
}