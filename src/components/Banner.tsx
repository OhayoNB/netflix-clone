import { Movie } from 'models/Movie'
import React, { useEffect, useState } from 'react'
import axios from '../services/axios.service'
import { requests } from '../services/request.service'

interface Props {}

export const Banner: React.FC<Props> = () => {
  const [movie, setMovie] = useState<Movie>()

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals)
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      )
    }
    fetchData()
  }, [])

  function truncate(str: string, n: number) {
    return str?.length > n ? str.substring(0, n - 1) + '...' : str
  }

  if (!movie) return <h1>Loading...</h1>
  return (
    <header
      className="banner"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundPosition: 'center center',
      }}
    >
      <div className="banner-contents">
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner-buttons">
          <button className="banner-button">Play</button>
          <button className="banner-button">My List</button>
        </div>

        <h1 className="banner-description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner-fadeBottom"></div>
    </header>
  )
}
