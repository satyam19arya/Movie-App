import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import './Header.scss';
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  },[location]);

  const controlNavbar = () => {
    console.log(window.scrollY);
    if(window.scrollY > 200){
      if(window.scrollY > lastScrollY && !mobileMenu){
        setShow("hide");
      }else{
        setShow("show");
      }
    }else{
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    }  // eslint-disable-next-line
  }, [lastScrollY]); 

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  }

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  }

  const searchQueryHandler = (event) => {
    if(event.key === "Enter" && query.length > 0){
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  }

  const navigationHandler = (event) => {
    if(event === "movies"){
      navigate(`/explore/movie`);
    }else if(event === "shows"){
      navigate(`/explore/tv`);
    }else{
      navigate(`/`);
    }
    setMobileMenu(false);
  }

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt="logo" onClick={() => {navigationHandler("")}} />
        </div>

        <ul className="menuItems">
          <li className="menuItem" onClick={() => {navigationHandler("movies")}}>Movies</li>
          <li className="menuItem" onClick={() => {navigationHandler("shows")}}>TV Shows</li>
          <li className="menuItem"><HiOutlineSearch onClick={openSearch}/></li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch className="cursorPointer" onClick={openSearch} />
          {mobileMenu ? ( <VscChromeClose className="cursorPointer" onClick = { () => setMobileMenu(false)}/> ) : ( <SlMenu className="cursorPointer" onClick = {openMobileMenu}/> )}
        </div>

      </ContentWrapper>

      {showSearch && (
          <div className={`searchBar ${showSearch ? "show" : ""}`}>
            <ContentWrapper>
              <div className="searchInput">
                <input type="text" placeholder="Search for a movie or tv show...." onKeyUp={searchQueryHandler}  onChange={(e) => setQuery(e.target.value)} />
              </div>
              <VscChromeClose className="cursorPointer" onClick = { () => setShowSearch(false)}/>
            </ContentWrapper>
          </div>
      )}
    </header>
  )
}

export default Header;