import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useDispatch } from "react-redux";
import { getApiConfiguration } from "./redux/slices/homeSlice";
import { Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";


function App() {
  const dispatch = useDispatch();
  // const url = useSelector((state) => state.homeReducer.url);

  useEffect(() => {
    apiTesting(); // eslint-disable-next-line
  }, []); 

  // const apiTesting = () => {
  //   fetchDataFromApi("/movie/popular")
  //     .then((data) => {
  //       console.log(data);
  //       dispatch(getApiConfiguration(data));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  const apiTesting = async () => {
    try{
      const data = await fetchDataFromApi("/configuration");
      console.log(data);

      const url = {
        backdrop: data.images.secure_base_url + "original",  //not adding / because already / in url (https://image.tmdb.org/t/p/)
        poster: data.images.secure_base_url + "original",
        profile: data.images.secure_base_url + "original",
      }
      
      dispatch(getApiConfiguration(url));
    }catch(error){
      console.log(error);
    }
  }

  return (
    <>
      {/* <div className="App">
        {url?.total_pages}
      </div> */}
      <Header />
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/:mediaType/:id" element={<Details />} />
         <Route path="/search/:query" element={<SearchResult />} />
         <Route path="/explore/:mediaType" element={<Explore />} />
         <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>   
  );
}

export default App;