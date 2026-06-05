import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { deleteMovie, watchedMovie } from "../movieSlice";
import { MovieEdit } from "./MovieEdit";

export function MovieList() {
    const [isWatched, setIsWatched] = useState(false);
    const movies = useSelector((state) => state.movie.movies);
    const dispatch = useDispatch();

    const handleDeleteMovie = (id) => {
        dispatch(deleteMovie(id));
    };

    const handleWatched = (id) => {
        dispatch(watchedMovie(id));
        setIsWatched(!isWatched);
    };
    return (
        <div>
            <h1>Movie List</h1>
                {movies.map((movie) => (
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