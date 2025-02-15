// Acțiunea pentru adăugarea unui produs în coș
export function addToCart(product) {
  return {
    type: "ADD_TO_CART", // Tipul acțiunii
    payload: product, // Produsul adăugat
  };
}

// Acțiunea pentru eliminarea unui produs din coș
export function removeFromCart(productId) {
  return {
    type: "REMOVE_FROM_CART", // Tipul acțiunii
    payload: productId, // ID-ul produsului de eliminat
  };
}
