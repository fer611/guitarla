import { useEffect, useState } from "react";
import { db } from "../data/data";
export const useCart = () => {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [data, setData] = useState([]);

  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;
  function addToCart(item) {
    const index = cart.findIndex((guitar) => guitar.id === item.id);
    //el método findIndex devuelve -1 cuando no encuentra coincidencias
    if (index >= 0) {
      const updateCart = [...cart];
      //Obteniendo el item repetido
      const item = updateCart[index];
      increaseQty(item.id, 1);
    } else {
      // Clonar el item para mantener la inmutabilidad
      const newItem = { ...item, quantity: 1, subTotal: item.price };
      setCart((prevCart) => [...prevCart, newItem]);
    }
  }

  const increaseQty = (id, cantidad = 1) => {
    const newCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        const quantity = item.quantity + cantidad;
        return {
          ...item,
          quantity: quantity,
          subTotal: quantity * item.price,
        };
      }
      return item;
    });
    setCart(newCart);
  };

  const decreaseQty = (id, cantidad = 1) => {
    const newCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        const quantity = item.quantity - cantidad;
        return {
          ...item,
          quantity: quantity,
          subTotal: quantity * item.price,
        };
      }
      return item;
    });
    setCart(newCart);
  };

  function clearCart() {
    setCart([]);
  }

  useEffect(() => {
    setData(db);
  }, []);

  function removeItem(item) {
    ///Aca filtramos, quitamos el item del carrito
    const nuevoCarrito = cart.filter((guitar) => guitar.id !== item.id);
    setCart(nuevoCarrito);
  }

  useEffect(() => {
    //console.log("Cart: ", cart);
    //Almacenamos el cart en LocalStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


  function obtenerTotal(cart) {
    //Obteniendo el total del carrito
    let total = 0;
    cart.forEach((item) => {
      total += item.subTotal;
    });
    return total;
  }

  return {
    cart,
    increaseQty,
    clearCart,
    removeItem,
    decreaseQty,
    addToCart,
    data,
    obtenerTotal
  };
};
