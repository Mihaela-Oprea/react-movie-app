import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { CartContext } from "../store/Cart/context";
import { addToCart } from "../store/Cart/actions";
import { FavoritesContext } from "../store/Favorites/context";
import { addToFavorites } from "../store/Favorites/actions";
import "../style.css";

export function Product() {
  // Accesăm contextul CartContext și FavoritesContext pentru a gestiona coșul de cumpărături și favoritele
  const { dispatch } = useContext(CartContext);
  const { favoritesDispatch } = useContext(FavoritesContext);

  // Folosim useParams pentru a obține id-ul filmului din URL
  const { id } = useParams();

  // Utilizăm hook-ul personalizat useFetch pentru a aduce datele filmului, actorilor, recenziilor și filmelor similare
  const product = useFetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
  );
  const credits = useFetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
  );
  const reviews = useFetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
  );
  const similarMovies = useFetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
  );

  // Funcția care adaugă filmul în coș
  function handleAddToCart() {
    // Construim obiectul filmului care va fi adăugat în coș
    const actionResult = addToCart({
      id,
      image: `https://image.tmdb.org/t/p/w500${product?.poster_path}`,
      name: product?.title,
      price: product?.vote_average,
    });
    // Trimitem acțiunea la reducer-ul coșului
    dispatch(actionResult);
  }

  // Funcția care adaugă filmul la favorite
  function handleAddToFavorites() {
    // Construim obiectul filmului care va fi adăugat la favorite
    const actionResult = addToFavorites({
      id,
      image: `https://image.tmdb.org/t/p/w500${product?.poster_path}`,
      name: product?.title,
      price: product?.vote_average,
    });
    // Trimitem acțiunea la reducer-ul favorite-urilor
    favoritesDispatch(actionResult);
  }

  // Creăm funcția pentru limitarea textului la un anumit număr de cuvinte, ce primeste 2 parametrii: textul si limita de cuvinte
  const limitText = (text, wordLimit) => {
    const words = text.split(" "); // Împărțim textul în cuvinte folosind spațiile ca delimitator
    if (words.length > wordLimit) {
      // Dacă avem mai multe cuvinte decât limita, luăm doar primele `wordLimit` cuvinte (din functia apelata mai jos cu argumentul 50)
      return words.slice(0, wordLimit).join(" ") + "..."; // Unim cuvintele și adăugăm "..." la final
    }
    return text; // Dacă textul este mai scurt decât limita, returnăm textul original
  };

  return (
    <div className="container px-3 px-md-5 my-3 text-light">
      <Helmet>
        <title>
          {/* Verificăm dacă există titlul filmului cu operatorul ternar, dacă da, îl adăugăm la titlu dinamic, dacă nu, folosim un titlu default */}
          {product?.title
            ? `Movie Details | ${product.title}`
            : "Movie Details"}
        </title>
        <meta
          name="description"
          content={
            /* Verificăm dacă există titlul filmului, daca da îl adăugăm în descriere, altfel avem un text default, aceasta descriere meta nu este afisata in pagina, dar ajuta la SEO */
            product?.title
              ? `Get all details about the movie ${product.title}. Discover its cast, reviews, similar movies, and much more.` // Descrierea pentru SEO
              : "Discover the movie details."
          }
        />
      </Helmet>

      {/* Dacă `product` există (datele au fost încărcate), afișăm detaliile produsului */}
      {product ? (
        <>
          <div className="row">
            {/* Imaginea și detaliile filmului */}
            <div className="col-12 col-lg-4 d-flex justify-content-center mb-3 mb-lg-0">
              <img
                src={`https://image.tmdb.org/t/p/w500${product.poster_path}`}
                alt={product.title}
                className="product-image"
              />
            </div>
            <div className="col-12 col-lg-8">
              <h1>{product.title}</h1>
              <p>
                <strong>Rating:</strong> {product.vote_average}⭐
              </p>
              <p>
                <strong>Release date:</strong> {product.release_date}
              </p>
              <p>
                <strong>Genres:</strong>{" "}
                {/* Verificăm dacă există informații despre genuri și dacă da, le mapăm */}
                {product.genres?.map((g) => g.name).join(", ")}
                {/* Folosim map pentru a extrage numele fiecărui gen din array-ul product.genres, 
                iar join(", ") le combină într-un singur string, separate de virgulă */}
              </p>
              <p>
                <strong>Description:</strong> {product.overview}
              </p>
              <p>
                <strong>Duration:</strong> {product.runtime} min
              </p>
              <p>
                <strong>Budget:</strong> ${product.budget}
              </p>
              <p>
                <strong>Revenue:</strong> ${product.revenue}
              </p>
              <p>
                <strong>Production Countries:</strong>{" "}
                {/* Verificăm dacă există informații despre țările de producție */}
                {product.production_countries?.map((c) => c.name).join(", ")}
                {/* Folosim map pentru a extrage numele fiecărei țări de producție din array-ul 
                product.production_countries și le combinăm într-un string, separate prin virgulă */}
              </p>
              <p>
                <strong>Spoken Languages:</strong>{" "}
                {/* Verificăm dacă există informații despre limbile vorbite */}
                {product.spoken_languages?.map((l) => l.name).join(", ")}
                {/* Folosim map pentru a extrage numele fiecărei limbi din array-ul 
               product.spoken_languages și le combinăm într-un string, separate prin virgulă */}
              </p>
            </div>
          </div>

          {/* Actorii filmului */}
          <div className="mt-5">
            <h4 className="text-center mb-4">Cast</h4>
            {/* Verificăm dacă există informații despre actori */}
            {credits?.cast ? (
              <div className="d-flex flex-row flex-wrap justify-content-center gap-4">
                {/* Folosim slice pentru a lua doar primii 3 actori */}
                {credits.cast.slice(0, 3).map((actor) => (
                  <div key={actor.id} className="text-center">
                    {/* Afișăm imaginea fiecărui actor */}
                    <img
                      className="cast-image"
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={actor.name}
                    />
                    {/* Afișăm numele actorului */}
                    <p className="mt-2">{actor.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>There is no information about actors.</p>
            )}
          </div>

          {/* Recenzii */}
          <div className="reviews-container mt-5">
            <h4>Reviews</h4>
            {/* Verificăm dacă există recenzii */}
            {reviews?.results?.length > 0 ? (
              reviews.results.map((review) => (
                <div key={review.id}>
                  {/* Afișăm autorul recenziei */}
                  <h5>{review.author}</h5>
                  {/* Afișăm conținutul recenziei limitat la 50 de cuvinte */}
                  <p className="review-text">{limitText(review.content, 50)}</p>
                  <hr />
                </div>
              ))
            ) : (
              <p>No reviews available.</p>
            )}
          </div>

          {/* Filme similare */}
          <div className="mt-5">
            <h4 className="text-center mb-4">Similar Movies</h4>
            {/* Verificăm dacă există filme similare */}
            {similarMovies?.results ? (
              <div className="d-flex flex justify-content-center gap-4">
                {/* Folosim slice pentru a lua doar primele 4 filme similare */}
                {similarMovies.results.slice(0, 4).map((movie) => (
                  <div key={movie.id} className="text-center">
                    {/* Afișăm imaginea fiecărui film similar */}
                    <img
                      className="similar-movies-image"
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p>There are no similar movies.</p>
            )}
          </div>

          {/* Butoane */}
          <div className="d-flex justify-content-center gap-3 mt-4">
            <Button variant="outline-success" onClick={handleAddToCart}>
              🛒 Add to cart
            </Button>
            <Button variant="outline-warning" onClick={handleAddToFavorites}>
              ⭐ Add to favorite
            </Button>
          </div>
        </>
      ) : (
        <p>Loading...</p> // Dacă `product` nu există (datele nu s-au încărcat încă), afișăm mesajul "Loading..."
      )}
    </div>
  );
}
