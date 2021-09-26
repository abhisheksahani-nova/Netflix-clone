import React,{useState, useEffect} from "react";
import axios from "./axios.js";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchURL}){
  const[movies, setMovies] = useState([]);

  useEffect(() => {

    async function fetchData(){
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  },[fetchURL]);


  return(
    <div>
      <h2>{title}</h2>

      <div className="row_posters">

         {movies.map(movie => {
           return <img src={`${base_url}${movie.poster_path}`} alt={movie.name} />
         })}


      </div>

    </div>
  )
}

export default Row;
