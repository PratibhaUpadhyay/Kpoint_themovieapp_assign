import React, { useEffect, useState } from 'react';

const FullCardInfo = ({ movie, onClose }) => {
  const [genres, setGenres] = useState([]);
  const [director, setDirector] = useState('');
  const [cast, setCast] = useState([]);

  const API_KEY = '25a3ed6a3df3a123c367790e23a91494';

  useEffect(() => {
    if (movie) {
      // Fetch genres
    
      fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
        .then(response => response.json())
        .then(data => {
          if (data.genres) {
            const genreMap = data.genres.reduce((acc, genre) => {
              acc[genre.id] = genre.name;
              return acc;
            }, {});
            setGenres(movie.genre_ids.map(id => genreMap[id]));
          } else {
            console.error("Error fetching genres: Data structure unexpected", data);
          }
        })
        .catch(error => {
          console.error("Error fetching genres:", error);
        });
       

      // Fetch movie details
      fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&language=en-US&append_to_response=credits`)
        .then(response => response.json())
        .then(data => {
          if (data.credits) {
            const directorInfo = data.credits.crew.find(member => member.job === 'Director');
            setDirector(directorInfo ? directorInfo.name : 'Unknown');

            const castInfo = data.credits.cast.slice(0, 5).map(member => member.name); // Get top 5 cast members
            setCast(castInfo);
          } else {
            console.error("Error fetching movie details: Data structure unexpected", data);
          }
        })
        .catch(error => {
          console.error("Error fetching movie details:", error);
        });
    }
  }, [movie]);

  if (!movie) {
    return null; // Or render a placeholder or an error message
  }


  const image_path = "https://image.tmdb.org/t/p/w500";

  return (
   
    <div className='full-card-info'>
      
      <div className='box-p'>
        <button  className='close-button'  onClick={onClose}>Close</button>

      <div className='image-title-box'>

        <div className='imag'>
          <img src={image_path + movie.poster_path} alt={movie.title} />
        </div>

        <div className='title-box'>
          <p className='title'>{movie.title}</p>
        </div>
       

      </div>

      <div className='fullcard-content-box'>

      
      <p className='card-text-1' id='fc-rd'>{movie.release_date}</p>
      <p className='card-text-2'>{movie.vote_average}/10</p>
      

        
      <div className='genre'>
        <h4>Genre</h4>
        <p >{genres.join(', ')}</p>
      </div>

      <div className='cast'>
      <h4>Cast</h4>
        <p >{cast.join(', ')}</p>
      </div>
      
      <div className='director'>
      <h4>Director</h4>
        <p > {director}</p>
      </div>
       
      <div className='summary'>
        <h4>Summary</h4>
        <p>{movie.overview}</p>
      </div>

      </div>
      
      </div>
    </div>
    
  );
};

export default FullCardInfo;
