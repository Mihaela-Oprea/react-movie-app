import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { PiCloverLight } from "react-icons/pi";
import { useFetch } from "../hooks/useFetch";
import "../style.css";

export function LuckyMovie() {
  const [randomMovies, setRandomMovies] = useState([]); // Filmele random ce vor fi afișate

  // Folosim hook-ul useFetch pentru a obține filmele populare
  const moviesData = useFetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=1`
  );

  function generateRandomMovies(moviesList, numberOfMoviesToSelect = 3) {
    // `Math.random()` returnează un număr aleatoriu între 0 și 1, scăzând 0.5 din acel număr, obținem un număr între -0.5 și 0.5
    // `sort()` folosește acest număr pentru a decide dacă două elemente vor schimba locurile
    // Dacă numărul este pozitiv, elementele vor fi inversate, altfel nu, practic, acest lucru va amesteca lista de filme aleatoriu
    const shuffledMovies = moviesList.sort(() => Math.random() - 0.5);
    // `slice()` returnează o copie a elementelor din intervalul respectiv
    const randomMovies = shuffledMovies.slice(0, numberOfMoviesToSelect);
    // `setRandomMovies(randomMovies)` va schimba valoarea state-ului `randomMovies` cu cele 3 filme aleatorii selectate
    setRandomMovies(randomMovies);
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
          <PiCloverLight size={18} /> {/* Iconița pentru buton */}
          <br />
          I'm Feeling Lucky
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
                  <Card.Text className="text-danger">
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
