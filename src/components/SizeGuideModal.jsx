import { useEffect } from "react";
import { Ruler, X } from "lucide-react";

export default function SizeGuideModal({
  isOpen,
  onClose,
}) {
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

  if (!isOpen) {
    return null;
  }

  const measurements = [
    {
      size: "P",
      chest: "48 cm",
      length: "68 cm",
      sleeve: "20 cm",
    },
    {
      size: "M",
      chest: "51 cm",
      length: "70 cm",
      sleeve: "21 cm",
    },
    {
      size: "G",
      chest: "54 cm",
      length: "72 cm",
      sleeve: "22 cm",
    },
    {
      size: "GG",
      chest: "58 cm",
      length: "75 cm",
      sleeve: "23 cm",
    },
  ];

  return (
    <div
      onClick={onClose}
      className="
        fixed
        inset-0
        z-[120]
        bg-black/60
        backdrop-blur-sm
        flex
        items-end
        sm:items-center
        justify-center
        sm:p-6
      "
    >
      <div
        onClick={(event) =>
          event.stopPropagation()
        }
        className="
          bg-white
          w-full
          sm:max-w-2xl
          max-h-[90vh]
          overflow-y-auto
          rounded-t-3xl
          sm:rounded-3xl
          shadow-2xl
        "
      >
        <div
          className="
            sticky
            top-0
            bg-white
            border-b
            px-5
            sm:px-7
            py-5
            flex
            items-center
            justify-between
            z-10
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                w-11
                h-11
                rounded-full
                bg-gray-100
                flex
                items-center
                justify-center
              "
            >
              <Ruler size={21} />
            </div>

            <div>
              <h2
                className="
                  text-xl
                  sm:text-2xl
                  font-black
                "
              >
                Guia de Medidas
              </h2>

              <p
                className="
                  text-xs
                  sm:text-sm
                  text-gray-500
                  mt-1
                "
              >
                Medidas aproximadas da peça
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar guia de medidas"
            className="
              w-10
              h-10
              rounded-full
              flex
              items-center
              justify-center
              hover:bg-gray-100
              duration-200
            "
          >
            <X size={21} />
          </button>
        </div>

        <div
          className="
            px-5
            sm:px-7
            py-6
          "
        >
          <p
            className="
              text-gray-600
              leading-7
            "
          >
            Para encontrar o tamanho ideal,
            compare as medidas abaixo com uma
            peça semelhante que você já possui.
          </p>

          <div
            className="
              mt-6
              overflow-x-auto
              rounded-2xl
              border
            "
          >
            <table
              className="
                w-full
                min-w-[520px]
                text-left
              "
            >
              <thead
                className="
                  bg-black
                  text-white
                "
              >
                <tr>
                  <th className="px-5 py-4">
                    Tamanho
                  </th>

                  <th className="px-5 py-4">
                    Peito
                  </th>

                  <th className="px-5 py-4">
                    Comprimento
                  </th>

                  <th className="px-5 py-4">
                    Manga
                  </th>
                </tr>
              </thead>

              <tbody>
                {measurements.map(
                  (item) => (
                    <tr
                      key={item.size}
                      className="
                        border-b
                        last:border-b-0
                      "
                    >
                      <td
                        className="
                          px-5
                          py-4
                          font-black
                        "
                      >
                        {item.size}
                      </td>

                      <td className="px-5 py-4">
                        {item.chest}
                      </td>

                      <td className="px-5 py-4">
                        {item.length}
                      </td>

                      <td className="px-5 py-4">
                        {item.sleeve}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          <div
            className="
              mt-6
              bg-gray-50
              rounded-2xl
              p-5
            "
          >
            <h3 className="font-black">
              Como medir
            </h3>

            <p
              className="
                text-sm
                text-gray-600
                leading-6
                mt-2
              "
            >
              Meça a peça sobre uma superfície
              plana. O peito corresponde à largura
              de uma axila à outra. O comprimento
              vai do ponto mais alto do ombro até
              a barra.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              mt-6
              w-full
              bg-black
              text-white
              py-4
              rounded-full
              font-black
              hover:bg-gray-800
              duration-300
            "
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
}