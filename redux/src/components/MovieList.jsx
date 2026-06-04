import { useSelector, useDispatch } from "react-redux";
import { deleteMovie } from "../movieSlice";

export function MovieList() {
    const movies = useSelector((state) => state.movie.movies);
    const dispatch = useDispatch();

    const handleDeleteMovie = (id) => {
        dispatch(deleteMovie(id));
    }
    return (
        <div>
            {""}
            <h1>Movie List</h1>
                {movies.map((movie) => (
                    <div key={movie.id}>
                        {""}
                        {movie.name}
                        <button onClick={() => handleDeleteMovie(movie.id)}>
                            Delete
                        </button>
                    </div>
                ))}
            
        </div>
    );
};