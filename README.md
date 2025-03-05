 # 🎬 Movie App

This is my **first personal React project**, a movie selection app inspired by the concept of random recommendations. This **fully responsive** app allows users to get a random set of popular movies, explore their details, and add them to favorites or a shopping cart. It is built using **React, React Bootstrap, and the TMDB API**.

## 🌟 Demo

🌐 [Visit the website on Netlify](https://react-movie-app-08.netlify.app/) 

---

## 🚀 Features

### 🎲 Feeling Lucky - Random Movie Generator
- Users can press a button to generate **3 random movies** from the most popular ones.
- Every time the button is pressed, a new selection of movies appears.
- Movies are fetched from **The Movie Database (TMDB) API**.

### ❤️ Favorites
- Users can **add movies to favorites** for later viewing.
- Favorites are stored using **React Context and useReducer**.
- Movies can be removed from the favorites list with a single click.

### 🛒 Shopping Cart
- Users can **add movies to a shopping cart**, simulating an e-commerce experience.
- The cart uses **React Context and useReducer** for state management.

### 🔍 Movie Details Page
  - Clicking on a movie opens a **detailed view** with information such as:
  - Title, description, rating, release date, genres, duration, and budget.
  - Cast (top 3 actors) with their images.
  - User reviews from TMDB.
  - Similar movie recommendations.

### 🔍 Search Bar
- Users can **search for movies manually** using a search bar located at the top of the homepage.
- As the user types, the list of movies is filtered dynamically and results are updated in real-time.
- The search queries are sent to **The Movie Database (TMDB) API** to fetch relevant movie data.
  
### 📜 Load More Movies
- A **"Load More Movies"** button is available at the bottom of the homepage.
- When pressed, the button fetches **more movies** from the TMDB API and adds them to the current list.
- This functionality allows users to explore additional movies without refreshing the page.

---

## ⚙️ Technologies Used
- **React** (with hooks like useState, useEffect, useContext, and useReducer)
- **React Bootstrap** for styling
- **TMDB API** for fetching movie data
- **React Router** for navigation

  
