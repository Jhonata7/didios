import {
  useContext,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  MapPin,
  Package,
} from "lucide-react";

import {
  OrdersContext,
} from "../context/OrdersContext";

export default function OrderDetails() {
  const {
    id,
  } = useParams();

  const {
    getOrder,
  } = useContext(
    OrdersContext
  );

  const order =
    getOrder(id);

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

  if (!order) {
    return (
      <main
        className="
          max-w-5xl
          mx-auto
          py-24
          px-6
          text-center
        "
      >
        <Package
          size={70}
          className="
            mx-auto
            text-gray-300
          "
        />

        <h1
          className="
            text-4xl
            font-black
            mt-6
          "
        >
          Pedido não encontrado
        </h1>

        <Link
          to="/meus-pedidos"
          className="
            inline-block
            mt-8
            bg-black
            text-white
            px-8
            py-4
            rounded-full
            font-bold
          "
        >
          Voltar aos pedidos
        </Link>
      </main>
    );
  }

  return (
    <main
      className="
        max-w-5xl
        mx-auto
        px-6
        py-16
      "
    >
      <Link
        to="/meus-pedidos"
        className="
          inline-flex
          items-center
          gap-2
          text-gray-500
          hover:text-black
        "
      >
        <ArrowLeft
          size={18}
        />

        Meus pedidos
      </Link>

      <div className="mt-8">
        <p
          className="
            text-green-600
            font-bold
          "
        >
          {order.status}
        </p>

        <h1
          className="
            text-4xl
            md:text-5xl
            font-black
            mt-2
          "
        >
          Pedido {order.id}
        </h1>

        <p
          className="
            text-gray-500
            mt-3
          "
        >
          {order.createdAt}
        </p>
      </div>

      <section
        className="
          bg-white
          border
          rounded-3xl
          p-6
          md:p-8
          mt-10
        "
      >
        <h2
          className="
            text-2xl
            font-black
            mb-7
          "
        >
          Produtos
        </h2>

        <div className="space-y-6">
          {order.products?.map(
            (item) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="
                  flex
                  gap-4
                  border-b
                  pb-6
                  last:border-0
                "
              >
                <img
                  src={
                    item.image
                  }
                  alt={
                    item.name
                  }
                  className="
                    w-24
                    h-28
                    rounded-2xl
                    object-cover
                  "
                />

                <div className="flex-1">
                  <h3 className="font-black">
                    {
                      item.name
                    }
                  </h3>

                  <p
                    className="
                      text-sm
                      text-gray-500
                      mt-2
                    "
                  >
                    Cor:{" "}
                    {item.color}
                  </p>

                  <p
                    className="
                      text-sm
                      text-gray-500
                    "
                  >
                    Tamanho:{" "}
                    {item.size}
                  </p>

                  <p
                    className="
                      text-sm
                      text-gray-500
                    "
                  >
                    Quantidade:{" "}
                    {
                      item.quantity
                    }
                  </p>
                </div>

                <strong>
                  {formatPrice(
                    item.price *
                      item.quantity
                  )}
                </strong>
              </div>
            )
          )}
        </div>
      </section>

      <section
        className="
          grid
          md:grid-cols-2
          gap-6
          mt-6
        "
      >
        <div
          className="
            bg-white
            border
            rounded-3xl
            p-7
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <MapPin />

            <h2 className="font-black text-xl">
              Endereço
            </h2>
          </div>

          <div
            className="
              mt-5
              text-gray-600
            "
          >
            <p>
              {
                order.address
                  ?.street
              }
              ,{" "}
              {
                order.address
                  ?.number
              }
            </p>

            <p>
              {
                order.address
                  ?.district
              }
            </p>

            <p>
              {
                order.address
                  ?.city
              }
              /
              {
                order.address
                  ?.state
              }
            </p>

            <p>
              CEP{" "}
              {
                order.address
                  ?.cep
              }
            </p>
          </div>
        </div>

        <div
          className="
            bg-black
            text-white
            rounded-3xl
            p-7
          "
        >
          <h2
            className="
              text-xl
              font-black
              mb-5
            "
          >
            Pagamento
          </h2>

          <p className="text-gray-400">
            Método
          </p>

          <strong>
            {order.payment}
          </strong>

          <div
            className="
              border-t
              border-gray-700
              mt-6
              pt-6
              space-y-3
            "
          >
            <div className="flex justify-between">
              <span>
                Subtotal
              </span>

              <span>
                {formatPrice(
                  order.subtotal
                )}
              </span>
            </div>

            <div className="flex justify-between">
              <span>
                Desconto
              </span>

              <span className="text-green-400">
                -{" "}
                {formatPrice(
                  order.discount
                )}
              </span>
            </div>

            <div
              className="
                flex
                justify-between
                text-2xl
                font-black
              "
            >
              <span>Total</span>

              <span>
                {formatPrice(
                  order.total
                )}
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}