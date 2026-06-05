import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movie",
    initialState: {
        movies: [
            { id: 1, name: "The Movie", watched: false },
            { id: 2, name: "Train to Busan", watched: true },
        ],
    },
    reducers: {
        addMovie: (state, action) => {
           const newMovie = {
            id: state.movies[state.movies.length - 1].id + 1,
            name: action.payload, 
            watched: false   
           };
           state.movies.push(newMovie);
        },

        deleteMovie: (state, action) => {
            console.log("The payload is:", action.payload);
            state.movies = state.movies.filter(
                (movie) => movie.id !== action.payload
            );
        },

        editMovie: (state, action) => {
            const { id, name } = action.payload;
            const existingMovie = state.movies.find((movie) => movie.id === id );
            if (existingMovie) {
                existingMovie.name = name;
            }
        },

        watchedMovie: (state, action) => {
            const id = action.payload;
            const existingMovie = state.movies.find((movie) => movie.id === id);
            if (existingMovie) {
                existingMovie.watched = !existingMovie.watched;
            }
        },
    },
});

export const { addMovie, deleteMovie, editMovie, watchedMovie } = movieSlice.actions;
export default movieSlice.reducer;
        