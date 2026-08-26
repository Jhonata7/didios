import {
  useContext,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  ChevronRight,
  Package,
} from "lucide-react";

import {
  OrdersContext,
} from "../context/OrdersContext";

export default function MyOrders() {
  const {
    orders,
  } = useContext(
    OrdersContext
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

  if (orders.length === 0) {
    return (
      <main
        className="
          max-w-6xl
          mx-auto
          px-6
          py-24
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
          Nenhum pedido ainda
        </h1>

        <p
          className="
            text-gray-500
            mt-4
          "
        >
          Seus pedidos aparecerão
          aqui depois da compra.
        </p>

        <Link
          to="/"
          className="
            inline-block
            mt-8
            bg-black
            text-white
            px-9
            py-4
            rounded-full
            font-bold
          "
        >
          Comprar agora
        </Link>
      </main>
    );
  }

  return (
    <main
      className="
        max-w-6xl
        mx-auto
        px-6
        py-16
      "
    >
      <div className="mb-10">
        <h1
          className="
            text-4xl
            md:text-5xl
            font-black
          "
        >
          Meus Pedidos
        </h1>

        <p
          className="
            text-gray-500
            mt-3
          "
        >
          Acompanhe suas compras.
        </p>
      </div>

      <div className="space-y-5">
        {orders.map(
          (order) => (
            <Link
              key={order.id}
              to={`/pedido/${order.id}`}
              className="
                bg-white
                border
                rounded-3xl
                p-6
                flex
                flex-col
                md:flex-row
                md:items-center
                gap-5
                hover:shadow-lg
                duration-300
              "
            >
              <div
                className="
                  w-14
                  h-14
                  rounded-full
                  bg-gray-100
                  flex
                  items-center
                  justify-center
                "
              >
                <Package
                  size={25}
                />
              </div>

              <div className="flex-1">
                <h2 className="font-black text-lg">
                  Pedido{" "}
                  {order.id}
                </h2>

                <p
                  className="
                    text-sm
                    text-gray-500
                    mt-1
                  "
                >
                  {order.createdAt}
                </p>

                <p
                  className="
                    text-sm
                    text-green-600
                    font-semibold
                    mt-2
                  "
                >
                  {order.status}
                </p>
              </div>

              <div>
                <p
                  className="
                    text-sm
                    text-gray-500
                  "
                >
                  Total
                </p>

                <strong
                  className="
                    text-xl
                    font-black
                  "
                >
                  {formatPrice(
                    order.total
                  )}
                </strong>
              </div>

              <ChevronRight
                className="hidden md:block"
              />
            </Link>
          )
        )}
      </div>
    </main>
  );
}