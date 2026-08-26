import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const CartContext = createContext();

const CART_STORAGE_KEY = "didios-cart";

function getInitialCart() {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (!savedCart) {
      return [];
    }

    const parsedCart = JSON.parse(savedCart);

    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch (error) {
    console.error(
      "Erro ao carregar o carrinho:",
      error
    );

    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(getInitialCart);

  useEffect(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cart)
      );
    } catch (error) {
      console.error(
        "Erro ao salvar o carrinho:",
        error
      );
    }
  }, [cart]);

  function addToCart(
    product,
    quantity = 1,
    size = null,
    color = null
  ) {
    const safeQuantity = Math.max(
      1,
      Number(quantity) || 1
    );

    setCart((currentCart) => {
      const exists = currentCart.find(
        (item) =>
          item.id === product.id &&
          item.size === size &&
          item.color === color
      );

      if (exists) {
        return currentCart.map((item) =>
          item.id === product.id &&
          item.size === size &&
          item.color === color
            ? {
                ...item,
                quantity:
                  item.quantity + safeQuantity,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: safeQuantity,
          size,
          color,
        },
      ];
    });
  }

  function removeFromCart(id, size, color) {
    setCart((currentCart) =>
      currentCart.filter(
        (item) =>
          !(
            item.id === id &&
            item.size === size &&
            item.color === color
          )
      )
    );
  }

  function increase(id, size, color) {
    setCart((currentCart) =>
      currentCart.map((item) => {
        const isProduct =
          item.id === id &&
          item.size === size &&
          item.color === color;

        if (!isProduct) {
          return item;
        }

        const stock = Number(item.stock);

        if (
          Number.isFinite(stock) &&
          stock > 0 &&
          item.quantity >= stock
        ) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      })
    );
  }

  function decrease(id, size, color) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id &&
          item.size === size &&
          item.color === color
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function clearCart() {
    setCart([]);
  }

  const total = useMemo(() => {
    return cart.reduce((acc, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;

      return acc + price * quantity;
    }, 0);
  }, [cart]);

  const itemCount = useMemo(() => {
    return cart.reduce(
      (acc, item) =>
        acc + (Number(item.quantity) || 0),
      0
    );
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increase,
        decrease,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}