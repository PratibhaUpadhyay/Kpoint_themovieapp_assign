import React, { useEffect, useState } from 'react';
import Card from './Card';

const API_KEY = "&api_key=25a3ed6a3df3a123c367790e23a91494";
const base_url = "https://api.themoviedb.org/3";
const initial_url = base_url + "/discover/movie?sort_by=popularity.desc" + API_KEY;
const categories = ["Popular", "Theatre", "Kids", "Drama", "Comedie"];

const Main = () => {
    const [movieData, setMovieData] = useState([]);
    const [url_set, setUrl] = useState(initial_url);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch(url_set)
            .then(res => res.json())
            .then(data => {
                setMovieData(data.results);
            });
    }, [url_set]);

    const searchMovie = (e) => {
        e.preventDefault();
        if (search.trim() !== "") {
            const searchUrl = base_url + "/search/movie?api_key=25a3ed6a3df3a123c367790e23a91494&query=" + search;
            setUrl(searchUrl);
            setSearch("");  // Clear the search input after submission
        }
    };

    const getData = (movieType) => {
        let newUrl;
        switch (movieType) {
            case "Popular":
                newUrl = base_url + "/discover/movie?sort_by=popularity.desc&primary_release_year=2012" + API_KEY;
                break;
            case "Theatre":
                newUrl = base_url + "/discover/movie?primary_release_date.gte=2012-09-15&primary_release_date.lte=2012-10-22" + API_KEY;
                break;
            case "Kids":
                newUrl = base_url + "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&primary_release_year=2012" + API_KEY;
                break;
            case "Drama":
                newUrl = base_url + "/discover/movie?with_genres=18&primary_release_year=2012" + API_KEY;
                break;
            case "Comedie":
                newUrl = base_url + "/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc&primary_release_year=2012" + API_KEY;
                break;
            default:
                newUrl = initial_url;
        }
        setUrl(newUrl);
    };

    return (
        <div>
            <div className='header'>
                <nav>
                    <ul>
                        {categories.map((value, pos) => (
                            <li key={pos}>
                                <button className="link-button" name={value} onClick={(e) => { getData(e.target.name) }}>
                                    {value}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
                <form onSubmit={searchMovie}>
                    <div className='search-btn'>
                        <input
                            type='text'
                            placeholder='Enter Movie name'
                            className='inputText'
                            onChange={(e) => { setSearch(e.target.value) }}
                            value={search}
                        />
                        <button type="submit"><i className="fas fa-search"></i></button>
                    </div>
                </form>
            </div>
            <div className='container'>
                {movieData.length === 0
                    ? <p className='notfound'>Not Found</p>
                    : movieData.map((res, pos) => (
                        <Card info={res} key={pos} />
                    ))
                }
            </div>
        </div>
    );
};

export default Main;
