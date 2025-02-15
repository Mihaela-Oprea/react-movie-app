import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useFetch } from "../hooks/useFetch";
import "../style.css";

export function LuckyMovie() {
  const [randomMovies, setRandomMovies] = useState([]); // Filmele random ce vor fi afișate

  // Folosim hook-ul useFetch pentru a obține filmele populare
  const moviesData = useFetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=1`
  );

  function generateRandomMovies(moviesList, numberOfMoviesToSelect = 3) {
    if (!moviesList || moviesList.length < numberOfMoviesToSelect) return;

    // Creăm un set pentru a evita filme duplicate
    const selectedMovies = new Set();

    while (selectedMovies.size < numberOfMoviesToSelect) {
      const randomIndex = Math.floor(Math.random() * moviesList.length); // Alegem un index aleatoriu
      selectedMovies.add(moviesList[randomIndex]); // Adăugăm filmul la set (evitând duplicate)
    }

    setRandomMovies([...selectedMovies]); // Convertim set-ul în array și actualizăm starea
  }

  // Așteptăm ca datele să fie încărcate
  if (!moviesData) {
    return <div>Loading...</div>; // Afișăm un mesaj de încărcare dacă nu avem datele
  }

  // Generăm 3 filme random imediat ce avem filmele populare
  if (randomMovies.length === 0) {
    generateRandomMovies(moviesData.results); // Apelăm funcția pentru a genera filmele
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <Container className="main-content d-flex flex-column align-items-center">
        {/* Adaugăm Helmet pentru titlul și descrierea paginii */}
        <Helmet>
          <title>MovieWeb | Lucky Movie</title>{" "}
          {/* Titlul paginii în browser */}
          <meta
            name="description"
            content="Feeling lucky? Discover a random selection of popular movies and find your next favorite!" // Descrierea pentru SEO
          />
        </Helmet>

        {/* Butonul pătrat cu iconiță, mai lat și mai scund */}
        <Button
          onClick={() => generateRandomMovies(moviesData.results)} // Schimbăm cele 3 filme când se apasă butonul
          className="lucky-button"
        >
          Feeling Lucky
        </Button>

        {/* 4 Carduri cu filme random */}
        <div className="movies-container">
          {randomMovies.map(
            (
              movie // Mapăm fiecare film din array-ul randomMovies
            ) => (
              <Card key={movie.id} className="card-lucky m-3">
                {" "}
                {/* Fiecare film are un card unic identificat prin `movie.id` */}
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Imaginea filmului
                />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title> {/* Titlul filmului */}
                  <Card.Text>
                    {movie.vote_average}⭐ {/* Rating-ul filmului */}
                  </Card.Text>
                </Card.Body>
              </Card>
            )
          )}
        </div>
      </Container>
    </div>
  );
}
