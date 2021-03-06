import React, { useState, useEffect } from "react";
import axios from "./axios.js";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailerDB from "./movieTrailer.js";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchURL, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      console.log(request.data.results);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: { autoplay: 1 },
  };

  function handleClick(index) {
    const splitStr = title.split(" ");
    const str = splitStr[0];

    const id = index.toString();

    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      console.log(movieTrailerDB[str][id]);
      console.log(typeof id, id);
      setTrailerUrl(movieTrailerDB[str][id]);
    }
  }

  return (
    <div className="row">
      <h2 className="title">{title}</h2>

      <div className="row_posters">
        {movies.map((movie, index) => {
          return (
            <img
              key={movie.id}
              onClick={() => handleClick(index)}
              className={`${isLargeRow ? "row_posterLarge" : "row_poster"}`}
              src={`${base_url}${movie.poster_path}`}
              alt={movie.name}
            />
          );
        })}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
