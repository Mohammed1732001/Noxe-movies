import React from 'react'
import { Link } from 'react-router-dom'

export default function HomeItems({ item }) {



  return <>

    <div className="col-md-2 ">
      <Link to={`/moviedetails/ ${item.id}/${item.media_type}`} className='text-decoration-none text-white'>
        <div className=" position-relative  product ">
          {item.poster_path ? <img src={"https://image.tmdb.org/t/p/w500" + item.poster_path} className='w-100 '
            alt={item.title} /> : <img src={"https://image.tmdb.org/t/p/w500" + item.profile_path} className='w-100 '
              alt={item.title} />}
          {item.name ? <h3 className='h5 text-center pt-2'> {item.name.split(" ").slice(0, 3).join(" ")}</h3>
            : <h3 className='h5 text-center pt-2'> {item.title.split(" ").slice(0, 3).join(" ")}</h3>}

          {item.vote_average ? <div className="vote position-absolute top-0 end-0 p-1">
            {item.vote_average.toFixed(1)}</div> : ''}
        </div>
      </Link>
    </div>

  </>
}
