// Inițializarea stării pentru favorite
export const initialState = {
  products: [], // Lista de produse favorite începe goală
};

// Reducerul care gestionează starea favorite-urilor
export function favoritesReducer(state = initialState, action) {
  console.log(action); // Logăm acțiunea pentru a o vedea în consola de debug

  // Switch-ul evaluază tipul acțiunii și actualizează starea în funcție de aceasta
  switch (action.type) {
    case "ADD_TO_FAVORITES":
      // Căutăm dacă produsul există deja în lista de favorite
      const foundProduct = state.products.find(
        (product) => product.id === action.payload.id
        // Dacă product.id (id-ul unui produs din lista de favorite) este egal cu action.payload.id (id-ul produsului pe care dorim să-l adăugăm la favorite), înseamnă că produsul este deja în lista de favorite. În acest caz, nu adăugăm din nou produsul și returnăm starea neschimbată.
      );

      // Dacă produsul nu este deja în favorite, îl adăugăm la lista de favorite
      if (!foundProduct) {
        return {
          ...state, // Păstrăm restul stării neschimbat
          products: [...state.products, action.payload], // Adăugăm produsul la lista de favorite
        };
      }

      // Dacă produsul este deja în favorite, nu facem nici o modificare
      return state;

    case "REMOVE_FROM_FAVORITES":
      // Filtrăm lista de favorite pentru a elimina produsul cu id-ul respectiv
      return {
        ...state, // Păstrăm restul stării neschimbat
        products: state.products.filter(
          (product) => product.id !== action.payload // Eliminăm produsul cu id-ul specificat
          // Prin product.id !== action.payload, verificăm dacă id-ul produsului nu este egal cu id-ul produsului pe care vrem să-l eliminăm (acesta este furnizat prin action.payload), filter() va returna doar produsele a căror id nu se potrivește cu action.payload. Astfel, produsul respectiv va fi eliminat din listă.
        ),
      };

    // Dacă tipul acțiunii nu se potrivește, returnăm starea neschimbată
    default:
      return state;
  }
}
