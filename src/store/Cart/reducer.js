// State-ul initial conține un array gol de produse.
export const initialState = {
  products: [], // La început, coșul este gol.
};

// Reducerul primește state-ul curent și acțiunea și actualizează starea în funcție de acțiune.
export function cartReducer(state, action) {
  console.log(action); // Logăm acțiunea pentru a putea face debugging

  // Evaluăm tipul acțiunii și actualizăm starea corespunzător.
  switch (action.type) {
    case "ADD_TO_CART": {
      let updatedProducts;
      let newState;

      // Căutăm produsul în lista de produse din coș pentru a verifica dacă există deja.
      const foundProduct = state.products.find(
        (product) => product.id === action.payload.id
      );

      if (foundProduct) {
        // Dacă produsul există deja în coș, îi creștem cantitatea cu 1.
        updatedProducts = state.products.map((product) => {
          if (foundProduct.id === product.id) {
            return {
              ...product, // Păstrăm toate proprietățile produsului curent
              quantity: product.quantity + 1, // Creștem cantitatea
            };
          } else {
            return product; // Dacă produsul nu e cel căutat, îl returnăm neschimbat
          }
        });
      } else {
        // Dacă produsul gasit nu există în coș, îl adăugăm cu cantitatea setată la 1.
        updatedProducts = [
          ...state.products, // Păstrăm produsele deja existente în coș
          { ...action.payload, quantity: 1 }, // Adăugăm produsul nou cu cantitatea 1
        ];
      }

      // Creăm noul state cu lista actualizată de produse.
      newState = { products: updatedProducts };
      return newState; // Returnăm noul state, iar React va actualiza starea contextului
    }

    case "REMOVE_FROM_CART": {
      // Dacă acțiunea este de tip "REMOVE_FROM_CART", eliminăm produsul cu id-ul respectiv.
      const filteredProducts = state.products.filter((product) => {
        return product.id !== action.payload; // Filtrăm produsul care are același id
      });

      // Creăm noul state, care conține doar produsele care nu au fost șterse.
      const newState = { products: filteredProducts };
      return newState; // Returnăm noul state actualizat
    }

    // Dacă acțiunea nu corespunde niciuneia dintre cele definite, returnăm state-ul neschimbat.
    default:
      return state; // În cazul în care tipul acțiunii este necunoscut, nu schimbăm starea
  }
}
