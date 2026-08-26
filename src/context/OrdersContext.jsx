import {
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

export const OrdersContext = createContext();

const ORDERS_STORAGE_KEY = "didios-orders";
const LAST_ORDER_STORAGE_KEY = "didios-last-order";

function getInitialOrders() {
  try {
    const saved = localStorage.getItem(
      ORDERS_STORAGE_KEY
    );

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch (error) {
    console.error(
      "Erro ao carregar pedidos:",
      error
    );

    return [];
  }
}

export function OrdersProvider({
  children,
}) {
  const [orders, setOrders] = useState(
    getInitialOrders
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        ORDERS_STORAGE_KEY,
        JSON.stringify(orders)
      );
    } catch (error) {
      console.error(
        "Erro ao salvar pedidos:",
        error
      );
    }
  }, [orders]);

  const addOrder = useCallback(
    (order) => {
      setOrders((currentOrders) => [
        order,
        ...currentOrders,
      ]);

      try {
        localStorage.setItem(
          LAST_ORDER_STORAGE_KEY,
          JSON.stringify(order)
        );
      } catch (error) {
        console.error(
          "Erro ao salvar último pedido:",
          error
        );
      }

      return order;
    },
    []
  );

  const getOrder = useCallback(
    (id) => {
      return orders.find(
        (order) =>
          String(order.id) === String(id)
      );
    },
    [orders]
  );

  function clearOrders() {
    setOrders([]);

    localStorage.removeItem(
      LAST_ORDER_STORAGE_KEY
    );
  }

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
        getOrder,
        clearOrders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}