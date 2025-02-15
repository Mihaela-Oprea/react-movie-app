import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../store/Cart/context";
import { useContext } from "react";
import { FavoritesContext } from "../store/Favorites/context"; // Importăm contextul pentru favorite
import "./Header.css";

export function Header() {
  const { state } = useContext(CartContext);
  const { favoritesState } = useContext(FavoritesContext);

  // Folosim un operator ternar pentru a verifica dacă favoritesState există. Dacă există, returnăm lungimea produselor, altfel returnăm 0
  const favoriteCount = favoritesState ? favoritesState.products.length : 0;

  // Folosim useState pentru a controla starea meniului de mobil
  const [isOpen, setIsOpen] = useState(false); // Inițial, meniul este închis (false)

  // reduce() este folosit pentru a parcurge toate produsele din coș și a calcula totalul produselor ținând cont de cantitatea fiecărui produs. Această funcție primește o funcție de reducer și o valoare inițială (0). total reprezintă valoarea acumulată până în acel punct, iar product.quantity reprezintă cantitatea fiecărui produs.
  const totalProductsInCart = state.products.reduce(
    (total, product) => total + product.quantity,
    0
  );

  return (
    <header className="header">
      <div className="d-flex justify-content-between align-items-center mx-4 flex-row">
        <Link to="/" className="logo">
          MovieWeb
        </Link>

        <button
          className="menu-toggle d-lg-none" // Butonul apare doar pe ecrane mici
          onClick={() => setIsOpen(!isOpen)} // Folosim o funcție de tip arrow pentru a modifica starea isOpen. Dacă isOpen este true, atunci setIsOpen(false) o va schimba în false și invers
        >
          ☰
        </button>

        <nav className={`nav-links ${isOpen ? "open" : ""}`}>
          {" "}
          {/* Folosim operatorul ternar pentru a adăuga clasa "open" dacă meniul este deschis */}
          <Link to="/products">Lucky Movie</Link>
          <Link to="/cart">Cart ({totalProductsInCart})</Link>{" "}
          {/* Afișăm numărul total de produse din coș */}
          <Link to="/favorites">Favorites ({favoriteCount})</Link>{" "}
          {/* Afișăm numărul de produse din favorite */}
        </nav>
      </div>
    </header>
  );
}
