import {
  createContext,
  useEffect,
  useState,
} from "react";

export const FavoritesContext = createContext();

const FAVORITES_STORAGE_KEY = "didios-favorites";

function getInitialFavorites() {
  try {
    const savedFavorites = localStorage.getItem(
      FAVORITES_STORAGE_KEY
    );

    if (!savedFavorites) {
      return [];
    }

    const parsedFavorites = JSON.parse(
      savedFavorites
    );

    return Array.isArray(parsedFavorites)
      ? parsedFavorites
      : [];
  } catch (error) {
    console.error(
      "Erro ao carregar favoritos:",
      error
    );

    return [];
  }
}

export function FavoritesProvider({
  children,
}) {
  const [favorites, setFavorites] = useState(
    getInitialFavorites
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(favorites)
      );
    } catch (error) {
      console.error(
        "Erro ao salvar favoritos:",
        error
      );
    }
  }, [favorites]);

  function toggleFavorite(product) {
    setFavorites((currentFavorites) => {
      const exists =
        currentFavorites.some(
          (item) =>
            item.id === product.id
        );

      if (exists) {
        return currentFavorites.filter(
          (item) =>
            item.id !== product.id
        );
      }

      return [
        ...currentFavorites,
        product,
      ];
    });
  }

  function isFavorite(productId) {
    return favorites.some(
      (item) =>
        item.id === productId
    );
  }

  function clearFavorites() {
    setFavorites([]);
  }

  const favoritesCount =
    favorites.length;

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoritesCount,
        toggleFavorite,
        isFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}