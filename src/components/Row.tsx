import { Movie } from 'models/Movie'
import React, { useEffect, useState } from 'react'
import axios from '../services/axios.service'
import YouTube from 'react-youtube'
const movieTrailer = require('movie-trailer')

interface Props {
  title: string
  fetchUrl: string
  isLargeRow?: boolean
}

export const Row: React.FC<Props> = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([])
  const [trailerUrl, setTrailerUrl] = useState('')
  const BASE_URL = 'https://image.tmdb.org/t/p/original/'

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl)
      setMovies(request.data.results)
      return request
    }
    fetchData()
  }, [fetchUrl])

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  }

  const handleClick = (movie: Movie) => {
    if (trailerUrl) setTrailerUrl('')
    else
      movieTrailer(movie?.name || '')
        .then((url: string) => {
          const urlParams = new URLSearchParams(new URL(url).search)
          setTrailerUrl(urlParams.get('v') || '')
        })
        .catch((err: string) => console.log(err))
  }

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row-posters">
        {movies.map((movie: Movie) => (
          <img
            key={movie.id}
            onClick={() => {
              handleClick(movie)
            }}
            className={`row-poster ${isLargeRow && 'row-posterLarge'}`}
            src={
              BASE_URL +
              `${isLargeRow ? movie.poster_path : movie.backdrop_path}`
            }
            alt={movie.name}
          ></img>
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  )
}
