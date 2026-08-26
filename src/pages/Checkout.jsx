import {
  useContext,
  useMemo,
  useState,
} from "react";

import {
  Navigate,
  useNavigate,
} from "react-router-dom";

import {
  Banknote,
  CreditCard,
  LockKeyhole,
  QrCode,
  Tag,
  X,
} from "lucide-react";

import { CartContext } from "../context/CartContext";
import { OrdersContext } from "../context/OrdersContext";

import AddressForm from "../components/AddressForm";

export default function Checkout() {
  const {
    cart,
    total,
    clearCart,
  } = useContext(CartContext);

  const {
    addOrder,
  } = useContext(OrdersContext);

  const navigate = useNavigate();

  const [coupon, setCoupon] = useState("");

  const [
    appliedCoupon,
    setAppliedCoupon,
  ] = useState(null);

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [customer, setCustomer] =
    useState({
      name: "",
      email: "",
      phone: "",
    });

  const [address, setAddress] =
    useState({
      cep: "",
      street: "",
      number: "",
      district: "",
      city: "",
      state: "",
    });

  const [payment, setPayment] =
    useState("");

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

  const discount = useMemo(() => {
    if (!appliedCoupon) {
      return 0;
    }

    return (
      total *
      appliedCoupon.percentage
    );
  }, [total, appliedCoupon]);

  const finalTotal = Math.max(
    total - discount,
    0
  );

  if (cart.length === 0) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  function applyCoupon() {
    const code = coupon
      .trim()
      .toUpperCase();

    const coupons = {
      DIDIOS10: {
        code: "DIDIOS10",
        percentage: 0.1,
        label: "10%",
      },

      BLACK20: {
        code: "BLACK20",
        percentage: 0.2,
        label: "20%",
      },

      PRIME50: {
        code: "PRIME50",
        percentage: 0.5,
        label: "50%",
      },
    };

    const selected =
      coupons[code];

    if (!selected) {
      setAppliedCoupon(null);
      setMessage(
        "❌ Cupom inválido."
      );

      return;
    }

    setAppliedCoupon(selected);

    setMessage(
      `✅ Cupom ${selected.code} aplicado!`
    );
  }

  function removeCoupon() {
    setAppliedCoupon(null);
    setCoupon("");
    setMessage("");
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email
    );
  }

  function validatePhone(phone) {
    const digits =
      phone.replace(/\D/g, "");

    return digits.length >= 10;
  }

  function generateOrderNumber() {
    const random = Math.floor(
      100000 +
        Math.random() * 900000
    );

    return `DD-${random}`;
  }

  async function finishOrder() {
    if (loading) {
      return;
    }

    const name =
      customer.name.trim();

    const email =
      customer.email.trim();

    const phone =
      customer.phone.trim();

    if (!name || !email || !phone) {
      alert(
        "Preencha todos os dados do cliente."
      );

      return;
    }

    if (!validateEmail(email)) {
      alert(
        "Digite um e-mail válido."
      );

      return;
    }

    if (!validatePhone(phone)) {
      alert(
        "Digite um telefone válido com DDD."
      );

      return;
    }

    if (
      !address.cep ||
      !address.street ||
      !address.number ||
      !address.city ||
      !address.state
    ) {
      alert(
        "Preencha corretamente o endereço."
      );

      return;
    }

    if (!payment) {
      alert(
        "Escolha uma forma de pagamento."
      );

      return;
    }

    setLoading(true);

    try {
      await new Promise(
        (resolve) =>
          setTimeout(
            resolve,
            1200
          )
      );

      const now = new Date();

      const order = {
        id: generateOrderNumber(),

        createdAt:
          now.toLocaleString(
            "pt-BR"
          ),

        createdAtISO:
          now.toISOString(),

        customer: {
          name,
          email,
          phone,
        },

        address: {
          ...address,
        },

        payment,

        coupon:
          appliedCoupon?.code ||
          null,

        discount,

        subtotal: total,

        shipping: 0,

        total: finalTotal,

        products: cart.map(
          (item) => ({
            ...item,
          })
        ),

        status:
          "Pedido Recebido",
      };

      addOrder(order);

      clearCart();

      navigate("/success", {
        replace: true,
      });
    } catch (error) {
      console.error(
        "Erro ao finalizar pedido:",
        error
      );

      alert(
        "Não foi possível finalizar o pedido."
      );

      setLoading(false);
    }
  }

  const paymentOptions = [
    {
      value: "PIX",
      title: "PIX",
      description:
        "Pagamento rápido e seguro",
      icon: QrCode,
    },

    {
      value:
        "Cartão de Crédito",
      title:
        "Cartão de Crédito",
      description:
        "Pague com cartão",
      icon: CreditCard,
    },

    {
      value:
        "Boleto Bancário",
      title:
        "Boleto Bancário",
      description:
        "Pagamento via boleto",
      icon: Banknote,
    },
  ];

  return (
    <main
      className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        py-10
        md:py-16
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
          Finalizar Compra
        </h1>

        <p
          className="
            mt-3
            text-gray-500
          "
        >
          Confira seus dados antes
          de concluir o pedido.
        </p>
      </div>

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-10
        "
      >
        <section
          className="
            lg:col-span-2
            space-y-8
          "
        >
          <div
            className="
              bg-white
              rounded-3xl
              border
              shadow-sm
              p-6
              md:p-8
            "
          >
            <p
              className="
                text-sm
                text-gray-400
                font-bold
                uppercase
              "
            >
              Etapa 1
            </p>

            <h2
              className="
                text-2xl
                font-black
                mt-1
                mb-6
              "
            >
              Dados do Cliente
            </h2>

            <div className="grid gap-4">
              <input
                type="text"
                autoComplete="name"
                placeholder="Nome completo"
                value={
                  customer.name
                }
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    name:
                      e.target
                        .value,
                  })
                }
                className="
                  border
                  rounded-xl
                  px-5
                  py-4
                  outline-none
                  focus:border-black
                "
              />

              <input
                type="email"
                autoComplete="email"
                placeholder="E-mail"
                value={
                  customer.email
                }
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    email:
                      e.target
                        .value,
                  })
                }
                className="
                  border
                  rounded-xl
                  px-5
                  py-4
                  outline-none
                  focus:border-black
                "
              />

              <input
                type="tel"
                autoComplete="tel"
                placeholder="Telefone com DDD"
                value={
                  customer.phone
                }
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    phone:
                      e.target
                        .value,
                  })
                }
                className="
                  border
                  rounded-xl
                  px-5
                  py-4
                  outline-none
                  focus:border-black
                "
              />
            </div>
          </div>

          <div>
            <p
              className="
                text-sm
                text-gray-400
                font-bold
                uppercase
                mb-4
                px-1
              "
            >
              Etapa 2
            </p>

            <AddressForm
              address={address}
              setAddress={
                setAddress
              }
            />
          </div>

          <div
            className="
              bg-white
              rounded-3xl
              border
              shadow-sm
              p-6
              md:p-8
            "
          >
            <p
              className="
                text-sm
                text-gray-400
                font-bold
                uppercase
              "
            >
              Etapa 3
            </p>

            <h2
              className="
                text-2xl
                font-black
                mt-1
                mb-6
              "
            >
              Forma de Pagamento
            </h2>

            <div className="space-y-4">
              {paymentOptions.map(
                (option) => {
                  const Icon =
                    option.icon;

                  const selected =
                    payment ===
                    option.value;

                  return (
                    <label
                      key={
                        option.value
                      }
                      className={`
                        flex
                        items-center
                        gap-4
                        border-2
                        rounded-2xl
                        p-5
                        cursor-pointer
                        duration-200

                        ${
                          selected
                            ? "border-black bg-gray-50"
                            : "border-gray-200 hover:border-gray-400"
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={
                          option.value
                        }
                        checked={
                          selected
                        }
                        onChange={(
                          e
                        ) =>
                          setPayment(
                            e.target
                              .value
                          )
                        }
                        className="accent-black"
                      />

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
                        <Icon
                          size={21}
                        />
                      </div>

                      <div>
                        <p className="font-black">
                          {
                            option.title
                          }
                        </p>

                        <p
                          className="
                            text-sm
                            text-gray-500
                          "
                        >
                          {
                            option.description
                          }
                        </p>
                      </div>
                    </label>
                  );
                }
              )}
            </div>
          </div>
        </section>

        <aside
          className="
            bg-black
            text-white
            rounded-3xl
            p-6
            md:p-8
            h-fit
            lg:sticky
            lg:top-24
          "
        >
          <h2
            className="
              text-3xl
              font-black
              mb-8
            "
          >
            Resumo do Pedido
          </h2>

          <div
            className="
              space-y-5
              max-h-[360px]
              overflow-y-auto
            "
          >
            {cart.map(
              (item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="
                    flex
                    gap-4
                    border-b
                    border-gray-700
                    pb-5
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
                    <h3 className="font-bold">
                      {
                        item.name
                      }
                    </h3>

                    <p
                      className="
                        text-sm
                        text-gray-400
                        mt-2
                      "
                    >
                      Cor:{" "}
                      {item.color}
                    </p>

                    <p
                      className="
                        text-sm
                        text-gray-400
                      "
                    >
                      Tamanho:{" "}
                      {item.size}
                    </p>

                    <p
                      className="
                        text-sm
                        text-gray-400
                      "
                    >
                      Quantidade:{" "}
                      {
                        item.quantity
                      }
                    </p>

                    <p
                      className="
                        mt-3
                        font-bold
                      "
                    >
                      {formatPrice(
                        item.price *
                          item.quantity
                      )}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>

          <div className="mt-8">
            <div
              className="
                flex
                items-center
                gap-2
                mb-4
              "
            >
              <Tag size={18} />

              <span className="font-bold">
                Cupom
              </span>
            </div>

            {!appliedCoupon ? (
              <div className="flex gap-2">
                <input
                  value={coupon}
                  onChange={(
                    e
                  ) => {
                    setCoupon(
                      e.target
                        .value
                    );

                    setMessage(
                      ""
                    );
                  }}
                  placeholder="DIDIOS10"
                  className="
                    min-w-0
                    flex-1
                    text-black
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                  "
                />

                <button
                  type="button"
                  onClick={
                    applyCoupon
                  }
                  className="
                    bg-white
                    text-black
                    px-4
                    rounded-xl
                    font-bold
                  "
                >
                  Aplicar
                </button>
              </div>
            ) : (
              <div
                className="
                  flex
                  justify-between
                  items-center
                  border
                  border-green-700
                  bg-green-950
                  rounded-xl
                  p-4
                "
              >
                <div>
                  <p
                    className="
                      text-xs
                      text-green-300
                    "
                  >
                    Cupom aplicado
                  </p>

                  <strong>
                    {
                      appliedCoupon.code
                    }{" "}
                    (
                    {
                      appliedCoupon.label
                    } OFF)
                  </strong>
                </div>

                <button
                  type="button"
                  onClick={
                    removeCoupon
                  }
                >
                  <X
                    size={18}
                  />
                </button>
              </div>
            )}

            {message &&
              !appliedCoupon && (
                <p className="text-sm mt-3">
                  {message}
                </p>
              )}
          </div>

          <div
            className="
              border-t
              border-gray-700
              mt-8
              pt-6
              space-y-4
            "
          >
            <div className="flex justify-between">
              <span>
                Subtotal
              </span>

              <span>
                {formatPrice(
                  total
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
                  discount
                )}
              </span>
            </div>

            <div className="flex justify-between">
              <span>
                Frete
              </span>

              <span className="text-green-400">
                Grátis
              </span>
            </div>

            <div
              className="
                border-t
                border-gray-700
                pt-5
                flex
                justify-between
                text-2xl
                font-black
              "
            >
              <span>Total</span>

              <span>
                {formatPrice(
                  finalTotal
                )}
              </span>
            </div>
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={
              finishOrder
            }
            className="
              mt-8
              w-full
              bg-white
              text-black
              py-5
              rounded-full
              font-black
              hover:scale-[1.02]
              duration-300
              disabled:opacity-50
            "
          >
            {loading
              ? "Processando..."
              : `Finalizar • ${formatPrice(
                  finalTotal
                )}`}
          </button>

          <p
            className="
              text-xs
              text-gray-400
              mt-5
              flex
              justify-center
              items-center
              gap-2
            "
          >
            <LockKeyhole
              size={14}
            />

            Ambiente seguro
          </p>
        </aside>
      </div>
    </main>
  );
}