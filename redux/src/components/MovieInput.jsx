import { useState } from "react";
import { addMovie } from "../movieSlice";
import { useDispatch } from "react-redux";

export function MovieInput() {
    const [ newMovie, setNewMovie ] = useState("");

    const dispatch = useDispatch();

    const handleAddMovie = () => {
        if(newMovie) {
            dispatch(addMovie(newMovie));
            setNewMovie("");
        }
    };

    return (
        <>
            <div>
                <input onChange={(event) => setNewMovie(event.target.value)} value={newMovie} />
                <button onClick={handleAddMovie}>Add Movie</button>
            </div>
        </>
    );
}