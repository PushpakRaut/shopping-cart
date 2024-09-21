import React, { createContext, useEffect, useState } from "react";
import ShoppingCart from "./Components/ShoppingCart";
import { Routes, Route } from "react-router-dom";
import Wishlist from "./Components/Wishlist";
import Cart from "./Components/Cart";
import Navbar from "./Components/Navbar";

const productContext = createContext();

const App = () => {
  const [cartProducts, setCartProducts] = useState(
    JSON.parse(localStorage.getItem("cartProducts") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  return (
    <div className="container">
      <productContext.Provider value={{ cartProducts, setCartProducts }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<ShoppingCart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </productContext.Provider>
    </div>
  );
};

export default App;
export { productContext };
