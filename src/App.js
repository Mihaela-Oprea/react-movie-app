import React, { useReducer } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import { LuckyMovie } from "./pages/LuckyMovie";
import { Product } from "./pages/Product";
import { Header } from "./components/Header";
import { initialState, cartReducer } from "./store/Cart/reducer";
import { CartContext } from "./store/Cart/context";
import {
  initialState as favoritesInitialState,
  favoritesReducer,
} from "./store/Favorites/reducer";
import { FavoritesContext } from "./store/Favorites/context";
import { Favorites } from "./pages/Favorites";
import { Footer } from "./components/Footer";
import { HelmetProvider, Helmet } from "react-helmet-async";

// Se foloseste `createBrowserRouter` pentru a defini rutele și paginile care vor fi încărcate la navigare
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Home />
        <Footer />
      </>
    ),
  },
  {
    path: "/products",
    element: (
      <>
        <Header />
        <LuckyMovie />
        <Footer />
      </>
    ),
  },
  {
    path: "/product/:id",
    element: (
      <>
        <Header />
        <Product />
        <Footer />
      </>
    ),
  },
  {
    path: "/cart",
    element: (
      <>
        <Header />
        <Cart />
        <Footer />
      </>
    ),
  },
  {
    path: "/favorites",
    element: (
      <>
        <Header />
        <Favorites />
        <Footer />
      </>
    ),
  },
]);

export default function App() {
  // Folosim `useReducer` pentru a gestiona starea coșului de cumpărături (cart), unde `cartReducer` definește cum se actualizează starea în funcție de acțiuni și `initialState` este starea inițială.
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Folosim `useReducer` și pentru lista de favorite, într-un mod similar cu coșul de cumpărături
  // Aici, `favoritesReducer` este funcția care gestionează logica de actualizare a stării pentru favorite, iar `favoritesInitialState` definește starea inițială a listei de favorite
  const [favoritesState, favoritesDispatch] = useReducer(
    favoritesReducer,
    favoritesInitialState
  );

  // Creăm un obiect care va fi folosit pentru a partaja starea și dispatcher-ul (funcția de trimitere a acțiunilor) pentru coșul de cumpărături
  // `state` reprezintă starea actuală a coșului de cumpărături și `dispatch` este funcția care va trimite acțiuni către reducerul coșului
  const cartContextValue = { state, dispatch };

  // Creăm un obiect similar pentru lista de favorite, pentru a partaja starea și dispatcher-ul pentru favorite între componente.
  // `favoritesState` reprezintă starea actuală a listei de favorite și `favoritesDispatch` este funcția de trimitere a acțiunilor către reducerul favoritelor
  const favoritesContextValue = { favoritesState, favoritesDispatch };

  return (
    <HelmetProvider>
      {/* HelmetProvider este folosit pentru a gestiona titlurile și metadatele pentru paginile aplicației */}
      <CartContext.Provider value={cartContextValue}>
        {/* CartContext.Provider este folosit pentru a oferi contextul cosului de cumparaturi si valorile sale copiilor */}
        <FavoritesContext.Provider value={favoritesContextValue}>
          <div className="App primary">
            {/* Helmet este folosit pentru a seta favicon-ul aplicației */}
            <Helmet>
              <link rel="icon" href="/favicon.ico" />
            </Helmet>
            {/* RouterProvider este responsabil pentru gestionarea navigării între paginile aplicației */}
            <RouterProvider router={router} />
          </div>
        </FavoritesContext.Provider>
      </CartContext.Provider>
    </HelmetProvider>
  );
}
