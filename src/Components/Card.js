import React, { useState } from 'react'
import FullCardInfo from './FullCardInfo';



const Card = ({info}) => {

  
  const [showFullInfo, setShowFullInfo] = useState(false);

  if (!info) {
    return null; // Or you could render a placeholder or an error message
  }
   
    let image_path = "https://image.tmdb.org/t/p/w500";

   

    const handleDescriptionClick = () => {
      setShowFullInfo(true);
    };

  return (
    <section className='movie-section'>

       {showFullInfo ? (
        <FullCardInfo movie={info} onClose={() => setShowFullInfo(false)} />
      ) : (

        <div className='movie-card'>
          <figure>
          <img src={image_path+ info.poster_path} className='poster' alt='' />
          </figure>
           

            <div className='card-content'>
              <p className='title'>{info.title}</p>
              <p className='card-text-1'>{info.release_date}</p>
              <p className='card-text-2'>{info.vote_average}/10</p>

                
            </div>

      
              <button className='description' onClick={handleDescriptionClick}>Description</button>
          
               
        </div>

        
      )}
    </section>
  )
}

export default Card ; 