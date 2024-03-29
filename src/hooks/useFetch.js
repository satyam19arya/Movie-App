import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => { 
       fetchData();  // eslint-disable-next-line
    }, [url]);

    const fetchData = async () => {
        try {
            setLoading("loading...");
            setData(null);
            setError(null);

            const res = await fetchDataFromApi(url);
            setLoading(false);
            setData(res);
            console.log(res);
        }catch(err){
            setLoading(false);
            setError("Something went wrong!");
        }
    };

    return { data, loading, error };
};

export default useFetch;