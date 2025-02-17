import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useFetch } from "../hooks/useFetch";
import "../style.css";

export function LuckyMovie() {
  // Stare pentru a reține filmele random selectate
  const [randomMovies, setRandomMovies] = useState([]);

  // Folosim useFetch pentru a obține lista de filme populare de pe TMDb
  // Aceasta returnează un obiect cu datele filmelor populare
  const moviesData = useFetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=1`
  );

  // Funcție pentru generarea unui număr specific de filme aleatorii
  function generateRandomMovies(moviesList, numberOfMoviesToSelect = 3) {
    // Verificăm dacă lista de filme este validă și conține suficiente filme
    if (!moviesList || moviesList.length < numberOfMoviesToSelect) return;

    // Creăm un set pentru a evita selecția de filme duplicate
    const selectedMovies = new Set();

    while (selectedMovies.size < numberOfMoviesToSelect) {
      // Alegem un index aleatoriu din lista filmelor disponibile
      const randomIndex = Math.floor(Math.random() * moviesList.length);
      
      // Adăugăm filmul selectat în set, prevenind astfel duplicatele
      selectedMovies.add(moviesList[randomIndex]);
    }

    // Convertim set-ul într-un array și actualizăm starea cu filmele selectate
    setRandomMovies([...selectedMovies]);
  }

  // Verificăm dacă datele despre filme sunt disponibile
  // Dacă încă nu avem date, afișăm un mesaj de încărcare
  if (!moviesData) {
    return <div>Loading...</div>;
  }

  // Dacă lista de filme random este goală, generăm automat 3 filme random
  if (randomMovies.length === 0) {
    generateRandomMovies(moviesData.results);
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <Container className="main-content d-flex flex-column align-items-center">
        {/* Helmet setează titlul și descrierea paginii pentru SEO */}
        <Helmet>
          <title>MovieWeb | Lucky Movie</title> {/* Titlul paginii */}
          <meta
            name="description"
            content="Feeling lucky? Discover a random selection of popular movies and find your next favorite!" // Meta descriere pentru SEO
          />
        </Helmet>

        {/* Buton pentru a genera un nou set de filme random */}
        <Button
          onClick={() => generateRandomMovies(moviesData.results)} // La apăsare, generează filme noi
          className="lucky-button"
        >
          Feeling Lucky
        </Button>

        {/* Container pentru afișarea filmelor selectate */}
        <div className="movies-container">
          {randomMovies.map((movie) => (
            <Card key={movie.id} className="card-lucky m-3"> {/* Card pentru fiecare film */}
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Afișăm posterul filmului
              />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title> {/* Titlul filmului */}
                <Card.Text>
                  {movie.vote_average}⭐ {/* Afișăm rating-ul filmului */}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
