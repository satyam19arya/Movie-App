import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNmFkZDZmNTZkOTRlZmEzZjc4YTE4MTU4OTBiM2UxMCIsInN1YiI6IjY0NmQ0MTRmMmJjZjY3MDE1NTg0ZWQxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1NIOT_qnG1zs70-77--8nzQdvgV_LYff_KjQ9mZuIYI";

const headers = {
    Authorization: "Bearer " + TMDB_TOKEN,
    accept: 'application/json'
};

export const fetchDataFromApi = async (url, params) => {
    try{
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params,
        });
        return data;
    }catch(err){
        console.log(err);
        return err;
    }
};