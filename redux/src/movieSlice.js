import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movie",
    initialState: {
        movies: [
            { id: 1, name: "The Movie" },
            { id: 2, name: "Train to Busan" },
        ],
    },
    reducers: {
        addMovie: (state, action) => {
           const newMovie = {
            id: state.movies[state.movies.length - 1].id + 1,
            name: action.payload,    
           };
           state.movies.push(newMovie);
        },

        deleteMovie: (state, action) => {
            state.movies = state.movies.filter(
                (movie) => movie.id !== action.payload
            );
        },
    },
});

export const { addMovie, deleteMovie } = movieSlice.actions;
export default movieSlice.reducer;
        