import { createSlice } from "@reduxjs/toolkit";

const saveMovies = localStorage.getItem("movies");

const movieSlice = createSlice({
    name: "movie",
    initialState: {
        movies: saveMovies? JSON.parse(saveMovies): [{id: 1, name: "Train to Busan", watched: false}, {id: 2, name: "The Movie", watched: true}],
        searchTerm: "",
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

        searchMovie: (state, action) => {
            state.searchTerm = action.payload;
        }
    },
});

export const { addMovie, deleteMovie, editMovie, watchedMovie, searchMovie } = movieSlice.actions;
export default movieSlice.reducer;
        