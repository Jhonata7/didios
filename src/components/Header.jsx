import { useContext, useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";

import { CartContext } from "../context/CartContext";
import { FavoritesContext } from "../context/FavoritesContext";
import { SearchContext } from "../context/SearchContext";

export default function Header({ onCartClick }) {
  const { itemCount } = useContext(CartContext);

  const { favoritesCount } = useContext(
    FavoritesContext
  );

  const {
    search,
    setSearch,
    setCategory,
  } = useContext(SearchContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const menuItems = [
    "Camisetas",
    "Camisas",
    "Calças",
    "Moletons",
    "Tênis",
  ];

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  function handleLogoClick() {
    setSearch("");
    setCategory("Todos");
    setMobileMenuOpen(false);

    navigate("/");
  }

  function handleCategory(category) {
    setSearch("");
    setCategory(category);
    setMobileMenuOpen(false);

    navigate("/");

    setTimeout(() => {
      document
        .getElementById("catalogo")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 100);
  }

  function handleSearchChange(event) {
    const value = event.target.value;

    setSearch(value);
    setCategory("Todos");

    if (location.pathname !== "/") {
      navigate("/");
    }
  }

  function clearSearch() {
    setSearch("");
    setCategory("Todos");
  }

  return (
    <>
      <header
        className="
          bg-white
          border-b
          sticky
          top-0
          z-30
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            min-h-20
            px-4
            sm:px-6
            lg:px-8
            flex
            items-center
            justify-between
            gap-3
          "
        >
          {/* MENU MOBILE */}

          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen(true)
            }
            className="
              xl:hidden
              w-10
              h-10
              flex
              items-center
              justify-center
              rounded-full
              hover:bg-gray-100
            "
            aria-label="Abrir menu"
          >
            <Menu size={24} />
          </button>

          {/* LOGO */}

          <button
            type="button"
            onClick={handleLogoClick}
            className="group flex items-center gap-2 flex-shrink-0 hover:opacity-75 duration-300"
          >
            <span className="font-serif text-3xl sm:text-4xl tracking-[-2px] leading-none text-black">diDios</span>
            <span className="h-1.5 w-1.5 rounded-full bg-black mt-4" aria-hidden="true" />
            <span className="sr-only">diDios</span>
          </button>

          {/* MENU DESKTOP */}

          <nav
            className="
              hidden
              xl:flex
              items-center
              gap-7
              font-medium
            "
          >
            {menuItems.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() =>
                  handleCategory(item)
                }
                className="
                  hover:text-gray-500
                  duration-300
                "
              >
                {item}
              </button>
            ))}
          </nav>

          {/* BUSCA DESKTOP */}

          <div
            className="
              hidden
              md:flex
              items-center
              bg-gray-100
              rounded-full
              px-5
              py-3
              flex-1
              max-w-sm
            "
          >
            <Search
              size={18}
              className="
                text-gray-500
                mr-3
                flex-shrink-0
              "
            />

            <input
              type="search"
              value={search}
              onChange={handleSearchChange}
              placeholder="Buscar produtos..."
              className="
                bg-transparent
                outline-none
                w-full
                text-sm
                min-w-0
              "
            />

            {search && (
              <button
                type="button"
                onClick={clearSearch}
                className="
                  ml-2
                  text-gray-400
                  hover:text-black
                "
                aria-label="Limpar busca"
              >
                <X size={17} />
              </button>
            )}
          </div>

          {/* ÍCONES */}

          <div
            className="
              flex
              items-center
              gap-3
              sm:gap-4
              md:gap-5
            "
          >
            <Link
              to="/favoritos"
              className="
                relative
                hover:scale-110
                duration-300
              "
              aria-label="Favoritos"
            >
              <Heart size={21} />

              {favoritesCount > 0 && (
                <span
                  className="
                    absolute
                    -top-2
                    -right-2
                    min-w-5
                    h-5
                    px-1
                    rounded-full
                    bg-red-500
                    text-white
                    text-[10px]
                    flex
                    items-center
                    justify-center
                  "
                >
                  {favoritesCount}
                </span>
              )}
            </Link>

            <Link
              to="/meus-pedidos"
              className="
                hidden
                sm:block
                hover:scale-110
                duration-300
              "
              aria-label="Meus pedidos"
            >
              <User size={21} />
            </Link>

            <button
              type="button"
              onClick={onCartClick}
              className="
                relative
                hover:scale-110
                duration-300
              "
              aria-label="Carrinho"
            >
              <ShoppingBag size={23} />

              {itemCount > 0 && (
                <span
                  className="
                    absolute
                    -top-2
                    -right-2
                    min-w-5
                    h-5
                    px-1
                    rounded-full
                    bg-black
                    text-white
                    text-[10px]
                    flex
                    items-center
                    justify-center
                  "
                >
                  {itemCount > 99
                    ? "99+"
                    : itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* BUSCA MOBILE */}

        <div
          className="
            md:hidden
            px-4
            sm:px-6
            pb-4
          "
        >
          <div
            className="
              flex
              items-center
              bg-gray-100
              rounded-full
              px-4
              py-3
            "
          >
            <Search
              size={18}
              className="
                text-gray-500
                mr-3
                flex-shrink-0
              "
            />

            <input
              type="search"
              value={search}
              onChange={handleSearchChange}
              placeholder="Buscar produtos..."
              className="
                bg-transparent
                outline-none
                w-full
                min-w-0
                text-sm
              "
            />

            {search && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Limpar busca"
              >
                <X size={17} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* OVERLAY MOBILE */}

      <div
        onClick={() =>
          setMobileMenuOpen(false)
        }
        className={`
          fixed
          inset-0
          z-40
          bg-black/50
          backdrop-blur-sm
          transition-opacity
          duration-300

          ${
            mobileMenuOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      />

      {/* MENU LATERAL MOBILE */}

      <aside
        className={`
          fixed
          top-0
          left-0
          z-50
          h-full
          w-[85%]
          max-w-[360px]
          bg-white
          shadow-2xl
          transition-transform
          duration-300
          flex
          flex-col

          ${
            mobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <div
          className="
            flex
            items-center
            justify-between
            p-5
            border-b
          "
        >
          <strong
            className="
              text-2xl
              tracking-[4px]
              font-black
            "
          >
            diDios
          </strong>

          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen(false)
            }
            className="
              w-10
              h-10
              rounded-full
              flex
              items-center
              justify-center
              hover:bg-gray-100
            "
          >
            <X size={22} />
          </button>
        </div>

        <nav
          className="
            flex-1
            p-5
            overflow-y-auto
          "
        >
          <p
            className="
              text-xs
              font-bold
              uppercase
              tracking-[2px]
              text-gray-400
              mb-4
            "
          >
            Categorias
          </p>

          <div className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() =>
                  handleCategory(item)
                }
                className="
                  w-full
                  text-left
                  py-4
                  border-b
                  font-semibold
                  text-lg
                "
              >
                {item}
              </button>
            ))}
          </div>

          <Link
            to="/favoritos"
            onClick={() =>
              setMobileMenuOpen(false)
            }
            className="
              mt-8
              flex
              items-center
              gap-3
              py-4
              font-semibold
            "
          >
            <Heart size={20} />
            Favoritos
          </Link>

          <Link
            to="/meus-pedidos"
            onClick={() =>
              setMobileMenuOpen(false)
            }
            className="
              flex
              items-center
              gap-3
              py-4
              font-semibold
            "
          >
            <User size={20} />
            Meus Pedidos
          </Link>
        </nav>
      </aside>
    </>
  );
}
