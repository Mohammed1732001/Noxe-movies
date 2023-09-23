import axios from 'axios';
import React, { useEffect, useState } from 'react'
import HomeItems from '../HomeItems/HomeItems';
import { Helmet } from 'react-helmet';


export default function Home() {

  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [people, setPeople] = useState([]);


  async function getTrending(mediaType, usestate) {
    try {
      const { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=cf4a1f832611fa30173f10337b20dba4`)
      usestate(data.results);
      console.log(data.results);
    } catch (error) {
      console.log('Error : ', error);
    }
  }

  useEffect(() => {
    getTrending('movie', setMovies);
    getTrending('tv', setSeries);
    getTrending('person', setPeople);
  }, [])




  return <>
    <Helmet>
      <title>Home</title>
    </Helmet>
    {movies[0] ? <>

      <div className="row gy-3 gx-3 py-4 ">
        <div className="col-md-4 d-flex align-items-center ">
          <div >
            <div className="brdr w-25 mb-3"></div>
            <h2 className='h3'>Trending <br />Movies <br />To Watch Now</h2>
            <p className='text-muted'>Most Watched Movies By Week</p>
            <div className="brdr w-100 mt-3"></div>
          </div>
        </div>
        {movies.slice(0, 15).map((item, index) => <HomeItems key={index} item={item}  />)}
      </div>

      <div className="row gy-3 gx-3 py-4 ">
        <div className="col-md-4 d-flex align-items-center">
          <div >
            <div className="brdr w-25 mb-3"></div>
            <h2 className='h3'>Trending <br />Series <br />To Watch Now</h2>
            <p className='text-muted'>Most Watched Series This Week</p>
            <div className="brdr w-100 mt-3"></div>
          </div>
        </div>
        {series.slice(0, 15).map((item, index) => <HomeItems key={index} item={item} />)}
      </div>

      <div className="row gy-3 gx-3 pt-4 pb-5 ">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brdr w-25 mb-3"></div>
            <h2 className='h3'>Trending <br />People <br />To Watch Now</h2>
            <p className='text-muted'>Top Trending People By Week</p>
            <div className="brdr w-100 mt-3"></div>
          </div>
        </div>
        {people.slice(0, 15).map((item, index) => <HomeItems key={index} item={item} />)}
      </div >
    </> : < div className="center" >
      <div className="circle"></div>
      <span>LOADING....</span>
    </ div>}

  </>
}
