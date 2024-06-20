export default function Header({
  cart = [],
  addQuantity,
  vaciarCarrito,
  quitarItem,
}) {
  function obtenerTotal(cart) {
    //Obteniendo el total del carrito
    let total = 0;
    cart.forEach((item) => {
      total += item.subTotal;
    });
    return total;
  }

  const handleUpdateQuantity = (item, quantity) => {
    //Buscar el item en el carrito
    const indice = cart.findIndex((guitar) => guitar.id === item.id);

    //Si mayor que cero, encontró el item
    if (indice >= 0) {
      //Una vez encontrado el item, verificamos si su cantidad es >0
      const guitar = cart[indice];
      if (guitar.quantity === 1 && quantity === -1) {
        //Si llega a 1, y si quantity es restar... lo  podemos quitar del carrito
        //quitarItem(item);
      } else {
        //Actualizamos su cantidad si es > 0
        addQuantity(indice, quantity);
      }
    } else {
      console.log("No se encontró el item");
    }
  };

  return (
    <>
      <header className="py-5 header">
        <div className="container-xl">
          <div className="row justify-content-center justify-content-md-between">
            <div className="col-8 col-md-3">
              <a href="index.html">
                <img
                  className="img-fluid"
                  src="./public/img/logo.svg"
                  alt="imagen logo"
                />
              </a>
            </div>
            <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
              <div className="carrito">
                <img
                  className="img-fluid"
                  src="./public/img/carrito.png"
                  alt="imagen carrito"
                />

                <div id="carrito" className="bg-white p-3">
                  {cart.length === 0 ? (
                    <p className="text-center">El carrito esta vacio</p>
                  ) : (
                    <>
                      <table className="w-100 table">
                        <thead>
                          <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Sub Total</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {cart.map((item) => {
                            const {
                              id,
                              image,
                              name,
                              price,
                              quantity,
                              subTotal,
                            } = item;
                            return (
                              <tr key={id}>
                                <td>
                                  <img
                                    className="img-fluid"
                                    src={`./public/img/${image}.jpg`}
                                    alt="imagen guitarra"
                                  />
                                </td>
                                <td>{name}</td>
                                <td className="fw-bold">${price}</td>
                                <td className="flex align-items-start gap-4">
                                  <button
                                    type="button"
                                    className="btn btn-dark"
                                    onClick={() =>
                                      handleUpdateQuantity(item, -1)
                                    }
                                  >
                                    -
                                  </button>
                                  {quantity}
                                  <button
                                    type="button"
                                    className="btn btn-dark"
                                    onClick={() =>
                                      handleUpdateQuantity(item, 1)
                                    }
                                  >
                                    +
                                  </button>
                                </td>
                                <td className="fw-bold">${subTotal}</td>
                                <td>
                                  <button
                                    className="btn btn-danger"
                                    type="button"
                                    onClick={() => quitarItem(item)}
                                  >
                                    X
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <p className="text-end">
                        Total pagar:{" "}
                        <span className="fw-bold">${obtenerTotal(cart)}</span>
                      </p>
                      <button
                        className="btn btn-dark w-100 mt-3 p-2"
                        onClick={vaciarCarrito}
                      >
                        Vaciar Carrito
                      </button>
                    </>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
