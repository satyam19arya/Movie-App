import React , { useState, useEffect } from 'react';
import './HeroBanner.scss';
import { useNavigate } from 'react-router-dom';
import useFetch from "../../../hooks/useFetch.js";
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigation = useNavigate();
  const url = useSelector((state) => state.homeReducer.url);

  const {data, loading} = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * data.results.length)].backdrop_path;
    setBackground(bg);  // eslint-disable-next-line
  }, [data]);

  const searchQueryHandler = (event) => {
    if(event.key === "Enter" && query.length > 0){
      navigation(`/search/${query}`);
    }
  }

  return (
    <div className="heroBanner"> 
      {!loading && 
          <div className='backdrop-img'>
            <Img src={background} />
          </div>}

      <div className='opacity-layer'></div>

      <ContentWrapper>
        <div className="heroBannerContent">
            <span className="title">Welcome.</span>
            <span className="subTitle">Millions of movies, TV shows and people to discover. Explore now</span>
            <div className="searchInput">
              <input type="text" placeholder="Search for a movie or tv show...." onKeyUp={searchQueryHandler} onChange={(e) => setQuery(e.target.value)} />
              <button>Search</button>
            </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner;