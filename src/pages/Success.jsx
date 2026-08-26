import { Link } from "react-router-dom";

import {
  CheckCircle2,
  MapPin,
  Package,
  ShoppingBag,
} from "lucide-react";

export default function Success() {
  let order = null;

  try {
    const saved =
      localStorage.getItem(
        "didios-last-order"
      );

    order = saved
      ? JSON.parse(saved)
      : null;
  } catch {
    order = null;
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
          to="/"
          className="
            inline-block
            mt-10
            bg-black
            text-white
            px-10
            py-4
            rounded-full
            font-bold
          "
        >
          Voltar para a loja
        </Link>
      </main>
    );
  }

  return (
    <main
      className="
        max-w-5xl
        mx-auto
        py-16
        md:py-24
        px-6
      "
    >
      <div className="text-center">
        <CheckCircle2
          size={90}
          className="
            mx-auto
            text-green-600
          "
        />

        <h1
          className="
            text-4xl
            md:text-5xl
            font-black
            mt-8
          "
        >
          Pedido realizado!
        </h1>

        <p
          className="
            mt-5
            text-lg
            text-gray-600
          "
        >
          Obrigado pela compra,{" "}
          <strong>
            {order.customer?.name}
          </strong>
          .
        </p>

        <p
          className="
            mt-2
            text-gray-500
          "
        >
          Pedido{" "}
          <strong>
            {order.id}
          </strong>
        </p>
      </div>

      <section
        className="
          mt-14
          bg-white
          rounded-3xl
          border
          shadow-sm
          p-6
          md:p-8
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
            mb-8
          "
        >
          <Package />

          <h2
            className="
              text-2xl
              font-black
            "
          >
            Resumo do Pedido
          </h2>
        </div>

        <div
          className="
            grid
            md:grid-cols-2
            gap-6
          "
        >
          <div>
            <p className="text-gray-500">
              Número
            </p>

            <strong>
              {order.id}
            </strong>
          </div>

          <div>
            <p className="text-gray-500">
              Data
            </p>

            <strong>
              {order.createdAt}
            </strong>
          </div>

          <div>
            <p className="text-gray-500">
              Pagamento
            </p>

            <strong>
              {order.payment}
            </strong>
          </div>

          <div>
            <p className="text-gray-500">
              Status
            </p>

            <strong className="text-green-600">
              {order.status}
            </strong>
          </div>
        </div>

        <div
          className="
            border-t
            mt-8
            pt-8
          "
        >
          <h3
            className="
              font-black
              text-xl
              mb-5
            "
          >
            Produtos
          </h3>

          <div className="space-y-5">
            {order.products?.map(
              (item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="
                    flex
                    gap-4
                    border-b
                    pb-5
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
                      w-20
                      h-24
                      object-cover
                      rounded-xl
                    "
                  />

                  <div className="flex-1">
                    <strong>
                      {
                        item.name
                      }
                    </strong>

                    <p
                      className="
                        text-sm
                        text-gray-500
                        mt-1
                      "
                    >
                      {
                        item.color
                      }{" "}
                      •{" "}
                      {
                        item.size
                      }{" "}
                      • Qtd.{" "}
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
        </div>

        <div
          className="
            border-t
            mt-8
            pt-8
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
              mb-4
            "
          >
            <MapPin
              size={20}
            />

            <h3
              className="
                text-xl
                font-black
              "
            >
              Entrega
            </h3>
          </div>

          <p className="text-gray-600">
            {order.address?.street},{" "}
            {order.address?.number}
          </p>

          <p className="text-gray-600">
            {order.address?.district} -{" "}
            {order.address?.city}/
            {order.address?.state}
          </p>

          <p className="text-gray-600">
            CEP:{" "}
            {order.address?.cep}
          </p>
        </div>

        <div
          className="
            border-t
            mt-8
            pt-8
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

            <span className="text-green-600">
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
              pt-3
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
      </section>

      <div
        className="
          flex
          flex-wrap
          gap-4
          justify-center
          mt-12
        "
      >
        <Link
          to={`/pedido/${order.id}`}
          className="
            border-2
            border-black
            px-8
            py-4
            rounded-full
            font-bold
            hover:bg-black
            hover:text-white
            duration-300
          "
        >
          Ver Pedido
        </Link>

        <Link
          to="/"
          className="
            bg-black
            text-white
            px-8
            py-4
            rounded-full
            font-bold
            flex
            items-center
            gap-2
          "
        >
          <ShoppingBag
            size={18}
          />

          Continuar Comprando
        </Link>
      </div>
    </main>
  );
}