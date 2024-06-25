import { useState } from "react";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { db } from "./data/data";
import { useEffect } from "react";
function App() {
  const [data, setData] = useState([]);

  const [cart, setCart] = useState([]);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;
  function addToCart(item) {
    //Validamos si el producto ya existe en el carrito
    const indice = cart.findIndex((guitar) => guitar.id === item.id);

    //el método findIndex devuelve -1 cuando no encuentra coincidencias
    if (indice >= 0) {
      const updateCart = [...cart];
      //Obteniendo el item repetido
      const item = updateCart[indice];
      increaseQty(item.id, 1);
    } else {
      item.quantity = 1;
      item.subTotal = item.quantity * item.price;
      setCart((prevCart) => [...prevCart, item]);
    }
  }

  const increaseQty = (id, cantidad = 1) => {
    const newCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        const quantity = item.quantity + cantidad;
        return {
          ...item,
          quantity: quantity,
          subTotal: quantity * item.price
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
          subTotal : quantity * item.price
        };
      }
      return item;
    });
    setCart(newCart);
  };

  function vaciarCarrito() {
    setCart([]);
  }
  useEffect(() => {
    setData(db);
  }, []);

  function quitarItem(item) {
    ///Aca filtramos, quitamos el item del carrito
    const nuevoCarrito = cart.filter((guitar) => guitar.id !== item.id);
    setCart(nuevoCarrito);
  }

  useEffect(() => {
    //console.log("Cart: ", cart);
  }, [cart]);

  return (
    <>
      <Header
        cart={cart}
        increaseQty={increaseQty}
        vaciarCarrito={vaciarCarrito}
        quitarItem={quitarItem}
        decreaseQty={decreaseQty}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((d) => (
            <Guitar key={d.id} guitar={d} addToCart={addToCart} />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
