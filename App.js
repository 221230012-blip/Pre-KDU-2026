import React, { useState } from "react";
import "./App.css";

function App() {
    const [movieName, setMovieName] = useState("");
    const [rating, setRating] = useState(5);
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");

    const addMovie = () => {
        if (movieName.trim() === "") {
            alert("Movie name cannot be empty!");
            return;
        }

        setMovies([
            ...movies,
            { id: Date.now(), name: movieName, rating }
        ]);

        setMovieName("");
        setRating(5);
    };

    const deleteMovie = (id) => {
        setMovies(movies.filter((movie) => movie.id !== id));
    };

    const filteredMovies = movies.filter((movie) =>
        movie.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="app">
            <div className="header">
                🎬 <span>Movie Watchlist</span>
                <p>Track movies you want to watch</p>
            </div>

            {/* Add Movie Card */}
            <div className="card">
                <label>Movie Name</label>
                <input
                    type="text"
                    placeholder="Enter movie name..."
                    value={movieName}
                    onChange={(e) => setMovieName(e.target.value)}
                />

                <label>Rating</label>
                <select value={rating} onChange={(e) => setRating(e.target.value)}>
                    {[1, 2, 3, 4, 5].map((r) => (
                        <option key={r} value={r}>
                            {"⭐".repeat(r)} ({r} stars)
                        </option>
                    ))}
                </select>

                <button className="add-btn" onClick={addMovie}>
                    + Add to Watchlist
                </button>
            </div>

            {/* Search */}
            <div className="search-box">
                <input
                    type="text"
                    placeholder="🔍 Search movies..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Count */}
            <div className="count-row">
                <div className="count">
                    Movies in Watchlist: <span>{movies.length}</span>
                </div>

                {movies.length > 0 && (
                    <button className="clear-all" onClick={() => setMovies([])}>
                        Clear All
                    </button>
                )}
            </div>

            {/* Movie List */}
            {filteredMovies.length === 0 ? (
                <p className="empty">No movies found.</p>
            ) : (
                filteredMovies.map((movie) => (
                    <div className="movie-card" key={movie.id}>
                        <div>
                            <h4>{movie.name}</h4>
                            <div className="stars">{"⭐".repeat(movie.rating)}</div>
                        </div>
                        <button
                            className="delete-btn"
                            onClick={() => deleteMovie(movie.id)}
                        >
                            🗑
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default App;
