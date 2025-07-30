import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { getPopularMovies, searchMovies } from "../services/api";
import "../css/Home.css";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (err) {
                console.log(err);
                setError("Failed to load movies...");
            } finally {
                setLoading(false);
            }
        };

        loadPopularMovies();
    }, []);

    const handleSearch = async (e) => {                                       ///function to handle search
        e.preventDefault();

        if (!searchQuery.trim()) return                                        ///handles extra spaces if user enters extra spaces
        if (loading) return

        setLoading(true)
        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)                                   ///we do this coz if any error occurred before execution then it will be cleared
        } catch (error) {
            console.log(error)
            setError("Failed to search movies...")
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="home">

            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for movies"
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-btn">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? (                                             ///this is to do conditional rendering if loading then display loading msg
                <div className="loading">Loading...</div>            ///otherwise display the movie grid
            ) : <div className="movies-grid">
                {movies.map((movie) =>                              ///.map can be used to iterate an array
                    ///movie.title.toLowerCase().startsWith(searchQuery) && <MovieCard movie={movie} key={movie.id} />   
                    ///-> conditional rendering using states (use to search for movies)
                    <MovieCard movie={movie} key={movie.id} />         ///MovieCard component with key (key is important for dynamic rendering)
                )}
            </div>
            }

        </div>
    )
}

export default Home