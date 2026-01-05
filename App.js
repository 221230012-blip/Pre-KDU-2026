import React, { useState, useEffect } from "react"; //used for state management
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom";
import "./App.css";  //handles UI styling

function App() {
    // useState stores data and triggers UI re-render when updated
    const [movieName, setMovieName] = useState("");   //stores the input movie name
    const [rating, setRating] = useState(5);         //stores selected rating
    const [movies, setMovies] = useState([]);         //each movie is an object: {id, name, rating}
    const [search, setSearch] = useState("");         //stores search text

    const addMovie = () => {
        //validation (prevents from adding empty movie names)
        if (movieName.trim() === "") {
            alert("Movie name cannot be empty!");
            return;
        }

        //...movies copies existing movies and the new movie object is added at the end
        setMovies([
            ...movies,
            {
                id: Date.now(), name: movieName, rating
            }
        ]);

        //resetting the inputs
        setMovieName("");
        setRating(5);
    };

    //filter() creates a new array, the movie whose id matches is removed and the state is updated with remaining movies
    const deleteMovie = (id) => {
        setMovies(movies.filter((movie) => movie.id !== id));
    };

    //search logic
    //both the movie name and search text is converted to lowercase to allow case-insensitive search
    const filteredMovies = movies.filter((movie) =>
        movie.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
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

                                {/*Dropdown for rating
                                    map is used to avoid repetitive code*/}
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

                                {/* Clear All button only appears if movie exists */}
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
                                    <MovieCard
                                        key={movie.id}
                                        movie={movie}
                                        deleteMovie={deleteMovie}
                                    />
                                ))
                            )}
                        </div>
                    }
                />
                <Route path="/watch/:title" element={<WatchPage/>}/>
            </Routes>
        </Router>
    );
}

function MovieCard({ movie, deleteMovie }) {
    const [countdown, setCountdown] = useState(10);
    const [isCounting, setIsCounting] = useState(false);
    const [finished, setFinished] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let timer;

        if (isCounting && countdown > 0) {
            timer = setTimeout(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        }

        if (countdown === 0 && !finished) {
            setIsCounting(false);
            setFinished(true);
        }

        return () => clearTimeout(timer);
    }, [isCounting, countdown, finished]);

    const startCountdown = () => {
        setCountdown(10);
        setIsCounting(true);
        setFinished(false);
    };

    const resetCountdown = () => {
        setCountdown(10);
        setIsCounting(false);
        setFinished(false);
    };

    return (
        <div className="movie-card">
            <div>
                <h4>{movie.name}</h4>
                <div className="stars">{"⭐".repeat(movie.rating)}</div>
            </div>

            <button className="delete-btn" onClick={() => deleteMovie(movie.id)}>
                🗑
            </button>

            {!finished ? (
                <>
                    <p>Countdown: {countdown}</p>

                    {!isCounting ? (
                        <button onClick={startCountdown}>Start Countdown</button>
                    ) : (
                        <button onClick={resetCountdown}>Reset Countdown</button>
                    )}
                </>
            ) : (
                <button onClick={() => navigate(`/watch/${movie.name}`)}>
                    Watch Now
                </button>
            )}
        </div>
    );
}


function WatchPage() {
    const { title } = useParams();

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>{title}</h1>
            <p>Now Playing: {title}</p>
        </div>
    );
}

export default App;
