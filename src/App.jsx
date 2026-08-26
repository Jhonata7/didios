import { useState } from "react";

import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import WhatsAppButton from "./components/WhatsAppButton";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Success from "./pages/Success";
import Favorites from "./pages/Favorites";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";

function App() {
  const [cartOpen, setCartOpen] =
    useState(false);

  return (
    <>
      <Header
        onCartClick={() =>
          setCartOpen(true)
        }
      />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/produto/:id"
          element={<Product />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/success"
          element={<Success />}
        />

        <Route
          path="/favoritos"
          element={<Favorites />}
        />

        <Route
          path="/meus-pedidos"
          element={<MyOrders />}
        />

        <Route
          path="/pedido/:id"
          element={<OrderDetails />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>

      <Footer />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() =>
          setCartOpen(false)
        }
      />

      {/* WHATSAPP SEMPRE VISÍVEL */}

      <WhatsAppButton />
    </>
  );
}

export default App;