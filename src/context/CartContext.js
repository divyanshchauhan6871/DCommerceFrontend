import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [Cart, setCart] = useState([]);

  useEffect(() => {
    let existingcart = localStorage.getItem("cart");
    if (existingcart) setCart(JSON.parse(existingcart));
  }, []);

  return (
    <CartContext.Provider value={[Cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
