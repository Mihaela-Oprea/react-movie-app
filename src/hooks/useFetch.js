// Importăm hook-urile `useState` și `useEffect` din React
import { useState, useEffect } from "react";

// `useFetch` primește un URL și returnează datele obținute de la acel URL.
export function useFetch(url) {
  // State-ul `data` este inițializat cu `null` pentru a arăta că nu am primit încă un răspuns.
  const [data, setData] = useState(null);

  useEffect(() => {
    // Facem cererea fetch către URL și actualizăm state-ul cu răspunsul.
    fetch(url)
      .then((response) => response.json()) // Conversia răspunsului la format JSON
      .then((json) => {
        setData(json); // Actualizăm `data` cu rezultatul obținut
      });

    // Adăugăm `url` în lista de dependințe pentru a refolosi efectul dacă URL-ul se schimbă.
  }, [url]);

  // Returnăm datele obținute de la server.
  return data;
}
