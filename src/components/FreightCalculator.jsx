import { useState } from "react";

import {
  CheckCircle2,
  Clock3,
  MapPin,
  PackageCheck,
  Search,
  Truck,
} from "lucide-react";

import storeConfig from "../config/storeConfig";

export default function FreightCalculator() {
  const [cep, setCep] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [result, setResult] =
    useState(null);

  const [selectedShipping, setSelectedShipping] =
    useState(null);

  function formatCep(value) {
    const numbers = value
      .replace(/\D/g, "")
      .slice(0, 8);

    if (numbers.length <= 5) {
      return numbers;
    }

    return `${numbers.slice(
      0,
      5
    )}-${numbers.slice(5)}`;
  }

  function handleCepChange(event) {
    const formattedCep =
      formatCep(event.target.value);

    setCep(formattedCep);

    setError("");
    setResult(null);
    setSelectedShipping(null);
  }

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

  async function calculateFreight() {
    const cleanCep =
      cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) {
      setError(
        "Digite um CEP válido com 8 números."
      );

      setResult(null);

      return;
    }

    if (
      cleanCep ===
      storeConfig.address.cepNumbers
    ) {
      setError(
        "Esse é o CEP de origem da loja. Digite o CEP de entrega."
      );

      setResult(null);

      return;
    }

    setError("");
    setLoading(true);
    setResult(null);
    setSelectedShipping(null);

    try {
      /*
        ========================================
        INTEGRAÇÃO REAL DOS CORREIOS
        ========================================

        Futuramente esta parte chamará
        NOSSO BACKEND.

        O backend receberá:

        CEP origem:
        storeConfig.address.cepNumbers

        CEP destino:
        cleanCep

        peso do produto
        altura
        largura
        comprimento

        E retornará os serviços reais
        disponíveis pelos Correios.

        NÃO colocar senha/token dos
        Correios diretamente neste arquivo.
      */

      await new Promise(
        (resolve) =>
          setTimeout(resolve, 900)
      );

      /*
        RESULTADO TEMPORÁRIO.

        Estes preços NÃO são cotações
        oficiais dos Correios.

        Servem apenas para desenvolver
        e testar a interface.
      */

      const shippingOptions = [
        {
          id: "standard",

          name: "Entrega Econômica",

          description:
            "Opção econômica",

          price: 19.9,

          days:
            "5 a 8 dias úteis",
        },

        {
          id: "express",

          name: "Entrega Expressa",

          description:
            "Opção mais rápida",

          price: 32.9,

          days:
            "2 a 4 dias úteis",
        },
      ];

      setResult({
        destinationCep:
          formatCep(cleanCep),

        originCep:
          storeConfig.address.cep,

        options:
          shippingOptions,
      });

      setSelectedShipping(
        shippingOptions[0].id
      );
    } catch (error) {
      console.error(
        "Erro ao calcular frete:",
        error
      );

      setError(
        "Não foi possível calcular o frete. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      calculateFreight();
    }
  }

  return (
    <div
      className="
        border
        border-gray-200
        rounded-3xl
        p-5
        sm:p-6
        md:p-7
        space-y-6
        bg-white
      "
    >
      {/* CABEÇALHO */}

      <div
        className="
          flex
          items-start
          gap-4
        "
      >
        <div
          className="
            w-12
            h-12
            rounded-full
            bg-gray-100
            flex
            items-center
            justify-center
            flex-shrink-0
          "
        >
          <Truck size={22} />
        </div>

        <div>
          <h3
            className="
              font-black
              text-xl
            "
          >
            Calcular Frete
          </h3>

          <p
            className="
              text-sm
              text-gray-500
              mt-1
            "
          >
            Informe seu CEP para
            consultar as opções de
            entrega.
          </p>
        </div>
      </div>

      {/* CEP */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          gap-3
        "
      >
        <div
          className="
            relative
            flex-1
          "
        >
          <MapPin
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            value={cep}
            onChange={
              handleCepChange
            }
            onKeyDown={
              handleKeyDown
            }
            placeholder="00000-000"
            maxLength={9}
            className="
              w-full
              border-2
              border-gray-200
              rounded-xl
              pl-11
              pr-4
              py-4
              outline-none
              focus:border-black
              transition
            "
          />
        </div>

        <button
          type="button"
          onClick={
            calculateFreight
          }
          disabled={loading}
          className="
            bg-black
            text-white

            px-7
            py-4

            rounded-xl

            font-bold

            flex
            items-center
            justify-center
            gap-2

            hover:bg-gray-800
            active:scale-95

            transition-all
            duration-200

            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {loading ? (
            <>
              <span
                className="
                  w-5
                  h-5
                  rounded-full
                  border-2
                  border-white/30
                  border-t-white
                  animate-spin
                "
              />

              Calculando...
            </>
          ) : (
            <>
              <Search size={18} />

              Calcular
            </>
          )}
        </button>
      </div>

      {/* ERRO */}

      {error && (
        <div
          className="
            bg-red-50
            border
            border-red-100
            text-red-700
            rounded-xl
            p-4
            text-sm
            font-medium
          "
        >
          {error}
        </div>
      )}

      {/* RESULTADOS */}

      {result && (
        <div
          className="
            space-y-5
            animate-[fadeIn_0.3s_ease]
          "
        >
          {/* ROTA */}

          <div
            className="
              bg-gray-50
              rounded-2xl
              p-4
              sm:p-5
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <PackageCheck
                size={20}
                className="
                  flex-shrink-0
                "
              />

              <div
                className="
                  text-sm
                  min-w-0
                "
              >
                <p
                  className="
                    text-gray-500
                  "
                >
                  Envio
                </p>

                <p
                  className="
                    font-bold
                    mt-1
                  "
                >
                  Barueri/SP{" "}
                  <span
                    className="
                      text-gray-400
                      mx-1
                    "
                  >
                    →
                  </span>{" "}
                  CEP{" "}
                  {
                    result.destinationCep
                  }
                </p>
              </div>
            </div>
          </div>

          {/* OPÇÕES */}

          <div className="space-y-3">
            <p
              className="
                text-sm
                font-bold
                text-gray-500
              "
            >
              Opções de entrega
            </p>

            {result.options.map(
              (option) => {
                const selected =
                  selectedShipping ===
                  option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() =>
                      setSelectedShipping(
                        option.id
                      )
                    }
                    className={`
                      w-full
                      text-left

                      border-2
                      rounded-2xl

                      p-4
                      sm:p-5

                      flex
                      items-center
                      gap-4

                      transition-all
                      duration-200

                      ${
                        selected
                          ? "border-black bg-gray-50 shadow-sm"
                          : "border-gray-200 hover:border-gray-400"
                      }
                    `}
                  >
                    <div
                      className={`
                        w-11
                        h-11
                        rounded-full

                        flex
                        items-center
                        justify-center

                        flex-shrink-0

                        ${
                          selected
                            ? "bg-black text-white"
                            : "bg-gray-100 text-black"
                        }
                      `}
                    >
                      {selected ? (
                        <CheckCircle2
                          size={21}
                        />
                      ) : (
                        <Truck
                          size={20}
                        />
                      )}
                    </div>

                    <div
                      className="
                        flex-1
                        min-w-0
                      "
                    >
                      <p
                        className="
                          font-black
                        "
                      >
                        {option.name}
                      </p>

                      <p
                        className="
                          text-xs
                          sm:text-sm
                          text-gray-500
                          mt-1
                        "
                      >
                        {
                          option.description
                        }
                      </p>

                      <div
                        className="
                          flex
                          items-center
                          gap-1.5
                          text-xs
                          sm:text-sm
                          text-gray-500
                          mt-2
                        "
                      >
                        <Clock3
                          size={14}
                        />

                        {option.days}
                      </div>
                    </div>

                    <div
                      className="
                        text-right
                        flex-shrink-0
                      "
                    >
                      <p
                        className="
                          text-lg
                          sm:text-xl
                          font-black
                        "
                      >
                        {formatPrice(
                          option.price
                        )}
                      </p>
                    </div>
                  </button>
                );
              }
            )}
          </div>

          {/* AVISO TEMPORÁRIO */}

          <p
            className="
              text-xs
              text-gray-400
              leading-5
            "
          >
            Valores demonstrativos
            enquanto a integração
            oficial de frete não está
            conectada.
          </p>
        </div>
      )}
    </div>
  );
}