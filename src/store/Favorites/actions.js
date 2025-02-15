// Acțiunea de adăugare a unui produs în favorite primește ca parametru produsul ce urmează să fie adăugat.
export function addToFavorites(product) {
  return {
    type: "ADD_TO_FAVORITES", // Tipul acțiunii, pentru ca reducerul să știe ce să facă
    payload: product, // Produsul care va fi adăugat la favorite
  };
}

// Acțiunea de eliminare a unui produs din favorite primește ca parametru id-ul produsului ce va fi eliminat.
export function removeFromFavorites(productId) {
  return {
    type: "REMOVE_FROM_FAVORITES", // Tipul acțiunii
    payload: productId, // ID-ul produsului ce va fi eliminat din favorite, reducerul va folosi acest ID pentru a filtra produsul din listă.
  };
}
