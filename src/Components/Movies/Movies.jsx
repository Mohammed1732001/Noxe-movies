import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';


export default function Movies() {

  const [movies, setMovies] = useState(null);
  const numbers = new Array(10).fill(1).map((element, index) => index + 1);
  const [visible, setVisible] = useState(8);
  const mediaType = 'movie';

  async function getMovies(page) {
    try {
      const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=cf4a1f832611fa30173f10337b20dba4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`)
      setMovies(data.results);
      console.log(data.results);
    } catch (error) {
      console.log('Error : ', error);
    }
  }

  useEffect(() => {
    getMovies(1);
  }, [])

  function showMore() {
    setVisible((nextValue) => nextValue + 4)
  }

  return <>
    <Helmet>
      <title>Movies</title>
    </Helmet>
    {movies ? <div className="row gy-3 gx-3 py-4 ">
      {movies.slice(0, visible).map((movie, index) => <div key={index} className="col-md-3 ">
        <Link to={`/moviedetails/${movie.id}/${mediaType}`} className='text-decoration-none text-white'>
          <div className=" position-relative  product">
            <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} className='w-100 ' alt={movie.title} />
            <h3 className='h5 text-center pt-2'> {movie.title.split(" ").slice(0, 3).join(" ")}</h3>
            <div className="vote position-absolute top-0 end-0 p-1">{movie.vote_average.toFixed(1)}
            </div>
          </div>
        </Link>
      </div>)}


      {visible !== movies.length ? <div className='d-flex justify-content-center align-items-center'>
        <button onClick={showMore} className='btn btn-outline-warning text-withe fw-bolder w-50  mt-5'>Show More</button></div>
        : ''} </div> : < div className="center" >
      <div className="circle"></div>
      <span>LOADING....</span>
    </ div>}

    {numbers ?
      <nav aria-label="Page navigation example " className='pb-5 pt-2 d-flex justify-content-center align-items-center '>
        <ul class="pagination ">
          {numbers.map((page, index) => <> <li key={index} onClick={() => getMovies(page)} class="page-item ">
            <Link class="page-link fw-bolder text-dark" to={''}>{page}</Link>
          </li> </>)}
        </ul>
      </nav> : < div className="center" >
        <div className="circle"></div>
        <span>LOADING....</span>
      </ div>}

  </>
}
