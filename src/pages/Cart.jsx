import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import Button from "react-bootstrap/Button";
import { CartContext } from "../store/Cart/context"; // Importăm contextul coșului de cumpărături
import { removeFromCart } from "../store/Cart/actions"; // Importăm acțiunea de eliminare din coș
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../style.css";

export function Cart() {
  // Folosim useContext pentru a obține starea și dispatch-ul din CartContext
  const { state, dispatch } = useContext(CartContext);

  // Funcție care trimite acțiunea pentru a elimina un produs din coș
  function handleCartRemove(id) {
    dispatch(removeFromCart(id)); // Trimite acțiunea către reducer pentru a elimina produsul (prin dispatch)
  }

  return (
    <Container className="main-content mt-4 text-light">
      <Helmet>
        <title>MovieWeb | Shopping Cart</title>
        <meta
          name="description"
          content="This is your shopping cart, where you can view and remove products."
        />
      </Helmet>

      {/* Verificăm dacă sunt produse în coș și afișăm un mesaj dacă nu sunt */}
      {state.products.length === 0 ? (
        <p>Nu ai produse în coș.</p>
      ) : (
        // Dacă există produse, le mapăm pentru a le afișa în listă
        state.products.map((product) => {
          // Rotunjim prețul produsului la două zecimale pentru o afișare corectă
          const roundedPrice = Math.round(product.price * 100) / 100;
          // Calculăm prețul total pentru acest produs (cantitate * preț unitar)
          const totalProductPrice = (roundedPrice * product.quantity).toFixed(
            2
          );

          return (
            <Row
              key={product.id}
              className="align-items-center mb-3 p-3 border-bottom"
            >
              {/* Coloană pentru imaginea produsului */}
              <Col xs={3} md={2} className="cart-image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="cart-image"
                />
              </Col>

              {/* Coloană pentru titlu și preț */}
              <Col xs={6} md={7}>
                <h6 className="mb-1">{product.name}</h6>
                <p className="text-light mb-1">
                  {product.quantity} X {roundedPrice.toFixed(2)}$ ={" "}
                  {totalProductPrice}$
                </p>
              </Col>

              {/* Coloană pentru butonul de ștergere */}
              <Col xs={3} md={3} className="text-end">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleCartRemove(product.id)}
                >
                  Remove
                </Button>
              </Col>
            </Row>
          );
        })
      )}
    </Container>
  );
}
