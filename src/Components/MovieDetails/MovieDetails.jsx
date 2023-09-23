import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

export default function MovieDetails() {

  const [details, setDetails] = useState({});
  const { id, mediaType } = useParams();

  async function getTrending(id, mediaType) {
    try {
      const { data } = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=cf4a1f832611fa30173f10337b20dba4&language=en-US`)
      setDetails(data);
      console.log(data);
    } catch (error) {
      console.log('Error : ', error);
    }
  }


  useEffect(() => {
    getTrending(id, mediaType);
  }, [])



  return <>
    <Helmet>
      <title>Movies Details</title>
    </Helmet>

    <div className="row py-4 ">

      <div className="col-md-3  py-4 ">
        {details.poster_path ? <img src={"https://image.tmdb.org/t/p/w500" + details.poster_path}
          className='w-100 product' alt={details.title} /> :
          <img src={"https://image.tmdb.org/t/p/w500" + details.profile_path}
            className='w-100 product' alt={details.title} />}
      </div>

      <div className="col-md-7  py-4 d-flex align-items-center ">
        <div >
          <h2>{details.title} {details.name}</h2>
          <p className='text-muted my-4'>{details.overview}{details.biography}</p>
          {details.vote_average ? <h6 className='h4'>Views Rate : <span className='text-info mx-2'>
            {details.vote_average}</span></h6> : ''}
          {details.release_date ? <h6 className='h4 '>Release Date : <span className='text-info mx-2'>
            {details.release_date}</span></h6> : ''}
          {details.runtime ? <h6 className='h4 '>Runtime : <span className='text-info mx-2'>
            {details.runtime} Minutes</span></h6> : ''}
          {details.original_language ? <h6 className='h4 '>Original Language : <span className='text-info mx-2'>
            {details.original_language}</span></h6> : ''}
        </div>
      </div>
    </div>

  </>
}
