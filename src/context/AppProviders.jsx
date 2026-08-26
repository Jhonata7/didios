import { CartProvider } from "./CartContext";
import { FavoritesProvider } from "./FavoritesContext";
import { SearchProvider } from "./SearchContext";
import { OrdersProvider } from "./OrdersContext";

export default function AppProviders({
  children,
}) {
  return (
    <SearchProvider>
      <FavoritesProvider>
        <OrdersProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </OrdersProvider>
      </FavoritesProvider>
    </SearchProvider>
  );
}