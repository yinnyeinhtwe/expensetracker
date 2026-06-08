import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { deleteMovie, watchedMovie, searchMovie } from "../slices/movieSlice";
import { MovieEdit } from "./MovieEdit";

export function MovieList() {
    const [isWatched, setIsWatched] = useState(false);

    const movies = useSelector((state) => state.movie.movies);

    useEffect(() => {
        localStorage.setItem("movies" ,JSON.stringify(movies));
    },[movies]);

    const searchTerm = useSelector((state) => state.movie.searchTerm);

    const dispatch = useDispatch();

    const filteredMovies = movies.filter((movie) =>
        movie.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDeleteMovie = (id) => {
        dispatch(deleteMovie(id));
    };

    const handleWatched = (id) => {
        dispatch(watchedMovie(id));
        setIsWatched(!isWatched);
    };

    const handleSearch = (event) => {
        dispatch(searchMovie(event.target.value));
    }

   return (
        <div>
            <h1>Movie List</h1>
            <input placeholder="Search Movies" onChange={handleSearch} />
                {filteredMovies.map((movie) => (
                    <div key={movie.id}>
                        <input type="checkbox" checked={movie.watched} onChange={() => handleWatched(movie.id)} />
                        {movie.name}
                        {/* <MovieEdit movie={movie} /> */}
                        {movie.watched ? <span> (Watched) </span> : <span> (Not Watched) </span>}
                        <button onClick={() => handleDeleteMovie(movie.id)}>
                            Delete
                        </button> 
                         <MovieEdit movie={movie} />
                    </div>
                ))}
            
        </div>
    );
};