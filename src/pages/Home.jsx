import React, { useState, useEffect, useContext } from "react";
import { useFetch } from "../hooks/useFetch";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { CartContext } from "../store/Cart/context"; // Importăm contextul coșului de cumpărături
import { addToCart } from "../store/Cart/actions"; // Importăm acțiunea de adăugare în coș
import { FavoritesContext } from "../store/Favorites/context"; // Importăm contextul favorite-urilor
import { addToFavorites } from "../store/Favorites/actions"; // Importăm acțiunea de adăugare în favorite
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Helmet } from "react-helmet-async";
import "../style.css";

export function Home() {
  const { dispatch } = useContext(CartContext); // Obținem dispatch-ul din contextul coșului de cumpărături
  const { favoritesDispatch } = useContext(FavoritesContext); // Obținem dispatch-ul din contextul favorite-urilor

  const [search, setSearch] = useState(""); // State pentru termenul de căutare introdus de utilizator
  const [page, setPage] = useState(1); // State pentru pagina curentă (paginare)

  // Determinăm URL-ul pe care să-l folosim în funcție de termenul de căutare folosind operatorul ternar
  const url = search.trim() // Apelăm metoda `trim()` care elimină toate spațiile de la începutul și sfârșitul unui șir de caractere pe `search`
    ? `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${search}&page=${page}` // Dacă există un termen de căutare valid, căutăm filme pe baza acestuia
    : `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`; // Dacă nu există un termen de căutare valid, încărcăm filmele populare

  // Folosim hook-ul useFetch, care ia URL-ul construit anterior ca parametru și returnează datele de la API. În acest caz, movies va conține filmele obținute din API (sau null în cazul în care încă se încarcă datele)
  const movies = useFetch(url);

  // State suplimentar pentru a adăuga filmele noi la cele deja încărcate
  const [allMovies, setAllMovies] = useState([]); // Lista de filme completă (adică filmele deja încărcate + cele noi)

  // Folosim `useEffect` pentru a actualiza lista de filme
  useEffect(() => {
    if (movies && movies.results) {
      setAllMovies((prevMovies) => [...prevMovies, ...movies.results]); // Adăugăm noile filme la lista existentă
    }
  }, [movies]); // Se actualizează atunci când `movies` se schimbă (adică când sunt noi date din API)

  // Verificăm dacă filmele nu sunt încă încărcate, dacă nu sunt (movies este null) afișăm un mesaj de încărcare
  if (!movies) {
    return <div>Loading...</div>; // Afișăm un mesaj până când datele sunt disponibile
  }

  // Funcție care adaugă un produs în coș
  function handleAddToCart(product) {
    dispatch(addToCart(product)); // Folosim dispatch pentru a adăuga produsul în coșul de cumpărături
  }

  // Funcție care adaugă un produs în favorite
  function handleAddToFavorites(product) {
    favoritesDispatch(addToFavorites(product)); // Folosim dispatch pentru a adăuga produsul în lista de favorite
  }

  return (
    <div className="container search-bar">
      <Helmet>
        <title>MovieWeb | Home</title>
        <meta
          name="description"
          content="Explorează cele mai populare filme!" // Descrierea pentru meta tagul SEO
        />
      </Helmet>

      {/* Form pentru căutarea filmelor */}
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search for a movie.."
          value={search} // Legăm valoarea inputului de state-ul `search`, astfel încât ceea ce scrie utilizatorul să fie reflectat în acest state
          onChange={(e) => {
            // La fiecare schimbare în input (la apăsarea unei taste), se execută această funcție
            setSearch(e.target.value); // Actualizăm termenul de căutare în state-ul `search` cu valoarea introdusă de utilizator
            setPage(1); // Resetăm pagina la 1, pentru a începe căutarea de la prima pagină de rezultate atunci când utilizatorul schimbă căutarea
            setAllMovies([]); // Resetează lista de filme când schimbă căutarea
          }}
        />
      </Form>

      {/* Containerul pentru afișarea filmelor */}
      <Container>
        <Row className="g-4">
          {/* Verificăm dacă există există o listă de filme în `allMovies` */}
          {allMovies.length > 0 && // Dacă există filme, le afișăm
            allMovies.map(
              (
                movie // Folosim `map` pentru a parcurge lista de filme
              ) => (
                <Col
                  lg={3}
                  md={6}
                  sm={5}
                  xs={12}
                  className="mb-4"
                  key={movie.id}
                >
                  <Card className="card">
                    {/* Link către pagina detaliată a filmului */}
                    <Link to={`/product/${movie.id}`} className="text-dark">
                      <Card.Img
                        variant="top"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      />
                      <Card.Body>
                        <Card.Title>{movie.title}</Card.Title>{" "}
                        <Card.Text className="card-text">
                          {movie.vote_average}⭐{" "}
                        </Card.Text>
                      </Card.Body>
                    </Link>

                    <Button
                      className="button"
                      onClick={() =>
                        handleAddToCart({
                          id: movie.id,
                          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                          name: movie.title,
                          price: movie.vote_average, // Folosim rating-ul ca preț
                        })
                      }
                    >
                      Add to cart
                    </Button>

                    <Button
                      className="button secondary"
                      onClick={() =>
                        handleAddToFavorites({
                          id: movie.id,
                          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                          name: movie.title,
                          price: movie.vote_average, // Folosim rating-ul ca preț pentru favorite
                        })
                      }
                    >
                      Add to favorite
                    </Button>
                  </Card>
                </Col>
              )
            )}
        </Row>
      </Container>

      <div className="d-flex justify-content-center mt-3">
        <Button
          className="button"
          onClick={() => setPage(page + 1)} // La apăsarea butonului, incrementăm pagina
        >
          Load More Movies
        </Button>
      </div>
    </div>
  );
}
