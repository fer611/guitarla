import { useState } from "react";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { db } from "./data/data";
import { useEffect } from "react";
function App() {
  const [data, setData] = useState([]);

  const [cart, setCart] = useState([]);

  function addToCart(item) {
    //Validamos si el producto ya existe en el carrito
    const indice = cart.findIndex((guitar) => guitar.id === item.id);

    //el método findIndex devuelve -1 cuando no encuentra coincidencias
    if (indice >= 0) {
      //Agregando +1
      addQuantity(indice, 1);
    } else {
      item.quantity = 1;
      item.subTotal = item.quantity * item.price;
      setCart((prevCart) => [...prevCart, item]);
    }
  }

  function addQuantity(indice, quantity) {
    const updateCart = [...cart];
    //Obteniendo el item repetido
    const item = updateCart[indice];
    //Incrementando en 1
    item.quantity = item.quantity + quantity;
    //Calculando su nuevo total
    item.subTotal = item.price * item.quantity;
    //Actualizando el item en el nuevo carrito
    updateCart[indice] = item;
    //Seteamos el carrito al estado
    setCart(updateCart);
  }

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
        addQuantity={addQuantity}
        vaciarCarrito={vaciarCarrito}
        quitarItem={quitarItem}
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
