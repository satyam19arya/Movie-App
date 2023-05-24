import { createSlice } from "@reduxjs/toolkit";

const homeSlice= createSlice({
    name: 'homeSlice',
    initialState: {
        url: {},
        genres: {}
    },
    reducers: {
        getApiConfiguration: (state, action) => {
            state.url = action.payload;
        },
        getGenres: (state, action) => {
            state.genres = action.payload;
        }
    }
})

export default homeSlice.reducer;
export const { getApiConfiguration, getGenres } = homeSlice.actions;