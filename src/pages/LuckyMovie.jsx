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
    // Verificăm dacă moviesList există și are suficiente filme pentru a selecta
    if (!moviesList || moviesList.length < numberOfMoviesToSelect) return;

    let selectedMovies = []; // Folosim un array pentru a stoca filmele

    while (selectedMovies.length < numberOfMoviesToSelect) {
      // Generăm un index aleatoriu între 0 și lungimea listei - 1
      // Math.random() returnează un număr între 0 și 1
      // Înmulțim cu moviesList.length pentru a obține un număr între 0 și ultima poziție a listei
      // Math.floor() rotunjește rezultatul în jos pentru a obține un număr întreg
      const randomIndex = Math.floor(Math.random() * moviesList.length);
      const randomMovie = moviesList[randomIndex];

      // Verificăm dacă filmul nu este deja în lista selectată
      let alreadyExists = false;
      for (let i = 0; i < selectedMovies.length; i++) {
        // Comparăm ID-ul fiecărui film din selectedMovies cu ID-ul filmului ales aleatoriu
        if (selectedMovies[i].id === randomMovie.id) {
          alreadyExists = true; // Dacă există, setăm alreadyExists la true
          break; // Oprim căutarea pentru a nu continua inutil
        }
      }

      // Dacă filmul nu este deja în listă (!alreadyExists este echivalent cu alreadyExists === false), îl adăugăm
      if (!alreadyExists) {
        selectedMovies.push(randomMovie); // push adaugă un element la finalul array-ului
      }
    }

    // Actualizăm starea cu filmele selectate
    setRandomMovies(selectedMovies);
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
