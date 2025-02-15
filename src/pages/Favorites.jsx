import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import Button from "react-bootstrap/Button";
import { FavoritesContext } from "../store/Favorites/context"; // Importarea contextului pentru favorite
import { removeFromFavorites } from "../store/Favorites/actions"; // Importarea acțiunii pentru eliminarea unui produs din favorite
import Container from "react-bootstrap/Container";
import { FaStar } from "react-icons/fa";

export function Favorites() {
  // Obținem state-ul și dispatch-ul din FavoritesContext folosind useContext
  const { favoritesState, favoritesDispatch } = useContext(FavoritesContext);

  // Funcție pentru a elimina un produs din lista de favorite
  function handleRemoveFromFavorites(id) {
    // Apelăm dispatch pentru a trimite acțiunea de eliminare a produsului catre reducer
    favoritesDispatch(removeFromFavorites(id));
  }

  return (
    <Container className="main-content mt-4 text-light">
      <Helmet>
        <title>MovieWeb | Favorites</title>
        <meta
          name="description"
          content="Browse through the products you love and manage your favorites list."
        />
      </Helmet>

      {/* 
          Optional Chaining (`?.`) este folosit aici pentru a evita erorile.
        - Verificăm dacă `favoritesState` există înainte de a încerca să accesăm `products`.
        - Dacă `favoritesState` este `undefined` sau `null`, accesarea `products.length` fără `?.` ar cauza o eroare.
        - `?.` returnează `undefined` în loc să încerce să acceseze `length`, evitând astfel o eroare fatală.
      */}
      {favoritesState?.products?.length === 0 ? (
        <p>Nu ai produse în favorite.</p>
      ) : (
        <div className="favorites-container">
          {/* Mapăm prin produsele favorite pentru a le afișa */}
          {favoritesState?.products?.map((product) => {
            return (
              <div key={product.id} className="favorite-item">
                <div className="image-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="favorite-image"
                  />
                  <FaStar className="favorite-icon" />
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  className="remove-button"
                  onClick={() => handleRemoveFromFavorites(product.id)}
                >
                  Remove
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </Container>
  );
}
