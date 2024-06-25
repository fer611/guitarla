import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { useCart } from "./hooks/useCart";
function App() {
  const {
    cart,
    increaseQty,
    clearCart,
    removeItem,
    decreaseQty,
    addToCart,
    data,
    obtenerTotal
  } = useCart();

  return (
    <>
      <Header
        cart={cart}
        increaseQty={increaseQty}
        clearCart={clearCart}
        removeItem={removeItem}
        decreaseQty={decreaseQty}
        obtenerTotal={obtenerTotal}
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
