import React, { useState, useEffect } from 'react';
import Card from './Card';
import './style.css'; // Import the CSS file

const API_KEY = '25a3ed6a3df3a123c367790e23a91494';
const BASE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&primary_release_year=2023&vote_count.gte=100`;

const fetchMovies = async (page) => {
    const response = await fetch(`${BASE_URL}&page=${page}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
}

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const getMovies = async () => {
            try {
                const data = await fetchMovies(page);
                setMovies(data.results);
                setTotalPages(data.total_pages);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        getMovies();
    }, [page]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div>
            <div className="container">
                {movies.map((movie) => (
                    <Card key={movie.id} info={movie} />
                ))}
            </div>
            <div className="button-container">
                {page > 1 && (
                    <button className='prev-btn' onClick={() => handlePageChange(page - 1)}>Previous</button>
                )}
                {page < totalPages && (
                    <button className='next-btn' onClick={() => handlePageChange(page + 1)}>Next</button>
                )}
            </div>
        </div>
    );
};

export default MovieList;
